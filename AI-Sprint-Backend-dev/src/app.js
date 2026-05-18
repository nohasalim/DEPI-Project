require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./modules/auth/auth.routes");
const protectedRoutes = require('./routes/protected.routes');
const verfiyToken = require("./utils/verfiyToken");

require("./config/passport");

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/api/v1", verfiyToken, protectedRoutes);


module.exports = app;