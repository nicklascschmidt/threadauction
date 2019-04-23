const router = require("express").Router();
const auctionController = require("../../controllers/auctionController");

// Matches with "/api/auctions________"

router.route("/all")
  .get(auctionController.findAllAuctions);

router.route("/:auctionId")
  .get(auctionController.findOneAuction);

router.route("/user/:userId")
  .get(auctionController.findUserAuctions);

router.route("/create")
  .post(auctionController.create);

  

// router.route("/find")
//   .get(auctionController.findOne);

// router.route("/delete/:id")
//   .delete(auctionController.remove);

// router.route("/update-watched/:id")
//   .put(auctionController.updateWatched);
  
// router.route("/update-rating/:id")
//   .put(auctionController.updateRating);

module.exports = router;
