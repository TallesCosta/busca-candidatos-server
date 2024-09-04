
# busca-candidatos-server

Serviço Node.js para busca de candidaturas eleitorais no sistema '[Divulgação de Candidaturas e Contas Eleitorais](https://divulgacandcontas.tse.jus.br/divulga)' do Tribunal Superior Eleitoral (tse.jus.br).

Este serviço faz parte da ferramenta `busca-candidatos` construída para facilitar a busca por candidatos à cargos eleitorais públicos.

## Pré-requisitos
- Node.js: `v18.20.4`

## Construção
`npm run build` - compilará os arquivos typescript para javascript ES6 e ficarão disponíveis em `/dist`. 

## Execução
### Produção
`npm start` - iniciará o servidor node com base nos arquivos do último `build` gerado.

### Desenvolvimento
`npm run start:dev` - iniciará o servidor de aplicação local utilizando ts-node e nodemon com hot-deploy configurado.
