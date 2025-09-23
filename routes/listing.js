const express = require("express");
const router =  express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, vaildateListing} = require("../middleware.js"); 
const lisitngControllers = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});



router
.route("/")
.get( wrapAsync(lisitngControllers.index))
.post(
     
     isLoggedIn,
     upload.single('listing[image]'),
     vaildateListing,
     wrapAsync( lisitngControllers.createLisitng)

    );
  //search route
    router.get("/search", 
       wrapAsync(lisitngControllers.searchListing)
    );

    router.get("/filter",
      wrapAsync(lisitngControllers.filterListing)
    );
 //new Route 
 router.get("/new",  
    isLoggedIn,
    lisitngControllers.renderNewForm);


router  
.route("/:id")
.get(
    wrapAsync(lisitngControllers.showLisitng))
 .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    vaildateListing,
    wrapAsync(lisitngControllers.updateListing))
 .delete( 
    isLoggedIn, 
    isOwner,
    wrapAsync(lisitngControllers.destroyListing));



//Edit rout
router.get("/:id/edit", 
    isLoggedIn,
    isOwner,
    wrapAsync(lisitngControllers.editListing));

module.exports = router;
