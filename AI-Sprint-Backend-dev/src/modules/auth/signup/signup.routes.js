const router = require("express").Router();
const validate = require("../../../middleware/validation.middleware");
const controller = require("./signup.controller");
const schema = require("./signup.validation");

router.post("/", validate(schema), controller);

module.exports = router;