const path = require("path");
const fs = require("fs");
const functions = require('./functions.js');

functions.convertToAbsolutePath();
functions.validateRoute();
functions.esArchivo();
functions.esArchivoMarkdown();
functions.searchLinksInMarkdownFile()


function mdLinks(route, options){
  return new Promise((resolve, reject) => {
    const absoluteRoute = convertToAbsolutePath(route);
    if(absoluteRoute === null){
      reject(new Error('Invalid Path'));
      return;
    }
    validateRoute(absoluteRoute).then((isValid) =>{
      if(!isValid){
        reject(new Error('Route does not exist'));
        return;
      }
      esArchivo(absoluteRoute)
      .then((isFile) => {
        if(isFile){
          esArchivoMarkdown(absoluteRoute)
          .then(()=>{
            searchLinksInMarkdownFile(absoluteRoute, options.validate)
            .then((result)=>{
              resolve(result);
            });
          }).catch(()=>{
            reject(new Error('File is not a Markdown file'));
          })
        } else {
          fs.readdir(absoluteRoute, (err, files) => {
            if (!err) {
              const promises = files.map((file) => {
                return mdLinks(route + "/" + file, options);
              });
              Promise.all(promises).then((result) => {
                resolve(result.flat());
              });
            }
          });
        }
      }).catch(()=>{
        reject(new Error('Invalid file'));
      });
    });
  });
}

mdLinks('Pruebas/prueba1.md', { validate: true })
.then((result) => {
  console.log(result);
});
