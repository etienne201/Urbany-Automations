describe("Dirpom Login", () => {
    it("should log in successfully as Dirpom", () => {
      const matricule = Cypress.env("CYPRESS_DIRPOM_MATRICULE");
      const password = Cypress.env("CYPRESS_DIRPOM_PASSWORD");
  
  // Utilisation de la commande personnalisée
  cy.login(matricule, password);
  
  // Vérifier la redirection vers le dashboard
  cy.url().should("include", "/dashboard");
    });
  });