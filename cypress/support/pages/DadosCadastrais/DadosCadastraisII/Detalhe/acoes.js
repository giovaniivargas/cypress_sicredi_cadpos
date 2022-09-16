const el = require('./elementos').ELEMENTOS;

class DetalheDadosCadII {
    validarTituloPagina() {
        cy.get(el.tituloPagina).should('contain', ' Detalhamento Inconsistências Internas ')
    }

    validarCabecalho(api) {
        cy.wait(api)
            .then(xhr => {
                if (xhr.response.body.tipoCliente == 2) {
                    const pessoaJuridica = 'PJ';
                    cy.get(el.tipoCliente).should('contain', pessoaJuridica)
                }
                cy.get(el.cpfCnpjCabecalho).invoke('text').then(textcnpj => {
                    const textcnpjFormat = textcnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');
                    const cnpjAPI = xhr.response.body.identificacaoCliente;
                    const cnpjAPIFormat = cnpjAPI.padStart(14, '0');

                    expect(textcnpjFormat).to.eq(cnpjAPIFormat);
                });
                cy.get(el.nomeCabecalho).should('contain', xhr.response.body.nomeCliente)

            });
    }
}

export default new DetalheDadosCadII();