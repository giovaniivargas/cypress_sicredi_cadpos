/// <reference types="cypress" />
import { urlLogin } from '../../../../base-test/routes';
import { usuarioAdm } from '../../../../base-test/const-login'
import Modulos from '../../../../support/pages/Modulos/acoes'
import Configuracoes from '../../../../support/pages/Configuracoes/acoes'

describe('[CONFIGURAÇÕES - OCORRENCIAS EXTERNAS] RISC02-436 Editar/Inserir a lista de Ocorrências Externas', () => {
    const codOcorrencia = '100'
    const descOcorrencia = 'Data da remessa inválida'
    const descTest = ' teste'

    before(() => {
        cy.visit('/')
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        Modulos.acessarConfiguracoes()
        cy.intercept('GET', 'cadastro-positivo/v1/ocorrencias_externas/?page=0&pageSize=10').as('inicialList');
        Modulos.acessarConfigOcorrenciasExternas()
        cy.wait('@inicialList');
    });
    it('Busca por código de ocorrência', () => {
        cy.allure().story('RISC02-436')
        cy.intercept('GET', 'cadastro-positivo/v1/ocorrencias_externas/?codigo=100&page=0&pageSize=10').as('busca');
        Configuracoes.buscarOcorrencia(codOcorrencia);
        Configuracoes.clicarBtnPesquisar();
        cy.wait('@busca')
        Configuracoes.validaCodigoOcorrencia('@busca');
        
    });

    it('Editar a descrição de uma ocorrência', () => {
        cy.allure().story('RISC02-436')
        cy.intercept('GET', 'cadastro-positivo/v1/ocorrencias_externas/?codigo=' + codOcorrencia + '&page=0&pageSize=10').as('busca');
        Configuracoes.buscarOcorrencia(codOcorrencia);
        Configuracoes.clicarBtnPesquisar();
        cy.wait('@busca')
        Configuracoes.validaEdicaoDescOcorrencia('@busca',descTest,descOcorrencia)

    });

    it('Criar nova ocorrencia com código já cadastrado', () => {
        cy.allure().story('RISC02-436')
        Configuracoes.preencherNovaOcorrencia(codOcorrencia,'Descrição Teste');
        Configuracoes.clicarBtnAddPopUp();
        Configuracoes.validarMensagemCodOcorrenciaJaCadastrado();
        Configuracoes.buscarOcorrencia(codOcorrencia);
        cy.intercept('GET', 'cadastro-positivo/v1/ocorrencias_externas/?codigo=' + codOcorrencia + '&page=0&pageSize=10').as('busca');
        Configuracoes.clicarBtnPesquisar();
        cy.wait('@busca')
        Configuracoes.validarQuantidadeDeRegistroEncontrado();
        
    });

    it('Criar nova ocorrencia com sucesso', () => {
        cy.allure().story('RISC02-436')
        let codOc = '99999'
        cy.intercept('GET', 'cadastro-positivo/v1/ocorrencias_externas/?codigo=' + codOc + '&page=0&pageSize=10',
            { fixture: 'OE/GetOcorrenciaExterna.json' }).as('buscaNova');
        Configuracoes.preencherNovaOcorrencia(codOc,'Descrição Teste')
        cy.intercept('PUT', 'cadastro-positivo/v1/ocorrencias_externas/', { fixture: 'OE/PutOcorrenciasExternas.json' }).as('add');
        Configuracoes.clicarBtnAddPopUp();
        cy.wait('@add')
        Configuracoes.validarMensagemCodOcorrenciaSucesso();
        cy.wait('@buscaNova')
        Configuracoes.clicarBtnPesquisar();
        Configuracoes.validarQuantidadeDeRegistroEncontrado();
        Configuracoes.validarNovaOcorrenciaCriada(codOc);
   
    })

    it('Valida texto busca sem registro', () => {
        Configuracoes.buscarOcorrencia('1111111111');
        Configuracoes.clicarBtnPesquisar();
        cy.get(' span > h4').should('have.text','Não foram encontrados registros para a pesquisa realizada.')
    });

     after(() => {
        cy.contains('Módulo').click();
    }) 
});