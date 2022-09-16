/* import Modulos from '../../../support/pages/Modulos/acoes';
import ListHistCont from '../../../support/pages/HistoriocoContestacoes/Listagem/acoes'
import DetHistCont from '../../../support/pages/HistoriocoContestacoes/Detalhe/acoes'
import { usuarioAdm } from '../../../base-test/const-login';


describe('[HISTORICO CONTESTACAO] - SD 67660', () => {
    const origem_info ='CARTOES_DIGITAL,CARTOES_PF_LEGADO,CARTOES_PJ_LEGADO,CHANGE_LEGADO,CONSIGNADO,CONSORCIO_LEGADO,CREDITO_DIGITAL,CREDITO_LEGADO,IMOBILIARIO_LEGADO,ROTATIVO_CONTA_CORRENTE_LEGADO,ROTATIVO_CREDITO_DIGITAL,ROTATIVO_CREDITO_LEGADO'
    const mod = 'A01,A02,A04,A05,A99,B01,B02,B03,B04,B05,B06,B07,B99,C01,D01,E01,E02,F01,G01'
    
    before(() => {
        cy.visit('/');
        cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        cy.intercept('GET', 'cadastro-positivo/contestacao/historico?origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10')
            .as('HistCont');
        Modulos.acessarHistóricoContestacoes();

    }) 

    it('Validar acesso a contestação do tipo Cliente', () => {
        cy.allure().story('SD-67660')
        const cpf ='11414800932'
        cy.wait('@HistCont')
        ListHistCont.clicarGuiaFiltros()
        ListHistCont.preencherCpfCnpj(cpf)
        ListHistCont.clicarPesquisar()
        cy.wait(1000)
        cy.intercept('GET','cadastro-positivo/contestacao/historico/detalhe/1000010').as('det')
        ListHistCont.clicarVisualizar()
        cy.wait('@det')
        DetHistCont.validarCpfCnpj(cpf)

        cy.contains('Módulo').click();
    });

   describe('[HISTORICO CONTESTAÇÃO - DETALHE]: RISC02-918/919/920/921/922', () => {
    beforeEach(() => {
        cy.intercept('GET','cadastro-positivo/v1/gestor_banco_dados/', { fixture: 'Gbd.json' }).as('gbd')
        cy.intercept('GET','cadastro-positivo/v1/area_responsavel/', { fixture: 'AreaResponsavel.json' }).as('area')
    });
     it('Validar informativo Data Remessa(cabeçalho), Data Acolhimento, Data Apuração e Data Remessa(Operação) - PARCELADO', () => {
        cy.allure().story('RISC02-918/919/920/921/922')
        cy.intercept('GET', 'cadastro-positivo/contestacao/historico?origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
        , { fixture: 'HistContestacao/ListHistContParcelado.json' }).as('HistContParc'); 
        Modulos.acessarHistóricoContestacoes();
        cy.wait('@area')
        cy.wait('@gbd')
        cy.wait('@HistContParc')
         cy.intercept('GET', 'cadastro-positivo/contestacao/historico/detalhe/113700026'
        , { fixture: 'HistContestacao/DetHistContestacao/DetHistContParc.json' }).as('DetParc');
        ListHistCont.clicarVisualizar()
        cy.wait(2000)
        cy.wait('@area')
        cy.wait('@gbd')
        cy.wait('@DetParc')  
    }); 

    it('Validar informativo Data Remessa(cabeçalho), Data Acolhimento, Data Apuração e Data Remessa(Operação) - CONSORCIO', () => {
        cy.allure().story('RISC02-918/919/920/921/922')
        cy.intercept('GET', 'cadastro-positivo/contestacao/historico?origemInformacao='+origem_info+'&modalidades='+mod+'&grupo=cadpos_adm&page=0&pageSize=10'
        , { fixture: 'HistContestacao/ListHistContConsorcio.json' }).as('HistContConsorcio'); 
        Modulos.acessarHistóricoContestacoes();
        cy.wait('@area')
        cy.wait('@gbd')
        cy.wait('@HistContConsorcio')
        cy.intercept('GET', 'cadastro-positivo/contestacao/historico/detalhe/4'
        , { fixture: 'HistContestacao/DetHistContestacao/DetHistContConsorcio.json' }).as('DetConsorcio');
        ListHistCont.clicarVisualizar()
    });

   });

      after(() => {
        cy.contains('Módulo').click();
    })   
});  */