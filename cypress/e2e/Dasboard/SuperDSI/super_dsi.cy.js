import { users } from "../../../fixtures/fakedata";

const user = users.find((u) => u.role === "Super DSI");

describe("Super DSI Login", () => {
  it(`should log in successfully as ${user.role}`, () => {
    cy.loginUI(user.identifier, user.password);

    // Vérifier la redirection et accès aux utilisateurs
    cy.get('[href="/dashboard/users"] > span').click();
  });
});
