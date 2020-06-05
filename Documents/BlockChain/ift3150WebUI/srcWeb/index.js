import AutoriteOrganisatio from 'C:/Users/judelin/Desktop/ProjetVersion4/build/contracts/AutoriteOrganisatio';
import Organisation from 'C:/Users/judelin/Desktop/ProjetVersion4/build/contracts/Organisation';



import './index.css';
//import Exemp from './Exemp.js';
//import appCall from './appCall.js';

//var iniContract=require('./iniContract.js');
//import appWeb from './appWeb.js';

var web3;
var contract;
var contract_org;
var docum ="";
var doc = $("#fichier");
var chaine="";
var contractAd;


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




function initWeb3(){

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
  //}
 //window.ethereum.enable();
}
}

function initialiserContract(documentContrat,id) {
 //const web3 = new Web3("http://localhost:7545");

  var initcontrat = Object.keys(documentContrat.networks)[id];

  var contrat=new web3.eth.Contract(

    documentContrat.abi, 

    documentContrat

      .networks[initcontrat]

      .address
  );

  return contrat;

};


 function init(){
  
  
  contract=initialiserContract(AutoriteOrganisatio,0);
  //contract.options.address='0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae';
  //console.log(contract);
  contract_org=initialiserContract(Organisation,0);
 //contract_org.options.address='0x2F015C60E0be116B1f0CD534704Db9c92118FB6A';
 //contract_org.options.jsonInterface;

}

async function verifierOrgg(address,chaine){
  
  var j=0;
  var enregis=false
    var accounts= await web3.eth.getAccounts();
  var results= await contract.getPastEvents(
  'ajouterOrganEven',
  {
    //filter: {organisation:accounts[1], organ:chaine},
    fromBlock:4500,
    //toBlock:'latest'
    }
  );
  //console.log(results);
  if(results.length==0){
    console.log("array is empty");
    enregis=false;
  }
  else if(results.length!=0){
    for(var i=0; i<results.length; i++){
      if(results[i].returnValues.orga==address||results[i].returnValues.nom==chaine){
        enregis=true;
        }
        else{console.log("Rien");}
      }
    }
  return enregis;
    
}

async function verifierOrgExist(address){
  
  var j=0;
  var enregis=false
    var accounts= await web3.eth.getAccounts();
  var results= await contract.getPastEvents(
  'ajouterOrganEven',
  {
    //filter: {organisation:accounts[1], organ:chaine},
    fromBlock:4500,
    //toBlock:'latest'
    }
  );
  //console.log(results);
  if(results.length==0){
    console.log("array is empty");
    enregis=false;
  }
  else if(results.length!=0){
    for(var i=0; i<results.length; i++){
      if(results[i].returnValues.orga==address){
        enregis=true;
        }
        else{console.log("Rien");}
      }
    }
  return enregis;
    
}

async function verifierEnlevParAd(account){
  var tab=[];
  var tab1=[];
  var account= await web3.eth.getAccounts();
  //contract_org.options.address='0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae';
  //console.log("address contrat "+contract_org.options.address);
  console.log("new interface "+contract_org.abi);
   var resultat=await contract_org.getPastEvents('ajouteDocEvent',{
    filter: {"organisa": account,"etatDoc":[1,0]},
    fromBlock:4500,
    toBlock:'latest'});


   for(var i=0; i<resultat.length; i++){
    tab[i]=resultat[i].returnValues.hash;
   }

  var resultatt=await contract_org.getPastEvents('ajouteDocEvent',
    {
    filter: {"organisa": account,"etatDoc":[0]},
    fromBlock:4500,
    toBlock:'latest'});

  for(var i=0; i<resultatt.length; i++){
    tab1[i]=resultatt[i].returnValues.hash;
   }
   //console.log(tab.length);
   //console.log(tab1.length);

   //return resultat;
   var first=[1,2,3,4,5];
   var second=[4,5,6];
   var difference=tab.filter(x=>tab1.indexOf(x)===-1);
   console.log(difference);
   return difference;

}
async function differe(){
   
verifierEnlev().then(resu=>{console.log(resu)})
   //return resultat;
   var first=[1,2,3,4,5];
   var second=[4,5];
   var difference=first.filter(x=>second.indexOf(x)===-1);
   //console.log(difference);
 

}

async function verifierEnlev(){
var tab=[];
  var tab1=[];
  var account= await web3.eth.getAccounts();
  var resultat=await contract_org.getPastEvents('enleverDocEvent',{
    filter: {"etatDoc":[0]},
    fromBlock:4770,
    toBlock:'latest'});

   for(var i=0; i<resultat.length; i++){
    tab[i]=resultat[i].returnValues.hash;
   }

  var resultatt=await contract_org.getPastEvents('ajouteDocEvent',
    {
    filter: {"etatDoc":[1]},
    fromBlock:4770,
    toBlock:'latest'});

  for(var i=0; i<resultatt.length; i++){
    tab1[i]=resultatt[i].returnValues.hash;
   }
  // console.log(tab.length);
  // console.log(tab1.length);

   //return resultat;
   var first=[1,2,3,4,5];
   var second=[4,5,6];
   var difference=tab1.filter(x=>tab.indexOf(x)===-1);
   //console.log(difference);
    var resulta=await contract_org.getPastEvents('ajouteDocEvent',
    {
    filter: {"hash":difference,"etatDoc":[1]},
    fromBlock:4770,
    toBlock:'latest'});
    
  /*  var resultOrg= await contract.getPastEvents(
  'ajouterOrganEven',
  {
    //filter: {organisation:accounts[1], organ:chaine},
    fromBlock:4500,
    //toBlock:'latest'
    }
  );*/
  //console.log(resultOrg[1].returnValues.nom)
   return resulta;

}

async function verifierDocc(hashi){
  var j=0;
  var enregis=0
    var accounts= await web3.eth.getAccounts();
      var resultat= await contract_org.getPastEvents(
  'ajouteDocEvent',
  {
    filter: {"organisa":accounts[0],"hash": hashi},
    fromBlock:4500,
    toBlock:'latest'
    }
  );
 
  console.log(resultat.length);
  if(resultat.length==0){
    console.log("array is empty");
    enregis=0;
  }
  else if(resultat.length==2){
    enregis=2;
  }
  else{
    enregis=3;
  }
  return enregis;   
}

/****************************************************************************************************/

/*Cette fonction est responsable de gerer les gens qui ont deja un compte
metamask et aussi inscrire dans la blockchain ou se trouve le proprietaire.
Chaque organisation peut devenir proprietaire.
*/
   function App(){
    var j=0;
   var etatD=false;

    web3.eth.getAccounts().then(account=>{
   verifierEnlevParAd(account[0]).then(resultatt=>{
    //console.log(resultatt.length);
    var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Hash</th></tr></thead><tbody>';
    for(var i=0; i<resultatt.length; i++){
      
      //if(resultatt[i].returnValues.hash==1){
        j=j+1;
        table += "<tr><th scope="+"row"+">"+j+"</th><td>"+resultatt[i]+"</td></tr>";
     // }
    
    }
    table += "</tbody></table>";
    $("#datab").html(table);
    $("tbody>tr").append("<input type='checkbox' />");
  //});
  //}
      });

  });
   /*if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
   
      //$("#idi").html('id:<span id="id"><strong>'+resuli+'</strong></span> ');
           }
      else{}*/
    
  
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    $("#entre").click(function(e){
      e.preventDefault();
      web3.eth.getAccounts().then(account=>{
       verifierOrgExist(account[0]).then(result=>{
       //alert(result);
        if(result==false){
           $('#insc').load('inscription.html',function(){});
         }
        else{
        
           $('#insc').load('AjouterDocument.html',function(){});
         }
          });
     });
    });
  }
//Inscription
   $("#inscri").click( function(e){
    e.preventDefault();
     var nom_orga = $("#nom_org").val();
     var motpass = $("#motPas").val();

   web3.eth.getAccounts().then(account=>{
    verifierOrgg(account[0],nom_orga).then(resul=>{
      if(resul==false && nom_orga!=""){
        contract.methods.ajouterOrganisation(account[0],nom_orga
          ).send({
            from:account[0],
            gas:50000
          }).then(result=>{
            console.log("organisation ajoutée");    
            $("#dataIn").hide();
          $('#dataIns').load('AjouterDocument.html',function(){});
        });
      } else if(motpass=="" || nom_orga==""){
       // alert("Veuillez remplir ces champs SVP.");
            $("#aler").html('<p class="alert alert-warning">'+
              "Veuillez remplir ces champs SVP!"+'</p>');
               }
                else{
                // alert("interdiction de prendre comme mot de passe ou nom organisation");
                $("#aler").html('<p class="alert alert-danger">'+
                  "L'un ou les deux est(sont) deja existé(s)!"+'</p>')
              }
            });
  });
});
  
/******************************************************************************/
  var signa;
  var ref;
   
  var documen
  
 $("#docu").click(function(e){
    e.preventDefault();
    //alert(accounts[0]);
    j=0;
     ref=$("#nomOrg").val();
     docum = web3.utils.soliditySha3(chaine);
    //alert(chaine);
    web3.eth.getAccounts().then(account=>{
      verifierOrgExist(account[0]).then(result=>{
      //alert(ref);
      verifierDocc(docum).then(resul=>{
        if(chaine!=""&&result==true){
        //alert(resul);
        if(resul==0){
          var res=web3.eth.sign(docum, account[0]);
          //console.log(res);
          signa=res;
          contract_org.methods.ajouterDoc(account[0],docum
            ).send({
              from:account[0],
              gas:191000
            }).then(result=>{
              console.log("document ajouté");
              $("#aler").html('<p class="alert alert-success">'+
                "Document ajouté!"+'</p>')
              verifierEnlevParAd(account[0]).then(resultatt=>{
           
            //console.log(resultatt.length);
            var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Hash</th></tr></thead><tbody>';
            for(var i=0; i<resultatt.length; i++){
              
                j=j+1;
                table += "<tr><th scope="+"row"+">"+(j)+"</th><td>"+resultatt[i]+"</td></tr>";
             
            }
            table += "</tbody></table>";
            $("#datab").html(table);
            $("tbody>tr").append("<input type='checkbox' />");

          });
            
          })

          }
          else if(resul==3){
           $("#aler").html('<p class="alert alert-danger">'+
            "Document deja existe!"+'</p>');
         }
         else if(resul==2){
            $("#aler").html('<p class="alert alert-danger">'+
            "Document deja enlevé!"+'</p>');
         }
       }
       else{
        $("#aler").html('<p class="alert alert-danger">'+"Fichier invalide!"+'</p>')
      }
    });
    });
    });
  });


 $("#orgN").click(function(e){
   e.preventDefault();
   j=0;
    web3.eth.getAccounts().then(account=>{
      verifierOrgExist(account[0]).then(result=>{
      
      //alert(result);
        if(result==true){
          verifierEnlev().then(resultat=>{
          //console.log(resultat);
          var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Hash</th><th scope="col">Datetime</th></tr></thead><tbody>';
          for(var i=0; i<resultat.length; i++){
            //if(resultat[i].returnValues.etatDoc==1){
              j=j+1;
              table += "<tr><th scope="+"row"+">"+j+"</th><td  style=overflow-x:auto;>"+resultat[i].returnValues.hash+"</td><td>"+new Date(resultat[i].returnValues.date*1000).toString()+"</td></tr>";
          //}
          }

          table += "</tbody></table>";
          $("#dataOrg").html(table);
          //style=font-size:1vw;
        });
        }

      })

    });
  })
 $("#enl").click(function(e) {
  e.preventDefault();
  alert("enlever Hash");
   docum = web3.utils.soliditySha3(chaine);
   verifierDocc(docum).then(result=>{
    if(result==3){
   web3.eth.getAccounts().then(account=>{
     contract_org.methods.enleverDoc(account[0],docum
            ).send({
              from:account[0],
            }).then(result=>{

    verifierEnlevParAd(account[0]).then(resultatt=>{
           
            console.log(resultatt.length);
            var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Hash</th></tr></thead><tbody>';
            for(var i=0; i<resultatt.length; i++){
              
                j=j+1;
                table += "<tr><th scope="+"row"+">"+(j)+"</th><td>"+resultatt[i]+"</td></tr>";
             
            }
            table += "</tbody></table>";
            $("#datab").html(table);
            $("tbody>tr").append("<input type='checkbox' />");

          });


            });
   })
 }else{
  $("#aler").html('<p class="alert alert-danger">'+"Document n'existe pas!"+'</p>');
 }
})
   })

}

/************************************************************************************************/
/* La fonction  qui permet n'importe qui de verifier si un document existe pas besoin d'avoir un 
compte avec un portefeuille*/
function AppVerifier(){
  $("#org").click( function(e){
   e.preventDefault();
   var dofil = web3.utils.soliditySha3(chaine);
   //alert(dofil);
   //alert(chaine);
   verifierDocc(dofil).then(result=>{
    if(result==3){
    //alert("document existe");
    $("#aler").html('<p class="alert alert-success">'+"Document existe!"+'</p>');
  }
  else if(chaine==""){
   $("#aler").html('<p class="alert alert-warning">'+"Veuillez remplir ce champs SVP!"+'</p>')
    }
    else{
    //alert("document n'existe pas");
    $("#aler").html('<p class="alert alert-danger">'+"Document n'existe pas!"+'</p>');
       }
     });
 });
}

/***************************************************************************************************/
/* La fonction principale qui permet de faire fonctionner l'application*/
$(document).ready( async function() {

  initWeb3();
  init();
  
  //web3=new Web3("http://localhost:7545");
  App();
  AppVerifier();
  differe();

});