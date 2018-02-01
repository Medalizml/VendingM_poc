/**
 * Created by mazammel on 24/03/2017.
 */
var MyToken = require('../contractCtrl/MyToken')

module.exports = {
    deployContractToken: function (req, res) {
        console.log("enter Mytoken")
        MyToken.deployContract(10000,"USD",0,"USD",function (address) {
            res.json(address)
        })
    },
    balanceOf: function (req, res) {
        console.log("enter recup Contract")
        var myToken = new MyToken.MyToken("0x9cd723a227eca7ca12de1d15723c7a84ed2d1614")
        res.json(myToken.getAllBalance(req.body.address))
    },
    transfer: function (req, res) {
        var myToken = new MyToken.MyToken("0x9cd723a227eca7ca12de1d15723c7a84ed2d1614")
        myToken.transfer(req.body.address,req.body.price,function (log) {
            res.json(log)

        })
    },
    approve : function (req,res) {
        var myToken = new MyToken.MyToken("0x9cd723a227eca7ca12de1d15723c7a84ed2d1614")
        myToken.approve('0xb1eac2ebc2da44080b830bae81774288d41bc7d1',10000,function (log) {
            res.json(log);
        })
    },

    transferEvent: function (req,res) {
        console.log("enter test event")
        var myToken = new MyToken.MyToken("0x9cd723a227eca7ca12de1d15723c7a84ed2d1614")
        myToken.watchTransferEvent(function (res) {
            console.log(res)
        })
    }
}