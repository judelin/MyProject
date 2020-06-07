const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
	 deployer.deploy(Migrations,{gas: 4612388, from: "0x1a4Ba1BE15D5983e43B6A070c9489ce452CD4ae1"});
  //deployer.deploy(Migrations);
};
