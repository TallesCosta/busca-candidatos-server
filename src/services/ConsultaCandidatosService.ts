/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const CODIGO_DA_CIDADE_POA = 68977;
const CODIGO_DA_CIDADE_FERRAZ = 64157;

const URL_DE_LISTAGEM_DE_CANDIDATOS_PARA_PREFEITO: string =
  'https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2024/{CODIGO_DA_CIDADE}/2045202024/11/candidatos';
const URL_DE_DETALHES_DO_CANDIDATO_PARA_PREFEITO: string =
  'https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2024/{CODIGO_DA_CIDADE}/2045202024/candidato/';
const URL_DE_LISTAGEM_DE_CANDIDATOS_PARA_VEREADOR: string =
  'https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/listar/2024/{CODIGO_DA_CIDADE}/2045202024/13/candidatos';
const URL_DE_DETALHES_DO_CANDIDATO_PARA_VEREADOR: string =
  'https://divulgacandcontas.tse.jus.br/divulga/rest/v1/candidatura/buscar/2024/{CODIGO_DA_CIDADE}/2045202024/candidato/';

class ConsultaCandidatosService {
  public async consultaRedesDosCandidatosConcorrendo(
    cargo: string,
    cidade: string,
    condicoesParaFiltragem: any[],
    informacoesDetalhadas: boolean = false
  ): Promise<any> {
    const sitesDosCandidatos: any[] = [];

    const codigoDaCidade: number = this.interpretaCodigoDaCidade(cidade);
    const urlListagem: string = this.interpretaUrlDeListagem(cargo);
    const urlDetalhes: string = this.interpretaUrlDeDetalhes(cargo);

    const urlListagemDefinida = this.interpolaCodigoDaCidadeNaUrl(
      urlListagem,
      codigoDaCidade
    );
    const urlDetalhesDefinida = this.interpolaCodigoDaCidadeNaUrl(
      urlDetalhes,
      codigoDaCidade
    );

    const idDosCandidatos = await this.consultaListaDeCandidatosConcorrendo(
      urlListagemDefinida
    );

    for (const id of idDosCandidatos) {
      const sitesDoCandidato = await this.consultaRedesDoCandidato(
        urlDetalhesDefinida,
        id,
        condicoesParaFiltragem,
        informacoesDetalhadas
      );

      if (sitesDoCandidato != null) sitesDosCandidatos.push(sitesDoCandidato);
    }

    const redesDosCandidadosComSites = sitesDosCandidatos.filter(
      (x) => x.sites?.length > 0 || x?.length > 0
    );

    return redesDosCandidadosComSites;
  }

  public async consultaListaDeCandidatosConcorrendo(
    urlListagem: string
  ): Promise<number[]> {
    try {
      const resposta = await axios.get(urlListagem);
      return resposta.data.candidatos
        ?.filter((x: any) => x.descricaoTotalizacao == 'Concorrendo')
        .map((x: any) => x.id);
    } catch (ex) {
      console.log(`Erro interno, contate o administrador!\n${ex}`);
      return [];
    }
  }

  public async consultaRedesDoCandidato(
    urlDetalhes: string,
    idDoCandidato: number,
    condicoesParaFiltragem: any[],
    informacoesDetalhadas: boolean
  ): Promise<any> {
    try {
      const resposta = await axios.get(`${urlDetalhes}${idDoCandidato}`);

      for (const condicaoParaFiltragem of condicoesParaFiltragem) {
        if (condicaoParaFiltragem(resposta.data)) return null;
      }

      const sites = resposta.data.sites.filter((x: string) =>
        x.includes('instagram')
      );

      let sitesDosCandidatos: object;
      if (informacoesDetalhadas) {
        sitesDosCandidatos = {
          nome: resposta.data.nomeUrna,
          partido: resposta.data.partido.sigla,
          sites: sites,
        };
      } else {
        sitesDosCandidatos = sites;
      }

      return sitesDosCandidatos;
    } catch (ex) {
      console.log(`Erro interno, contate o administrador!\n${ex}`);
    }
  }

  private interpretaCodigoDaCidade(cidade: string): number {
    let codigoDaCidade: number = 0;
    switch (cidade?.toUpperCase()) {
      case 'POA':
        codigoDaCidade = CODIGO_DA_CIDADE_POA;
        break;
      case 'FERRAZ':
        codigoDaCidade = CODIGO_DA_CIDADE_FERRAZ;
        break;
      default:
        throw new Error('Cidade não mapeada!');
    }
    return codigoDaCidade;
  }

  private interpretaUrlDeListagem(cargo: string): string {
    let urlDeListagem: string = '';
    switch (cargo?.toUpperCase()) {
      case 'PREFEITO':
        urlDeListagem = URL_DE_LISTAGEM_DE_CANDIDATOS_PARA_PREFEITO;
        break;
      case 'VEREADOR':
        urlDeListagem = URL_DE_LISTAGEM_DE_CANDIDATOS_PARA_VEREADOR;
        break;
      default:
        throw new Error('Cargo não mapeado!');
    }
    return urlDeListagem;
  }

  private interpretaUrlDeDetalhes(cargo: string): string {
    let urlDeDetalhes: string = '';
    switch (cargo?.toUpperCase()) {
      case 'PREFEITO':
        urlDeDetalhes = URL_DE_DETALHES_DO_CANDIDATO_PARA_PREFEITO;
        break;
      case 'VEREADOR':
        urlDeDetalhes = URL_DE_DETALHES_DO_CANDIDATO_PARA_VEREADOR;
        break;
      default:
        throw new Error('Cargo não mapeado!');
    }
    return urlDeDetalhes;
  }

  private interpolaCodigoDaCidadeNaUrl(
    url: string,
    codigoDaCidade: number
  ): string {
    return url.replace('{CODIGO_DA_CIDADE}', String(codigoDaCidade));
  }
}

export default new ConsultaCandidatosService();
