/// <reference types="cypress" />

Cypress.Commands.add('ddd',(alias) =>{
    let dddFront = []
    cy.get('#idListaTelefones #idDDD').each(($ddd, index) => {
        dddFront.push(Cypress.$($ddd).text().trim())
    })

    cy.get(alias).then(xhr => {
        xhr.response.body.telefones.forEach((end, i) => {
            if (dddFront[i] == '') {
                dddFront[i] = null;
                expect(xhr.response.body.telefones[i].ddd).to.eq(dddFront[i])
            } else
                expect(xhr.response.body.telefones[i].ddd).to.eq(dddFront[i])
        })
    })
})

Cypress.Commands.add('telefone',(alias) =>{
    let telefoneFront = []
    cy.get('#idListaTelefones #idTelefone').each(($telefone, index) => {
        telefoneFront.push(Cypress.$($telefone).text().trim())
    })

    cy.get(alias).then(xhr => {
        xhr.response.body.telefones.forEach((end, i) => {
            if (telefoneFront[i] == '') {
                telefoneFront[i] = null;
                expect(xhr.response.body.telefones[i].telefone).to.eq(telefoneFront[i])
            } else
                expect(xhr.response.body.telefones[i].telefone).to.eq(telefoneFront[i])
        })
    })

})