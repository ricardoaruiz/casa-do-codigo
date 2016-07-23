var express = require('../config/express')();
var request = require('supertest')(express);
var DatabaseCleaner = require('database-cleaner');
var databaseCleaner = new DatabaseCleaner('mysql');

describe('#ProdutosController', function() {

    // done é uma função do mocha que indica que o passo foi finalizado
    beforeEach(function(done) {
        var conn = express.infra.connectionFactory();
        databaseCleaner.clean(conn, done);
    });

    it('#listagem json', function(done) {
        request.get('/produtos')
            .set('Accept', 'application/json')
            .expect('Content-type',/json/)
            .expect(200, done);
    });

    it('#listagem html', function(done) {
        request.get('/produtos')
            .set('Accept', 'text/html')
            .expect('Content-type', /html/)
            .expect(200, done);
    });

    it('#cadastro de produto com dados invalidos', function(done) {
        request.post('/produtos')
            .set('Content-type', 'application/json')
            .send({
                titulo : '',
                descricao : 'Novo livro'
            })
            .expect(400, done);
    });

    it('#cadastro de produto com dados validos', function(done) {
        request.post('/produtos')
            .set('Content-type', 'application/json')
            .send({
                titulo : 'Titulo do novo livro',
                descricao : 'Novo livro',
                preco : 10.5
            })
            .expect(302, done);
    });    
});