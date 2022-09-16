const el = require('./elementos').ELEMENTOS;

class ListagemDadosCadII {
    buscarCpfCnpj(cpfCnpj) {
        cy.get(el.filtroCpfCnpj).clear().type(cpfCnpj);

    }

    clicarBtnPesquisar() {
        cy.get(el.btnPesquisar).click();
    }

    clicarBtnVisualizar() {
        cy.get(el.btnVisualizar).click();
    }
}

export default new ListagemDadosCadII();