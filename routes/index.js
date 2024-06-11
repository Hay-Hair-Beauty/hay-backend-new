const authRoutes = require("./authRoutes");
const articleRoutes = require("./articleRoutes");

require("dotenv").config();

module.exports = (app) => {
  app.use("/auth", authRoutes);
  app.use("/news", articleRoutes);
};
