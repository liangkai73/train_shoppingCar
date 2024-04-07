describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.wait(2000)
    cy.get('[ data-test-id="btn-addtocart"] :first').click()
    cy.wait(1000)
    cy.contains('Chose Size')
    cy.get('.chose-size').eq(0).click().should('have.class', 'bg-[#000]')
    cy.get('[ data-test-id="btn-suretocart"]').click()
    cy.get('[ data-test-id="head-cart"]').should('contain', '1').click()
    cy.wait(1000)
    cy.get('[ data-test-id="btn-addcartnum"]').click().click()
    cy.contains('Quantity:3')
    cy.get('[ data-test-id="btn-settlement"]').click()
    cy.wait(1000)
    cy.contains('Do you Want to settlement?')
    cy.get('.ant-modal-confirm-btns > .ant-btn-primary').click()
  })
})
