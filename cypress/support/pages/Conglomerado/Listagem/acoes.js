const el = require('./elementos').ELEMENTOS;

class ListagemConglomerado {
    buscarCnpj(cpfCnpj) {
        cy.get(el.filtroCnpj).clear().type(cpfCnpj);

    }

    clicarBtnPesquisar() {
        cy.get(el.btnPesquisar).click();
    }

    clicarBtnLimpar() {
        cy.get(el.btnLimpar).click();
    }

    clicarBtnHabilitarDesabilitar(){
        cy.get(el.btnHabilitarDesabilitar).click();
    }

    clicarLinkComContatos(cnpjDesbloqComContato){
        cy.get('[href="/conglomerado/entidade/participante/'+cnpjDesbloqComContato+'/false/false"]').click();
    }

    clicarLinkSemContatos(cnpjDesbloqSemContato){
        cy.get('[href="/conglomerado/entidade/participante/'+cnpjDesbloqSemContato+'/true/false"]').click();
    }

    exibirAlerta(){
        cy.get(el.alerta).should('be.visible');
    }

    exibirMensagemAlerta(mensagem){
        cy.contains(mensagem).should('be.visible');
    }

    validarStatusBtnHabilitarDesabilitar(status){
        cy.contains(status).should('be.visible')
    }

    validarCorIconeCard(cor){
        cy.get(cor).should('be.visible')
    }

    //PopUp
    digitarMotivo(motivo) {
        cy.get(el.campoMotivo).type(motivo);

    }
    
    clicarBtnAlterarStatusPopUp(){
        cy.get(el.btnAlteraStatus).click();
    }

    clicarBtnCancelar() {
        cy.get(el.btnCancelar).click();
    }


    //Validacoes
    validarStatusBtnAlterarStatusPopUp(status){
        cy.get(el.btnAlteraStatus).should('have.text', status)
    }

    validarRequestAlteracaoStatus(api,ldap,motivo) {
        cy.wait(api).then(xhr => {
            cy.get(el.spanCpj).invoke('text').then(textCnpj => {
                const cnpjFormat = textCnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '');
                expect(xhr.request.body.cnpj).to.eq(cnpjFormat);
            })
            cy.get(el.spanCodigo).should('have.text', xhr.request.body.codigoEntidade)
            expect(ldap).to.eq(xhr.request.body.ldapUserAlteracao)
            expect(motivo).to.eq(xhr.request.body.motivo) 
        })
    }

}

export default new ListagemConglomerado();