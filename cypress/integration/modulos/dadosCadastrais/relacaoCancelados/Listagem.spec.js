import { urlLogin } from '../../../../base-test/routes';
import { usuarioAdm } from '../../../../base-test/const-login'

describe('[DADOS CADASTRAIS - RALAÇÃO CANCELADOS] RISC02-437 Submódulo de Relação de Cancelados dos dados cadastrais - Listagem', () => {
    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado'); 
        cy.intercept('GET', '/cadastro-positivo/v1/cancelados/max_data_remessa').as('maxdtremessa');
        cy.intercept('GET', '/cadastro-positivo/v1/cancelados/listar/?page=0&pageSize=10').as('inicialTela');
        cy.contains(' Ir para Dados Cadastrais').click();
        cy.contains(' Ir para Cancelados').click();
        
  
    });
    it('Valida titulo da pagina', () => {
        cy.allure().story('RISC02-437')
        cy.get('.card-title').should('have.text', 'Dados Cadastrais Cancelados')
        cy.get('.card-category').should('have.text', 'Lista de Dados Cadastrais Cancelados')
    });

    it('Busca por CPF', () => {
        cy.allure().story('RISC02-437')
        const cpf = '10023280980'
        const dtRms= '2021-11-02'

        cy.get('#idCpfCnpj').type(cpf)
        cy.get('#txtDataRemessa').clear().type(dtRms)
        cy.intercept('GET','cadastro-positivo/v1/cancelados/listar/?page=0&pageSize=10&identificacaoCliente='+cpf+'&dataRemessa='+dtRms
        ,{fixture: 'RC/RelacaoCanceladosCPF.json'}).as('buscaCPF')
        cy.get('#idPesquisarFiltro').click()
        cy.wait('@buscaCPF')
         cy.get('tbody').each(($elemento, indice, $lista) => {
            cy.get($elemento).find('td:nth-child(4)')
            .invoke('text').then(textCpf =>{
                const cpfFormat = textCpf.replace('.','').replace('.','').replace('-','').trim()
                expect(cpfFormat).to.equal(cpf)
            })
        })
        
        
    });

    it('Valida texto busca sem registro', () => {
        cy.get('#idCpfCnpj').clear().type('11111111111')
        cy.get('#idPesquisarFiltro').click();
        cy.get(' span > h4').should('have.text','Não foram encontrados registros para a pesquisa realizada.')
    });

       after(() => {
        cy.contains('Módulo').click();
      }) 
});  