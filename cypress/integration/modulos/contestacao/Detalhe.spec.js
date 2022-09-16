import { usuarioAdm } from '../../../base-test/const-login';
import Modulos from '../../../support/pages/Modulos/acoes';
import ListagemContestacao from '../../../support/pages/Contestacoes/Listagem/acoes';
import DetContestacao from '../../../support/pages/Contestacoes/Detalhe/acoes'

const origem_info ='CARTOES_DIGITAL,CARTOES_PF_LEGADO,CARTOES_PJ_LEGADO,CHANGE_LEGADO,CONSIGNADO,CONSORCIO_LEGADO,CREDITO_DIGITAL,CREDITO_LEGADO,IMOBILIARIO_LEGADO,ROTATIVO_CONTA_CORRENTE_LEGADO,ROTATIVO_CREDITO_DIGITAL,ROTATIVO_CREDITO_LEGADO'
const mod = 'A01,A02,A04,A05,A99,B01,B02,B03,B04,B05,B06,B07,B99,C01,D01,E01,E02,F01,G01'

describe('[CONTESTAÇÃO - DETALHE]: RISC02-909/910/911/912/913', () => {
    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?codigoOcorrencia=0&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
        , { fixture: 'ListContestacaoCredLeg.json' }).as('ContestacaoCred');

    }) 

    /* beforeEach(() => {
        cy.intercept('GET','cadastro-positivo/v1/gestor_banco_dados/', { fixture: 'Gbd.json' }).as('gbd')
        cy.intercept('GET','cadastro-positivo/v1/area_responsavel/', { fixture: 'AreaResponsavel.json' }).as('area')
    }); */

    const dataAcolhimento = 'A data indicada refere-se ao momento em que o associado realizou a contestação no Gestor de Banco de Dados.';
    const dataRemessaCabecalho = 'A data indicada refere-se ao momento em que recepcionamos o arquivo no Sicredi.'
    const dataRemessaOperacao = 'A data indicada refere-se ao momento em que foi realizado o envio das informações/operações no histórico de crédito semanal, através do sistema Cadastro Positivo.'
    const dataApuracaoOperacao = 'A data indicada refere-se ao momento em que o produto disponibilizou as informações/operações para o envio do histórico de crédito semanal.'

    it('Validar informativo Data Remessa(cabeçalho), Data Acolhimento, Data Apuração e Data Remessa(Operação) - PARCELADO', () => {
        cy.allure().story('RISC02-909/910/911/912/913')
        Modulos.acessarContestacoes();
        //cy.wait('@area')
        //cy.wait('@gbd')
        cy.wait('@ContestacaoCred')
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/v1/contestacao/detalhe/26000017'
        , { fixture: 'ContestacaoDetalhe/CreditoLegado.json' }).as('CredLeg');
        ListagemContestacao.clicarBtnVisualizar()
        //cy.wait('@area')
        //cy.wait('@gbd')
        cy.wait('@CredLeg')
        DetContestacao.validarMensagemDataAcolhimento(dataAcolhimento)
        DetContestacao.validarMensagemDataRemessaCabecalho(dataRemessaCabecalho)
        DetContestacao.validarMensagemDataRemessaOperacao(dataRemessaOperacao)
        DetContestacao.validarMensagemDataApuracaoOperacao(dataApuracaoOperacao)

        cy.contains('Módulo').click({force : true})
    });

     it('Validar informativo Data Remessa(cabeçalho), Data Acolhimento, Data Apuração e Data Remessa(Operação)) - CARTÃO ', () => {
        cy.allure().story('RISC02-909/910/911/912/913')
        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?codigoOcorrencia=0&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
        , { fixture: 'ListContestacaoCartao.json' }).as('ContestacaoCartao'); 
        Modulos.acessarContestacoes();
       // cy.wait('@area')
        //cy.wait('@gbd')
        cy.wait('@ContestacaoCartao')
        cy.wait(1000)
        cy.intercept('GET', 'cadastro-positivo/v1/contestacao/detalhe/99600020'
        , { fixture: 'ContestacaoDetalhe/CartaoDigital.json' }).as('CartaoDig');
        ListagemContestacao.clicarBtnVisualizar()
       // cy.wait('@area')
       // cy.wait('@gbd')
        cy.wait('@CartaoDig')
        DetContestacao.validarMensagemDataAcolhimento(dataAcolhimento)
        DetContestacao.validarMensagemDataRemessaCabecalho(dataRemessaCabecalho)
        DetContestacao.validarMensagemDataRemessaOperacao(dataRemessaOperacao)
        DetContestacao.validarMensagemDataApuracaoOperacao(dataApuracaoOperacao)

        cy.contains('Módulo').click({force : true})
    });

    it('Validar informativo Data Remessa(cabeçalho), Data Acolhimento, Data Apuração e Data Remessa(Operação)) - ROTATIVO ', () => {
        cy.allure().story('RISC02-909/910/911/912/913')
        cy.intercept('GET', 'cadastro-positivo/v1/contestacao?codigoOcorrencia=0&origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
        , { fixture: 'ListContestacaoConsorcio.json' }).as('ContestacaoRotativo'); 
        Modulos.acessarContestacoes();
       // cy.wait('@area')
       // cy.wait('@gbd')
        cy.wait('@ContestacaoRotativo')
        cy.intercept('GET', 'cadastro-positivo/v1/contestacao/detalhe/100800022'
        , { fixture: 'ContestacaoDetalhe/Rotativo.json' }).as('Rotativo');
        ListagemContestacao.clicarBtnVisualizar()
       // cy.wait('@area')
      //  cy.wait('@gbd')
        cy.wait('@Rotativo')
        DetContestacao.validarMensagemDataAcolhimento(dataAcolhimento)
        DetContestacao.validarMensagemDataRemessaCabecalho(dataRemessaCabecalho)
        DetContestacao.validarMensagemDataRemessaOperacao(dataRemessaOperacao)
        DetContestacao.validarMensagemDataApuracaoOperacao(dataApuracaoOperacao)

        cy.contains('Módulo').click({force : true})
    });
});