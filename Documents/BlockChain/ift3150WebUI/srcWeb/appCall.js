var AutoriteOrganisatio=require('C:/Users/judelin/Desktop/ProjetVersion4/build/contracts/AutoriteOrganisatio');
var Organisation=require('C:/Users/judelin/Desktop/ProjetVersion4/build/contracts/Organisation');


//import Web3 from 'https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js';

//var sal=require("./iniContract");
//import iniContract from './iniContract.js';
var iniContract=require('./iniContract.js');

var contract;
var contract_org;
var web3; 

var docum;


 async function init(){
  web3 = new Web3("http://localhost:7545");
  docum = web3.utils.soliditySha3("Diplome");
  contract=iniContract.myContract(AutoriteOrganisatio,0);
  contract_org=iniContract.myContract(Organisation,0);
  


 
  
}

async function afficheEvent(){
    var resultat= await contract_org.getPastEvents(
  'ajouteDocEvent',
  {
    //filter: {"hash": hashi},
    fromBlock:4500,
    toBlock:'latest'
    }
  );
   //console.log(resultat);
    var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Hash</th><th scope="col">Datetime</th></tr></thead><tbody>';
    for(var i=0; i<resultat.length; i++){
    table += "<tr><th scope="+"row"+">"+(i+1)+"</th><td>"+resultat[i].returnValues.hash+"</td><td>"+new Date(resultat[i].returnValues.date*1000).toString()+"</td></tr>";
   }
   table += "</tbody></table>";
   $("#dataOrg").html(table);

}



async function afficheByOrg(address){
   var resultatt= await contract_org.getPastEvents(
  'ajouteDocEvent',
  {
    //filter: {"hash": hashi},
    fromBlock:4500,
    toBlock:'latest'
    }
  );
  
 console.log(resultatt.length);
    var table = '<table class="table"> <thead><tr><th scope="col">#</th><th scope="col">Hash</th></tr></thead><tbody>';
    for(var i=0; i<resultatt.length; i++){
      if(resultatt[i].returnValues.organisa==address){
        table += "<tr><th scope="+"row"+">"+(i+1)+"</th><td>"+resultatt[i].returnValues.hash+"</td></tr>";
  }
   }
   table += "</tbody></table>";
   $("#datab").html(table);

}



async function ajouterDoc(address,hash){
  
  await contract_org.methods.ajouterDoc(address,hash
  ).send({
    from:address,
    gas:150000
  }).then(result=>{
    console.log("document ajouté");
    
  });

}

async function verifierDocc(hashi){

  
  var j=0;
  var enregis=false
    var accounts= await web3.eth.getAccounts();
      var resultat= await contract_org.getPastEvents(
  'ajouteDocEvent',
  {
    //filter: {"hash": hashi},
    fromBlock:4500,
    toBlock:'latest'
    }
  );
 
  //console.log(resultat);
  if(resultat==undefined){
    console.log("array is empty");
    enregis=false;
  }
  else if(resultat.returnValues!=[]){
    for(var i=0; i<resultat.length; i++){
      if(resultat[i].returnValues.hash==hashi){
        enregis=true;
      }
      else{}
    }
  }
  return enregis;
    
}

async function etatEven(){
    var resultat= await contract_org.getPastEvents(
  'ajouteDocEvent',
  {
    //filter: {"hash": hashi},
    fromBlock:4500,
    toBlock:'latest'
    }
  );
  return (resultat!=[])
    }
/*******************************************************************************************************/


async function ajouterOrganisation(address,chaine){
  //console.log(address[0]);

  await contract.methods.ajouterOrganisation(address,chaine
  ).send({
    from:address,
  }).then(result=>{
    console.log("organisation ajoutée");    
  });  
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
  console.log(results);
  if(results==undefined){
    console.log("array is empty");
    enregis=false;
  }
  else if(results[0]!=[]){
    for(var i=0; i<results.length; i++){
      if(results[i].returnValues.orga==address&&results[i].returnValues.nom==chaine){
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
  console.log(results);
  if(results==undefined){
    console.log("array is empty");
    enregis=false;
  }
  else if(results[0]!=[]){
    for(var i=0; i<results.length; i++){
      if(results[i].returnValues.orga==address){
        enregis=true;
        }
        else{console.log("Rien");}
      }
    }
  return enregis;
    
}


exports.verifierOrgEx = function (address) {
  return verifierOrgExist(address)
};

exports.verifierOrgi = function (address,chaine) {
  return verifierOrgg(address,chaine)
};

exports.verifierDocu = function (hash) {
  return verifierDocc(hash)
};
exports.ajouteDocu = function (address,hash) {
  return ajouterDoc(address,hash)
};
exports.ajouteOrgi= function (address,org) {
  return ajouterOrganisation(address,org)
};

exports.afficheEven= function () {
  return afficheEvent()
};
exports.afficheByOrgi= function (address) {
  return afficheByOrg(address)
};

exports.etatEvent= function () {
  return etatEven()
};

init();

//verifierDocc(docum).then(result=>{console.log(result)});
//verifierOrgg("ULAVAL").then(result=>{console.log(result)});
//ajouterOrganisation("0x658e8dEdcB0bd3D42f5637966D1E27a4F1C93F94","ULAVAL")
