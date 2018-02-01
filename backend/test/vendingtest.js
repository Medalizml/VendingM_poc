/**
 * Created by mazammel on 24/03/2017.
 */
var VendingM = require('../contractCtrl/VendingM')

module.exports = {
    deployContractToken: function (req, res) {
        console.log("enter vendingM")
        VendingM.deployContract(function (address) {
            res.json(address)
        })
    },
    getProductIndex: function (req, res) {
        console.log("enter recup Contract")
        var vendingM = new VendingM.VendingM(req.body.address)
        res.json(vendingM.productIndex())
    },
    getProduct: function (req, res) {
        var vendingM = new VendingM.VendingM(req.body.address)
        res.json(vendingM.getProduct(req.body.id));

    },
    addProduct : function (req,res) {
        var vendingM = new VendingM.VendingM(req.body.address)
        vendingM.addProduct(req.body.quantity,req.body.place,req.body.name,req.body.price,req.body.description,function (log) {
            res.json(log)
        })
    },
    buyProduct : function (req,res) {
        var vendingM = new VendingM.VendingM(req.body.address)
        vendingM.buyProduct(req.body.id,function (log) {
            res.json(log)
        })
    },
    QuantityZeroEvent: function (req,res) {
        console.log("enter test event")
        var vendingM = new VendingM.VendingM(req.body.address)
        vendingM.QuantityZeroEvent(function (res) {
            console.log(res)
        })
    },
    BuyProductEvent: function (req,res) {
        console.log("enter test event")
        var vendingM = new VendingM.VendingM(req.body.address)
        vendingM.BuyProductEvent(function (res) {
            console.log(res)
        })
    },
}