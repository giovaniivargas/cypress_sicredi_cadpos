import { urlLogin } from '../../../../base-test/routes';
import { usuarioAdm } from '../../../../base-test/const-login'
import Modulos from '../../../../support/pages/Modulos/acoes';
import ListagemDadosEnv from '../../../../support/pages/DadosCadastrais/DadosCadastraisEnviados/Listagem/acoes';
import DetalheDadosEnv from '../../../../support/pages/DadosCadastrais/DadosCadastraisEnviados/Detalhe/acoes';

describe('[DADOS CADASTRAIS - ENVIADOS - DETALHE] RISC02-435 [Dados Cadastrais] Submódulo de Dados Cadastrais Enviados - Detalhe', () => {
    const cpf = '00236155083';

    before(() => {
        cy.visit('/');
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        Modulos.acessarDadosCadastrais();
        Modulos.acessarDadosCadastraisEnviados();
        ListagemDadosEnv.buscarCpfCnpj(cpf)
        cy.intercept('GET', 'cadastro-positivo/v1/dados_cadastrais/envio/validos/detalhe/1/' + cpf).as('detPF');
        ListagemDadosEnv.clicarBtnPesquisar();
        cy.wait(2000);
        ListagemDadosEnv.clicarBtnVisualizar();
    });

    it('Valida informações da pagina junto a API', () => {
        cy.allure().story('RISC02-435')
        DetalheDadosEnv.validarTituloPagina();
        DetalheDadosEnv.validarCabecalho('@detPF')
        cy.logradouro('@detPF');
        cy.numeroLogradouro('@detPF');
        cy.complemento('@detPF');
        cy.bairro('@detPF');
        cy.cep('@detPF');
        cy.municipio('@detPF');
        cy.uf('@detPF');

        cy.ddd('@detPF');
        cy.telefone('@detPF');

        cy.email('@detPF');

        cy.voltar();
    });

    after(() => {
        cy.contains('Módulo').click();
    })
});