describe('Mi página', () => {
    it('Verifica que el título sea correcto y que el botón esté disponible', () => {
      cy.visit('http://localhost:5000') 
      cy.title().should('eq', 'DISTRIBUIDORA CASAVIEJA')})
  })
  