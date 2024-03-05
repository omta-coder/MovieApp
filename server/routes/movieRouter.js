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
router.get("/getallmovie", moviescontrollers.getAllusermovie);
router.patch(
  "/update/:id",
  [userauthenticate, movieupload.single("image")],
  moviescontrollers.updatemovies
);
router.delete("/delete/:id",userauthenticate,moviescontrollers.deleteMovie)

module.exports = router;
