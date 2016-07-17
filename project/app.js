// Importa o módulo do express que foi configurado na pasta config
var app = require('./config/express')();

// Inicia o servidor na porta informada para escutar as requisições
// que serão tratadas pelo express
app.listen(3000, function() {
    console.log('Servidor no ar...')
});