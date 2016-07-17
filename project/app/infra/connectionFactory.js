var mysql = require('mysql');

// Essa função foi criada para ser retornada quando o módulo for carregado e 
// quem for usar o módulo deverá invocá-la.
var connectMYSQL = function() {
    return mysql.createConnection({
            user : 'root',
            password : 'root',
            database : 'casadocodigo',
            host : 'localhost'
        });
}

// Retorna a função connectMYSQL para quem precisar
module.exports = function() {
    return connectMYSQL;
}