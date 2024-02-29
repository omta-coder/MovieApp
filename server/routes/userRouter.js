const express = require("express");
const router = new express.Router();
const userAuthController = require("../controllers/userControllers");

//user auth router
router.post("/register",userAuthController.register);
router.post("/login",userAuthController.login);

module.exports = router;