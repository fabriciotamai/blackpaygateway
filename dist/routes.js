"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const buscarProdutoHandler_1 = require("./http/controllers/buscarProdutoHandler"); // Corrigido
const criarTransactionHandler_1 = require("./http/controllers/criarTransactionHandler");
const validationTransactionHandler_1 = require("./http/controllers/validationTransactionHandler");
const router = (0, express_1.Router)();
// Definir rotas
router.post('/transactions/pix', criarTransactionHandler_1.criarTransacaoHandler);
router.get('/producer', buscarProdutoHandler_1.buscarProdutoHandler);
router.get('/transactions/pix/callback', validationTransactionHandler_1.receberNotificacaoHandler);
exports.default = router;
