/// <reference types="cypress" />

import { urlLogin } from '../../../base-test/routes'
import { usuarioAdm } from '../../../base-test/const-login'
import Modulos from '../../../support/pages/Modulos/acoes';
import ListagemConglomerado from '../../../support/pages/Conglomerado/Listagem/acoes';

describe('[CONGLOMERADO - LISTAGEM] RISC02-614 FRONT - Ativar/Inativar Participantes e Parceiros', () => {
    const cnpjBloq = '06946989000107';
    const cnpjDesbloq = '08488377000143';
    const motivo = 'Testando o bloqueio/desbloqueio da entidade participante'

    before(() => {
        cy.visit('/')
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/principal/').as('inicialEntiPrinc');
        cy.intercept('GET', 'cadastro-positivo/v1/entidade-sicredi/listar/conglomerado/').as('inicialConglom');
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/participante/?page=0&pageSize=3').as('inicialEntiPart');
        cy.wait('@erroConglomerado');
        Modulos.acessarConglomerado();
        cy.wait('@inicialEntiPrinc');
        cy.wait('@inicialConglom');
        cy.wait('@inicialEntiPart');
    });
    it('Bloqueando participante', () => {
        cy.allure().story('RISC02-614')
        ListagemConglomerado.buscarCnpj(cnpjBloq)
        cy.intercept('cadastro-positivo/v1/entidade/participante/?cnpj=' + cnpjBloq + '&page=0&pageSize=3').as('busca')
        ListagemConglomerado.clicarBtnPesquisar()
        cy.wait('@busca');
        ListagemConglomerado.validarStatusBtnHabilitarDesabilitar(' Desativar ')
        ListagemConglomerado.clicarBtnHabilitarDesabilitar()
        ListagemConglomerado.validarStatusBtnAlterarStatusPopUp(' Desativar ')
        ListagemConglomerado.digitarMotivo(motivo)
        cy.intercept('PUT', 'cadastro-positivo/v1/entidade/atualizar/status_envio', { body: {} }).as('bloqEnt')
        ListagemConglomerado.clicarBtnAlterarStatusPopUp();
        ListagemConglomerado.validarRequestAlteracaoStatus('@bloqEnt',usuarioAdm.username,motivo);

        ListagemConglomerado.validarStatusBtnHabilitarDesabilitar(' Ativar ');
        ListagemConglomerado.validarCorIconeCard('.card-header-light')
               
        ListagemConglomerado.clicarBtnLimpar();
    });

    it('Desbloqueando participante', () => {
        cy.allure().story('RISC02-614')
        ListagemConglomerado.buscarCnpj(cnpjDesbloq)
        cy.intercept('cadastro-positivo/v1/entidade/participante/?cnpj='+cnpjDesbloq+'&page=0&pageSize=3',{fixture: 'CG/ListPartBloqComContato.json'}).as('buscaBloq')
        ListagemConglomerado.clicarBtnPesquisar()
        cy.wait('@buscaBloq');
        ListagemConglomerado.validarStatusBtnHabilitarDesabilitar(' Ativar ')
        ListagemConglomerado.clicarBtnHabilitarDesabilitar()
        ListagemConglomerado.validarStatusBtnAlterarStatusPopUp(' Ativar ')
        ListagemConglomerado.digitarMotivo(motivo)
        cy.intercept('PUT', 'cadastro-positivo/v1/entidade/atualizar/status_envio', { body: {} }).as('desbloqEnt')
        ListagemConglomerado.clicarBtnAlterarStatusPopUp()
        ListagemConglomerado.validarRequestAlteracaoStatus('@desbloqEnt',usuarioAdm.username,motivo)

        ListagemConglomerado.validarStatusBtnHabilitarDesabilitar(' Desativar ');
        ListagemConglomerado.validarCorIconeCard('.card-header-warning')
               
        ListagemConglomerado.clicarBtnLimpar();
        
    });

    it('Bloqueando participante sem preencher o motivo', () => {
        cy.allure().story('RISC02-614')
        ListagemConglomerado.buscarCnpj(cnpjBloq)
        cy.intercept('cadastro-positivo/v1/entidade/participante/?cnpj=' + cnpjBloq + '&page=0&pageSize=3').as('busca')
        ListagemConglomerado.clicarBtnPesquisar()
        cy.wait('@busca');
        ListagemConglomerado.validarStatusBtnHabilitarDesabilitar(' Desativar ')
        ListagemConglomerado.clicarBtnHabilitarDesabilitar()
        ListagemConglomerado.validarStatusBtnAlterarStatusPopUp(' Desativar ')
        ListagemConglomerado.clicarBtnAlterarStatusPopUp()
        ListagemConglomerado.exibirAlerta()
        ListagemConglomerado.exibirMensagemAlerta(' Campo obrigatório. ')
        ListagemConglomerado.clicarBtnCancelar()
        ListagemConglomerado.validarStatusBtnHabilitarDesabilitar(' Desativar ');
        ListagemConglomerado.validarCorIconeCard('.card-header-warning')
               
        ListagemConglomerado.clicarBtnLimpar();
        
    });

    it('Desbloqueando participante sem preencher o motivo', () => {
        cy.allure().story('RISC02-614')
        ListagemConglomerado.buscarCnpj(cnpjDesbloq)
        cy.intercept('cadastro-positivo/v1/entidade/participante/?cnpj='+cnpjDesbloq+'&page=0&pageSize=3',{fixture: 'CG/ListPartBloqComContato.json'}).as('buscaBloq')
        ListagemConglomerado.clicarBtnPesquisar()
        cy.wait('@buscaBloq');
        ListagemConglomerado.validarStatusBtnHabilitarDesabilitar(' Ativar ')
        ListagemConglomerado.clicarBtnHabilitarDesabilitar()
        ListagemConglomerado.validarStatusBtnAlterarStatusPopUp(' Ativar ')
        ListagemConglomerado.clicarBtnAlterarStatusPopUp()
        ListagemConglomerado.exibirAlerta()
        ListagemConglomerado.exibirMensagemAlerta(' Campo obrigatório. ')
        ListagemConglomerado.clicarBtnCancelar()
        ListagemConglomerado.validarStatusBtnHabilitarDesabilitar(' Ativar ');
        ListagemConglomerado.validarCorIconeCard('.card-header-light')
               
        ListagemConglomerado.clicarBtnLimpar();
    });

      after(() => {
        cy.contains('Módulo').click();
    })  

});