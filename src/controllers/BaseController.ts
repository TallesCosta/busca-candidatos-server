import { Request, Response } from 'express';

class BaseController {
  static healthCheck(req: Request, res: Response): void {
    res.status(200).send({ status: 'Serviço em execução!' });
  }
}

export default BaseController;
