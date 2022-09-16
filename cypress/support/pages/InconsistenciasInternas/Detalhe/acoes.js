const el = require('./elementos').ELEMENTOS;

class DetalheII {
    
    clicarParcelas(parcelas) {
        cy.contains(parcelas).click();

    }

    validarMensagemSemParcelas(mensagemSemParc) {
        cy.get(el.parcelasFutVazia).invoke('text').then(semParc => {
            expect(semParc).to.eq(mensagemSemParc)
        })
    }

}

export default new DetalheII();