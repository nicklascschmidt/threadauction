const router = require("express").Router();
const auctionController = require("../../controllers/auctionController");

// Matches with "/api/auctions________"

router.route("/")
  .get(auctionController.findAll);

router.route("/:auctionId")
  .get(auctionController.findOneAuction);

router.route("/create")
  .post(auctionController.create);

  
  

router.route("/find")
  .get(auctionController.findOne);

router.route("/delete/:id")
  .delete(auctionController.remove);

router.route("/update-watched/:id")
  .put(auctionController.updateWatched);
  
router.route("/update-rating/:id")
  .put(auctionController.updateRating);

module.exports = router;
