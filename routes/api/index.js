const router = require("express").Router();
const auctionBidRoutes = require("./auctionBids");
const auctionRoutes = require("./auctions");
const userRoutes = require("./users");

// Routes
router.use("/auctionBids", auctionBidRoutes);
router.use("/auctions", auctionRoutes);
router.use("/users", userRoutes);

module.exports = router;
