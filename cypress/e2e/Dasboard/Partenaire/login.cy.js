describe("Partenaire Login", () => {
    it("should log in successfully as Partenaire", () => {
      const identifier = Cypress.env("CYPRESS_PARTENAIRE_IDENTIFIER");
      const password = Cypress.env("CYPRESS_PARTENAIRE_PASSWORD");
  
  // Utilisation de la commande personnalisée
  cy.login(identifier, password);
  
  // Vérifier la redirection vers le dashboard
  cy.url().should("include", "/dashboard");
    });
  });