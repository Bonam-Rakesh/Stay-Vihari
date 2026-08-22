const express = require("express");

const router = express.Router();

const listingController = require("../controllers/listings");


router.get("/", listingController.index);


router.get("/search", listingController.search);


router.get(
    "/category/:category",
    listingController.category
);


router.get("/:id", listingController.show);


module.exports = router;