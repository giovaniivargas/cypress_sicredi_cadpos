import { urlLogin } from '../../../../base-test/routes';
import { usuarioAdm } from '../../../../base-test/const-login'
import Modulos from '../../../../support/pages/Modulos/acoes';
import ListagemDadosII from '../../../../support/pages/DadosCadastrais/DadosCadastraisII/Listagem/acoes';
import DetDadosII from '../../../../support/pages/DadosCadastrais/DadosCadastraisII/Detalhe/acoes';

describe('[DADOS CADASTRAIS - II - DETALHE] Submódulo de inconsistências internas - Detalhe', () => {
    const cnpj = '00973749000115';

    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        Modulos.acessarDadosCadastrais()
        Modulos.acessarDadosCadastraisII()
        cy.wait(3000)
        ListagemDadosII.buscarCpfCnpj(cnpj)
        ListagemDadosII.clicarBtnPesquisar()
        cy.wait(2000);
        cy.intercept('GET', 'cadastro-positivo/v1/dados_cadastrais/envio/rejeitados/detalhe/'+cnpj).as('detPJ');
        ListagemDadosII.clicarBtnVisualizar()
    })


    it('Valida cabeçalho PJ', () => {
        DetDadosII.validarTituloPagina()
        DetDadosII.validarCabecalho('@detPJ')
         
        cy.logradouro('@detPJ');
        cy.numeroLogradouro('@detPJ');
        cy.complemento('@detPJ');
        cy.bairro('@detPJ');
        cy.cep('@detPJ');
        cy.municipio('@detPJ');
        cy.uf('@detPJ');

        cy.ddd('@detPJ');
        cy.telefone('@detPJ');

        cy.email('@detPJ');

        cy.voltar();
    });

    after(() => {
        cy.contains('Módulo').click();
    })
});