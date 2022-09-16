 /// <reference types="cypress" />

describe('[INCONSISTENCIAS EXTERNAS] RISC02-699 Total de operações distintas válidas para a CIP MENOS Rejeitadas Externas', () => {
    it('Validação perfil ADM', () => {
        cy.allure().story('RISC02-699')
        const sumarizada_hc_envio = 73416;
        const sumarizada_hc_ret_origem = 432;

        cy.request({
            method: 'GET',
            url: 'https://cadastro-positivo-indicadores-api.uat.sicredi.cloud/cadastro-positivo/monitoramento'+
            '/indicadores_operacionais_de_rejeitados_externos?origemInformacao=CARTOES_DIGITAL,CARTOES_PF_LEGADO,'+
            'CARTOES_PJ_LEGADO,CHANGE_LEGADO,CONSIGNADO,CONSORCIO_LEGADO,CREDITO_DIGITAL,CREDITO_LEGADO,IMOBILIARIO_LEGADO,'+
            'ROTATIVO_CONTA_CORRENTE_LEGADO,ROTATIVO_CREDITO_DIGITAL,ROTATIVO_CREDITO_LEGADO&dataRemessa=2022-04-18'
        }).then((response) =>{
            const resultado = response.body.totalOperacoesDistintasEnviadasParaCIP - response.body.totalOpDistRejeitadasInconsistenciasExternas;
            expect(response.body.totalOperacoesDistintasEnviadasParaCIP).to.equal(sumarizada_hc_envio)
            expect(response.body.totalOpDistRejeitadasInconsistenciasExternas).to.equal(sumarizada_hc_ret_origem)
            expect(response.body.totalOpDistValidasCIPMenosRejeitadasExternas).to.equal(resultado);
        })
    });

    it('Validação perfil', () => {
        cy.allure().story('RISC02-699')
        const sumarizada_hc_envio = 29763;
        const sumarizada_hc_ret_origem = 421;
       
        cy.request({
            method: 'GET',
            url: 'https://cadastro-positivo-indicadores-api.uat.sicredi.cloud/cadastro-positivo/monitoramento/'+
            'indicadores_operacionais_de_rejeitados_externos?origemInformacao=CREDITO_DIGITAL,ROTATIVO_CREDITO_DIGITAL&dataRemessa=2022-04-18'
        }).then((response) =>{
            const resultado = response.body.totalOperacoesDistintasEnviadasParaCIP - response.body.totalOpDistRejeitadasInconsistenciasExternas;
            expect(response.body.totalOperacoesDistintasEnviadasParaCIP).to.equal(sumarizada_hc_envio)
            expect(response.body.totalOpDistRejeitadasInconsistenciasExternas).to.equal(sumarizada_hc_ret_origem)
            expect(response.body.totalOpDistValidasCIPMenosRejeitadasExternas).to.equal(resultado);
            
        })
    });

    it('Validação filtro por 1 area responsavel', () => {
        cy.allure().story('RISC02-699')
        const sumarizada_hc_envio = 29763;
        const sumarizada_hc_ret_origem = 421;

        cy.request({
            method: 'GET',
            url: 'https://cadastro-positivo-indicadores-api.uat.sicredi.cloud/cadastro-positivo/monitoramento'+
            '/indicadores_operacionais_de_rejeitados_externos?origemInformacao=CREDITO_DIGITAL&dataRemessa=2022-04-18'
        }).then((response) =>{
            const resultado = response.body.totalOperacoesDistintasEnviadasParaCIP - response.body.totalOpDistRejeitadasInconsistenciasExternas;
            expect(response.body.totalOperacoesDistintasEnviadasParaCIP).to.equal(sumarizada_hc_envio)
            expect(response.body.totalOpDistRejeitadasInconsistenciasExternas).to.equal(sumarizada_hc_ret_origem)
            expect(response.body.totalOpDistValidasCIPMenosRejeitadasExternas).to.equal(resultado);
        })
    });
});