import dotenv from 'dotenv';
import app from './configuracoes/express';

dotenv.config();

const PORTA = process.env.PORTA;

app.listen(PORTA, () => {
  console.log(`Serviço em execução na porta ${PORTA}`);
});
