//import DocumentCreator from 'C:/Users/judelin/documents/blockChain/ift3150Projet/build/contracts/DocumentCreator.json';
import DiplomeSignature from 'C:/Users/judelin/documents/blockChain/ift3150Projet/build/contracts/DiplomeSignature.json';
import './index.css';
import Exemp from './Exemp.js';
var web3;

var documentCreator;
var diplomeSignature;
var docum ="";
var doc = $("#fichier");
var chaine="";
var contractAd;
var documentCreato;

/***************************************************************************************/
/* Cette fonction permet de lire un fichier pdf, mais ne permet de lire un fichier pdf scanné
si c'est scanné le fichier va consider comme vide.*/
$(doc).on("change", function(evt){

//https://stackoverflow.com/questions/52054746/read-pdf-file-with-html5-file-api
// code pour convertir un fichier pdf en text sur stackoverflow
var file = evt.target.files[0];

//Read the file using file reader
var fileReader = new FileReader();

fileReader.onload = function () {

//Turn array buffer into typed array
var typedarray = new Uint8Array(this.result);

//calling function to read from pdf file
getText(typedarray).then(function (text) {

/*Selected pdf file content is in the variable text. */
console.log(text);
chaine=text;
//$("#content").html(text);
}, function (reason) //Execute only when there is some error while reading pdf file
{
alert('Seems this file is broken, please upload another file');
console.error(reason);
});


//getText() function definition. This is the pdf reader function.
function getText(typedarray) {

//PDFJS should be able to read this typedarray content

var pdf = PDFJS.getDocument(typedarray);
return pdf.then(function (pdf) {

// get all pages text
var maxPages = pdf.pdfInfo.numPages;
var countPromises = [];
// collecting all page promises
for (var j = 1; j <= maxPages; j++) {
var page = pdf.getPage(j);

var txt = "";
countPromises.push(page.then(function (page) {
// add page promise
var textContent = page.getTextContent();

return textContent.then(function (text) {
// return content promise
return text.items.map(function (s) {
return s.str;
}).join(''); // value page text
});
}));
}

// Wait for all pages and join text
return Promise.all(countPromises).then(function (texts) {
return texts.join('');
});
});
}
};
            //Read the file as ArrayBuffer
fileReader.readAsArrayBuffer(file);

});

/*********************************************************************************************/
/* Cette fonction permet d'initialiser le web3 pour appeler les differents fonctions 
une sorte de pont entre le client et la blockchain*/
function initialiserWeb3(){

   if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try{
    window.ethereum.enable();
  }
  catch(error){

  }
  }
    

  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {// We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);

  } 
    else {
    // We are on the server *OR* the user is not running metamask
    var provider = new Web3.providers.HttpProvider("http://localhost:7545");
    web3 = new Web3(provider);
  }
 //window.ethereum.enable();
}

function initCheck(){
  var provider = new Web3.providers.HttpProvider("http://localhost:7545");
    web3 = new Web3(provider);
}

/*********************************************************************************/
/* cette fonction permet d'initialiser le contrat ou on peut interagir*/
function initialiserContract(documentContrat) {

  var initcontrat = Object.keys(documentContrat.networks)[0];
    contractAd= documentContrat.networks[initcontrat].address;

  var contrat= new web3.eth.Contract(

    documentContrat.abi, 

    documentContrat

      .networks[initcontrat]

      .address

  );
  return contrat;

};



function AppelContract() {

  var initcontrat = Object.keys(documentContrat.networks)[0];
     contractAd= documentCreato.networks[initcontrat].address;

  //return contractAdi;

};
/*******************************************************************************************/
/*Cette fonction est responsable de gerer les gens qui ont deja un compte
metamask et aussi inscrire dans la blockchain ou se trouve le proprietaire.
Chaque organisation peut devenir proprietaire.
*/
function App(){
  var adr_comp=0;
  var motA="";
  var motP="";
  var accounts = [];

Exemp.mySalut("judelin seide");

//alert(accounts.length);
   web3.eth.getAccounts()

  .then(_accounts => {

    accounts = _accounts;
   
   motA=accounts;
   //alert(accounts);

        
    return diplomeSignature.methods

      .getCompt(accounts[0])

      .call().then(result => {
  
    var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Hash</th></tr></thead><tbody>';
    for(var i=0; i<result.length; i++){
    table += "<tr><th scope="+"row"+">"+i+"</th><td>"+result[i]+"</td></tr>";
   }
   table += "</tbody></table>";
   $("#datab").html(table);


   if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    return diplomeSignature.methods

          .getOrgn(accounts[0])

          .call().then(resuli=>{
            $("#idi").html('id:<span id="id"><strong>'+resuli+'</strong></span> ');

          });
        }
        else{}
    
  })



  });
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {



 // $("#ajout").hide();
  $("#entre").click(function(e){
    e.preventDefault();
 var resu=true;

return diplomeSignature.methods

      .entreCompte(accounts[0])

      .call().then(result => {
        //alert(result);
        if(result==false){
           $('#insc').load('inscription.html',function(){});

        }
        else{
        
           $('#insc').load('AjouterDocument.html',function(){});

        
        }
        
    
  });
        //alert(resu);
      });

}
   $("#inscri").click(function(e){
    e.preventDefault();
    var nom_orga = $("#nom_org").val();
     var motpass = $("#motPas").val();
     //alert(nom_orga);
    // alert(motpass);

       //alert(accounts[0]);
       return diplomeSignature.methods

      .verifierInscrip(nom_orga,motpass)

      .call().then(resul => {
        if(resul==true && motpass!="" && nom_orga!=""){
        diplomeSignature.methods
        .ajouterReference(accounts[0],nom_orga,motpass)
        .send({from: accounts[0]})

        .then(result => {
        
          
         $("#dataIn").hide();
          $('#dataIns').load('AjouterDocument.html',function(){});
      })
      } else if(motpass=="" || nom_orga==""){
       // alert("Veuillez remplir ces champs SVP.");
            $("#aler").html('<p class="alert alert-warning">'+
    "Veuillez remplir ces champs SVP!"+
  '</p>');

      }

      else{
       // alert("interdiction de prendre comme mot de passe ou nom organisation");
                $("#aler").html('<p class="alert alert-danger">'+
    "L'un ou les deux est(sont) deja existé(s)!"+
  '</p>')
      }
    });
  });

/******************************************************************************/
  var signa;
  var ref;
   
  var documen
  
 $("#docu").click(function(e){
    e.preventDefault();
    alert(window.adr_comp);

 //  alert(accounts[0]);
     ref=$("#nomOrg").val();
    //documen=doc;


    docum = web3.utils.soliditySha3(chaine);
   


alert(chaine);

// alert(ref);
if(chaine!=""){
  
web3.eth.sign(docum, accounts[0],(err,res) => {
  console.log(res);
  signa=res;

return diplomeSignature.methods.
   verifierHashDoc(docum)
   .call()
   .then(resul=>{
    if(resul==true){
     diplomeSignature.methods

      .ajouterPreuveDocument(docum, signa,accounts[0])

      .send({from: accounts[0],gas:410000})

      .then(result => {

 return diplomeSignature.methods

          .getCompt(accounts[0])

          .call().then(resul=>{
             
               var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Hash</th></tr></thead><tbody>';
             for(var i=0; i<resul.length; i++){
             table += "<tr><th scope="+"row"+">"+i+"</th><td>"+resul[i]+"</td></tr>";
             }
              table += "</tbody></table>";
            $("#datab").html(table);

          })


       // alert("document ajouté");
        //alert(result);
                  $("#aler").html('<p class="alert alert-success">'+
    "Document ajouté!"+
  '</p>')

      });
    }
    else{
            $("#aler").html('<p class="alert alert-danger">'+
    "Document deja existe!"+
  '</p>')
      //alert("documents deja existe");
    }
      });
    

 //$("#ajout").show();

});

}

  });

 $("#orgN").click(function(e){
   e.preventDefault();
 return diplomeSignature.methods

          .getOrgni()

          .call().then(resuli=>{
            //alert(resuli)

            return diplomeSignature.methods

          .getCompt()

          .call().then(resul=>{
        
             
               var table = '<table class="table tabi"> <thead><tr><th scope="col">organisation</th><th scope="col">Document</th></tr></thead><tbody>';
             for(var i=0; i<resul.length; i++){
             table += "<tr><th scope="+"row"+">"+resuli[i]+"</th><td>"+resul[i]+"</td></tr>";
             }
              table += "</tbody></table>";
            $("#dataOrg").html(table);

          })

          });
        });

}

/************************************************************************************************/
/* La fonction  qui permet n'importe qui de verifier si un document existe pas besoin d'avoir un 
compte avec un portefeuille*/
function AppVerifier(){
  $("#org").click(function(e){
   e.preventDefault();

 var dofil = web3.utils.soliditySha3(chaine);

//alert(dofil);
// alert(chaine);
    
   diplomeSignature.methods

      .verifierAutenciteDocument(dofil)

      .call()

      .then(result => {
         if(result==true){
         //alert("document existe");
          $("#aler").html('<p class="alert alert-success">'+
    "Document existe!"+
  '</p>');
       }
       else if(chaine==""){
        $("#aler").html('<p class="alert alert-warning">'+
    "Veuillez remplir ce champs SVP!"+
  '</p>')
       }
       else{
        //alert("document n'existe pas");
        $("#aler").html('<p class="alert alert-danger">'+
    "Document n'existe pas!"+
  '</p>');
       }

      })

  });

};

/***************************************************************************************************/
/* La fonction principale qui permet de faire fonctionner l'application*/
$(document).ready(function() {
  initialiserWeb3();
 
    diplomeSignature=initialiserContract(DiplomeSignature);
  
      App(); 
     //initCheck();
      //diplomeSignature=initialiserContract(DiplomeSignature);
      AppVerifier();

});

