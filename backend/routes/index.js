var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var tokenTest = require('../test/testContract')
var vendingMTest = require('../test/vendingtest')
var productService = require('../business/ProductService')
/**
 * Begin test Token Section
 */

router.get('/MyTokendeployTest', function (req, res) {
    tokenTest.deployContractToken(req, res);
})
router.post('/recupBalanceOfTest', function (req, res) {
    tokenTest.balanceOf(req, res);
})
router.post('/TokenTransferTest', function (req, res) {
    tokenTest.transfer(req, res);

})
router.get('/TokenEventTest', function (req, res) {
    tokenTest.transferEvent(req, res);

})
//End test


/**
 * Begin test vendingM Section
 */

router.get('/deployVendingM',function (req,res) {
    vendingMTest.deployContractToken(req,res)
})
router.post('/addProductTest',function (req,res) {
    vendingMTest.addProduct(req,res)
})
router.post('/getProductIndexTest',function (req,res) {
    vendingMTest.getProductIndex(req,res)
})
router.post('/getProductTest',function (req,res) {
    vendingMTest.getProduct(req,res)
})
router.post('/buyProductTest',function (req,res) {
    vendingMTest.buyProduct(req,res)
})
router.post('/BuyProductEventTest',function (req,res) {
    vendingMTest.BuyProductEvent(req,res)
})
router.post('/QuantityZeroEventTest',function (req,res) {
    vendingMTest.QuantityZeroEvent(req,res)
})
//End VendingM test Section


router.get('/getallproducts',function (req,res) {
    productService.getAllproducts(req,res)
})
router.post('/buyProduct',function (req,res) {
    productService.buyProduct(req,res)
})
router.get('/recupBalance',function (req,res) {
    productService.recupBalance(req,res)
})


module.exports = router;
