import { urlLogin } from '../../../base-test/routes';
import { usuarioAdm } from '../../../base-test/const-login';
import Modulos from '../../../support/pages/Modulos/acoes';
import ListagemContestacao from '../../../support/pages/Contestacoes/Listagem/acoes';

const origem_info ='CARTOES_DIGITAL,CARTOES_PF_LEGADO,CARTOES_PJ_LEGADO,CHANGE_LEGADO,CONSIGNADO,CONSORCIO_LEGADO,CREDITO_DIGITAL,CREDITO_LEGADO,IMOBILIARIO_LEGADO,ROTATIVO_CONTA_CORRENTE_LEGADO,ROTATIVO_CREDITO_DIGITAL,ROTATIVO_CREDITO_LEGADO'
const mod = 'A01,A02,A04,A05,A99,B01,B02,B03,B04,B05,B06,B07,B99,C01,D01,E01,E02,F01,G01'

 describe('[CONTESTAÇÃO - LISTA]: RISC02-430 - Permitir a edição das Contestações ACATA e NÃO ACATA', () => {

    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?codigoOcorrencia=0&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10')
            .as('Contestacao');
        Modulos.acessarContestacoes();

    }) 

     it('Validar Contestacao Em Analise para PERMITIR edição.', () => {
        cy.allure().story('RISC02-430')
        const cpfCnpj = '35629623800'
        cy.wait('@Contestacao');

        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj(cpfCnpj);
        ListagemContestacao.buscarStatus('Em Análise')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=' + cpfCnpj + '&codigoOcorrencia=0&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'ContestacaoAnalise.json' }).as('Analise')
        ListagemContestacao.clicarBtnPesquisar();
        cy.wait('@Analise');

        ListagemContestacao.validarBtnEditarVisivel();
        ListagemContestacao.validarIconeRelogioVisivel();
    });

    it('Validar Contestacao Acatada para NÃO PERMITIR edição.', () => {
        cy.allure().story('RISC02-430')
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('01558335706');
        ListagemContestacao.buscarStatus('Acatada')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=01558335706&codigoOcorrencia=7&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'ContAcatadaNaoPermitiEdit.json' }).as('AcatadaNeditar')
        ListagemContestacao.clicarBtnPesquisar();
        cy.wait('@AcatadaNeditar');

        ListagemContestacao.validarBtnEditarInvisivel();
        ListagemContestacao.validarIconeRelogioInvisivel();
    });

    it('Validar Contestacao Acatada para PERMITIR edição.', () => {
        cy.allure().story('RISC02-430')
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('39439614862');
        ListagemContestacao.buscarStatus('Acatada')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=39439614862&codigoOcorrencia=7&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'ContAcatadaPermitiEdit.json' }).as('AcatadaEditar')
        ListagemContestacao.clicarBtnPesquisar();
        cy.wait('@AcatadaEditar');

        ListagemContestacao.validarBtnEditarVisivel();
        ListagemContestacao.validarIconeRelogioInvisivel();

    });

    it('Validar Contestacao Não Acatada para NÃO PERMITIR edição.', () => {
        cy.allure().story('RISC02-430')
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('07614468180');
        ListagemContestacao.buscarStatus('Não Acatada')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=07614468180&codigoOcorrencia=8&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'ContNAcataNaoPermitiEdit.json' }).as('NAcatadaNEditar')
        ListagemContestacao.clicarBtnPesquisar();
        cy.wait('@NAcatadaNEditar');

        ListagemContestacao.validarBtnEditarInvisivel();
        ListagemContestacao.validarIconeRelogioInvisivel();
    });

    it('Validar Contestacao Não Reconhecida para NÃO PERMITIR edição.', () => {
        cy.allure().story('RISC02-430')
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('29445999843');
        ListagemContestacao.buscarStatus('5')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=29445999843&codigosOcorrenciasNaoReconhecidas=5,113,118,119,120&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'ContNReconhecida.json' }).as('NReconhecida')
        ListagemContestacao.clicarBtnPesquisar();
        cy.wait('@NReconhecida');

        ListagemContestacao.validarBtnEditarInvisivel();
        ListagemContestacao.validarIconeRelogioInvisivel();
    });

    it('Validar Contestacao Não Acatada para PERMITIR edição.', () => {
        cy.allure().story('RISC02-430')
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('45089290873');
        ListagemContestacao.buscarStatus('Não Acatada')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=45089290873&codigoOcorrencia=8&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'ContNAcatPermitiEdit.json' }).as('NAcatadaEditar')
        ListagemContestacao.clicarBtnPesquisar();
        cy.wait('@NAcatadaEditar');

        ListagemContestacao.validarBtnEditarVisivel();
        ListagemContestacao.validarIconeRelogioInvisivel();
    });

});

describe('[CONTESTAÇÃO - LISTA] RISC02-492 - Alteração da aplicação no Front para buscar as informações do status da contestação (Filtro)', () => {

    beforeEach(() => {
        cy.request('https://cadastro-positivo-conector-api.uat.sicredi.cloud/cadastro-positivo/v1/status_contestacao/listar')
        .as('statusContestacao');
        /* cy.request('https://cadastro-positivo-conector-api.uat.sicredi.cloud/cadastro-positivo/v1/gestor_banco_dados/')
        .as('gbdFiltro'); */
        /* cy.request('https://cadastro-positivo-conector-api.uat.sicredi.cloud/cadastro-positivo/v1/area_responsavel/')
        .as('areaResponsavelFiltro'); */
        cy.request('https://cadastro-positivo-conector-api.uat.sicredi.cloud/cadastro-positivo/tipo_contestacao')
        .as('tipoContestacaoFiltro');
    });

    it('Valida a quantidade de STATUS, GBD, AREA RESPONSAVEL e TIPO CONTESTACAO com a API', () => {
        cy.allure().story('RISC02-492')
        let status = []
        let nomeGBD = []
        let descAreaResp = []
        let tipContestacao = []

        ListagemContestacao.clicarGuiaFiltros();
        cy.get('#selectStatus option').each(($option, index) => {
            status.push(Cypress.$($option).text().trim())
        })
        cy.get('@statusContestacao').then(resp => {
            const quantidadeElementos = resp.body.totalElements + 1;
            cy.get('#selectStatus option').should('have.length', quantidadeElementos);
            resp.body.content.forEach((st, i) => {
                expect(resp.body.content[i].descricao).to.eq(status[i + 1])
            });
        })

         /* cy.get('@gbdFiltro').then(resp => {
            const quantidadeElementos = resp.body.totalElements + 1;
            cy.get('#selectGBD option').should('have.length', quantidadeElementos);

        })  */
/* 
        cy.get('#selectAreaResponsavel option').each(($option, index) => {
            descAreaResp.push(Cypress.$($option).text().trim())
        })
        cy.get('@areaResponsavelFiltro').then(resp => {
            const quantidadeElementos = resp.body.totalElements+1;
            cy.get('#selectAreaResponsavel option').should('have.length', quantidadeElementos);
            resp.body.content.forEach((st, i) => {
                expect(resp.body.content[i].descricao).to.eq(descAreaResp[i+1])
            });
        }) */

        cy.get('#selectTipoContestacao option').each(($option, index) => {
            tipContestacao.push(Cypress.$($option).text().trim())
        })
        cy.get('@tipoContestacaoFiltro').then(resp => {
            const quantidadeElementos = resp.body.totalElements+1;
            cy.get('#selectTipoContestacao option').should('have.length', quantidadeElementos);
            resp.body.content.forEach((st, i) => {
                expect(resp.body.content[i].descricao).to.eq(tipContestacao[i+1])
            });
        })
    });

});

describe('[CONTESTAÇÃO - LISTA] RISC02-524 - Ajustar o front para os novos códigos de retorno do ACPO127', () => {

    it('Valida status Não Reconhecida com codigoOcorencia 5', () => {
        cy.allure().story('RISC02-524')
        ListagemContestacao.buscarCpfCnpj('29445999843');
        ListagemContestacao.buscarStatus('5')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=29445999843&codigosOcorrenciasNaoReconhecidas=5,113,118,119,120&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'NaoReconhecidaCodOcorrencia5.json' }).as('NReconhecida5')
        ListagemContestacao.clicarBtnPesquisar();

        cy.wait('@NReconhecida5');
        ListagemContestacao.validarBtnEditarInvisivel();
    });

    it('Valida status Não Reconhecida com codigoOcorencia 113', () => {
        cy.allure().story('RISC02-524')
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('29445999843');
        ListagemContestacao.buscarStatus('5')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=29445999843&codigosOcorrenciasNaoReconhecidas=5,113,118,119,120&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'NaoReconhecidaCodOcorrencia113.json' }).as('NReconhecida113')
        ListagemContestacao.clicarBtnPesquisar();

        cy.wait('@NReconhecida113');
        ListagemContestacao.validarBtnEditarInvisivel();
    }); 

    it('Valida status Não Reconhecida com codigoOcorencia 118', () => {
        cy.allure().story('RISC02-524')
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('29445999843');
        ListagemContestacao.buscarStatus('5')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=29445999843&codigosOcorrenciasNaoReconhecidas=5,113,118,119,120&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'NaoReconhecidaCodOcorrencia118.json' }).as('NReconhecida118')
        ListagemContestacao.clicarBtnPesquisar();

        cy.wait('@NReconhecida118');
        ListagemContestacao.validarBtnEditarInvisivel();
    });

    it('Valida status Não Reconhecida com codigoOcorencia 119', () => {
        cy.allure().story('RISC02-524')
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('29445999843');
        ListagemContestacao.buscarStatus('5')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=29445999843&codigosOcorrenciasNaoReconhecidas=5,113,118,119,120&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'NaoReconhecidaCodOcorrencia119.json' }).as('NReconhecida119')
        ListagemContestacao.clicarBtnPesquisar();

        cy.wait('@NReconhecida119');
        ListagemContestacao.validarBtnEditarInvisivel();
    });

    it('Valida status Não Reconhecida com codigoOcorencia 120', () => {
        cy.allure().story('RISC02-524')
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('29445999843');
        ListagemContestacao.buscarStatus('5')

        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?detalhamentoIdentificacaoCliente=29445999843&codigosOcorrenciasNaoReconhecidas=5,113,118,119,120&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
            , { fixture: 'NaoReconhecidaCodOcorrencia120.json' }).as('NReconhecida120')
        ListagemContestacao.clicarBtnPesquisar();

        cy.wait('@NReconhecida120');
        ListagemContestacao.validarBtnEditarInvisivel();
    });



}); 

 describe('[CONTESTAÇÃO - LISTA] RISC02-683 - [Monitoramento] - FRONT Contestação -  Indicadores Operacionais de Contestação ', () => {

    it('Validando os indicadores com perfil ADM com todas as áreas responsáveis ', () => {
        cy.allure().story('RISC02-683')
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_contestacao/?origemInformacao='+origem_info+'&grupo=cadpos_adm'
            , { fixture: 'IndicadoresAdmFullAreaResp.json' }).as('indicadores');
        ListagemContestacao.clicarGuiaIndicadores();
         cy.wait('@indicadores');
        ListagemContestacao.validarIndicadores('@indicadores')
    }); 
}); 

 describe('[CONTESTAÇÃO - LISTA] RISC02-759 - [Monitoramento] - Contestações - Informativo no indicador de "Percentual"', () => {

    const mensagemPrecisaEvoluir = 'O percentual indica a quantidade de contestações respondidas e não reconhecidas em relação ao total recebido pela área. Valores menores à 60% #Precisa Evoluir';
    const mensagemQuaseLa = 'O percentual indica a quantidade de contestações respondidas e não reconhecidas em relação ao total recebido pela área. Valores entre 60% e 80% #Quase Lá';
    const mensagemMandouBem = 'O percentual indica a quantidade de contestações respondidas e não reconhecidas em relação ao total recebido pela área. Valores entre 80% e 95% #Mandou Bem';
    const mensagemArrasou = 'O percentual indica a quantidade de contestações respondidas e não reconhecidas em relação ao total recebido pela área. Valores maiores à 95% #Arrasou';

    it('Valida Informativo #Precisa Evoluir', () => {
        cy.allure().story('RISC02-759')
        ListagemContestacao.clicarGuiaFiltros();
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_contestacao/?origemInformacao='+origem_info+'&grupo=cadpos_adm'
            , { 
                body: {
                    percentualDoTotalDeContestacoesRespondidas: 58.0,
                },
            }).as('indicadoresPE');
        ListagemContestacao.clicarGuiaIndicadores();
        cy.wait('@indicadoresPE')
        ListagemContestacao.validarStatus('#Precisa Evoluir')
        ListagemContestacao.validarMensagemBalao(mensagemPrecisaEvoluir)
        ListagemContestacao.clicarGuiaFiltros();
    });

    it('Valida Informativo #Quase Lá', () => {
        cy.allure().story('RISC02-759')
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_contestacao/?origemInformacao='+origem_info+'&grupo=cadpos_adm'
            , { 
                body: {
                    percentualDoTotalDeContestacoesRespondidas: 73.3,
                },
            }).as('indicadoresQL');
        ListagemContestacao.clicarGuiaIndicadores();
        cy.wait('@indicadoresQL')
        ListagemContestacao.validarStatus('#Quase Lá')
        ListagemContestacao.validarMensagemBalao(mensagemQuaseLa)
        ListagemContestacao.clicarGuiaFiltros();
    });

    it('Valida Informativo #Mandou bem', () => {
        cy.allure().story('RISC02-759')
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_contestacao/?origemInformacao='+origem_info+'&grupo=cadpos_adm'
            , { 
                body: {
                    percentualDoTotalDeContestacoesRespondidas: 92.7,
                },
            }).as('indicadoresMB');
        ListagemContestacao.clicarGuiaIndicadores();
        cy.wait('@indicadoresMB')
        ListagemContestacao.validarStatus('#Mandou bem')
        ListagemContestacao.validarMensagemBalao(mensagemMandouBem)
        ListagemContestacao.clicarGuiaFiltros();
    });

    it('Valida Informativo #Arrasou', () => {
        cy.allure().story('RISC02-759')
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/monitoramento/indicadores_contestacao/?origemInformacao='+origem_info+'&grupo=cadpos_adm'
            , { 
                body: {
                    percentualDoTotalDeContestacoesRespondidas: 97.4,
                },
            }).as('indicadoresAR');
        ListagemContestacao.clicarGuiaIndicadores();
        cy.wait('@indicadoresAR')
        ListagemContestacao.validarStatus('#Arrasou')
        ListagemContestacao.validarMensagemBalao(mensagemArrasou)
    }); 

     it('Valida texto busca sem registro', () => {
        ListagemContestacao.clicarGuiaFiltros();
        ListagemContestacao.buscarCpfCnpj('11111111111')
        ListagemContestacao.clicarBtnPesquisar();
        ListagemContestacao.validarMensagemRegNaoEncontrado();
        //cy.contains('Módulo').click()
    }); 

     after(() => {
        cy.contains('Módulo').click();
    })   
});
/* describe('Validação de quantidade de registros ao voltar para a listagem', () => {
    before(() => {
        cy.intercept('GET','cadastro-positivo/v1/contestacao?codigoOcorrencia=0&origemInformacao='+origem_info+
        '&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
        , { fixture: 'ContestacaoFull.json' }).as('ContestacaoInicial')
    });
    it('Valida se permanece a quantidade de registro ao voltar da pagina de detalhe', () => {
        Modulos.acessarContestacoes()
        cy.wait('@ContestacaoInicial')
        
    });
}); */