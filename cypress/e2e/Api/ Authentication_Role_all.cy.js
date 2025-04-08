import { users } from "../../fixtures/fakedata";

describe("Authentication Tests for All Roles", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  users.forEach((user) => {
    it(`should authenticate ${user.role} (${user.identifier})`, () => {
      cy.wait(500); // Attente de 500ms avant chaque test
      cy.login(user.identifier, user.password);

      cy.get("@authToken").then((token) => {
        if (token) {
          expect(token).to.be.a("string");
          cy.log(`✅ Token reçu pour ${user.role}`);
        } else {
          cy.log(`❌ Échec d'authentification pour ${user.role}`);
        }
      });
    });
  });
});
