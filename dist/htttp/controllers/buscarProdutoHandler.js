"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarProdutoHandler = buscarProdutoHandler;
const buscarProduto_1 = require("../../api/buscarProduto");
async function buscarProdutoHandler(req, res) {
    try {
        console.log('Iniciando busca de dados do produtor...');
        const dadosProdutor = await (0, buscarProduto_1.buscarDadosProdutor)(process.env.PUBLIC_KEY || '', process.env.SECRET_KEY || '');
        console.log('Dados do produtor obtidos com sucesso:', dadosProdutor);
        res.status(200).json(dadosProdutor);
    }
    catch (error) {
        console.error('Erro ao buscar dados do produtor:', error.message);
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || 'Erro interno do servidor';
        res.status(statusCode).json({ error: errorMessage });
    }
}
