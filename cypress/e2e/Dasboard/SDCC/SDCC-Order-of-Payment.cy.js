import { users } from "../../../fixtures/fakedata";

const user = users.find((u) => u.role === "SDCC");

describe("SDCC Management Agent", () => {
  it(`should log in successfully as ${user.role}`, () => {
    cy.loginUI(user.identifier, user.password);
   cy.get('[href="/dashboard/orders/"] > span').click()


    // Vérifier la redirection et accès aux utilisateurs

  });
});
