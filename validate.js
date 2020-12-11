const validator = require("email-validator");
// Ejemplo de validación de email:  validator.validate("test@email.com");

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Ejemplo de saneamiento de entrada de usuario contra XSS:
// const window = new JSDOM('').window;
// const DOMPurify = createDOMPurify(window);
//
// const clean = DOMPurify.sanitize(dirty);
//
// Para evitar ataques de SQL-injection al menos en cuanto el saneamiento
// basta con hacer uso de la función escape() del objeto de la coneccion
// a la BBDD MySql como se explica aquí https://github.com/mysqljs/mysql#escaping-query-values
