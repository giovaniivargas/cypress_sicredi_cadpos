const el = require('./elementos').ELEMENTOS;

class ListagemII {
    //Sanfona
    clicarGuiaFiltros() {
        cy.get(el.guiaFiltros).click();

    }
    clicarGuiaIndicadores() {
        cy.get(el.guiaIndicadores).click();

    }

    validarMensagemStatus(mensagemStatus) {
        cy.get(el.mensagemStatus).invoke('text').then(status => {
            expect(status.trim()).to.eq(mensagemStatus)
        })
    }

    validarMensagemBalao(mensagemBalao) {
        cy.wait(2000)
        cy.get(el.balaoMensagem)
            .trigger('mouseenter')
            .get('.popover-body').invoke('text').then(textoBalao => {
                expect(textoBalao.trim()).to.eq(mensagemBalao)
            })
    }

    validarMensagemBalaoERRO_00() {
        cy.get(el.balaoInformativoErro_00).click({ force: true });
        cy.get(el.balaoInformativoErro_00)
            .trigger('mouseenter')
             .get('.popover-body').invoke('text').then(textoBalao => {
                expect(textoBalao.trim()).to.eq('O valor indica a quantidade de operações rejeitadas de responsabilidade da área. O ERRO_00 contém os associados'
                +' que solicitaram cancelamento perante a CIP, sendo o valor responsabilidade do sistema.')
            }) 
    }

    //Indicadores
    validarIndicadores(api) {
        cy.wait(api).then(resp => {
            cy.get(el.recebeOrigem)
                .invoke('text')
                .then(recOr => { 
                    expect(recOr.replace('.','')).to.contain(resp.response.body.totalDeOperacoesRecebidasDaOrigem) 
                })
             cy.get(el.envioCIP)
            .invoke('text')
            .then(envCIP =>{
                expect(envCIP.replace('.','')).to.contain(resp.response.body.totalDeOperacoesDistintasEnviadasCIP)
            })
            cy.get(el.rejInterno)
            .invoke('text')
            .then(rejInt =>{
                expect(rejInt.replace('.','')).to.contain(resp.response.body.totalRejeitadosInternosSemErroZero)
            })
            cy.get(el.porcentagem)
            .invoke('text')
            .then(porc =>{
                expect(porc.replace(',','.')).to.contain(resp.response.body.percentual+'%')
            }) 
        })
    }

    //Filtros
    preencherCpfCnpj(cpf) {
        cy.get(el.filtroCpfCnpj).clear().type(cpf);

    }

    clicarPesquisar() {
        cy.get(el.btnPesquisar).click();

    }

    //Lista
    clicarVisualizar(){
        cy.get(el.btnVisualizar).click();
    }

}

export default new ListagemII();