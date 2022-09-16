const el = require('./elementos').ELEMENTOS_CONFIG;

class BlocklistPage {
    preencherCamposCpfCnpjMotivo(cpfCnpjZero,motivo){
        cy.get(el.formCpnjCpf).clear().type(cpfCnpjZero)
        cy.get(el.formMotivo).clear().type(motivo)
    }

    clicarBtnSalvar(){
        cy.get(el.btnSalvar).click();
    }

    validarRequest(api,cpf,usuario,motivo){
        cy.wait(api).then(xhr =>{
            expect(xhr.request.body.identificacaoCliente).to.eq(cpf)
            expect(xhr.request.body.ldapUsuarioCriacao).to.eq(usuario)
            expect(xhr.request.body.motivo).to.eq(motivo)
            expect(xhr.request.body.prefixoAgencia).to.eq(null)
            expect(xhr.request.body.tipoCliente).to.eq('1')
            expect(xhr.response.statusCode).to.eq(200)
        })
    }

}

export default new BlocklistPage();