const Sequelize = require("sequelize");
var mysql = require('mysql');

const sequelize = new Sequelize("heroku_209180811babe94", "b7ad143c3eb2ed", "d9380430", {
    // Datele user-ului
    host: "eu-cdbr-west-02.cleardb.net",
    dialect: "mysql",
    define: {
        timestamps: false, // Ii spunem sistemului sa caute numai randurile dintr-o tabela pe care noi le precizam
    },
    pool: {
        max: 5, // Numarul maxim de incercari de conectare
        min: 0, // Numarul minim de incercari de conectare
        acquire: 30000, // Timpul in milisecunde pentru care sistemul il aloca conectarii la baza de date. Daca acest timp trece, apare o eroare
        idle: 10000, // Timpul maxim, in milisecunde in care conexiunea poate fi inactiva inainte sa fie inchisa
    },
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.products = require("./Products")(sequelize, Sequelize);

module.exports = db;