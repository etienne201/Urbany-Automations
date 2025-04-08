import { users } from "../../../fixtures/fakedata";

const user = users.find((u) => u.role === "SDCC");

describe("SDCC Login", () => {
  it(`should log in successfully as ${user.role}`, () => {
    cy.loginUI(user.identifier, user.password);
    cy.url({ timeout: 15000 }).should("include", "/dashboard/home");




  });
});
