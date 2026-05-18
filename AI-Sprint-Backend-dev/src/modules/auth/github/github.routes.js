const router = require("express").Router();
const passport = require("passport");
const controller = require("./github.controller");

router.get(
    "/",
    passport.authenticate("github", {
        scope: ["user:email"],
    })
);

router.get(
    "/callback",
    passport.authenticate("github", { session: false }),
    controller
);

module.exports = router;