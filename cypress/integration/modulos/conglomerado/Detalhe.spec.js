/// <reference types="cypress" />

import { urlLogin } from '../../../base-test/routes'
import { usuarioAdm } from '../../../base-test/const-login'
import Modulos from '../../../support/pages/Modulos/acoes';
import DetalheConglomerado from '../../../support/pages/Conglomerado/Detalhe/acoes';
import ListagemConglomerado from '../../../support/pages/Conglomerado/Listagem/acoes'

describe('[CONGLOMERADO - DETALHE] RISC02-664 FRONT - Ativar/Inativar Participantes e Parceiros', () => {
    const cnpjDesbloqComContato = '08488377000143'
    const cnpjDesbloqSemContato = '07782975000168'

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

    it('NÃO exibir botões/campos de ações(EDITAR, ADICIONAR e SALVAR) para entidade BLOQUEADA com contatos', () => {
        cy.allure().story('RISC02-664')
        ListagemConglomerado.buscarCnpj(cnpjDesbloqComContato)
        cy.intercept('cadastro-positivo/v1/entidade/participante/?cnpj=' + cnpjDesbloqComContato + '&page=0&pageSize=3'
            , { fixture: 'CG/ListPartBloqComContato.json' }).as('buscaBloqComCont')
        ListagemConglomerado.clicarBtnPesquisar()
        cy.wait('@buscaBloqComCont');
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/participante/' + cnpjDesbloqComContato
            , { fixture: 'CG/DetPartBloq/DetParticipanteInativo.json' }).as('detParticipanteInativo')
        cy.atendimentoConsumidor(cnpjDesbloqComContato)
        cy.contatoTecnico(cnpjDesbloqComContato)
        cy.autorizadoLiminar(cnpjDesbloqComContato)
        ListagemConglomerado.clicarLinkComContatos(cnpjDesbloqComContato)
        cy.wait('@detParticipanteInativo');
        DetalheConglomerado.ocultarElemento('.form-group #idSite')
        DetalheConglomerado.ocultarElemento('#idSalvar')


        DetalheConglomerado.clicarSanfona(' Contatos Atendimento ao Consumidor ')
        cy.wait(3000);
        DetalheConglomerado.ocultarElemento('#idAcaoAC')
        DetalheConglomerado.ocultarElemento('[title="Novo"]')
        DetalheConglomerado.ocultarElemento('[title="Editar"]')
        DetalheConglomerado.ocultarElemento('#situacaoConsumidorParticipante')

        DetalheConglomerado.clicarSanfona(' Contatos Técnicos ')
        cy.wait(3000);
        DetalheConglomerado.ocultarElemento('#idAcaoAC')
        DetalheConglomerado.ocultarElemento('[title="Novo"]')
        DetalheConglomerado.ocultarElemento('[title="Editar"]')
        DetalheConglomerado.ocultarElemento('#idSituacao')

        DetalheConglomerado.clicarSanfona(' Contatos Autorizado Liminar ')
        cy.wait(3000);
        DetalheConglomerado.ocultarElemento('#idAcaoAC')
        DetalheConglomerado.ocultarElemento('[title="Novo"]')
        DetalheConglomerado.ocultarElemento('[title="Editar"]')
        DetalheConglomerado.ocultarElemento('#idSituacao')

        DetalheConglomerado.clicarVoltar();
    });

    it('NÃO exibir botões/campos de ações(ADICIONAR e SALVAR) para entidade BLOQUEADA sem contatos', () => {
        cy.allure().story('RISC02-664')
        ListagemConglomerado.clicarBtnLimpar()
        ListagemConglomerado.buscarCnpj(cnpjDesbloqSemContato)
        cy.intercept('cadastro-positivo/v1/entidade/participante/?cnpj=' + cnpjDesbloqSemContato + '&page=0&pageSize=3'
            , { fixture: 'CG/ListPartBloqSemContato.json' }).as('buscaBloqSemCont')
        ListagemConglomerado.clicarBtnPesquisar();
        cy.wait('@buscaBloqSemCont');
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/participante/' + cnpjDesbloqSemContato
            , { fixture: 'CG/DetPartBloq/DetPartInativoSemContato.json' }).as('detParticipanteInativoSemContato')
        ListagemConglomerado.clicarLinkSemContatos(cnpjDesbloqSemContato)
        DetalheConglomerado.ocultarElemento('.form-group #idSite')
        DetalheConglomerado.ocultarElemento('#idSalvar')
        DetalheConglomerado.ocultarElemento('[title="Novo"]')

        DetalheConglomerado.clicarVoltar();

    });
});

describe('[CONGLOMERADO - DETALHE] RISC02-489/490 - Alteração da aplicação no Front para buscar as informações do Tipo de telefone para atendimento ao consumidor (Principal/Participante)', () => {  
    const cnpjDesbloqComContato = '08488377000143'
    beforeEach(() => {
        cy.request('https://cadastro-positivo-conector-api.uat.sicredi.cloud/cadastro-positivo/v1/tipo_telefone/')
        .as('tipoTelefone');
    });


    it('Valida tipo de telefone para atendimento ao consumidor (Participante)', () => {
        cy.allure().story('RISC02-489/490')
        ListagemConglomerado.clicarBtnLimpar()
        ListagemConglomerado.buscarCnpj(cnpjDesbloqComContato)
        ListagemConglomerado.clicarBtnPesquisar();
        cy.get('[href="/conglomerado/entidade/participante/' + cnpjDesbloqComContato + '/false/true"]').click();
        DetalheConglomerado.clicarSanfona(' Contatos Atendimento ao Consumidor ')
        cy.wait(2000)
        DetalheConglomerado.clicarEditarConsumidor();
        cy.wait(2000)
        DetalheConglomerado.validarTipoTelfoneComApi('@tipoTelefone');
        DetalheConglomerado.clicarFecharModal()
        DetalheConglomerado.clicarAddConsumidor()
        DetalheConglomerado.validarTipoTelfoneComApi('@tipoTelefone')
        DetalheConglomerado.clicarFecharModal()
        DetalheConglomerado.clicarVoltar();
    });

    it('Valida tipo de telefone para atendimento ao consumidor (Principal)', () => {
        cy.allure().story('RISC02-489/490')
        cy.wait(2000)
        cy.get('[href="/conglomerado/entidade/principal').click();
        DetalheConglomerado.clicarSanfona(' Contatos Atendimento ao Consumidor ') 
        cy.wait(2000)
        DetalheConglomerado.clicarEditarConsumidor();
        cy.wait(2000)
        DetalheConglomerado.validarTipoTelfoneComApi('@tipoTelefone');
        DetalheConglomerado.clicarFecharModal()
        DetalheConglomerado.clicarAddConsumidor()
        DetalheConglomerado.validarTipoTelfoneComApi('@tipoTelefone')
        DetalheConglomerado.clicarFecharModal()
    }); 

    after(() => {
        cy.contains('Módulo').click();
    }) 
});
 