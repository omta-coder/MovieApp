const express = require("express");
const router = new express.Router();
const userauthenticate = require("../middleware/userauthenticate");
const movieupload = require("../multerConfig/movieStorageConfig");
const moviescontrollers = require("../controllers/movieControllers");

//movies routes
router.post(
  "/create",
  [userauthenticate, movieupload.single("image")],
  moviescontrollers.createmovie
);
router.get("/getallmovie",moviescontrollers.getAllusermovie);

module.exports = router;
