import { usuarioAdm } from '../../../base-test/const-login';
import ListagemHC from '../../../support/pages/HistoricoCredito/Listagem/acoes'
import DetalheHC from '../../../support/pages/HistoricoCredito/Detalhe/acoes'
import Modulos from '../../../support/pages/Modulos/acoes'

const origemInfo = 'CARTOES_DIGITAL,CARTOES_PF_LEGADO,CARTOES_PJ_LEGADO,CHANGE_LEGADO,CONSIGNADO,CONSORCIO_LEGADO,CREDITO_DIGITAL,CREDITO_LEGADO,IMOBILIARIO_LEGADO,ROTATIVO_CONTA_CORRENTE_LEGADO,ROTATIVO_CREDITO_DIGITAL,ROTATIVO_CREDITO_LEGADO'
const mod = 'A01,A02,A04,A05,A99,B01,B02,B03,B04,B05,B06,B07,B99,C01,D01,E01,E02,F01,G01'
const mensagemDtRemessa = 'A data indicada refere-se ao momento em que foi realizado o envio das informações/operações no histórico de crédito semanal, através do sistema Cadastro Positivo.'
const mensagemDtApuracao = 'A data indicada refere-se ao momento em que o produto disponibilizou as informações/operações para o envio do histórico de crédito semanal.'

describe('[HC DETALHE] RISC - 928/929/930/931/932 Exibir o informativo das Datas Remessa(cabeçalho) e Data Apuração(produto)', () => {
    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');

    });
    it('Validando Data Remessa(cabeçalho) e Data Apuração para CARTÕES DIGITAL', () => {
        cy.allure().story('RISC02-909/910/911/912/913')
        const cpfCnpj = '01177376075'
        const dtAPI = '2021-10-08'
        const ag = '0307'
        const numRem = '77'
        const contatro = 'D0004345159000246132'
        const data = '[aria-label="8-10-2021"]'

        Modulos.acessarHC()
        ListagemHC.preencherCpfCnpj(cpfCnpj)
        ListagemHC.clicarCalendarioInicial();
        ListagemHC.selecionarData('2021', 'Out', data)
        ListagemHC.clicarCalendarioFinal()
        ListagemHC.selecionarData('2021', 'Out', data)
        cy.intercept('GET', 'cadastro-positivo/v1/historico_credito/listar/?identificacaoCliente=' + cpfCnpj + '&dataRemessaInicial=' + dtAPI +
            '&dataRemessaFinal=' + dtAPI + '&modalidades=' + mod + '&origemInformacao=' + origemInfo + '&page=0&pageSize=10'
            , { fixture: 'HC/HCListCartoesDigital.json' }).as('listCartoesDigital')
        ListagemHC.clicarPesquisar()
        cy.wait('@listCartoesDigital')
        cy.intercept('GET', 'cadastro-positivo/v1/historico_credito/detalhe/?identificacaoCliente=' + cpfCnpj + '&prefixoAgencia=' + ag +
            '&numeroContrato=' + contatro + '&dataRemessa=' + dtAPI + '&numeroRemessa=' + numRem
            , { fixture: 'HC/HCDetCartoesDigital.json' }).as('detCartoesDigital')
        ListagemHC.clicarVisualizar()
        cy.wait('@detCartoesDigital')
        DetalheHC.validarMensagemDataRemessaCabecalho(mensagemDtRemessa)
        DetalheHC.validarMensagemDataApuracaoOperacao(mensagemDtApuracao)

        cy.contains('Módulo').click();
    });

    it('Validando Data Remessa(cabeçalho) e Data Apuração para CREDITO DIGITAL', () => {
        cy.allure().story('RISC02-909/910/911/912/913')
        const cpfCnpj = '44655802820'
        const dtAPI = '2021-10-08'
        const ag = '3027'
        const numRem = '77'
        const contatro = '1000008355'
        const data = '[aria-label="8-10-2021"]'
        Modulos.acessarHC()
        ListagemHC.preencherCpfCnpj(cpfCnpj)
        ListagemHC.clicarCalendarioInicial();
        ListagemHC.selecionarData('2021', 'Out', data)
        ListagemHC.clicarCalendarioFinal()
        ListagemHC.selecionarData('2021', 'Out', data)
        cy.intercept('GET', 'cadastro-positivo/v1/historico_credito/listar/?identificacaoCliente=' + cpfCnpj + '&dataRemessaInicial=' + dtAPI +
            '&dataRemessaFinal=' + dtAPI + '&modalidades=' + mod + '&origemInformacao=' + origemInfo + '&page=0&pageSize=10'
            , { fixture: 'HC/HCListCreditoDigital.json' }).as('listCreditoDigital')
        ListagemHC.clicarPesquisar()
        cy.wait('@listCreditoDigital')
        cy.intercept('GET', 'cadastro-positivo/v1/historico_credito/detalhe/?identificacaoCliente=' + cpfCnpj + '&prefixoAgencia=' + ag +
            '&numeroContrato=' + contatro + '&dataRemessa=' + dtAPI + '&numeroRemessa=' + numRem
            , { fixture: 'HC/HCDetCreditoDigital.json' }).as('detCreditoDigital')
        ListagemHC.clicarVisualizar()
        cy.wait('@detCreditoDigital')
        DetalheHC.validarMensagemDataRemessaCabecalho(mensagemDtRemessa)
        DetalheHC.validarMensagemDataApuracaoOperacao(mensagemDtApuracao)

        cy.contains('Módulo').click();

    });

    it('Validando Data Remessa(cabeçalho) e Data Apuração para CONSORCIO', () => {
        cy.allure().story('RISC02-909/910/911/912/913')
        const cpfCnpj = '04881948814'
        const dtAPI = '2020-10-23'
        const ag = '3009'
        const numRem = '21'
        const contatro = '735523'
        const data = '[aria-label="23-10-2020"]'
        Modulos.acessarHC()
        ListagemHC.preencherCpfCnpj(cpfCnpj)
        ListagemHC.clicarCalendarioInicial();
        ListagemHC.selecionarData('2020', 'Out', data)
        ListagemHC.clicarCalendarioFinal()
        ListagemHC.selecionarData('2020', 'Out', data)
        cy.intercept('GET', 'cadastro-positivo/v1/historico_credito/listar/?identificacaoCliente=' + cpfCnpj + '&dataRemessaInicial=' + dtAPI +
            '&dataRemessaFinal=' + dtAPI + '&modalidades=' + mod + '&origemInformacao=' + origemInfo + '&page=0&pageSize=10'
            , { fixture: 'HC/HCListConsorcioLegado.json' }).as('listConsorcio')
        ListagemHC.clicarPesquisar()
        cy.wait('@listConsorcio')
        cy.intercept('GET', 'cadastro-positivo/v1/historico_credito/detalhe/?identificacaoCliente=' + cpfCnpj + '&prefixoAgencia=' + ag +
            '&numeroContrato=' + contatro + '&dataRemessa=' + dtAPI + '&numeroRemessa=' + numRem
            , { fixture: 'HC/HCDetConsorcioLegado.json' }).as('detConsorcio')
        ListagemHC.clicarVisualizar()
        cy.wait('@detConsorcio')
        DetalheHC.validarMensagemDataRemessaCabecalho(mensagemDtRemessa)
        DetalheHC.validarMensagemDataApuracaoOperacao(mensagemDtApuracao)

        cy.contains('Módulo').click();
        
    });

    it('Validando Data Remessa(cabeçalho) e Data Apuração para ROTATIVO', () => {
        cy.allure().story('RISC02-909/910/911/912/913')
        const cpfCnpj = '22059372860'
        const dtAPI = '2020-10-23'
        const ag = '0718'
        const numRem = '21'
        const contatro = 'E867904'
        const data = '[aria-label="23-10-2020"]'
        Modulos.acessarHC()
        ListagemHC.preencherCpfCnpj(cpfCnpj)
        ListagemHC.clicarCalendarioInicial();
        ListagemHC.selecionarData('2020', 'Out', data)
        ListagemHC.clicarCalendarioFinal()
        ListagemHC.selecionarData('2020', 'Out', data)
        cy.intercept('GET', 'cadastro-positivo/v1/historico_credito/listar/?identificacaoCliente=' + cpfCnpj + '&dataRemessaInicial=' + dtAPI +
            '&dataRemessaFinal=' + dtAPI + '&modalidades=' + mod + '&origemInformacao=' + origemInfo + '&page=0&pageSize=10'
            , { fixture: 'HC/HCListRotativoContaCorrenteLegado.json' }).as('listRotCC')
        ListagemHC.clicarPesquisar()
        cy.wait('@listRotCC')
        cy.intercept('GET', 'cadastro-positivo/v1/historico_credito/detalhe/?identificacaoCliente=' + cpfCnpj + '&prefixoAgencia=' + ag +
            '&numeroContrato=' + contatro + '&dataRemessa=' + dtAPI + '&numeroRemessa=' + numRem
            , { fixture: 'HC/HCDetRotativoContaCorrenteLegado.json' }).as('detRotCC')
        ListagemHC.clicarVisualizar()
        cy.wait('@detRotCC')
        DetalheHC.validarMensagemDataRemessaCabecalho(mensagemDtRemessa)
        DetalheHC.validarMensagemDataApuracaoOperacao(mensagemDtApuracao)

    });

});

 after(() => {
 cy.contains('Módulo').click();
})  