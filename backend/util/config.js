/**
 * Created by sellami on 15/06/16.
 */
var web3 = require('web3_ipc');
var options = {
    ipc: false,
    personal: true,
    admin: true,
    debug: false
};
var web3 = web3.create(options);
web3.setProvider(new web3.providers.HttpProvider("http://10.4.1.54:8545/"));

module.exports = {
    'web3': web3,
    'defaultAccount': web3.eth.coinbase
};
