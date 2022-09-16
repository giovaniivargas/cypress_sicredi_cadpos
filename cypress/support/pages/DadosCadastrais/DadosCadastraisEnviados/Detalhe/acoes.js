const el = require('./elementos').ELEMENTOS;

class DetalheDadosCadEnviados {

    validarTituloPagina() {
        cy.get(el.tituloPagina).should('contain', ' Detalhamento Dados Cadastrais ')
    }

    validarCabecalho(api) {
        cy.wait(api)
            .then(xhr => {
                if (xhr.response.body.tipoCliente == 1) {
                    const pessoaFisica = 'PF';
                    cy.get(el.tipoCliente).should('contain', pessoaFisica)
                }
                cy.get(el.cpfCnpjCabecalho).invoke('text').then(textcpf => {
                    const textcpfFormat = textcpf.replace('.', '').replace('.', '').replace('-', '');
                    const cpfAPI = xhr.response.body.identificacaoCliente;
                    const cpfAPIFormat = cpfAPI.padStart(11, '0');

                    expect(textcpfFormat).to.eq(cpfAPIFormat);
                });
                cy.get(el.nomeCabecalho).should('contain', xhr.response.body.nomeCliente)

            });
    }

}

export default new DetalheDadosCadEnviados();