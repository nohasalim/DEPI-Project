const router = require("express").Router();
const passport = require("passport");
const controller = require("./google.controller");

router.get(
    "/",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/callback",
    passport.authenticate("google", { session: false }),
    controller
);

module.exports = router;