import { usuarioAdm } from '../../../base-test/const-login';
import Modulos from '../../../support/pages/Modulos/acoes';
import ListagemInt from '../../../support/pages/InconsistenciasInternas/Listagem/acoes'

const origemInfo = 'CARTOES_DIGITAL,CARTOES_PF_LEGADO,CARTOES_PJ_LEGADO,CHANGE_LEGADO,CONSIGNADO,CONSORCIO_LEGADO,CREDITO_DIGITAL,CREDITO_LEGADO,IMOBILIARIO_LEGADO,ROTATIVO_CONTA_CORRENTE_LEGADO,ROTATIVO_CREDITO_DIGITAL,ROTATIVO_CREDITO_LEGADO'


describe('[INCONSISTENCIAS INTERNAS - LISTAGEM] RISC02-485 - Alteração da aplicação no Front para buscar as informações do detalhe do erro (Filtro)', () => {
    before(() => {
        cy.visit('/');
       // cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        cy.intercept('GET', 'cadastro-positivo/v1/analise-inconsistencias-internas?origemInformacao='+origemInfo+
        '&page=0&pageSize=10')
            .as('inicialIncInt');
        cy.intercept('GET', 'cadastro-positivo/v1/detalhe_erro/').as('erroFiltro');
        Modulos.acessarInconsistenciasInternas();

    })

    it('Valida a quantidade, código e descrição de Erros e  com a API', () => {
        cy.allure().story('RISC02-485')
        cy.wait('@inicialIncInt')
        cy.wait('@erroFiltro')
        let erro = []
        ListagemInt.clicarGuiaFiltros();
        cy.get('#selectDetalheErro').click();
        cy.get('@erroFiltro').then(xhr => {
            const quantidadeElementos = xhr.response.body.totalElements;
            cy.get('[role="listbox"] .ng-dropdown-panel-items.scroll-host  .ng-option')
                .should('have.length', quantidadeElementos);
        })
    })

});

describe('[INCONSISTENCIAS INTERNAS - LISTAGEM] RISC02-758 - [Monitoramento] - Inconsistências Internas- Informativo no indicador de "Percentual"', () => {
    const mensagemPrecisaEvoluir = 'O percentual indica a quantidade de operações rejeitadas em relação ao total recebido de responsabilidade da área, excluindo o ERRO_00. Valores maiores à 5% #Precisa Evoluir';
    const mensagemQuaseLa = 'O percentual indica a quantidade de operações rejeitadas em relação ao total recebido de responsabilidade da área, excluindo o ERRO_00. Valores entre 3% e 5% #Quase Lá';
    const mensagemMandouBem = 'O percentual indica a quantidade de operações rejeitadas em relação ao total recebido de responsabilidade da área, excluindo o ERRO_00. Valores entre 1% e 3% #Mandou Bem';
    const mensagemArrasou = 'O percentual indica a quantidade de operações rejeitadas em relação ao total recebido de responsabilidade da área, excluindo o ERRO_00. Valores menores à 1% #Arrasou';

    beforeEach(() => {
        cy.contains('Módulo').click({ force: true });
    });


    it('Validação dos indicadores', () => {
        cy.allure().story('RISC02-758')
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_rejeitados_internos/?origemInformacao=' + origemInfo)
            .as('indicadoresFull')
        Modulos.acessarInconsistenciasInternas();
        ListagemInt.clicarGuiaIndicadores();
        cy.wait('@indicadoresFull')
        ListagemInt.validarIndicadores('@indicadoresFull')
        cy.contains('Módulo').click({ force: true });
    });


    it('Valida Informativo #Precisa Evoluir', () => {
        cy.allure().story('RISC02-758')
        Modulos.acessarInconsistenciasInternas();
        cy.wait(2000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_rejeitados_internos/?origemInformacao=' + origemInfo
            , {
                body: {
                    percentual: 5.14
                },
            }).as('indicadoresPE')
        ListagemInt.clicarGuiaIndicadores();
        cy.wait('@indicadoresPE')
        ListagemInt.validarMensagemStatus('#Precisa Evoluir');
        ListagemInt.validarMensagemBalao(mensagemPrecisaEvoluir)
        ListagemInt.validarMensagemBalaoERRO_00()
        cy.contains('Módulo').click({ force: true });
    });

    it('Valida Informativo #Quase Lá', () => {
        cy.allure().story('RISC02-758')
        Modulos.acessarInconsistenciasInternas();
        cy.wait(2000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_rejeitados_internos/?origemInformacao=' + origemInfo
            , {
                body: {
                    percentual: 4.10,
                },
            }).as('indicadoresQL')
        ListagemInt.clicarGuiaIndicadores();
        cy.wait('@indicadoresQL')
        ListagemInt.validarMensagemStatus('#Quase Lá', mensagemQuaseLa);
        ListagemInt.validarMensagemBalao(mensagemQuaseLa)
        ListagemInt.validarMensagemBalaoERRO_00()
        cy.contains('Módulo').click({ force: true });
    });


    it('Valida Informativo #Mandou bem', () => {
        cy.allure().story('RISC02-758')
        Modulos.acessarInconsistenciasInternas();
        cy.wait(2000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_rejeitados_internos/?origemInformacao=' + origemInfo
            , {
                body: {
                    percentual: 2.25,
                },
            }).as('indicadoresMB')
        ListagemInt.clicarGuiaIndicadores();
        cy.wait('@indicadoresMB')
        ListagemInt.validarMensagemStatus('#Mandou bem');
        ListagemInt.validarMensagemBalao(mensagemMandouBem)
        cy.contains('Módulo').click({ force: true });
    });

    it('Valida Informativo #Arrasou', () => {
        cy.allure().story('RISC02-758')
        Modulos.acessarInconsistenciasInternas();
        cy.wait(2000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_rejeitados_internos/?origemInformacao=' + origemInfo
            , {
                body: {
                    percentual: 0.30,
                },
            }).as('indicadoresARR')
        ListagemInt.clicarGuiaIndicadores();
        cy.wait('@indicadoresARR')
        ListagemInt.validarMensagemStatus('#Arrasou');
        ListagemInt.validarMensagemBalao(mensagemArrasou)
        ListagemInt.validarMensagemBalaoERRO_00()
    });


    it('Valida texto busca sem registro', () => {
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_rejeitados_internos/?origemInformacao=' + origemInfo)
        .as('inicialII')
        Modulos.acessarInconsistenciasInternas();
        cy.wait('@inicialII')
        ListagemInt.clicarGuiaFiltros();
        ListagemInt.preencherCpfCnpj('11111111111')
        ListagemInt.clicarPesquisar();
        cy.get(' span > h4').should('have.text', 'Não foram encontrados registros para a pesquisa realizada.')
    });


     after(() => {
        cy.contains('Módulo').click({ force: true });
    }) 
});  