import { users } from "../../../fixtures/fakedata";
describe("DSI-District-Management Functionality", () => {
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
         cy.url({ timeout: 15000 }).should("include", "/dashboard");

    });


  });
});
