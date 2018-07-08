require('events').EventEmitter.defaultMaxListeners = 100;
const assert = require('assert'); //built-in assertion library in node
const ganache = require('ganache-cli'); // to connect to a ganache test network.
const Web3 = require('web3');  //constructor function of Web3, not its instance
const provider = ganache.provider();
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const defaultMessage = "Hello, World!"

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  
  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))  // tells web2 about the interface(methods) of the contract
    .deploy({ data: bytecode, arguments: [defaultMessage] }) //passes bytecode for deploying a new copy of this contract, also passes initialMessage
    .send({ from: accounts[0], gas: '1000000'});  //sends the transation that creates this contract - 'from' specifies the account from which we want to deploy the contract. set gas price

  inbox.setProvider(provider);
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address); //assert if inbox's instance address exists
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call(); 
    assert.equal(message, defaultMessage);
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('Bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Bye');
  });
});