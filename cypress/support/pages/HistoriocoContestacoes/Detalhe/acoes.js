const el = require('./elementos').ELEMENTOS;

class DetalheHistContestacoes {
 
    validarCpfCnpj(cpf) {
        cy.get(el.labelCpfCnpj).invoke('text').then(cpfFront =>{
            const cpfFormat = cpfFront.replace('.','').replace('.','').replace('-','').trim()
            expect(cpfFormat).to.eq(cpf)
        })
    }

}

export default new DetalheHistContestacoes();