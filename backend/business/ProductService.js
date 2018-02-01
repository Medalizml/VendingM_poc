/**
 * Created by mazammel on 03/05/2017.
 */
/**
 * Created by mazammel on 24/03/2017.
 */
var VendingM = require('../contractCtrl/VendingM')
var MyToken = require('../contractCtrl/MyToken')
var vendingMAddress = "0x8bbcd74130430f35f94e83eb6c65a3a384c0f5d4"
var tokenAddess = '0x9cd723a227eca7ca12de1d15723c7a84ed2d1614'
var buyer = '0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f'
module.exports = {
    getAllproducts: function (req, res) {
        console.log("enter vendingM")
        var vendingM = new VendingM.VendingM(vendingMAddress)
        var index = vendingM.productIndex()
        var Products = []
        for (var i = 0; i < index; i++) {
            var product = vendingM.getProduct(i)
            Products.push({
                "id": i,
                "quantity": product[0],
                "place": product[1],
                "name": product[2],
                "price": product[3],
                "description": product[4]
            })
            if (Products.length == index) {
                res.json(Products)
            }
        }


    },
    buyProduct: function (req, res) {
        console.log('buy product')
        var vendingM = new VendingM.VendingM(req.body.address)
        var myToken = new MyToken.MyToken(tokenAddess)
        var product = vendingM.getProduct(req.body.id)
        vendingM.buyProduct(req.body.id, function (log) {

        })
        if (product[0] == 0) {
            res.json({'quantity': product[0]})
        } else {
            myToken.transfer(req.body.address, product[3], function (log) {

                res.json(log)

            })
        }
    },
    recupBalance: function (req, res) {
        console.log("enter recup Contract")
        var myToken = new MyToken.MyToken(tokenAddess)
        res.json(myToken.getAllBalance(buyer))
    }

}