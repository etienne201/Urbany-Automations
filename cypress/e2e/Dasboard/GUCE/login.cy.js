describe("GUCE Login", () => {
    it("should log in successfully as GUCE", () => {
      const matricule = Cypress.env("CYPRESS_GUCE_MATRICULE");
      const password = Cypress.env("CYPRESS_GUCE_PASSWORD");
  
  // Utilisation de la commande personnalisée
  cy.login(matricule, password);
  
  // Vérifier la redirection vers le dashboard
  cy.url().should("include", "/dashboard");
    });
  });