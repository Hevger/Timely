const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const Company = require("../models/Company");
const CompanyProfile = require("../models/CompanyProfile");

// Load Validators
const validateCompanyRegister = require("../validation/validateCompanyRegister");
const validateUpdateCompany = require("../validation/validateUpdateCompany");
const validateLoginInput = require("../validation/validateLoginInput");

// Login
exports.Login = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find company by email
  Company.findOne({ email }).then(company => {
    // Check for company
    if (!company) {
      errors.email = "Company not found";
      return res.status(404).json(errors);
    }

    // Check password
    bcrypt.compare(password, company.password).then(isMatch => {
      if (isMatch) {
        // Company Matched

        // Create JWT Payload
        const payload = { id: company.id, name: company.name };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

// Get All
exports.GetAll = (req, res) => {
  const errors = {};
  Company.find({}, { cvr: 1, email: 1 })
    .then(companies => {
      if (!companies) {
        errors.nocompanies = "No companies found";
        return res.status(404).json(errors);
      }
      res.json(companies);
    })
    .catch(err => console.log(err));
};

// Get One Company
exports.GetOneCompany = (req, res) => {
  const errors = {};
  CompanyProfile.findOne({ company: req.params.id })
    .populate("company", ["email", "cvr"])
    .then(companyProfile => {
      if (!companyProfile) {
        errors.companyProfile = "No company profile found";
        return res.status(404).json(errors);
      }
      res.json(companyProfile);
    })
    .catch(err => console.log(err));
};

// Register new company
exports.RegisterCompany = (req, res) => {
  const { errors, isValid } = validateCompanyRegister(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  var companyId;
  Company.findOne({ email: req.body.email }).then(company => {
    if (company) {
      errors.email = "Email already exsists";
      return res.status(400).json(errors);
    } else {
      // Create company object
      const newCompany = new Company({
        email: req.body.email,
        cvr: req.body.cvr,
        password: req.body.password
      });

      // Encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newCompany.password, salt, (err, hash) => {
          if (err) throw err;
          newCompany.password = hash;
          newCompany
            .save()
            .then(
              company => {
                companyId = company._id;
              },
              fetch(`https://cvrapi.dk/api?search=${newCompany.cvr}&country=dk`)
                .then(cvrRes => cvrRes.json())
                .then(json => {
                  const newProfile = new CompanyProfile({
                    company: companyId,
                    name: json.name,
                    address: json.address,
                    zipcode: json.zipcode,
                    city: json.city,
                    email: json.email,
                    phone: json.phone
                  });
                  newProfile.save().then(newCompanyProfile => {
                    res.json(newCompanyProfile);
                  });
                })
            )
            .catch(err => console.log(err));
        });
      });
    }
  });
};

// Update Company
exports.UpdateCompany = (req, res) => {
  if (req.params.id !== req.user.id) {
    return res
      .status(401)
      .json({ message: "You don't have permission to update this company" });
  }

  const { errors, isValid } = validateUpdateCompany(req.body);
  var hashed;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid object id");
  }

  // Check Validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  // Encrypt password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) throw err;
      hashed = hash;
    });
  });

  Company.findById(req.params.id)
    .then(company => {
      company.email = req.body.email;
      company.password = hashed;

      CompanyProfile.findOne({ company: req.params.id }).then(
        companyProfile => {
          companyProfile.name = req.body.name;
          companyProfile.address = req.body.address;
          companyProfile.zipcode = req.body.zipcode;
          companyProfile.city = req.body.city;
          companyProfile.phone = req.body.phone;
          company
            .save()
            .then(companyProfile.save().then(res.json(companyProfile)));
        }
      );
    })
    .catch(err => console.log(err));
};

// Delete Company
exports.DeleteCompany = (req, res) => {
  if (req.params.id !== req.user.id) {
    return res
      .status(401)
      .json({ message: "You don't have permission to delete this company" });
  }
  CompanyProfile.findOneAndDelete({ company: req.params.id })
    .then(
      Company.findByIdAndDelete(req.params.id).then(
        res.status(200).json({ success: "Success" })
      )
    )
    .catch(err => console.log(err));
};
