import { usuarioAdm } from '../../../base-test/const-login';
import Modulos from '../../../support/pages/Modulos/acoes';
import ListagemInt from '../../../support/pages/InconsistenciasInternas/Listagem/acoes';
import DetalheInt from '../../../support/pages/InconsistenciasInternas/Detalhe/acoes'

const origemInfo = 'CARTOES_DIGITAL,CARTOES_PF_LEGADO,CARTOES_PJ_LEGADO,CHANGE_LEGADO,CONSIGNADO,CONSORCIO_LEGADO,CREDITO_DIGITAL,CREDITO_LEGADO,IMOBILIARIO_LEGADO,ROTATIVO_CONTA_CORRENTE_LEGADO,ROTATIVO_CREDITO_DIGITAL,ROTATIVO_CREDITO_LEGADO'

describe('[INCONSISTENCIAS INTERNAS - DETALHE] SD-65264 Erro ao acessar o detalhamento do Consignado', () => {
    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        cy.intercept('GET', 'cadastro-positivo/v1/analise-inconsistencias-internas?origemInformacao=' + origemInfo +
            '&page=0&pageSize=10')
            .as('inicialIncInt');
        cy.intercept('GET', 'cadastro-positivo/v1/area_responsavel/', { fixture: 'AreaResponsavel.json' }).as('area')
        Modulos.acessarInconsistenciasInternas();
    });

    it('Validar registro com parcela futura nula (PARCELADOS)', () => {
        const cpf = '53860969900'
        cy.wait('@inicialIncInt')
        ListagemInt.clicarGuiaFiltros();
        ListagemInt.preencherCpfCnpj(cpf);
        cy.intercept('GET', 'cadastro-positivo/v1/analise-inconsistencias-internas?identificacaoCliente=' + cpf + '&origemInformacao=' + origemInfo +
            '&page=0&pageSize=10'
            , { fixture: 'II/ListagemSemParcFut.json' }).as('listSemParcFut')
        ListagemInt.clicarPesquisar()
        cy.wait('@listSemParcFut')
        cy.intercept('GET', 'cadastro-positivo/v1/analise-inconsistencias-internas/detalhe/53860969900/7024064/1504'
            , { fixture: 'II/DetalheSemParcFut.json' }).as('detSemParcFut')
        ListagemInt.clicarVisualizar();
        cy.wait('@area')
        cy.wait('@detSemParcFut')
        DetalheInt.clicarParcelas(' Parcelas Futuras')
        DetalheInt.validarMensagemSemParcelas(' Não existem Parcelas Futuras ')

    });

      after(() => {
         cy.contains('Módulo').click({ force: true }); 
     }) 
}); 