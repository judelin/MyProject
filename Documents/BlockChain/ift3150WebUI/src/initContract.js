
import DocumentCreator from 'C:/Users/judelin/documents/blockChain/ift3150/build/contracts/DocumentCreator.json';

var documentCreator;
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