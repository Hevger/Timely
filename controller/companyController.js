const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const keys = require("../config/keys");
const Company = require("../models/Company");
const CompanyProfile = require("../models/CompanyProfile");

// Load Validators
const validateCompanyRegister = require("../validation/validateCompanyRegister");

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
                console.log(companyId);
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
