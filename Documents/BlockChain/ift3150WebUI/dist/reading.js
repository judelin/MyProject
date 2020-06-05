/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/reading.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/reading.js":
/*!************************!*\
  !*** ./src/reading.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//https://stackoverflow.com/questions/52054746/read-pdf-file-with-html5-file-api\r\n/*var chaine=\"\";\r\nfunction getTex(fich){\r\n$(fich).on(\"change\", function(evt){\r\n\r\n\r\nvar file = evt.target.files[0];\r\n\r\n//Read the file using file reader\r\nvar fileReader = new FileReader();\r\n\r\nfileReader.onload = function () {\r\n\r\n//Turn array buffer into typed array\r\nvar typedarray = new Uint8Array(this.result);\r\n\r\n//calling function to read from pdf file\r\ngetText(typedarray).then(function (text) {\r\n\r\n\r\nconsole.log(text);\r\nchaine=text;\r\n//$(\"#content\").html(text);\r\n}, function (reason) //Execute only when there is some error while reading pdf file\r\n{\r\nalert('Seems this file is broken, please upload another file');\r\nconsole.error(reason);\r\n});\r\n\r\n\r\n//getText() function definition. This is the pdf reader function.\r\nfunction getText(typedarray) {\r\n\r\n//PDFJS should be able to read this typedarray content\r\n\r\nvar pdf = PDFJS.getDocument(typedarray);\r\nreturn pdf.then(function (pdf) {\r\n\r\n// get all pages text\r\nvar maxPages = pdf.pdfInfo.numPages;\r\nvar countPromises = [];\r\n// collecting all page promises\r\nfor (var j = 1; j <= maxPages; j++) {\r\nvar page = pdf.getPage(j);\r\n\r\nvar txt = \"\";\r\ncountPromises.push(page.then(function (page) {\r\n// add page promise\r\nvar textContent = page.getTextContent();\r\n\r\nreturn textContent.then(function (text) {\r\n// return content promise\r\nreturn text.items.map(function (s) {\r\nreturn s.str;\r\n}).join(''); // value page text\r\n});\r\n}));\r\n}\r\n\r\n// Wait for all pages and join text\r\nreturn Promise.all(countPromises).then(function (texts) {\r\nreturn texts.join('');\r\n});\r\n});\r\n}\r\n};\r\n            //Read the file as ArrayBuffer\r\nfileReader.readAsArrayBuffer(file);\r\n\r\n});\r\n}\r\n\r\nfunction getChaine(){\r\n  return chaine;\r\n}\r\n\r\n*/\r\n\r\n/*const fs = require('fs');\r\nconst pdf = require('pdf-parse');\r\n \r\nlet dataBuffer = fs.readFileSync('C:/Users/judelin/Documents/BlockChain/PdfParse/short summary.pdf');\r\n \r\npdf(dataBuffer).then(function(data) {\r\n \r\n    // number of pages\r\n    console.log(data.numpages);\r\n    // number of rendered pages\r\n    console.log(data.numrender);\r\n    // PDF info\r\n    console.log(data.info);\r\n    // PDF metadata\r\n    console.log(data.metadata); \r\n    // PDF.js version\r\n    // check https://mozilla.github.io/pdf.js/getting_started/\r\n    console.log(data.version);\r\n    // PDF text\r\n    console.log(data.text); \r\n        \r\n});\r\n\r\n\r\n\r\n\r\n\r\n/*\r\nconst path = require('path');\r\nconst HtmlWebpackPlugin = require('html-webpack-plugin');\r\nconst fs = require('fs');\r\n\r\nvar nodeModules = {};\r\nfs.readdirSync('node_modules')\r\n  .filter(function(x) {\r\n    return ['.bin'].indexOf(x) === -1;\r\n  })\r\n  .forEach(function(mod) {\r\n    nodeModules[mod] = 'commonjs ' + mod;\r\n  });\r\n\r\nmodule.exports = {\r\n entry: {\r\n    index: './src/index.js',\r\n    reading: './src/reading.js'\r\n  },\r\n\r\n  target: 'node',\r\n  mode:'development',\r\n  output: {\r\n    path: path.resolve(__dirname, 'dist'),\r\n    filename: '[name].js'\r\n  },\r\n   externals: nodeModules,\r\n\r\n  devServer: {\r\n    contentBase: path.join(__dirname, 'dist'),\r\n    compress: true,\r\n    port: 9000\r\n  },\r\nplugins:[\r\n  new HtmlWebpackPlugin({\r\n     filename: 'AjouterDocument.html',\r\n     template: 'src/AjouterDocument.html',\r\n     \r\n  \r\n  }),\r\n  new HtmlWebpackPlugin({\r\n    \r\n     filename: 'index.html',\r\n      template: 'src/index.html',\r\n \r\n  }),\r\n   new HtmlWebpackPlugin({\r\n     filename: 'check.html',\r\n      template: 'src/check.html',\r\n      \r\n  }),\r\n  \r\n     new HtmlWebpackPlugin({\r\n     filename: 'ajouterCompte.html',\r\n     template: 'src/ajouterCompte.html'\r\n   \r\n  }),\r\n      new HtmlWebpackPlugin({\r\n        //filename: 'ind.html',\r\n    template: 'src/ind.html'\r\n  })\r\n\r\n  ]\r\n  \r\n}\r\n\r\n*/\r\n\n\n//# sourceURL=webpack:///./src/reading.js?");

/***/ })

/******/ });