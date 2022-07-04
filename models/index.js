const databaseConfig = require("../config/database.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = databaseConfig.url;

db.user = require("./user")(mongoose);
db.portfolio = require("./portfolio")(mongoose);
db.cryptoAsset = require("./cryptoAsset")(mongoose);

module.exports = db;
