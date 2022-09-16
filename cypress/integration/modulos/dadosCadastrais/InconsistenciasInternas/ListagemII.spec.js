import { urlLogin } from '../../../../base-test/routes';
import { usuarioAdm } from '../../../../base-test/const-login'


describe('[DADOS CADASTRAIS - II - LISTAGEM] RISC02-432 Submódulo de inconsistências internas dos dados cadastrais - Listagem', () => {

    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado'); 
        cy.intercept('GET', 'cadastro-positivo/v1/dados_cadastrais/envio/rejeitados/listar/?page=0&pageSize=10').as('iniciaInternas');
        cy.contains(' Ir para Dados Cadastrais').click();
        cy.contains(' Ir para Internas').click();
        cy.wait('@iniciaInternas');
    });

    it('Validar buscar por CPF', () => {
        cy.allure().story('RISC02-432')
        const cpf = '01250366550';

        cy.get('#idCpfCnpj').type(cpf);
        cy.get('#idPesquisarFiltro').click();
        cy.wait(2000);
        cy.get('tbody tr').each(($elemento, indice, $lista) => {
            cy.get($elemento).find('[style="max-width: 200px; min-width: 200px;"]')
                .invoke('text').then(textCpf => {
                    const textFormatCpf = textCpf.replace('.', '').replace('.', '').replace('-', '').trim()
                    expect(textFormatCpf).to.equal(cpf )
                })
        })
    });

    it('Validar buscar por CNPJ', () => {
        cy.allure().story('RISC02-432')
        const cnpj = '07144352000160';

        cy.get('#idCpfCnpj').clear().type(cnpj);
        cy.get('#idPesquisarFiltro').click();
        cy.wait(2000);
        cy.get('tbody tr').each(($elemento, indice, $lista) =>{
            cy.get($elemento).find('[style="max-width: 200px; min-width: 200px;"]')
            .invoke('text').then(textCnpj =>{
              const  textFormatCnpj = textCnpj.replace('.','').replace('.','').replace('/','').replace('-','').trim()
              expect(textFormatCnpj).to.equal(cnpj)
            })
        })         
    });

    it('Validar buscar por CPF com o tipo CNPJ', () => {
        cy.allure().story('RISC02-432')
        const cpf = '01250366550';

        cy.get('#idCpfCnpj').clear().type(cpf);
        cy.get('#selectTipo').select('PJ');
        cy.get('#idPesquisarFiltro').click();
        cy.wait(2000);
        cy.get('span > h4').should('have.text','Não foram encontrados registros para a pesquisa realizada.')    
    });

    it('Validar buscar por CNPJ com o tipo CPF', () => {
        cy.allure().story('RISC02-432')
        const cnpj = '07144352000160';

        cy.get('#idCpfCnpj').clear().type(cnpj);
        cy.get('#selectTipo').select('PF');
        cy.get('#idPesquisarFiltro').click();
        cy.wait(2000);
        cy.get('span > h4').should('have.text','Não foram encontrados registros para a pesquisa realizada.')       
    });

    it('Valida busca somente pelo campo Tipo PF', () => {
        cy.allure().story('RISC02-432')
        cy.get('#idCpfCnpj').clear();
        cy.get('#selectTipo').select('PF');
        cy.get('#idPesquisarFiltro').click();
        cy.wait(5000);
        cy.get('tbody tr').each(($elemento, indice, $lista) =>{
            cy.get($elemento).find('[style="text-align: center;"]')
            .invoke('text').then(textPF =>{
                const  textFormatPF = textPF.trim()
                expect(textFormatPF).to.equal('PF')
            })
        })
    });

    it('Valida busca somente pelo campo Tipo PJ', () => {
        cy.allure().story('RISC02-432')
        cy.get('#selectTipo').select('PJ');
        cy.get('#idPesquisarFiltro').click();
        cy.wait(5000);
        cy.get('tbody tr').each(($elemento, indice, $lista) =>{
            cy.get($elemento).find('[style="text-align: center;"]')
            .invoke('text').then(textPJ =>{
                const  textFormatPj = textPJ.trim()
                expect(textFormatPj).to.equal('PJ')
            })
        })
    });

    after(() => {
        cy.contains('Módulo').click();
      })
}); 