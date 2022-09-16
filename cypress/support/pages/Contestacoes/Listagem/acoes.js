const el = require('./elementos').ELEMENTOS;

class ListagemContestacao {
    buscarCpfCnpj(cpfCnpj) {
        cy.get(el.filtroCpfCnpj).clear().type(cpfCnpj);

    }

    buscarStatus(status) {
        cy.get(el.comboStatus).select(status);

    }

    clicarGuiaFiltros() {
        cy.get(el.guiaFiltros).click();

    }

    clicarGuiaIndicadores() {
        cy.get(el.guiaIndicadores).click();

    }

    clicarBtnPesquisar() {
        cy.get(el.btnPesquisar).click();
    }

    clicarBtnVisualizar() {
        cy.get(el.btnVisualizar).click();
    }

    validarBtnEditarVisivel() {
        cy.get(el.btnEditar).scrollIntoView().should('be.visible');
    }

    validarIconeRelogioVisivel() {
        cy.get(el.iconeRelogio).should('be.visible');
    }

    validarBtnEditarInvisivel() {
        cy.get(el.btnEditar).should('not.exist');
    }

    validarIconeRelogioInvisivel() {
        cy.get(el.iconeRelogio).should('not.exist');
    }

    validarIndicadores(api) {
        cy.get(api).then(resp => {
            cy.get(el.totalContestacoes)
                .invoke('text')
                .then(totalCont => { 
                    expect(totalCont).to.contain(resp.response.body.totalContestacoesMesAtual) 
                })
            cy.get(el.totalRespondidas)
            .invoke('text')
            .then(totalResp =>{
                expect(totalResp).to.contain(resp.response.body.totalContestacoesRespondidas)
            })
            cy.get(el.totalDentroPrazo)
            .invoke('text')
            .then(totalDentPrazo =>{
                expect(totalDentPrazo).to.contain(resp.response.body.qtdDentroPrazo)
            })
            cy.get(el.totalForaPrazo)
            .invoke('text')
            .then(totalForPrazo =>{
                expect(totalForPrazo).to.contain(resp.response.body.qtdForaPrazo)
            })
            cy.get(el.porcentagem)
            .invoke('text')
            .then(porc =>{
                expect(porc).to.contain(resp.response.body.percentualDoTotalDeContestacoesRespondidas+'%')
            })
        })
    }

    validarStatus(mensagemStatus) {
        cy.get(el.mensagemStatus).invoke('text').then(status => {
            expect(status.trim()).to.eq(mensagemStatus)
        })
    }

    validarMensagemBalao(mensagemBalao) {
        cy.get(el.balaoMensagem)
            .trigger('mouseenter')
            .get('.popover-body').invoke('text').then(textoBalao => {
                expect(textoBalao.trim()).to.eq(mensagemBalao)
            })
    }

    validarMensagemRegNaoEncontrado(){
        cy.get(el.mensagemRegNaoEnc).invoke('text').then(mensagem => {
            expect(mensagem).to.eq('Não foram encontrados registros para a pesquisa realizada.')
        })
    }

}

export default new ListagemContestacao();