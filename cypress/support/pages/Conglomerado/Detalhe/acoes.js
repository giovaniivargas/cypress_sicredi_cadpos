const el = require('./elementos').ELEMENTOS;

class DetalheConglomerado {
    
    clicarSanfona(tituloSanfona){
        cy.contains(tituloSanfona).click();
    }


    ocultarElemento(elemento){
        cy.get(elemento).should('not.exist');
    }

    clicarVoltar(){
        cy.get(el.btnVoltar).click();
    }

    clicarEditarConsumidor(){
        cy.get(el.btnEditarConsumidor).click();
    }

    clicarAddConsumidor(){
        cy.get(el.btnAddConsumidor).click();
    }

    clicarFecharModal(){
        cy.get(el.btnFecharModal).click();
    }

    validarTipoTelfoneComApi(api){
        let tipoTel = []
        cy.get(el.selectTipoTelefone).each(($option, index) => {
            tipoTel.push(Cypress.$($option).text().trim())
        })
        cy.get(api).then(response => {
            response.body.content.forEach((st, i) => {
                expect(response.body.content[i].descricao).to.eq(tipoTel[i + 1])
            });
        })
    }

}

export default new DetalheConglomerado();