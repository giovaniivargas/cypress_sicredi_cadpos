const el = require('./elementos').ELEMENTOS;

class ListagemHC {
    
 
    preencherCpfCnpj(cpfCnpj){
        cy.get(el.filtroCpfCnpj).clear().type(cpfCnpj);
    }

    clicarCalendarioInicial(){
        cy.get(el.calendarioInicial).click();
    }

    selecionarData(ano,mes,elDtCompleto){
        cy.get(el.anoCalendario).select(ano)
        cy.get(el.mesCalendario).select(mes)
        cy.get(elDtCompleto).click();
    }

    clicarCalendarioFinal(){
        cy.get(el.calendarioFinal).click();
    }
    

    clicarPesquisar(){
        cy.get(el.btnPesquisar).click();
    }

    clicarVisualizar(){
        cy.get(el.btnVisualizar).click();
    }

    

}

export default new ListagemHC();