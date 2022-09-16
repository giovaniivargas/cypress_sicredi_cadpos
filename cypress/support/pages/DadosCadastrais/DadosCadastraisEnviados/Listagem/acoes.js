const el = require('./elementos').ELEMENTOS;

class ListagemDadosCadEnviados {
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

export default new ListagemDadosCadEnviados();