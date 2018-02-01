/**
 * Created by mazammel on 24/03/2017.
 */
var addresses = require('../util/contract_addresses.json')
var contractInstance = require('../util/contractInstance')
var config = require('../util/config');
var web3 = config.web3;
var defaultAccount = config.defaultAccount;
var dirnamePath = '../contracts/MyToken.sol';
var name = ':MyToken';


var MyToken = function (address) {
    var myTokenInstance = contractInstance.getContractInstance(address, dirnamePath, name)
    this.getContract = function () {
        return myTokenInstance;
    },
        this.getInitialSuply = function () {
            return myTokenInstance.totalSupply()
        },
        this.getTokenName = function () {
            return myTokenInstance.name();
        },
        this.getDecimalUnits = function () {
            return myTokenInstance.decimals();
        },
        this.getTokenSymbol = function () {
            return myTokenInstance.symbol();
        },
        this.getAllBalance = function (account) {
            return myTokenInstance.balanceOf.call(account);
        },
        this.geAllowance = function () {
            return myTokenInstance.alowance();
        },
        this.transfer = function (to, value, callback) {
            myTokenInstance.transfer.sendTransaction(to, value, {
                from: '0x007ccffb7916f37f7aeef05e8096ecfbe55afc2f',
                gas: 4000000
            }, function (err, log) {
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
        this.approve = function (spender, value, callback) {
            myTokenInstance.approve.sendTransaction(spender, value, {from: defaultAccount}, function (err, log) {
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
        this.approveAndCall = function (spender, value, extradata, callback) {
            myTokenInstance.approveAndCall.sendTransaction(spender, value, extradata, {from: defaultAccount}, function (err, log) {
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
        this.transferFrom = function (from, to, value, callback) {
            myTokenInstance.approveAndCall.sendTransaction(from, to, value, {from: defaultAccount}, function (err, log) {
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
        this.watchTransferEvent = function (callback) {
            myTokenInstance.Transfer().watch(function (err, res) {
                console.log('enter event wach')
                if (!err) {

                    callback(res)
                }
            })
        }


}

//var MytokenInstance = getContractInstance();

module.exports = {
    deployContract: function (InitialSupply, nameToken, decimal, symbol, callback) {
        var compliedContract = contractInstance.getAbiContract(dirnamePath, name);
        var abi = compliedContract.abi;
        var code = compliedContract.code;
        web3.eth.contract(abi).new(InitialSupply, nameToken, decimal, symbol, {
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
    MyToken: MyToken

}