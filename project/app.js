// Importa o módulo do express que foi configurado na pasta config
var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

// Inicia o servidor na porta informada para escutar as requisições
// que serão tratadas pelo express
http.listen(3000, function() {
    console.log('Servidor no ar...')
});