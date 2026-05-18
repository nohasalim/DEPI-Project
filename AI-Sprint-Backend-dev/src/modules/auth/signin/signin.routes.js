const router = require("express").Router();
const validate = require("../../../middleware/validation.middleware");
const SignInController = require("./signin.controller");
const schema = require("./signin.validation");

router.post("/", validate(schema), SignInController.SignIn);

module.exports = router;