const router = require("express").Router();
const verfiyToken = require("../../../utils/verfiyToken");
const UserController = require("./UserData.controller");

router.get("/", verfiyToken, UserController.UserData);

module.exports = router;