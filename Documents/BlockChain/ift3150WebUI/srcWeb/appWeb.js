var Exemp=require('./Exemp.js');
var appCall =require('./appCall.js');

async function app(name,address){
Exemp.mySalut("judelin seide");

    var resul=await appCall.verifierOrgi(address,name);
    await appCall.afficheEven();
   $("#idi").html(resul);
}

exports.myApp = function (name,address) {
  return app(name,address);
};

