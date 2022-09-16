const el = require('./elementos').ELEMENTOS;

class Configuracoes {
    buscarOcorrencia(cod){
        cy.get(el.filtroCodOcorrencia).clear().type(cod);
        
    }

    clicarBtnPesquisar(){
        cy.get(el.btnPesquisar).click();
    }

    preencherNovaOcorrencia(codOcorrencia,DescOcorrencia){
        cy.get(el.btnNovo).click();
        cy.get(el.campoCodPopUp).type(codOcorrencia);
        cy.get(el.campoDescPopUp).type(DescOcorrencia);
        
    }

    clicarBtnAddPopUp(){
        cy.contains(el.btnAdd).click();
    }

    validarMensagemCodOcorrenciaJaCadastrado(){
        cy.contains(el.mensagemCodOcorrenciaJaCadastrado).should('be.visible')
    }

    validarMensagemCodOcorrenciaSucesso(){
        cy.contains(el.mensagemCodOcorrenciaSucesso).should('be.visible')
    }

    validarQuantidadeDeRegistroEncontrado(){
        cy.get(el.linhaGridList).should('have.length', 1)
    }


    validaCodigoOcorrencia(api){
        cy.get(api).then(resp => {

            resp.response.body.content.forEach((cont, i) => {
                   cy.get(el.linhaGridList).each(($elemento, indice, $lista) => {
                    cy.get($elemento).find(el.colunaCod)
                        .invoke('text').then(textCodigo => {
                            const textCod = textCodigo.trim()
                            expect(textCod).to.equal(resp.response.body.content[i].codigo)
                        })
                    cy.get($elemento).find(el.colunaDesc)
                        .invoke('text').then(textDescricao => {
                            const textDesc = textDescricao.trim()
                            expect(textDesc).to.equal(resp.response.body.content[i].descricao)
                        })
                }) 
            })
        }); 

    }

    validaEdicaoDescOcorrencia(api,descTest,descOcorrencia){
        cy.get(el.linhaGridList).each(($elemento, indice, $lista) => {
            cy.get($elemento).find(el.colunaDesc)
                .invoke('text').then(textDescricao => {
                    const textDesc = textDescricao.trim()
                    cy.get(el.btnEditar).click();
                    cy.get(el.campoDescPopUp).type(descTest);
                    cy.contains(el.btnEditarPopUp).click();
                    
                    cy.wait(api)
                    cy.get(el.linhaGridList).each(($elem, indice, $lista) => {
                        cy.get($elem).find(el.colunaDesc)
                            .invoke('text').then(textDescricaoEdit => {
                                const textDescEdit = textDescricaoEdit.trim()
                                const descricaoEditada = textDesc + descTest
                                expect(textDescEdit).to.equal(descricaoEditada)
                            })
                    })
                    cy.get(el.btnEditar).click();
                    cy.get(el.campoDescPopUp).clear().type(descOcorrencia);
                    cy.contains(el.btnEditarPopUp).click();
                    cy.wait(api);
                    cy.get(el.linhaGridList).each(($e, indice, $lista) => {
                        cy.get($e).find(el.colunaDesc)
                            .invoke('text').then(textDescricaoOriginal => {
                                const textDescOriginal = textDescricaoOriginal.trim()
                                expect(textDescOriginal).to.equal(descOcorrencia)
                            })
                    })

                })
        })
    }

    validarNovaOcorrenciaCriada(codOc){
        cy.get(el.linhaGridList).each(($elemento, indice, $lista) => {
            cy.get($elemento).find('[style="text-align: center;"]')
                .invoke('text').then(textCodigo => {
                    const textCod = textCodigo.trim()
                    expect(textCod).to.equal(codOc)
                });
        });
    }
    
}

export default new Configuracoes();