describe('Crear producto', () => {
    it('Verifica que el producto sea creado correctamente', () => {
      cy.visit('http://localhost:5000/crear')
      cy.get('input[name="Nombre"]').type('Nuevo producto')
      cy.get('input[name="Precio"]').type('1000')
      cy.get('textarea[name="Descripcion"]').type('Descripción del producto')
      cy.get('form').submit()
      cy.url().should('eq', 'http://localhost:5000/productos')
      cy.get('table')
    })
  })