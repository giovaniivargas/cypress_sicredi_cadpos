/// <reference types="cypress" />

Cypress.Commands.add('logradouro', (alias) => {
    let logradouroFront = []
    cy.get('#idListaEnderecos #idLogradouro').each(($log, index) => {
        logradouroFront.push(Cypress.$($log).text().trim())
    })

    cy.get(alias).then(xhr => {
        xhr.response.body.enderecos.forEach((end, i) => {
            if (logradouroFront[i] == '') {
                logradouroFront[i] = null;
                expect(xhr.response.body.enderecos[i].logradouro).to.eq(logradouroFront[i])
            } else
                expect(xhr.response.body.enderecos[i].logradouro).to.eq(logradouroFront[i])
        })
    })

});

Cypress.Commands.add('numeroLogradouro', (alias) => {
    let numeroLogradouroFront = []
    cy.get('#idListaEnderecos #idNumeroLogradouro').each(($numerolog, index) => {
        numeroLogradouroFront.push(Cypress.$($numerolog).text().trim())
    })

    cy.get(alias).then(xhr => {
        xhr.response.body.enderecos.forEach((end, i) => {
            if (numeroLogradouroFront[i] == '') {
                numeroLogradouroFront[i] = null;
                expect(xhr.response.body.enderecos[i].numeroCliente).to.eq(numeroLogradouroFront[i])
            } else
                expect(xhr.response.body.enderecos[i].numeroCliente).to.eq(numeroLogradouroFront[i])
        })
    })

});

Cypress.Commands.add('complemento', (alias) => {
    let complementoFront = []
    cy.get('#idListaEnderecos #idComplemento').each(($comp, index) => {
        complementoFront.push(Cypress.$($comp).text().trim())
    })

    cy.get(alias).then(xhr => {
        xhr.response.body.enderecos.forEach((end, i) => {
            if (complementoFront[i] == '') {
                complementoFront[i] = null;
                expect(xhr.response.body.enderecos[i].complemento).to.eq(complementoFront[i])
            } else
                expect(xhr.response.body.enderecos[i].complemento).to.eq(complementoFront[i])
        })
    })

});

Cypress.Commands.add('bairro', (alias) => {
    let bairroFront = []
    cy.get('#idListaEnderecos #idBairro').each(($bai, index) => {
        bairroFront.push(Cypress.$($bai).text().trim())
    })

    cy.get(alias).then(xhr => {
        xhr.response.body.enderecos.forEach((end, i) => {
            if (bairroFront[i] == '') {
                bairroFront[i] = null;
                expect(xhr.response.body.enderecos[i].bairro).to.eq(bairroFront[i])
            } else
                expect(xhr.response.body.enderecos[i].bairro).to.eq(bairroFront[i])
        })
    })

});

Cypress.Commands.add('cep', (alias) => {
    let cepFront = []
    cy.get('#idListaEnderecos #idCep').each(($cep, index) => {
        cepFront.push(Cypress.$($cep).text().trim().replace('-', ''))
    })
    cy.get(alias).then(xhr => {
        xhr.response.body.enderecos.forEach((end, i) => {
            if (cepFront[i] == '') {
                cepFront[i] = null;
                expect(xhr.response.body.enderecos[i].cep).to.eq(cepFront[i])
            } else
                expect(xhr.response.body.enderecos[i].cep).to.eq(cepFront[i])
        })
    })

});

Cypress.Commands.add('municipio', (alias) => {
    let municipioFront = []
    cy.get('#idListaEnderecos #idMunicipio').each(($mun, index) => {
        municipioFront.push(Cypress.$($mun).text().trim())
    })

    cy.get(alias).then(xhr => {
        xhr.response.body.enderecos.forEach((end, i) => {
            if (municipioFront[i] == '') {
                municipioFront[i] = null;
                expect(xhr.response.body.enderecos[i].municipio).to.eq(municipioFront[i])
            } else
                expect(xhr.response.body.enderecos[i].municipio).to.eq(municipioFront[i])
        })
    })

});

Cypress.Commands.add('uf', (alias) => {
    let ufFront = []
    cy.get('#idListaEnderecos #idUF').each(($uf, index) => {
        ufFront.push(Cypress.$($uf).text().trim())
    })

    cy.get(alias).then(xhr => {
        xhr.response.body.enderecos.forEach((end, i) => {
            if (ufFront[i] == '') {
                ufFront[i] = null;
                expect(xhr.response.body.enderecos[i].uf).to.eq(ufFront[i])
            } else
                expect(xhr.response.body.enderecos[i].uf).to.eq(ufFront[i])
        })
    })

});
