const router = require("express").Router();
const auctionRoutes = require("./auctions");
const userRoutes = require("./users");

// Routes
router.use("/auctions", auctionRoutes);
router.use("/users", userRoutes);

module.exports = router;
