const el = require('./elementos').ELEMENTOS_CONFIG;

class Modulos {
    acessarConfiguracoes(){
        cy.contains(el.textoModuloConfiguracoes).click();
    }
    acessarConfigOcorrenciasExternas(){
        cy.contains(el.textoSubModuloIE).click();
    }

    acessarSubModuloParametros(){
        cy.contains(el.textoSubModuloParametros).click();
    }

    acessarSubModuloBlocklistAtivar(){
        cy.contains(el.textoSubModuloBlocklistAtivar).click();
    }

    acessarSubModuloBlocklistInativar(){
        cy.contains(el.textoSubModuloBlocklistInativar).click();
    }

    acessarContestacoes(){
        cy.contains(el.textoModuloContestacao).click();
    }

    acessarHistóricoContestacoes(){
        cy.contains(el.textoModuloHistContestacao).click();
    }

    acessarConglomerado(){
        cy.contains(el.textoModuloConglomerado).click();
    }

    acessarInconsistenciasInternas(){
        cy.contains(el.textoModuloInconsistenciasInternas).click();
    }

    acessarInconsistenciasExternas(){
        cy.contains(el.textoModuloInconsistenciasExternas).click();
    }

    acessarHC(){
        cy.contains(el.textoModuloHC).click();
    }

    acessarDadosCadastrais(){
        cy.contains(el.textoModuloDC).click();
    }

    acessarDadosCadastraisEnviados(){
        cy.contains(el.textoSubModuloDCE).click();
    }

    acessarDadosCadastraisII(){
        cy.contains(el.textoSubModuloII).click();
    }

    
}

export default new Modulos();