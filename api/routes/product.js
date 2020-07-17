const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const productsController = require('../controllers/product');

router.get("/", productsController.get_all);

router.get("/:productId");

router.post("/");

router.patch("/:productId");

router.delete("/:productId");

module.exports = router;