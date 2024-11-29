import { Request, Response } from 'express';
import redis from '../../../redisClient'; // Importe o cliente Redis

// Função para adicionar notificação ao Redis
export async function addNotificacao(notification: {
  id: string;
  status: string;
  createdAt: string;
}): Promise<void> {
  try {
    const { id } = notification;

    // Armazenar a notificação no Redis com TTL de 600 segundos (10 minutos)
    await redis.set(`notificacao:${id}`, JSON.stringify(notification), 'EX', 600);

    console.log(`Transação ${id} adicionada/atualizada com status ${notification.status}`);
  } catch (error) {
    console.error('Erro ao adicionar notificação:', error);
  }
}

// Handler para consultar notificação por ID
export async function consultarNotificacaoPorIdHandler(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const { id } = req.params;
  try {
    // Recuperar a notificação do Redis
    const notificacaoJson = await redis.get(`notificacao:${id}`);
    if (!notificacaoJson) {
      res.status(404).json({ error: 'Transação não encontrada' });
      return;
    }
    const notificacao = JSON.parse(notificacaoJson);
    res.status(200).json(notificacao);
  } catch (error: any) {
    console.error('Erro ao consultar notificação:', error.message);
    res.status(500).json({ error: 'Erro interno ao consultar a notificação' });
  }
}
