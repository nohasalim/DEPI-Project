const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const User = require("../models/user.model");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,

            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK,
        },
        async (_, __, profile, done) => {

            try {
                const email = profile.emails?.[0]?.value;

                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
                        username: profile.displayName,
                        email,
                        provider: "google",
                        providerId: profile.id,
                        avatar: profile.photos?.[0]?.value,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);
passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK,
            scope: ["user:email"],

        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) {
                    return done(
                        new Error("GitHub account has no public email"),
                        null
                    );
                }

                let user = await User.findOne({ email });

                if (!user) {
                    user = await User.create({
                        username: profile.username,
                        email,
                        provider: "github",
                        providerId: profile.id,
                        avatar: profile.photos?.[0]?.value,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);