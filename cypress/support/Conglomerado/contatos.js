Cypress.Commands.add('atendimentoConsumidor',(cnpj)=>{
    cy.intercept('GET','cadastro-positivo/v1/entidade/consumidor/'+cnpj
        ,{fixture: 'CG/DetPartBloq/DetACInativo.json'}).as('detACInativo')
})


Cypress.Commands.add('contatoTecnico',(cnpj)=>{
    cy.intercept('GET','cadastro-positivo/v1/entidade/contato_tecnico/'+cnpj
        ,{fixture: 'CG/DetPartBloq/DetCTInativo.json'}).as('detCTInativo')
})

Cypress.Commands.add('autorizadoLiminar',(cnpj)=>{
    cy.intercept('GET','cadastro-positivo/v1/entidade/contato_autorizado_liminar/'+cnpj
        ,{fixture: 'CG/DetPartBloq/DetALInativo.json'}).as('detALInativo')
})