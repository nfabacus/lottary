# Simple Smart Contract with Solidity

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

  Flow of communication:
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

7. Deploying to Rinkeby Network for test
  Flow of communication:
  API - web3 instance with Rinkeby network provider - connects via Infura's API to Infura's Node in Rinkeby Network.



