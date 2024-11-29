import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes'; // Importando as rotas

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usando as rotas
app.use('/api', routes); 

// Porta do servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
