// Esse arquivo funciona como um controller onde terão os endpoints para acesso aos recursos
// Ele foi carregado pelo express-load e está vinculado ao express pelo parâmetro "app"
// O módulo recebe como parametro o app para poder ter acesso aos outros módulos
// carregados em app.
module.exports = function(app) {
    
    var fnListaProdutos = function(req, res, next) {
        // nesta linha o connectionFactory já está carregado pelo express-load
        // estamos acessando ele a partir da variável app que é quem está com os módulos carregados
        // para acessar os módulos é só seguir o caminho das pastas onde estão a partir da variável
        // app ex: app.infra.connectionFactory();
        var connection = app.infra.connectionFactory();

        var produtosDAO = new app.infra.ProdutosDAO(connection);

        produtosDAO.lista(function(erros, resultados) {
            if(erros) {
                return next(erros);
            }
            res.format({
                html : function() {
                    res.render('produtos/lista', {lista:resultados});
                },
                json : function() {
                    res.json(resultados);
                }
            });
        });

        connection.end();
    }; 
    
    // Rota para listagem de produtos
    app.get('/produtos', fnListaProdutos);

    // Rota para o formulário de cadastro de produtos
    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form', 
            {
                errosValidacao : {},
                produto : {}
            });
    });

    // Rota para que o produto seja salvo a partir do submit do formulário
    // Sempre após um post fazer um redirect
    app.post('/produtos', function(req, res) {

        var produto = req.body;

        req.assert('titulo','Título é obrigatório').notEmpty();
        req.assert('preco','Formato inválido').isFloat();
        
        var erros = req.validationErrors();
        if(erros) {
            res.format({
                html : function() {
                    res.status(400).render('produtos/form', 
                        {
                            errosValidacao : erros,
                            produto : produto
                        }
                    );
                },
                json : function() {                    
                    res.status(400).json(erros);
                }
            });
            return;
        }

        var connection = app.infra.connectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salva(produto, function(erros, resultados) {
            res.redirect('/produtos');
        });
    });
}