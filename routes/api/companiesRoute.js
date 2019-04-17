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

// Register comapny
router.post("/", companyController.RegisterCompany);

module.exports = router;
