const el = require('./elementos').ELEMENTOS;

class Parametros {
    clicarCombobox(){
        cy.get(el.comboFechado).click();
    }

    digitarCombobox(nomeFiltro){
        cy.get(el.areaDigitarCombo).type(nomeFiltro)
    }

    clicarItemCombobox(){
        cy.get(el.selecionarItemCombo).click();
    }

    clicarFiltrar(){
        cy.get(el.btnFiltrar).click()
    }

    clicarEdicao(){
        cy.get(el.btnEditar).click();
    }

    validarOpcoesCombo(api){
        let nomeFront = []
        cy.get(el.opcoesCombo).each(($option, index) => {
            nomeFront.push(Cypress.$($option).text().trim())
        }) 
        cy.get(api).then(xhr =>{
            xhr.response.body.forEach((st, i) => {
                let nomeAPI = xhr.response.body[i].idParametro + ' - ' + xhr.response.body[i].nome.trim();
                expect(nomeAPI).to.eq(nomeFront[i])
            })
        })
    }


   validarBusca(api){
    cy.get(api).then(xhr =>{
        cy.get(el.campoCodigo).invoke('text').then(codFront => {
            expect(xhr.response.body.content[0].idParametro).to.eq(codFront.trim())
        })
        
        cy.get(el.campoNome).invoke('text').then(nomeFront => {
            expect(xhr.response.body.content[0].nome).to.eq(nomeFront.trim())
        })

         cy.get(el.campoDescInfo).trigger('mouseenter')
        .get('.popover-body').invoke('text').then(DescFront =>{
            expect(xhr.response.body.content[0].descricao).to.eq(DescFront)
        }) 

        cy.get(el.campoValor).invoke('text').then(valorFront => {
            expect(xhr.response.body.content[0].valor).to.eq(valorFront.trim())
        })

        cy.get(el.campoDtAlteracao).invoke('text').then(dtAltFront => {
            const dtAltAPI = xhr.response.body.content[0].dataAlteracao
            const dtAltAPIFormat = dtAltAPI.split('-').reverse().join('/');
            expect(dtAltAPIFormat).to.eq(dtAltFront.trim())
        })

        cy.get(el.campoLDAPAlt).invoke('text').then(ldapFront => {
            expect(xhr.response.body.content[0].ldapUsuarioAlteracao).to.eq(ldapFront.trim())
        })
    
    })   

   }

   validarDadosPopUp(codPopUpFront,nomePopUpFront){
    cy.get(el.codPopUp).invoke('text').then(codPopUp =>{
        const codPopUpFormt = codPopUp.substr(6).trim()
        expect(codPopUpFormt).to.eq(codPopUpFront)
    })

    cy.get(el.nomePopUp).invoke('text').then(nmPopUp =>{
        const nmPopUpFormt = nmPopUp.substr(5).trim()
        expect(nmPopUpFormt).to.eq(nomePopUpFront)
    })

   }

   editarValorPopUp(valor){
    cy.get(el.valorPopUp).clear().type(valor)
   }

   clicarBtnSalvar(){
    cy.contains(el.btnSalvar).click();
   }

   validarRequestSalvar(api,dtFront,descricao,codigo,usuario,nome,valor){
    cy.wait(api).then(xhr =>{
        const dtAltAPI = xhr.request.body.dataAlteracao
        const dtAltAPIFormat = dtAltAPI.split('-').reverse().join('/');

        expect(dtAltAPIFormat).to.eq(dtFront)

        const descXhr = xhr.request.body.descricao
        const descFormat = descXhr.trim()
        expect(descFormat).to.eq(descricao.trim())
        expect(xhr.request.body.idParametro).to.eq(codigo)
        expect(xhr.request.body.ldapUsuarioAlteracao).to.eq(usuario)
        expect(xhr.request.body.nome).to.eq(nome)
        expect(xhr.request.body.valor).to.eq(valor)
        
    })
   }
    
}

export default new Parametros();