const express = require('express');
const shoppingCartRoutes = express.Router();

const pool = require("../connections/pg-connection-pool");

// const shoppingCart = require('./shoppingCart')

function selectAllItems(req, res) {
    pool.query("select * from shoppingcart order by id").then(result => {
      res.send(result.rows);
    });
  }
shoppingCartRoutes.get('/shoppingcart', selectAllItems);
shoppingCartRoutes.post('/shoppingcart', (req, res) => {
    pool
    .query(
      "insert into shoppingcart ( product, price, quantity) values ($1::text, $2::money, $3::int)",
      [
        // req.body.id,
        req.body.product,
        req.body.price,
        req.body.quantity
      ]
    )
    .then(() => {
      selectAllItems(req, res);
    });
});
shoppingCartRoutes.delete('/shoppingcart/:id', (req, res) => {
    pool
    .query("delete from shoppingcart where id=$1::int", [req.params.id])
    .then(() => {
      selectAllItems(req, res);
    });
});
shoppingCartRoutes.put('/shoppingcart/:id', (req, res) => {
    pool
    .query(
      "update shoppingcart set  quantity=$2::int where id=$1::int",
      [
        req.body.id,
        req.body.quantity

      ]
    )
    .then(() => {
      selectAllItems(req, res);
    });
});

module.exports=shoppingCartRoutes