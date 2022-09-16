/// <reference types="cypress" />

Cypress.Commands.add('loginCadPos',(username, password) =>{
    cy.get('#fieldUser').type(username);
    cy.get('input[id=fieldPassword]').type(password);
    cy.get('input[id=btnSubmit]').click();
});
