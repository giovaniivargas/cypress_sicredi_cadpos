const el = require('./elementos').ELEMENTOS;

class ListHistContestacoes {
    
    clicarGuiaFiltros() {
        cy.get(el.guiaFiltros).click();

    }

    preencherCpfCnpj(cpfCnpj){
        cy.get(el.filtroCpfCnpj).type(cpfCnpj);
    }

    clicarPesquisar(){
        cy.get(el.btnPesquisar).click();
    }

    clicarVisualizar(){
        cy.get(el.btnVisualizar).click();
    }

    validarMensagemSemParcelas(mensagemSemParc) {
        cy.get(el.parcelasFutVazia).invoke('text').then(semParc => {
            expect(semParc).to.eq(mensagemSemParc)
        })
    }

}

export default new ListHistContestacoes();