 /// <reference types="cypress" />

describe('[POWER BI] RISC02-845 API - Criação dos Indicadores', () => {
    it('Validando os campos HC Origem', () => {
        cy.allure().story('RISC02-845')
        cy.request({
            method: 'GET',
            url: 'https://cadastro-positivo-indicadores-api.stress.sicredi.cloud/cadastro-positivo/monitoramento/listar/indicadores_sumarizados_historico_credito_origem'
        }).then((response) =>{
            expect(response.body[0]).to.have.property('quantidadeRecebidosOrigem')
            expect(response.body[0]).to.have.property('dataApuracao')
            expect(response.body[0]).to.have.property('dataRemessa')
            expect(response.body[0]).to.have.property('origemInformacao')
            expect(response.body[0]).to.have.property('codigoModalidade')
            expect(response.body[0]).to.have.property('prefixoAgencia')

        })
        
    });

    it('Validando os campos Enviados CIP', () => {
        cy.allure().story('RISC02-845')
        cy.request({
            method: 'GET',
            url: 'https://cadastro-positivo-indicadores-api.stress.sicredi.cloud/cadastro-positivo/monitoramento/listar/indicadores_sumarizados_enviados_cip'
        }).then((response) =>{
            expect(response.body[0]).to.have.property('quantidadeEnvioCip')
            expect(response.body[0]).to.have.property('dataRemessa')
            expect(response.body[0]).to.have.property('origemInformacao')
            expect(response.body[0]).to.have.property('codigoModalidade')
            expect(response.body[0]).to.have.property('prefixoAgencia')

        })
        
    });

    it('Validando os campos HC Rejeitados', () => {
        cy.allure().story('RISC02-845')
        cy.request({
            method: 'GET',
            url: 'https://cadastro-positivo-indicadores-api.stress.sicredi.cloud/cadastro-positivo/monitoramento/listar/indicadores_sumarizada_historico_credito_rejeitados'
        }).then((response) =>{
            expect(response.body[0]).to.have.property('qtdErrosInternos')
            expect(response.body[0]).to.have.property('dataRemessa')
            expect(response.body[0]).to.have.property('origemInformacao')
            expect(response.body[0]).to.have.property('codigoRejeicao')
            expect(response.body[0]).to.have.property('descricaoRejeicao')

        })
        
    });

    it('Validando os campos HC Rejeitados Origem', () => {
        cy.allure().story('RISC02-845')
        cy.request({
            method: 'GET',
            url: 'https://cadastro-positivo-indicadores-api.stress.sicredi.cloud/cadastro-positivo/monitoramento/listar/indicadores_sumarizada_historico_credito_rejeitados_origem'
        }).then((response) =>{
            expect(response.body[0]).to.have.property('qtdErrosInternos')
            expect(response.body[0]).to.have.property('dataRemessa')
            expect(response.body[0]).to.have.property('origemInformacao')

        })
        
    });

    it('Validando os campos HC Retorno', () => {
        cy.allure().story('RISC02-845')
        cy.request({
            method: 'GET',
            url: 'https://cadastro-positivo-indicadores-api.stress.sicredi.cloud/cadastro-positivo/monitoramento/listar/indicadores_sumarizada_historico_credito_retorno'
        }).then((response) =>{
            expect(response.body[0]).to.have.property('dataRemessa')
            expect(response.body[0]).to.have.property('origemInformacao')
            expect(response.body[0]).to.have.property('quantidadeErrosExternos')
            expect(response.body[0]).to.have.property('codigoOcorrenciaCliente')
            expect(response.body[0]).to.have.property('descricaoOcorrenciaCliente')

        })
        
    });

    it('Validando os campos HC Retorno Origem', () => {
        cy.allure().story('RISC02-845')
        cy.request({
            method: 'GET',
            url: 'https://cadastro-positivo-indicadores-api.stress.sicredi.cloud/cadastro-positivo/monitoramento/listar/indicadores_sumarizada_historico_credito_retorno_origem'
        }).then((response) =>{
            expect(response.body[0]).to.have.property('qtdErrosExternosOrigem')
            expect(response.body[0]).to.have.property('dataRemessa')
            expect(response.body[0]).to.have.property('origemInformacao')
            
        })
        
    });
});