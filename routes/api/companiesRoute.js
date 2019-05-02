const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Controller
const companyController = require("../../controller/companyController");

// Test route
router.get("/test", (req, res) =>
  res.json({ message: "Testing the company routes" })
);
// Get all companies
router.get("/", companyController.GetAll);

// Login
router.post("/login", companyController.Login);

// Get one company
router.get("/:id", companyController.GetOneCompany);

// Update company
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  companyController.UpdateCompany
);

// Register company
router.post("/", companyController.RegisterCompany);

// Delete comapny & profile
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  companyController.DeleteCompany
);

// Get All Company Employee
router.get("/:id/employee", companyController.GetAllEmployee);

// Add new Employee
router.post(
  "/:id/employee",
  passport.authenticate("jwt", { session: false }),
  companyController.AddEmployee
);

// Delete employee
router.delete(
  "/employee/:id",
  passport.authenticate("jwt", { session: false }),
  companyController.DeleteEmployee
);

// Get One Employee
router.get("/employee/:id", companyController.GetOneEmployee);

// Update Employee
router.post(
  "/employee/:id",
  passport.authenticate("jwt", { session: false }),
  companyController.UpdateEmployee
);

// Get All Services From Company
router.get("/:id/service", companyController.GetAllServices);

// Get One Service
router.get("/service/:id", companyController.GetOneService);

// Add new Service
router.post(
  "/:id/service",
  passport.authenticate("jwt", { session: false }),
  companyController.AddService
);

// Update Service
router.post(
  "/service/:id",
  passport.authenticate("jwt", { session: false }),
  companyController.UpdateService
);

// Delete employee
router.delete(
  "/service/:id",
  passport.authenticate("jwt", { session: false }),
  companyController.DeleteService
);

// Update Opening Hours
router.post(
  "/:id/hours",
  passport.authenticate("jwt", { session: false }),
  companyController.UpdateHours
);

module.exports = router;
