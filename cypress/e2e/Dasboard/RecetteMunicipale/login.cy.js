describe("Recette Municipale Login", () => {
    it("should log in successfully as Recette Municipale", () => {
      const matricule = Cypress.env("CYPRESS_RECETTE_MUNICIPALE_MATRICULE");
      const password = Cypress.env("CYPRESS_RECETTE_MUNICIPALE_PASSWORD");
  
      cy.visit("auth/signin");
      cy.get("#email").type(matricule);
      cy.get("#password").type(password);
      cy.get(".chakra-button").click();
  
      // Verify redirection to dashboard
      cy.url().should("include", "/dashboard");
      cy.contains("Welcome, Recette Municipale").should("be.visible");
    });
  });