/* import { usuarioAdm } from '../../../base-test/const-login';
import Modulos from '../../../support/pages/Modulos/acoes';

describe('[HC - LISTAGEM] RISC02-502 - Alteração da aplicação no Front para buscar as informações da Área Responsável (Filtro)', () => {
    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        cy.intercept('GET','cadastro-positivo/v1/area_responsavel/').as('areaResponsavelFiltro');
        Modulos.acessarHC();
    }) 

    it('Valida a quantidade e descrição da AREA RESPONSAVEL com a API', () => {
        cy.allure().story('RISC02-502')
        let descAreaResp = []
        cy.get('#selectAreaResponsavel option').each(($option, index) => {
            descAreaResp.push(Cypress.$($option).text().trim())
        })
        cy.wait('@areaResponsavelFiltro').then(xhr => {
            const quantidadeElementos = xhr.response.body.totalElements + 1;
            cy.get('#selectAreaResponsavel option').should('have.length', quantidadeElementos); 
            xhr.response.body.content.forEach((st, i) => {
                expect(xhr.response.body.content[i].descricao).to.eq(descAreaResp[i+1])
            });
        })
    });

    after(() => {
        cy.contains('Módulo').click();
    })  
}); */