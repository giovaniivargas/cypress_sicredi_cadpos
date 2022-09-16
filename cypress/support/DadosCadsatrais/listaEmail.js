/// <reference types="cypress" />

Cypress.Commands.add('email', (alias) => {
    let emailFront = []
    cy.get('#idListaEmails #idEmail').each(($email, index) => {
        emailFront.push(Cypress.$($email).text().trim())
    })

    cy.get(alias).then(xhr => {
        xhr.response.body.emails.forEach((end, i) => {
            if (emailFront[i] == '') {
                emailFront[i] = null;
                expect(xhr.response.body.emails[i].email).to.eq(emailFront[i])
            } else
                expect(xhr.response.body.emails[i].email).to.eq(emailFront[i])
        })
    })

})