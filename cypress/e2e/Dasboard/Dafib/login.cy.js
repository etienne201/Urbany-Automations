describe("Dafib Login", () => {
  const matricule = Cypress.env("CYPRESS_DAFIB_MATRICULE");
  const password = Cypress.env("CYPRESS_DAFIB_PASSWORD");

  it("should log in successfully as Dafib", () => {
    cy.login(matricule, password);
    cy.url().should("include", "/dashboard");
  });


});