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

  it('allows one account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    assert.equal(accounts[0], players[0]); //assert.equal - put the value should be first.
    assert.equal(1, players.length);
  });

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });
    assert.equal(accounts[0], players[0]); //assert.equal - put the value should be first.
    assert.equal(accounts[1], players[1]); 
    assert.equal(accounts[2], players[2]); 
    assert.equal(3, players.length);
  });

  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 200 //wei
      });
      assert(false); //make the test fail if no error
    } catch (err) {
      assert.ok(err); //if error, pass the test
    }
  });

  it('only manager can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('sends money to the winner and reset the players array', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinner().send({ from: accounts[0] });

    const finalBalance = await web3.eth.getBalance(accounts[0]);

    const difference = finalBalance - initialBalance;
    assert(difference> web3.utils.toWei('1.8', 'ether'));

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(0, players.length);
  });
});