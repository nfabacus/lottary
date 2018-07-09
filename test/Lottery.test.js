require('events').EventEmitter.defaultMaxListeners = 100;
const assert = require('assert'); //built-in assertion library in node
const ganache = require('ganache-cli'); // to connect to a ganache test network.
const Web3 = require('web3');  //constructor function of Web3, not its instance
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let lottey;
let accounts;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  lottery = await new web3.eth.Contract(JSON.parse(interface))  // tells web3 about the interface(methods) of the contract
  .deploy({ data: bytecode }) //passes bytecode for deploying a new copy of this contract, also passes any initial variables required here.  In this case, no intial variable.
  .send({ from: accounts[0], gas: '1000000'});  //sends the transation that creates this contract - 'from' specifies the account from which we want to deploy the contract. set gas price

  lottery.setProvider(provider);
});

describe('Lottery', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address); //assert if lottery's instance address exists
  });


});