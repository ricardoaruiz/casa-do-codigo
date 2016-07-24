var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser'); 
var expressValidator = require('express-validator');

module.exports = function() {

    // Obtem o objeto do express a partir do módulo importado
    var application = express();

    // informa ao express onde estão os arquivos estáticos (js, css e etc).
    // Essa linha garante que todo arquivo que estiver dentro da pasta public será servido de maneira estática 
    // sem que precise de uma rota configurada para ele.
    application.use(express.static('./app/public'));

    // Informa ao express qual a engine de view que será utilizada
    application.set('view engine', 'ejs');

    // Informa ao express qual é o diretório raiz onde estarão as views
    application.set('views', './app/views');

    // Aceita formularios na requisição
    application.use(bodyParser.urlencoded({extended:true}));

    // Aceita JSON na requisição
    application.use(bodyParser.json());

    // Habilita o express-validator para validação de requests
    application.use(expressValidator());    

    // O express-load, carrega os módulos que estão nos diretórios routes, infra e etc. Esses módulos
    // estão nesses diretórios que estão dentro do diretório app e por isso dissemos ao load a partir
    // de onde (diretório app) ele deve carregar os módulos.
    // É importante estar atento a ordem na declaração do carregamento dos módulos, observando a dependencia
    // entre eles, ou seja como o routes depende de infra o infra deve ser carregado primeiro.
    // Outra coisa importante sobre o express-load é que além de ele carregar o módulo (require) ele já
    // invoca a função retornada pelo módulo no mesmo momento.
    load('infra', {cwd : 'app'})
        .then('services')
        .then('routes')
        .into(application);

    return application;
}