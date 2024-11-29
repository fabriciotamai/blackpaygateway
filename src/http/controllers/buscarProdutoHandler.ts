import { Request, Response } from 'express';
import { buscarDadosProdutor } from '../../api/buscarProduto';

export async function buscarProdutoHandler(req: Request, res: Response) {
  try {
    console.log('Iniciando busca de dados do produtor...');
    const dadosProdutor = await buscarDadosProdutor(
      process.env.PUBLIC_KEY || '',
      process.env.SECRET_KEY || ''
    );
    console.log('Dados do produtor obtidos com sucesso:', dadosProdutor);
    res.status(200).json(dadosProdutor);
  } catch (error: any) {
    console.error('Erro ao buscar dados do produtor:', error.message);
    const statusCode = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || 'Erro interno do servidor';
    res.status(statusCode).json({ error: errorMessage });
  }
}
