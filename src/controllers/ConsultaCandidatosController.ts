/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import CondicionaisParaFiltragem from '../condicionais/CondicionaisParaFiltragem';
import ConsultaCandidatosService from '../services/ConsultaCandidatosService';

class ConsultaCandidatosController {
  static consultaDeCandidatos(req: Request, res: Response): void {
    const condicoesParaFiltragem: any[] = [
      CondicionaisParaFiltragem.filtroNaoFeminino,
      CondicionaisParaFiltragem.filtroBranco,
      CondicionaisParaFiltragem.filtroPartidosBanidos,
      CondicionaisParaFiltragem.filtroNaoInstagram,
    ];
    const redesDosCandidadosComSites =
      ConsultaCandidatosService.consultaRedesDosCandidatosConcorrendo(
        req.params.cargo,
        req.params.cidade,
        condicoesParaFiltragem
      );

    res.status(200).send(redesDosCandidadosComSites);
  }
}

export default ConsultaCandidatosController;
