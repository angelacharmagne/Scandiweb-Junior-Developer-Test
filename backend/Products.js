const Sequelize = require("sequelize");

// Ce atribute vreau sa afisez din tabela de proiecte, si in ce ordine
module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("product", {
        sku: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.INTEGER,
        },
        productType: {
            type: Sequelize.STRING,
        },
        size: {
            type: Sequelize.STRING,
        },
        weight: {
            type: Sequelize.STRING,
        },
        width: {
            type: Sequelize.STRING,
        },
        height: {
            type: Sequelize.STRING,
        },
        p_length: {
            type: Sequelize.STRING,
        },
    });
    return Products;
};