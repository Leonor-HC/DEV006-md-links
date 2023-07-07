const path = require("path");
const fs = require("fs");
const {
  convertToAbsolutePath,
  validateRoute,
  esArchivo,
  esArchivoMarkdown,
  searchLinksInMarkdownFile,
} = require("./functions.js");

function mdLinks(route, options) {
  return new Promise((resolve, reject) => {
    const absoluteRoute = convertToAbsolutePath(route);
    validateRoute(absoluteRoute).then((isValid) => {
      if (!isValid) {
        reject(new Error("Route does not exist"));
        return;
      }
      esArchivo(absoluteRoute)
        .then((isFile) => {
          if (isFile) {
            esArchivoMarkdown(absoluteRoute)
              .then((isMd) => {
                if (isMd) {
                  searchLinksInMarkdownFile(
                    absoluteRoute,
                    options.validate
                  ).then((result) => {
                    resolve(result);
                  });
                }
                else{
                  resolve([])
                }
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
              }else{
                resolve([])
              }
            });
          }
        })
        .catch(() => {
          reject(new Error("Invalid file"));
        });
    });
  });
}

mdLinks("Pruebas", { validate: true }).then((result) => {
  console.log(result);
});
