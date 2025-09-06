const express = require("express");
const router =  express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const{isLoggedIn, vaildateReview, isReviewAuthor} = require("../middleware.js");
const reviewControllers = require("../controllers/review.js");




// post rout
router.post("/", 
    isLoggedIn,
    vaildateReview,
     wrapAsync(reviewControllers.createReview));

//delete review
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
     wrapAsync( reviewControllers.destroyReview));

module.exports = router;