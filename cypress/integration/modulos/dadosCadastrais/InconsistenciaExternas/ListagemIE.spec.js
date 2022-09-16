/* import { urlLogin } from '../../../../base-test/routes';
import { usuarioAdm } from '../../../../base-test/const-login'


describe('RISC02-421 [Dados Cadastrais] Submódulo de inconsistências externas dos dados cadastrais - Listagem', () => {
    before(() => {
        cy.visit('/');
        cy.loginCadPos(usuarioAdm.username, usuarioAdm.password); 
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        cy.contains(' Ir para Dados Cadastrais').click();
        cy.contains(' Ir para Externas').click();
 
    });

    it('Validar buscar por CPF', () => {
        const cpf = '10802694950';

        cy.get('#idCpfCnpj').type(cpf);
        cy.get('#idPesquisarFiltro').click();
        cy.wait(2000);
        cy.get('tbody tr').each(($elemento, indice, $lista) => {
            cy.get($elemento).find('[style="max-width: 200px; min-width: 200px;"]')
                .invoke('text').then(textCpf => {
                    const textFormatCpf = textCpf.replace('.', '').replace('.', '').replace('-', '').trim();
                    expect(textFormatCpf).to.equal(cpf )
                })
        })
    });

    after(() => {
        cy.contains('Módulo').click();
      })

}); */