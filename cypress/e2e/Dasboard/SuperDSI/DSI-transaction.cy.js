import { users } from "../../../fixtures/fakedata";

describe("DSI-transaction Functionality", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  const user = users.find((u) => u.role === "Super DSI");

  describe("Super DSI Role", () => {
    beforeEach(() => {
      cy.loginUI(user.identifier, user.password);
    });

    it("should log in and access the dashboard", () => {
      cy.url().should("include", "/dashboard");
      cy.get('[href="/dashboard/transactions"]').click()
    });


  });
});
