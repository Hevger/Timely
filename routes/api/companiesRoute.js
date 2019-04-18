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

// Get one company
router.get("/:id", companyController.GetOneCompany);

// Register comapny
router.post("/", companyController.RegisterCompany);

module.exports = router;
