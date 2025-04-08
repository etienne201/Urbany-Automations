import { users } from "../../../fixtures/fakedata";

const rolesToTest = ["Maire", "Maire opérationnel"];

describe("SDCC Login", () => {
  rolesToTest.forEach((role) => {
    const user = users.find((u) => u.role === role);

    it(`should log in successfully as ${role}`, () => {
      expect(user, `User with role ${role} should exist`).to.exist;

      cy.loginUI(user.identifier, user.password);
      cy.url({ timeout: 15000 }).should("include", "/dashboard");
    });
  });
});
