const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();

// Fetch posts from API
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// Settins
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routs
app.get("/", (req, res) => {
  res.render("overview", { data: dataObj });
});

app.get("/products/:prodID", (req, res) => {
  const idUrl = _.lowerCase(req.params.prodID);

  dataObj.forEach((item) => {
    const id = _.lowerCase(item.id);

    if (idUrl === id) {
      res.render("product", {
        productName: item.productName,
        from: item.from,
        nutrients: item.nutrients,
        quantity: item.quantity,
        price: item.price,
        organic: item.organic,
        description: item.description,
        image: item.image
      });
    }
  });
});

// Startiring Sever
app.listen(app.get("port"), () =>
  console.log(`Port is Running on port: ${app.get("port")}`)
);
