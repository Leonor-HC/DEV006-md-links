const convertToAbsolutePath = require('../functions.js');

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
})

describe('convertToAbsolutePath', () => {
  it('Si la ruta es absoluta la retorna', () => {
    //GIVEN
    const exampleRoute = '/Users/leo/Documents/Laboratoria/Laboratoria-Proyectos/DEV006-md-links/Pruebas/prueba1.md';
    //WHEN
    const expectedRoute = convertToAbsolutePath(exampleRoute);
    const correctAbsolutePath = "/Users/leo/Documents/Laboratoria/Laboratoria-Proyectos/DEV006-md-links/Pruebas/prueba1.md";
    //THEN
    expect(expectedRoute).toBe(correctAbsolutePath);
    });    
})


