// Esse arquivo funciona como um controller onde terão os endpoints para acesso aos recursos
// Ele foi carregado pelo express-load e está vinculado ao express pelo parâmetro "app"
// O módulo recebe como parametro o app para poder ter acesso aos outros módulos
// carregados em app.
module.exports = function(app) {
    app.get('/produtos', function(req, res) {

        // nesta linha o connectionFactory já está carregado pelo express-load
        // estamos acessando ele a partir da variável app que é quem está com os módulos carregados
        // para acessar os módulos é só seguir o caminho das pastas onde estão a partir da variável
        // app ex: app.infra.connectionFactory();
        var connection = app.infra.connectionFactory();

        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(erros, resultados) {
            res.render('produtos/lista', {lista:resultados});
        });

        connection.end();

    });
}