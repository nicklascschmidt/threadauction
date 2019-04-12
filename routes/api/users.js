const router = require("express").Router();
const userController = require('../../controllers/userController');

// Matches with "/api/users________"

router.route("/login")
  .get(userController.findUser);

router.route("/signup")
  .post(userController.create);

router.route("/profile")
  .get(userController.findProfile);

module.exports = router;
