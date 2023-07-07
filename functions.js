const path = require("path");
const fs = require("fs");

// funcion que valida una ruta absoluta o convierte a ruta absoluta y reemplaza '\' por '/'
function convertToAbsolutePath(route) {
  let absoluteRoute = "";
  if (path.isAbsolute(route)) {
    absoluteRoute = route.replace(/\\/g, "/");
  } else {
     absoluteRoute = path.resolve(route).replace(/\\/g, "/");
  }
  return absoluteRoute;
}

//funcion de validación de una ruta
function validateRoute(route) {
  return new Promise((resolve, reject) => {
    fs.access(route, fs.constants.F_OK, (error) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

//funcion valida si es un archivo
function esArchivo(route) {
  return new Promise((resolve, reject) => {
    fs.stat(route, (error, stats) => {
      if (error) {
        reject(error);
      } else {
        resolve(stats.isFile());
      }
    });
  });
}

//funcion valida si es un archivo Markdown
function esArchivoMarkdown(ruta) {
  return new Promise((resolve, reject) => {
    const extension = path.extname(ruta);
    if (extension.toLowerCase() === ".md") {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}

//funcion de solicitud HTTP 
function validateLink(linkInfo) {
  return new Promise((resolve, reject) => {
    fetch(linkInfo.href)
      .then((response) => {
        resolve({
          ...linkInfo,
          status: response.status,
          ok: response.ok ? "ok" : "fail",
        });
      })
      .catch((e) => {
        resolve({
          ...linkInfo,
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
        resolve([]);
      } else {
        const markdownContent = content.toString();
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const links = [];
        while (true) {
          const match = linkRegex.exec(markdownContent);
          if (match == null) {
            break;
          }
          const linkText = match[1];
          const linkUrl = match[2];
          const linkInfo = {text: linkText, href: linkUrl, file: route };
          links.push(linkInfo);
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
};
