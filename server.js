const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

if (process.env.NODE_ENV === undefined) {

  // eslint-disable-next-line global-require
  require('dotenv').config();
}
const { NODE_ENV } = process.env;

app.use(cors());

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Crypto API." });
});

require("./routes/user.routes")(app);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


