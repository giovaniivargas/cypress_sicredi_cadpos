import Modulos from '../../../../support/pages/Modulos/acoes'
import { usuarioAdm } from '../../../../base-test/const-login';

describe('[CONFIGURAÇÕES - BLOCKLIST INATIVAR] Suite de Teste de Cadastro na Blocklist Inativar', () => {
    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        Modulos.acessarConfiguracoes()
        cy.intercept('GET', 'cadastro-positivo/v1/blocklist/ativo?page=0&pageSize=10').as('listaBlAtiva');
        Modulos.acessarSubModuloBlocklistInativar()
    });
    it('Valida texto busca sem registro', () => {
        cy.get('#formCpfCnpj').type('11111111111')
        cy.get('#idFiltrar').click();
        cy.get(' span > h4').should('have.text','Não foram encontrados registros para a pesquisa realizada.')
    }); 
});