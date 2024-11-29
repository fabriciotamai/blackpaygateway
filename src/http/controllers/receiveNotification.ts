import { Request, Response } from 'express';
import { addNotificacao } from './onloadStatusTransaction';

export async function receberNotificacaoHandler(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const notification = req.body;

    console.log('Notificação recebida:', notification);

    if (!notification.transaction) {
      res.status(400).json({ error: 'Transação ausente no payload.' });
      return;
    }

    const { id, status, createdAt } = notification.transaction;

    // Aguarda a adição da notificação ao Redis
    await addNotificacao({ id, status, createdAt });

    res.status(200).send('Notificação processada com sucesso');
  } catch (error: any) {
    console.error('Erro ao processar notificação:', error.message);
    res.status(500).json({ error: error.message });
  }
}
