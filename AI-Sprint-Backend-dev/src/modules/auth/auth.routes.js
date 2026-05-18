
const router = require("express").Router();


router.use("/signup", require("./signup/signup.routes"));
router.use("/signin", require("./signin/signin.routes"));
router.use("/google", require("./google/google.routes"));
router.use("/github", require("./github/github.routes"));

router.use("/valid-token", require("./UserData/UserData.routes"));

module.exports = router;