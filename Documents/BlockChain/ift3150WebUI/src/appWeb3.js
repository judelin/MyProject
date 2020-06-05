/*import DocumentCreator from 'C:/Users/judelin/documents/blockChain/ift3150/build/contracts/DocumentCreator.json';
//const AdvancedStorage = require("../build/contracts/AdvancedStorage.json");
var web3;

var documentCreator;

function initialiserWeb3(){

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  var provider = new Web3.providers.HttpProvider("http://localhost:7545");
  web3 = new Web3(provider);
}
 
}

function initialiserContract() {

  var initcontrat = Object.keys(DocumentCreator.networks)[0];//je dois verifier pourquoi netWorks[0] qui peut m'aider avec l'authentification

  var contrat= new web3.eth.Contract(

    DocumentCreator.abi, 

    DocumentCreator

      .networks[initcontrat]

      .address

  );
  return contrat;

};


function getMeta(){

  //var addData = ('#addData');

  //const $addr = document.getElementById('addr');
//const $refe = document.getElementById('refe');
//var $ref = ('#ref');

  var accounts = [];

  web3.eth.getAccounts()

  .then(_accounts => {

    accounts = _accounts;

   

  })

}

  function ajoutCompte( addr,refe,ref){

 
    documentCreator.methods

      .ajouterCompte(addr,refe)

      .send({from: accounts[0]})

      .then(result => {

        return documentCreator.methods

          .getCompte(1)

          .call();

      })

      .then(result => {

        $(ref).html(addr); //result.join(', ');
         //if(addr==accounts)
        // $(addData).hide();
       // $(ref).load('AjouterDocument.html',function(){});

      });
     

  
  //3 bouttons: verifier, ajouterCompte et ajouterPreuve


}
*/

