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

module.exports = router;
