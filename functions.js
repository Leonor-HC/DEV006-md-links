const path = require('path');
const fs = require('fs');

// funcion que valida una ruta absoluta o convierte a ruta absoluta y reemplaza '\' por '/'
function convertToAbsolutePath(route){
     let absoluteRoute = '';
     try{
          if(path.isAbsolute(route)){
               absoluteRoute = route.replace(/\\/g, '/');
          
          } else{
               absoluteRoute = path.resolve(route).replace(/\\/g, '/');
          }
          return absoluteRoute;
     } catch(error) {
          return null;
     }
}

const newPath = convertToAbsolutePath('prueba-mprueba03');
console.log(newPath);

const rutaAbs = convertToAbsolutePath('prueba2.md');
console.log(rutaAbs);

//funcion de validación de una ruta
function validateRoute(route){
     return new Promise((resolve, reject) =>{
          fs.access(route, fs.constants.F_OK, (error) =>{
               if(error){
                    resolve(false);
               } else{
                    resolve(true);
               }
          });
     });
}

validateRoute('prueba3.md')
.then(res => {
     console.log(res);
});

//funcion valida si es un archivo
function esArchivo(route){
     return new Promise((resolve, reject ) =>{
          fs.stat(route, (error, stats) =>{
               if(error){
                    reject(error);
               } else{
                    resolve(stats.isFile());
               }
          });
     });
}

esArchivo('prueba1.md')
.then((esArchivo) =>{
     if(esArchivo){
          console.log('Es un archivo')
     } else{
          console.log('No es un archivo')
     }
})
.catch(error =>{
     console.log('Error al verificar el archivo:', error);
});

//funcion valida si es un archivo Markdown
function esArchivoMarkdown(ruta){
     return new Promise((resolve, reject)=>{
          const extension = path.extname(ruta)
          if(extension.toLowerCase() === '.md'){
               resolve(true);
          }else{
               reject(false);
          }  
     });    
}

esArchivoMarkdown('prueba2.md')
.then((esMarkdown)=>{
     console.log('¿Es un archivo Markdown?', esMarkdown);
})
.catch(error => {
     console.log('Error al verificar el archivo', error);
})

//funcion de solicitud HTTP, validando links
function validateLink(link) {
     return new Promise((resolve, reject) => {
       fetch(link.href)
         .then((response) => {
           resolve({
             ...link,
             status: response.status,
             ok: response.ok ? "ok" : "fail",
           });
         })
         .catch((e) => {
           resolve({
             ...link,
             status: null,
             ok: "fail",
           });
         });
     });
}

// funcion que crea una promesa para cada array, combina todas las promesas y devuelve una unica promesa
function validateLinks(links) {
     const promises = links.map((a) => validateLink(a));
     return Promise.all(promises);
}

// funcion para buscar links y extraerlos 
function searchLinksInMarkdownFile(route, validate) {
     return new Promise((resolve, reject) => {
       fs.readFile(route, (err, content) => {
         if (err) {
           resolve(null);
         } else {
           const markdownContent = content.toString();
           const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
           const links = [];
           while (true) {
             match = linkRegex.exec(markdownContent);
             if (match == null) {
               break;
             }
             const linkText = match[1];
             const linkUrl = match[2];
             links.push({ text: linkText, href: linkUrl, file: route });
           }
           if (validate) {
             validateLinks(links).then((result) => {
               resolve(result);
             });
           } else {
             resolve(links);
           }
         }
       });
     });
}

  
module.exports = {
     convertToAbsolutePath,
     validateRoute,
     esArchivo,
     esArchivoMarkdown,
     searchLinksInMarkdownFile,
}