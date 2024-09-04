import express, { Application } from 'express';
import healthCheckRoute from '../routes/healthCheckRoute';
import candidatosRoute from '../routes/candidatosRoute';

const app: Application = express();

app.use(express.json());

app.use('/', healthCheckRoute);
app.use('/candidatos', candidatosRoute);

export default app;
