const el = require('./elementos').ELEMENTOS;

class DetalheContestacao {
    validarMensagemDataAcolhimento(mensagemBalao) {
        cy.get(el.mensagemInfoDtAcolhimento)
            .trigger('mouseenter')
            .get('.popover-body').invoke('text').then(textoBalao => {
                expect(textoBalao.trim()).to.eq(mensagemBalao)
            })
    }

    validarMensagemDataRemessaCabecalho(mensagemBalao) {
        cy.get(el.mensagemInfoDtRemessaCabecalho).click()
        cy.get(el.mensagemInfoDtRemessaCabecalho)
            .trigger('mouseenter')
            .get('.popover-body').invoke('text').then(textoBalao => {
                expect(textoBalao.trim()).to.eq(mensagemBalao)
            })
        
    }

    validarMensagemDataRemessaOperacao(mensagemBalao) {
        cy.get(el.mensagemInfoDtRemessaOperacao).click()
        cy.get(el.mensagemInfoDtRemessaOperacao)
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

export default new DetalheContestacao();