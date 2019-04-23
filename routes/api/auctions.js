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

// Unused as of now
router.route("/completed")
  .get(auctionController.findAllCompletedAuctions);


module.exports = router;
