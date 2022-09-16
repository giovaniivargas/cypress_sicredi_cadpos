import { urlLogin } from '../../../../base-test/routes';
import { usuarioAdm } from '../../../../base-test/const-login'

describe('[DADOS CADASTRAIS - ENVIADOS - LISTAGEM] RISC02-420 [Dados Cadastrais] Submódulo de Dados Cadastrais Enviados - Listagem', () => {

before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET','cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado'); 
        cy.contains(' Ir para Dados Cadastrais').click();
        cy.contains(' Ir para Enviados').click();
       
});

    it('Validar buscar por CPF', () => {
        cy.allure().story('RISC02-420')
        const cpf = '01029530076';

        cy.get('#idCpfCnpj').clear().type(cpf);
        cy.get('#idPesquisarFiltro').click();
        cy.wait(2000);
         cy.get('tbody tr').each(($elemento, indice, $lista) =>{
            cy.get($elemento).find('[style="max-width: 20px; min-width: 20px;"]')
            .invoke('text').then(textCpf =>{
              const  textFormatCpf = textCpf.replace('.','').replace('.','').replace('-','').trim()
              expect(textFormatCpf).to.equal(cpf)
            })
        })        
    });

    it('Validar buscar por CNPJ', () => {
        cy.allure().story('RISC02-420')
        const cnpj = '09012152000189';

        cy.get('#idCpfCnpj').clear().type(cnpj);
        cy.get('#idPesquisarFiltro').click();
        cy.wait(2000);
        cy.get('tbody tr').each(($elemento, indice, $lista) =>{
            cy.get($elemento).find('[style="max-width: 20px; min-width: 20px;"]')
            .invoke('text').then(textCnpj =>{
              const  textFormatCnpj = textCnpj.replace('.','').replace('.','').replace('/','').replace('-','').trim()
              expect(textFormatCnpj).to.equal(cnpj)
            })
        })         
    });

    it('Validar buscar por CPF com o tipo CNPJ', () => {
        cy.allure().story('RISC02-420')
        const cpf = '01029530076';

        cy.get('#idCpfCnpj').clear().type(cpf);
        cy.get('#selectTipo').select('PJ');
        cy.get('#idPesquisarFiltro').click();
        cy.wait(2000);
        cy.get(' span > h4').should('have.text','Não foram encontrados registros para a pesquisa realizada.')    
    });

    it('Validar buscar por CNPJ com o tipo CPF', () => {
        cy.allure().story('RISC02-420')
        const cnpj = '09012152000189';

        cy.get('#idCpfCnpj').clear().type(cnpj);
        cy.get('#selectTipo').select('PF');
        cy.get('#idPesquisarFiltro').click();
        cy.wait(2000);
        cy.get(' span > h4').should('have.text','Não foram encontrados registros para a pesquisa realizada.')   
    });
    

    it('Valida busca somente pelo campo Tipo PF', () => {
        cy.allure().story('RISC02-420')
        cy.get('#idCpfCnpj').clear();
        cy.get('#selectTipo').select('PF');
        cy.get('#idPesquisarFiltro').click();
        cy.wait(5000);
        cy.get('tbody tr').each(($elemento, indice, $lista) =>{
            cy.get($elemento).find('[style="text-align: center;"]')
            .invoke('text').then(textPF =>{
                expect(textPF.trim()).to.equal('PF')
            })
        })
    });

    it('Valida busca somente pelo campo Tipo PJ', () => {
        cy.allure().story('RISC02-420')
        cy.get('#selectTipo').select('PJ');
        cy.get('#idPesquisarFiltro').click();
        cy.wait(5000);
        cy.get('tbody tr').each(($elemento, indice, $lista) =>{
            cy.get($elemento).find('[style="text-align: center;"]')
            .invoke('text').then(textPJ =>{
                expect(textPJ.trim()).to.equal('PJ')
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