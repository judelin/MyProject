//https://stackoverflow.com/questions/52054746/read-pdf-file-with-html5-file-api
/*var chaine="";
function getTex(fich){
$(fich).on("change", function(evt){


var file = evt.target.files[0];

//Read the file using file reader
var fileReader = new FileReader();

fileReader.onload = function () {

//Turn array buffer into typed array
var typedarray = new Uint8Array(this.result);

//calling function to read from pdf file
getText(typedarray).then(function (text) {


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
}

function getChaine(){
  return chaine;
}

*/

/*const fs = require('fs');
const pdf = require('pdf-parse');
 
let dataBuffer = fs.readFileSync('C:/Users/judelin/Documents/BlockChain/PdfParse/short summary.pdf');
 
pdf(dataBuffer).then(function(data) {
 
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF metadata
    console.log(data.metadata); 
    // PDF.js version
    // check https://mozilla.github.io/pdf.js/getting_started/
    console.log(data.version);
    // PDF text
    console.log(data.text); 
        
});





/*
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
 entry: {
    index: './src/index.js',
    reading: './src/reading.js'
  },

  target: 'node',
  mode:'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
   externals: nodeModules,

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
plugins:[
  new HtmlWebpackPlugin({
     filename: 'AjouterDocument.html',
     template: 'src/AjouterDocument.html',
     
  
  }),
  new HtmlWebpackPlugin({
    
     filename: 'index.html',
      template: 'src/index.html',
 
  }),
   new HtmlWebpackPlugin({
     filename: 'check.html',
      template: 'src/check.html',
      
  }),
  
     new HtmlWebpackPlugin({
     filename: 'ajouterCompte.html',
     template: 'src/ajouterCompte.html'
   
  }),
      new HtmlWebpackPlugin({
        //filename: 'ind.html',
    template: 'src/ind.html'
  })

  ]
  
}

*/
