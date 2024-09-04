/* eslint-disable @typescript-eslint/no-explicit-any */
const PARTIDOS_BANIDOS = ['PL'];

class CondicionaisParaFiltragem {
  public filtroNaoMasculino: (x: any) => boolean = (x: any) => {
    return x?.descricaoSexo == 'MASC.';
  };
  public filtroNaoFeminino: (x: any) => boolean = (x: any) => {
    return x?.descricaoSexo == 'FEM.';
  };
  public filtroNaoBranco: (x: any) => boolean = (x: any) => {
    return x?.descricaoCorRaca == 'BRANCA';
  };
  public filtroBranco: (x: any) => boolean = (x: any) => {
    return x?.descricaoCorRaca != 'BRANCA';
  };
  public filtroPartidosBanidos: (x: any) => boolean = (x: any) => {
    return PARTIDOS_BANIDOS.includes(x?.partido?.sigla);
  };
  public filtroNaoInstagram: (x: any) => boolean = (x: any) => {
    return x?.sites?.filter((x: string) => x.includes('instagram')).length == 0;
  };
}

export default new CondicionaisParaFiltragem();
