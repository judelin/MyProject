
//import Web3 from 'https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js';

var web3;
function initialiserWeb3(){
	var provider = new Web3.providers.HttpProvider("http://localhost:7545");
    web3 = new Web3(provider);
 
}

function initialiserContract(documentContrat,id) {
 //const web3 = new Web3("http://localhost:7545");
initialiserWeb3();
  var initcontrat = Object.keys(documentContrat.networks)[id];
  var contrat=new web3.eth.Contract(

    documentContrat.abi, 

    documentContrat

      .networks[initcontrat]

      .address
  );
  return contrat;

};
exports.myContract = function (MyContract,id) {
  return initialiserContract(MyContract,id);
};
//initialiserContract(MyContract);