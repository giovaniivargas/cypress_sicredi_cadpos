import Modulos from '../../../../support/pages/Modulos/acoes'
import Configuracoes from '../../../../support/pages/Configuracoes/acoes'
import { usuarioAdm } from '../../../../base-test/const-login';
import Param from '../../../../support/pages/Configuracoes/Parametros/acoes'


describe('[CONFIGURAÇÕES - PARAMETROS] RISC02-866 Criação e exibição do Sub módulo de parâmetros', () => {

    before(() => {
        cy.visit('/')
        //cy.loginCadPos(usuarioAdm.username, usuarioAdm.password);
        cy.intercept('GET', 'cadastro-positivo/v1/entidade/erro_conglomerado/').as('erroConglomerado');
        cy.wait('@erroConglomerado');
        Modulos.acessarConfiguracoes()
        cy.intercept('GET', 'cadastro-positivo/parametros/nomes').as('nomes');
        cy.intercept('GET', 'cadastro-positivo/parametros/listar/?page=0&pageSize=10').as('paramList');
        Modulos.acessarSubModuloParametros();
        
    });

    it('Valida a quantidade de registros no filtro Nome', () => {
        cy.allure().story('RISC02-866')
        Param.clicarCombobox()
        Param.validarOpcoesCombo('@nomes')

        cy.contains('Parâmetros').click();
    });

    it('Validar busca', () => {
        cy.allure().story('RISC02-485')
        const nomeFiltro = 'HIST_CRED_DIR_NAS'
        Param.clicarCombobox()
        Param.digitarCombobox(nomeFiltro)
        Param.clicarItemCombobox()
        cy.intercept('GET', 'cadastro-positivo/parametros/listar/?nome='+nomeFiltro+'&page=0&pageSize=10').as('busca');
        Param.clicarFiltrar()
        cy.wait('@busca')
        Param.validarBusca('@busca')
        
    });

    it('Validar edição do parâmetro', () => {
        cy.allure().story('RISC02-485')
        const codigo = '33'
        const desc = 'Parametro identificador do Diretorio do Historico de Credito no Nas'
        const nome = 'HIST_CRED_DIR_NAS'
        const valor = 'Teste'
        const today = new Date();
        const dataAtual = today.toLocaleDateString()
        Param.clicarEdicao()
        Param.validarDadosPopUp(codigo,nome)
        Param.editarValorPopUp(valor);
        cy.intercept('PUT','cadastro-positivo/parametros/salvar'
        ,{

        }).as('salvaValor') 
        Param.clicarBtnSalvar()
        Param.validarRequestSalvar('@salvaValor',dataAtual,desc,codigo,usuarioAdm.username,nome,valor) 
    });

     after(() => {
        cy.contains('Módulo').click();
    })  
});