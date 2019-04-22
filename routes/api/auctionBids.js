const router = require("express").Router();
const auctionBidController = require("../../controllers/auctionBidController");

// Matches with "/api/auctionBids________"

// router.route("/")
//   .get(auctionBidController.findAll);

router.route("/:userId")
  .get(auctionBidController.findAllWithUserId);

// router.route("/add")
//   .post(auctionBidController.create);

// router.route("/find")
//   .get(auctionBidController.findOne);

// router.route("/delete/:id")
//   .delete(auctionBidController.remove);

// router.route("/update-watched/:id")
//   .put(auctionBidController.updateWatched);
  
// router.route("/update-rating/:id")
//   .put(auctionBidController.updateRating);

module.exports = router;
