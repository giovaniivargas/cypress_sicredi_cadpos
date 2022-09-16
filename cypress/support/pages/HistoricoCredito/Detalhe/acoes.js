const el = require('./elementos').ELEMENTOS;

class DetalheHC {
       validarMensagemDataRemessaCabecalho(mensagemBalao) {
        //cy.get(el.mensagemInfoDtRemessaCabecalho).click()
        cy.get(el.mensagemInfoDtRemessaCabecalho)
            .trigger('mouseenter')
            .get('.popover-body').invoke('text').then(textoBalao => {
                expect(textoBalao.trim()).to.eq(mensagemBalao)
            })
        
    }
    
    validarMensagemDataApuracaoOperacao(mensagemBalao) {
        cy.get(el.mensagemInfoDtApuracaoOperacao).click()
        cy.get(el.mensagemInfoDtApuracaoOperacao)
            .trigger('mouseenter')
            .get('.popover-body').invoke('text').then(textoBalao => {
                expect(textoBalao.trim()).to.eq(mensagemBalao)
            })
        
    }
}

export default new DetalheHC();