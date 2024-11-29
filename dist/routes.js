"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buscarProdutoHandler_1 = require("./http/controllers/buscarProdutoHandler"); // Corrigido
const criarTransactionHandler_1 = require("./http/controllers/criarTransactionHandler");
const onloadStatusTransaction_1 = require("./http/controllers/onloadStatusTransaction");
const receiveNotification_1 = require("./http/controllers/receiveNotification");
const router = (0, express_1.Router)();
// Definir rotas
router.post('/transactions/pix', criarTransactionHandler_1.criarTransacaoHandler);
router.get('/producer', buscarProdutoHandler_1.buscarProdutoHandler);
router.post('/transactions/pix/callback', receiveNotification_1.receberNotificacaoHandler);
router.get('/getstatustransaction/:id', onloadStatusTransaction_1.consultarNotificacaoPorIdHandler);
exports.default = router;
