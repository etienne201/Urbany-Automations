describe("Maire Login", () => {
    it("should log in successfully as Maire", () => {
      const matricule = Cypress.env("CYPRESS_MAIRE_MATRICULE");
      const password = Cypress.env("CYPRESS_MAIRE_PASSWORD");
  
      cy.visit("auth/signin");
      cy.get("#email").type(matricule);
      cy.get("#password").type(password);
      cy.get(".chakra-button").click();
  
      // Verify redirection to dashboard
      cy.url().should("include", "/dashboard");
      cy.contains("Welcome, Maire").should("be.visible");
    });
  });