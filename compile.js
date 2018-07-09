const path = require('path');  //for cross platform compatibility
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol'); //__dirname is set to current working directory  This will make sure it will work on both windows and unix-based systems.

const source = fs.readFileSync(lotteryPath, 'utf8');  //specifies to usee utf8 encoding for the file.  We will read the solidity code from the file system as it is not javascript (node will not understand it.)

module.exports = solc.compile(source, 1).contracts[':Lottery'];
