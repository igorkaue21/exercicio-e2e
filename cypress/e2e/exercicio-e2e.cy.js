/// <reference types="cypress" />
const perfil = require ('../fixtures/perfil.json')
import produtosPage from '../support/page_objects/produtos.Page';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  beforeEach(() => {
      cy.visit('Minha-conta/')
  });

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
   cy.get('#username').type(perfil.usuario)
   cy.get('#password').type(perfil.senha)
   cy.get('.woocommerce-form > .button').click()
   cy.get('#primary-menu > .menu-item-629 > a').click()
   cy.fixture('produtos').then(dados=> {
    produtosPage.buscarProduto(dados[0].nomeProduto)
    produtosPage.addProdutoCarrinho(
    dados[0].tamanho, 
    dados[0].cor, 
    dados[0].quantidade), 
    produtosPage.buscarProduto(dados[1].nomeProduto)   
    produtosPage.addProdutoCarrinho(
    dados[1].tamanho, 
    dados[1].cor, 
    dados[1].quantidade),
    produtosPage.buscarProduto(dados[2].nomeProduto)   
    produtosPage.addProdutoCarrinho(
    dados[2].tamanho, 
    dados[2].cor, 
    dados[2].quantidade), 
    produtosPage.buscarProduto(dados[3].nomeProduto)   
    produtosPage.addProdutoCarrinho(
    dados[3].tamanho, 
    dados[3].cor, 
    dados[3].quantidade)
    })
    cy.get('.woocommerce-message > .button').click()
    cy.get('.checkout-button').click()
    cy.get('#terms').click()
    cy.get('#place_order').click()
    cy.wait(4000)
    cy.get('#main').should('contain','Obrigado. Seu pedido foi recebido.')
  });


})