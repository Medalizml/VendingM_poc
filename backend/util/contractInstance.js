/**
 * Created by mazammel on 24/03/2017.
 */
var fs = require('fs');
var path = require('path');
var config = require('../util/config.js');
var solc = require('solc');

var web3 = config.web3;
function compileContract(dirname, name, importedContract, importedConractName) {
    if (importedContract !== undefined && importedConractName !== undefined) {
        var input = name.substring(1, name.length) + '.sol';
        var inputImport = importedConractName.substring(1, importedConractName.length) + '.sol';
        var source = {};
        source[input] = fs.readFileSync(path.join(__dirname, dirname), 'utf8');
        source[inputImport] = fs.readFileSync(path.join(__dirname, importedContract), 'utf8')
        console.log("compiling contract with imports" + name);
        var output = solc.compile({sources: source}, 1);
        var code = "0x" + output.contracts[input + name].bytecode;
        var abi = JSON.parse(output.contracts[input + name].interface);
        console.log("contract Compiled")
        return {abi: abi, code: code};
    }
    else {
        source = fs.readFileSync(path.join(__dirname, dirname), 'utf8');
        console.log("compiling contract" + name);
        var output = solc.compile(source, 1);
        var code = "0x" + output.contracts[name].bytecode;
        var abi = JSON.parse(output.contracts[name].interface);
        console.log("contract Compiled")
        return {abi: abi, code: code};
    }
}


module.exports = {
    getContractInstance: function (address, dirname, name, importedContract, importedConractName) {
        if (importedContract !== undefined && importedConractName !== undefined) {
            var compiledContract = compileContract(dirname, name, importedContract, importedConractName)
            var abi = compiledContract.abi;
            var contract = web3.eth.contract(abi).at(address);
            return contract;
        }
        else {
            var compiledContract = compileContract(dirname, name)
            var abi = compiledContract.abi;
            var contract = web3.eth.contract(abi).at(address);
            return contract;
        }
    },
    getAbiContract: compileContract,

}