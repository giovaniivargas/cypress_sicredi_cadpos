 import Modulos from '../../../../support/pages/Modulos/acoes'
import { usuarioAdm } from '../../../../base-test/const-login';
import BlocklistPage from '../../../../support/pages/Blocklist/acoes'

describe('[CONFIGURAÇÕES - BLOCKLIST ATIVAR] Suite de Teste de Cadastro na Blocklist Ativar', () => {
    before(() => {
        cy.visit('/');
        cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        Modulos.acessarConfiguracoes()
        cy.intercept('GET', 'cadastro-positivo/v1/blocklist/ativo?page=0&pageSize=10').as('listaBlAtiva');
        Modulos.acessarSubModuloBlocklistAtivar()
        
    })

    it('Validar Cadastro com CPF INCIANDO com Zero', () => {
        const cpfZero ='06598545213'
        const motivo = 'Teste de automação CPF iniciando com ZERO'
        cy.wait('@listaBlAtiva')
        BlocklistPage.preencherCamposCpfCnpjMotivo(cpfZero,motivo)
         cy.intercept('PUT','cadastro-positivo/v1/blocklist/ativo'
        ,{

        }).as('cad') 
        BlocklistPage.clicarBtnSalvar()
        BlocklistPage.validarRequest('@cad',cpfZero,usuarioAdm.username,motivo)
        cy.contains('Configurações').click()
    });

      after(() => {
        cy.contains('Módulo').click();
    })  
}); 