const router = require("express").Router();
const auctionBidController = require("../../controllers/auctionBidController");

// Matches with "/api/auctionBids________"

router.route("/:userId")
  .get(auctionBidController.findAllWithUserId);

router.route("/highestBid/:auctionId")
  .get(auctionBidController.findMaxWithAuctionId);

router.route("/create")
  .post(auctionBidController.createBid);
  
module.exports = router;
