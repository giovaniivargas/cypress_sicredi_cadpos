const el = require('./elementos').ELEMENTOS;

class ListagemIE {

    //Sanfona
    clicarGuiaFiltros() {
        cy.get(el.guiaFiltros).click();

    }

    clicarGuiaIndicadores() {
        cy.get(el.guiaIndicadores).click();

    }

    //Filtros
    clicarCalendarioFechado() {
        cy.get(el.calendarioFechado).click();
    }

    selecionarData(ano,mes){
        cy.get(el.ano).select(ano)
        cy.get(el.mes).select(mes)
        cy.wait(1000)
        cy.get('[aria-label="18-4-2022"]').click();
    }

    clicarPesquisar(){
        cy.get(el.btnPesquisar).click()
    }

    //Indicadores
    validarIndicadores(api) {
        cy.get(api).then(resp => {
            cy.get(el.enviadasCIP)
                .invoke('text')
                .then(totalEnv => { 
                    expect(totalEnv.replace('.','')).to.contain(resp.response.body.totalOperacoesDistintasEnviadasParaCIP) 
                })
            cy.get(el.validosCIP)
            .invoke('text')
            .then(totalVal =>{
                expect(totalVal.replace('.','')).to.contain(resp.response.body.totalOpDistValidasCIPMenosRejeitadasExternas)
            })
            cy.get(el.rejeitadosExternos)
            .invoke('text')
            .then(totalRej =>{
                expect(totalRej.replace('.','')).to.contain(resp.response.body.totalOpDistRejeitadasInconsistenciasExternas)
            })
            cy.get(el.porcentagem)
            .invoke('text')
            .then(porc =>{
                expect(porc.replace(',','.')).to.contain(resp.response.body.percentualRejeicaoCIPTotalOperacoesExternasEnviadas+'%')
            })
        })
    }

    validarStatus(mensagemStatus) {
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
            cy.get(el.balaoMensagem).click()
    }

}

export default new ListagemIE();