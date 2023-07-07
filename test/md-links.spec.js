const {
  convertToAbsolutePath,
  validateRoute,
  esArchivo,
  esArchivoMarkdown,
  searchLinksInMarkdownFile} = require('../functions.js');

describe('convertToAbsolutePath', () => {
  it('convierte una ruta relativa a absoluta', () => {
    //GIVEN
    const exampleRoute = 'Pruebas/prueba2.md';
    //WHEN
    const expectedRoute = convertToAbsolutePath(exampleRoute);
    const correctAbsolutePath = "/Users/leo/Documents/Laboratoria/Laboratoria-Proyectos/DEV006-md-links/Pruebas/prueba2.md";
    //THEN
    expect(expectedRoute).toBe(correctAbsolutePath);
    });    

  it('Si la ruta es absoluta la retorna', () => {
    //GIVEN
    const exampleRoute = '/Users/leo/Documents/Laboratoria/Laboratoria-Proyectos/DEV006-md-links/Pruebas/prueba1.md';
    //WHEN
    const expectedRoute = convertToAbsolutePath(exampleRoute);
    const correctAbsolutePath = "/Users/leo/Documents/Laboratoria/Laboratoria-Proyectos/DEV006-md-links/Pruebas/prueba1.md";
    //THEN
    expect(expectedRoute).toBe(correctAbsolutePath);
    }); 
    
  it('cambia \ por /', () => {
    //GIVEN
    const exampleRoute = 'Pruebas\\prueba2.md';
    //WHEN
    const expectedRoute = convertToAbsolutePath(exampleRoute);
    const correctAbsolutePath = '/Users/leo/Documents/Laboratoria/Laboratoria-Proyectos/DEV006-md-links/Pruebas/prueba2.md';
    //THEN
    expect(expectedRoute).toBe(correctAbsolutePath);
    });
})

describe('validateRoute', () => {
  it('si la ruta es valida, retorna true',async() => {
    //GIVEN
    const exampleRoute = 'Pruebas/archivos/mundoMd.md';
    //WHEN
    const expectedRoute = await validateRoute(exampleRoute);
    const expectedResponse = true;
    //THEN
    expect(expectedRoute).toEqual(expectedResponse);
  }); 
})

describe('esArchivo', () => {
  it('si es archivo, retorna true',async() => {
    //GIVEN
    const exampleRoute = 'Pruebas/archivos/masPruebas/recursosDiseno.md';
    //WHEN
    const expectedRoute = await esArchivo(exampleRoute);
    const expectedResponse = true;
    //THEN
    expect(expectedRoute).toEqual(expectedResponse);
  }); 
})

describe('esArchivoMarkdown', () => {
  it('si es archivo, retorna true',async() => {
    //GIVEN
    const exampleRoute = 'Pruebas/archivos/recursosUtiles.md';
    //WHEN
    const expectedRoute = await esArchivoMarkdown(exampleRoute);
    const expectedResponse = true;
    //THEN
    expect(expectedRoute).toEqual(expectedResponse);
  }); 
  it('si no es archivo, retorna false',async() => {
    //GIVEN
    const exampleRoute = '.eslintrc';
    //WHEN
    const expectedRoute = await esArchivoMarkdown(exampleRoute);
    const expectedResponse = false;
    //THEN
    expect(expectedRoute).toEqual(expectedResponse);
  }); 
})

describe('searchLinksInMarkdownFile', () => {
  it('si es archivo, retorna true',async() => {
    //GIVEN
    const exampleRoute = 'Pruebas/archivos/masPruebas/recursosDiseno.md';
    //WHEN
    const expectedRoute = await searchLinksInMarkdownFile(exampleRoute);
    const expectedResponse = true;
    //THEN
    expect(expectedRoute).toEqual(expectedResponse);
  }); 
})