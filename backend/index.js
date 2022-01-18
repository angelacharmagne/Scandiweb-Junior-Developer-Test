var express = require('express');
const Sequelize = require("sequelize");
var morgan = require("morgan");
const cors = require("cors");
var db = require('./database');
const e = require('express');
const Products = db.products;

db.sequelize.sync();
var app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.get("/", async (req, res) => {
    let products_list = [];

    await Products.findAll()
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                let product = {};
                product.sku = data[i].sku;
                product.name = data[i].name;
                product.price = data[i].price;
                product.productType = data[i].productType;
                product.size = data[i].size;
                product.weight = data[i].weight;
                product.width = data[i].width;
                product.height = data[i].height;
                product.p_length = data[i].p_length;
                console.log(product);

                products_list.push(product);
            }

        })
        .catch((err) => console.log(err))
    res.json(products_list);
});

app.post("/add-product", async (req, res) => {
    const add = {
        sku: req.body.sku,
        name: req.body.name,
        price: req.body.price,
        productType: req.body.productType,
    };
    if (req.body.productType === 'DVD') {
        add.size = req.body.size;
        add.height = null;
        add.width = null;
        add.p_length = null;
        add.weight = null;
    } else if (req.body.productType === 'Book') {
        add.weight = req.body.weight;
        add.size = null;
        add.height = null;
        add.width = null;
        add.p_length = null;
    } else if (req.body.productType === 'Furniture') {
        add.height = req.body.height;
        add.width = req.body.width;
        add.p_length = req.body.p_length;
        add.size = null;
        add.weight = null;
    }


    Products.create(add)
        .then(() => {
            res.send('Adaugat cu succes!');
        })
        .catch((err) => {
            res.send(err)
        });
});

app.delete("/delete-product/:sku", (req, res) => {
    const sku = req.params.sku;

    for (let i = 0; i < sku.length; i++) {
        Products.destroy({
            where: { sku: sku },
        })
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Successfully deleted",
                    });
                } else {
                    res.send({
                        message: "Unuccessfully deleted",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

});


