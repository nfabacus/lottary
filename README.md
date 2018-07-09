# Simple Smart Contract with Solidity 2: Lottery Dapp

1. Create a basic contract using Remix
  http://remix.ethereum.org
2. Copy the solidity code into your new project (repository). e.g. inbox.sol
3. Install the solidity compiler
solc - this is the solidity compiler.
```
npm intall solc
```
4. Create compile.js file - import your solidity code via fileSystem, compile it into javascript, and export.
   It will compile the solidity code into Bytecode and ABI.
   - <b>Bytecode</b> is to deploy a contract instance in a network.
   - <b>ABI</b> is for user interface to interact via Web3 with the contract instance in a network.
    
  Flow of communication:<br>
  API - web3 instance with network provider - connects to a network.

5. Testing setup
  ```
  npm install --save mocha ganache-cli web3@1.0.0-beta.26
  ````
  Make sure to change "scripts" to run "mocha" with "test" keyword in package.json.
  
  ```
   - mocha - testing framework
   - Ganache (TestRPC) - Local test network to deploy a contract instance.
     Ganache Local test network comes with some unloced accounts e.g. 0x941...
  ```

6. Write tests for the contract
  - Create a folder called 'test' where all the tests are placed.
  - Write tests

7. Deploying to Rinkeby Network for test<br>
  Flow of communication this time:<br>
  API - web3 instance with Rinkeby network provider - connects via Infura's API to Infura's Node in Rinkeby Network.
  - Signup at Infura.io
  - install truffle-hdwallet-provider (Provider)
  ```
  npm install --save truffle-hdwallet-provider@0.0.3
  ```
  - Create a file called deploy.js in the root:
  - Wire up web3 with provider to a Rinkeby network (make sure to console.log the account created, so we can see)
  - To deploy, ```node deploy.js```
  - Check the address of the contract and go to https://rinkeby.etherscan.io. You can see if the contract is deployed by searching for the address.
  - To interact with the contract in the test network:
    Go to http://remix.ethereum.org:
    Click run tab.
    copy and paste the contract in Remix (if it is not there already), 
    select 'Injected Web3' under Environment.
    check the Account is yours in your Metamask.
    Paste in the newly deployed contract address into 'at Address' (instead of 'Create'), then click.
    It will display the deployed instance of the contract.
    Now you can interact with the contract.












