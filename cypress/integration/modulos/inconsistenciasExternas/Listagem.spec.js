import { usuarioAdm } from '../../../base-test/const-login';
import Modulos from '../../../support/pages/Modulos/acoes';
import ListagemIE from '../../../support/pages/InconsistenciasExternas/Listagem/acoes';

const origem_info = 'CARTOES_DIGITAL,CARTOES_PF_LEGADO,CARTOES_PJ_LEGADO,CHANGE_LEGADO,CONSIGNADO,CONSORCIO_LEGADO,CREDITO_DIGITAL,CREDITO_LEGADO,IMOBILIARIO_LEGADO,ROTATIVO_CONTA_CORRENTE_LEGADO,ROTATIVO_CREDITO_DIGITAL,ROTATIVO_CREDITO_LEGADO'
const mod = 'A01,A02,A04,A05,A99,B01,B02,B03,B04,B05,B06,B07,B99,C01,D01,E01,E02,F01,G01'

describe('[INCONSISTENCIAS EXTERNAS - LISTAGEM] RISC02-500 - Alteração da aplicação no Front para buscar as informações da Área Responsável (Filtro)', () => {
    before(() => {
        cy.visit('/');
       // cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        cy.intercept('GET', 'cadastro-positivo/v1/detalhe_erro/').as('erroFiltro');
        cy.intercept('GET', 'cadastro-positivo/v1/ocorrencias_externas/listar_todas').as('ocorrencias')
        Modulos.acessarInconsistenciasExternas();

    })

    it('Valida a quantidade, código e descrição de Areas Responsaveis e  com a API', () => {
        cy.allure().story('RISC02-500')
        ListagemIE.clicarGuiaFiltros();
        cy.wait(1000)
        cy.get('#selectOcorrencia').click()
         cy.get('@ocorrencias').then(xhr => {
            const qtdOcorrencias = xhr.response.body.totalElements;
            cy.get('[role="listbox"] .ng-dropdown-panel-items.scroll-host  .ng-option')
                .should('have.length', qtdOcorrencias);

        }) 

    });
});

describe('[INCONSISTENCIAS EXTERNAS - LISTAGEM] RISC02-685 - Indicadores operacionais de Rejeitados Externos', () => {

    it('Validação dos indicadores', () => {
        cy.allure().story('RISC02-685')
        ListagemIE.clicarCalendarioFechado();
        ListagemIE.clicarCalendarioFechado();
        ListagemIE.selecionarData('2022', 'Abr')
        ListagemIE.clicarPesquisar();
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_de_rejeitados_externos/?dataRemessa=2022-04-18&origemInformacao=' + origem_info)
            .as('indicadoreFull')
        ListagemIE.clicarGuiaIndicadores();
        cy.wait('@indicadoreFull')
        ListagemIE.validarIndicadores('@indicadoreFull')
    });

    const mensagemPrecisaEvoluir = 'O percentual indica a quantidade de operações rejeitadas em relação ao total recebido de responsabilidade da área. Valores maiores à 3% #Precisa Evoluir.';
    const mensagemQuaseLa = 'O percentual indica a quantidade de operações rejeitadas em relação ao total recebido de responsabilidade da área. Valores entre 1% e 3% #Quase Lá.';
    const mensagemMandouBem = 'O percentual indica a quantidade de operações rejeitadas em relação ao total recebido de responsabilidade da área. Valores entre 0,5% e 1% #Mandou Bem.';
    const mensagemArrasou = 'O percentual indica a quantidade de operações rejeitadas em relação ao total recebido de responsabilidade da área. Valores menores à 0,5% #Arrasou';

    it('Valida Informativo #Precisa Evoluir', () => {
        cy.allure().story('RISC02-685')
        ListagemIE.clicarGuiaIndicadores();
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_de_rejeitados_externos/?dataRemessa=2022-04-18&origemInformacao=' + origem_info
            , {
                body: {
                    percentualRejeicaoCIPTotalOperacoesExternasEnviadas: 5.0,
                },
            }).as('indicadoresPE');
        ListagemIE.clicarGuiaIndicadores();
        cy.wait('@indicadoresPE');
        ListagemIE.validarStatus('#Precisa Evoluir')
        ListagemIE.validarMensagemBalao(mensagemPrecisaEvoluir)
        ListagemIE.clicarGuiaIndicadores();
    });


     it('Valida Informativo #Quase Lá', () => {
        cy.allure().story('RISC02-685')
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_de_rejeitados_externos/?dataRemessa=2022-04-18&origemInformacao=' + origem_info
            , {
                body: {
                    percentualRejeicaoCIPTotalOperacoesExternasEnviadas: 2.3,
                },
            }).as('indicadoresQL');
        ListagemIE.clicarGuiaIndicadores();
        cy.wait('@indicadoresQL');
        ListagemIE.validarStatus('#Quase Lá')
        ListagemIE.validarMensagemBalao(mensagemQuaseLa)
        ListagemIE.clicarGuiaIndicadores();
    }); 

    it('Valida Informativo #Mandou Bem', () => {
        cy.allure().story('RISC02-685')
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_de_rejeitados_externos/?dataRemessa=2022-04-18&origemInformacao=' + origem_info
            , {
                body: {
                    percentualRejeicaoCIPTotalOperacoesExternasEnviadas: 0.7,
                },
            }).as('indicadoresMB');
        ListagemIE.clicarGuiaIndicadores();
        cy.wait('@indicadoresMB');
        ListagemIE.validarStatus('#Mandou bem')
        ListagemIE.validarMensagemBalao(mensagemMandouBem)
        ListagemIE.clicarGuiaIndicadores();
    });

    it('Valida Informativo #Arrasou', () => {
        cy.allure().story('RISC02-685')
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_operacionais_de_rejeitados_externos/?dataRemessa=2022-04-18&origemInformacao=' + origem_info
            , {
                body: {
                    percentualRejeicaoCIPTotalOperacoesExternasEnviadas: 0.3,
                },
            }).as('indicadoresArr');
        ListagemIE.clicarGuiaIndicadores();
        cy.wait('@indicadoresArr');
        ListagemIE.validarStatus('#Arrasou')
        ListagemIE.validarMensagemBalao(mensagemArrasou)

    });

    it('Valida texto busca sem registro', () => {
        ListagemIE.clicarGuiaFiltros();
        cy.get('#idCpfCnpj').clear().type('11111111111')
        cy.get('#idPesquisarFiltro').click();
        cy.get(' span > h4').should('have.text', 'Não foram encontrados registros para a pesquisa realizada.')
    });

    after(() => {
        cy.contains('Módulo').click({ force: true });
    });
});  