"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criarTransacaoHandler = criarTransacaoHandler;
const criarTransa__o_1 = require("../../api/criarTransa\u00E7\u00E3o");
async function criarTransacaoHandler(req, res) {
    try {
        const { client } = req.body;
        // console.log(client);
        if (!client?.name || !client?.email || !client?.phone || !client?.cpf) {
            res.status(400).json({ error: 'Campos obrigatórios estão faltando' });
            return;
        }
        // console.log('Iniciando criação de transação Pix...');
        const transacao = await (0, criarTransa__o_1.criarTransacaoPix)(client, process.env.PUBLIC_KEY || '', process.env.SECRET_KEY || '');
        // console.log('Transação criada com sucesso:', transacao);
        res.status(201).json(transacao);
    }
    catch (error) {
        console.error('Erro ao criar transação Pix:', error.message);
        res.status(500).json({ error: error.message });
    }
}
