const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const Company = require("../models/Company");
const CompanyProfile = require("../models/CompanyProfile");
const Employee = require("../models/Employee");
const Service = require("../models/Service");
const Hours = require("../models/Hours");

// Load Validators
const validateCompanyRegister = require("../validation/validateCompanyRegister");
const validateUpdateCompany = require("../validation/validateUpdateCompany");
const validateLoginInput = require("../validation/validateLoginInput");
const validateEmployeeInput = require("../validation/validateEmployeeInput");
const validateServiceInput = require("../validation/validateServiceInput");
const hoursValidation = require("../validation/hoursValidation");
const isEmpty = require("../validation/is-empty");

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

// Get current company
exports.getLoggedInCompany = (req, res) => {
  const errors = {};
  CompanyProfile.findOne({ company: req.user.id })
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
                  const companyHours = new Hours({
                    company: companyId
                  });
                  newProfile.save().then(newCompanyProfile => {
                    companyHours.save().then(res.json(newCompanyProfile));
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
  if (req.params.id != req.user.id) {
    return res
      .status(401)
      .json({ message: "You don't have permission to update this company" });
  }

  const { errors, isValid } = validateUpdateCompany(req.body);
  var hashed;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid object id" });
  }

  // Check Validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  if (!isEmpty(req.body.password)) {
    // Encrypt password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        hashed = hash;
      });
    });
  }

  Company.findById(req.params.id)
    .then(company => {
      company.email = req.body.email;
      if (!isEmpty(hashed)) {
        company.password = hashed;
      }

      CompanyProfile.findOne({ company: req.params.id }).then(
        companyProfile => {
          companyProfile.name = req.body.name;
          companyProfile.address = req.body.address;
          companyProfile.zipcode = req.body.zipcode;
          companyProfile.city = req.body.city;
          companyProfile.phone = req.body.phone;
          companyProfile.email = req.body.email2;
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
  if (req.params.id != req.user.id) {
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

// Get All Company Employee
exports.GetAllEmployee = (req, res) => {
  const errors = {};
  Employee.find({ company: req.params.id })
    .then(employees => {
      if (employees.length == 0) {
        errors.employees = "No employees found";
        return res.json(errors);
      }
      res.json(employees);
    })
    .catch(err => console.log(err));
};

// Add Employee
exports.AddEmployee = (req, res) => {
  if (req.params.id != req.user.id) {
    return res.status(401).json({
      message: "You don't have permission to add employee to this company"
    });
  }

  const { errors, isValid } = validateEmployeeInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Create employee object
  const newEmployee = new Employee({
    company: req.params.id,
    name: req.body.name,
    description: req.body.description
  });

  newEmployee
    .save()
    .then(employee => res.json(employee))
    .catch(err => console.log(err));
};

// Delete Employee
exports.DeleteEmployee = (req, res) => {
  const errors = {};

  Employee.findById(req.params.id)
    .then(employee => {
      console.log(employee.company);
      console.log(req.user.id);
      if (employee.company != req.user.id) {
        return res.status(401).json({
          message: "You don't have permission to delete this employee"
        });
      }

      if (!employee) {
        return res.status(400).json({ error: "Employee not found!" });
      }
      Employee.findOneAndDelete({ id: req.body.id }).then(
        res.status(200).json({ success: "Success" })
      );
    })
    .catch(err => console.log(err));
};

// Get One Employee
exports.GetOneEmployee = (req, res) => {
  const errors = {};
  Employee.findById(req.params.id)
    .then(employee => {
      if (!employee) {
        errors.employee = "No employee found";
        return res.status(404).json(errors);
      }
      res.json(employee);
    })
    .catch(err => console.log(err));
};

// Update Employee
exports.UpdateEmployee = (req, res) => {
  const { errors, isValid } = validateEmployeeInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Employee.findById(req.params.id)
    .then(employee => {
      if (req.company != req.user.id) {
        return res.status(401).json({
          message: "You don't have permission to update this employee"
        });
      }

      if (!employee) {
        errors.employee = "No employee found";
        return res.status(404).json(errors);
      }
      employee.name = req.body.name;
      employee.description = req.body.description;
      employee.save().then(res.json(employee));
    })
    .catch(err => console.log(err));
};

// Add Service
exports.AddService = (req, res) => {
  if (req.params.id != req.user.id) {
    return res.status(401).json({
      message: "You don't have permission to add service to this company"
    });
  }

  const { errors, isValid } = validateServiceInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Create service object
  const newService = new Service({
    company: req.params.id,
    name: req.body.name,
    time: req.body.time,
    price: req.body.price
  });

  newService
    .save()
    .then(service => res.json(service))
    .catch(err => console.log(err));
};

// Update Service
exports.UpdateService = (req, res) => {
  const { errors, isValid } = validateServiceInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Service.findById(req.params.id)
    .then(service => {
      if (service.company != req.user.id) {
        return res.status(401).json({
          message: "You don't have permission to update this service"
        });
      }

      if (!service) {
        errors.service = "No service found";
        return res.status(404).json(errors);
      }
      service.name = req.body.name;
      service.time = req.body.time;
      service.price = req.body.price;
      service.save().then(res.json(service));
    })
    .catch(err => console.log(err));
};

// Get One Service
exports.GetOneService = (req, res) => {
  const errors = {};
  Service.findById(req.params.id)
    .then(service => {
      if (!service) {
        errors.service = "No service found";
        return res.status(404).json(errors);
      }
      res.json(service);
    })
    .catch(err => console.log(err));
};

// Get All Company Services
exports.GetAllServices = (req, res) => {
  const errors = {};
  Service.find({ company: req.params.id })
    .then(services => {
      if (services.length == 0) {
        errors.services = "No services found";
        return res.json(errors);
      }
      res.json(services);
    })
    .catch(err => console.log(err));
};

// Delete Service
exports.DeleteService = (req, res) => {
  const errors = {};

  Service.findById(req.params.id)
    .then(service => {
      if (service.company != req.user.id) {
        return res.status(401).json({
          message: "You don't have permission to delete this service"
        });
      }

      if (!service) {
        return res.status(400).json({ error: "service not found!" });
      }
      Service.findOneAndDelete({ id: req.body.id }).then(
        res.status(200).json({ success: "Success" })
      );
    })
    .catch(err => console.log(err));
};

// Update Opening Hours
exports.UpdateHours = (req, res) => {
  const { errors, isValid } = hoursValidation(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(404).json(errors);
  }

  Hours.findOne({ company: req.params.id })
    .then(companyHours => {
      if (companyHours.company != req.user.id) {
        return res.status(401).json({
          message:
            "You don't have permission to update this company's opening hours"
        });
      }

      if (!companyHours) {
        errors.noProfile = "No company hours found";
        return res.status(404).json(errors);
      }

      // Create opening hours object
      const hours = [
        {
          monday: {
            start: req.body.mondayStart,
            end: req.body.mondayEnd,
            closed: req.body.mondayClosed
          },
          tuesday: {
            start: req.body.tuesdayStart,
            end: req.body.tuesdayEnd,
            closed: req.body.tuesdayClosed
          },
          wednesday: {
            start: req.body.wednesdayStart,
            end: req.body.wednesdayEnd,
            closed: req.body.wednesdayClosed
          },
          thursday: {
            start: req.body.thursdayStart,
            end: req.body.thursdayEnd,
            closed: req.body.thursdayClosed
          },
          friday: {
            start: req.body.fridayStart,
            end: req.body.fridayEnd,
            closed: req.body.fridayClosed
          },
          saturday: {
            start: req.body.saturdayStart,
            end: req.body.saturdayEnd,
            closed: req.body.saturdayClosed
          },
          sunday: {
            start: req.body.sundayStart,
            end: req.body.sundayEnd,
            closed: req.body.sundayClosed
          }
        }
      ];
      companyHours.hours = hours;
      companyHours.save().then(res.json(companyHours));
    })
    .catch(err => console.log(err));
};
