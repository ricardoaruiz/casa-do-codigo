var ProdutosDAO = function(connection) {
    this._connection = connection;
}

ProdutosDAO.prototype.lista = function(cb) {
    this._connection.query('select * from livros', cb);
}

module.exports = function() {
    return ProdutosDAO;
};
