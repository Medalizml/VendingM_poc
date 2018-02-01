/**
 * Created by mazammel on 28/04/2017.
 */
var contractInstance = require('../util/contractInstance')
var config = require('../util/config');
var web3 = config.web3;
var defaultAccount = config.defaultAccount;
var dirnamePath = '../contracts/VendingM.sol';
var name = ':VendingM';


var VendingM = function (address) {
    var vendingMInstance = contractInstance.getContractInstance(address, dirnamePath, name)
    this.getContract= function () {
        return vendingMInstance;
    },
        this.productIndex= function () {
            return vendingMInstance.productIndex()
        },

        this.getProduct = function (id) {
            return vendingMInstance.getProduct.call(id);
        },

        this.addProduct = function (quantity,place,name,price,description, callback) {
            vendingMInstance.addProduct.sendTransaction(quantity,place,name,price,description, {from: defaultAccount,gas:4000000}, function (err, log) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("start pending")
                    var filterLatest = web3.eth.filter('latest')
                    filterLatest.watch(function (error, result) {
                        if (!error) {
                            console.log(log, 'mining')
                            if (web3.eth.getTransactionReceipt(log) !== null) {
                                callback(log);
                                filterLatest.stopWatching();
                            }

                        } else {
                            console.log(error)
                        }
                    })
                }
            })
        },
        this.buyProduct = function (id, callback) {
            vendingMInstance.buyProduct.sendTransaction(id, {from: defaultAccount}, function (err, log) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("start pending")
                    var filterLatest = web3.eth.filter('latest')
                    filterLatest.watch(function (error, result) {
                        if (!error) {
                            console.log(log, 'mining')
                            if (web3.eth.getTransactionReceipt(log) !== null) {
                                callback(log);
                                filterLatest.stopWatching();
                            }

                        } else {
                            console.log(error)
                        }
                    })
                }

            })
        },

        this.QuantityZeroEvent = function (callback) {
            vendingMInstance.QuantityZero().watch(function (err, res) {
                console.log('enter event watch')
                if (!err) {

                    callback(res)
                }
            })
        },
        this.BuyProductEvent = function (callback) {
            vendingMInstance.BuyProduct().watch(function (err, res) {
                console.log('enter event watch')
                if (!err) {

                    callback(res)
                }
            })
        }

}

//var vendingMInstance = getContractInstance();

module.exports = {
    deployContract: function (callback) {
        var compliedContract = contractInstance.getAbiContract(dirnamePath, name);
        var abi = compliedContract.abi;
        var code = compliedContract.code;
        web3.eth.contract(abi).new({
            data: code,
            from: defaultAccount,
            gas: 4000000
        }, function (err, contract) {
            if (err) {
                console.error(err);
                return;
            } else if (contract.address) {
                console.log(contract.address)
                callback(contract.address)
                return contract.address;

            }

        })

    },
    VendingM : VendingM

}