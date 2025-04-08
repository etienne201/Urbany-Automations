import { users } from "../../../fixtures/fakedata";

describe("DSI-Neighborhood-Management - Super DSI Functional Tests", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    const user = users.find((u) => u.role === "Super DSI");
    cy.loginUI(user.identifier, user.password);
  });

  it("should log in and access the dashboard", () => {
    cy.url({ timeout: 15000 }).should("include", "/dashboard");
    cy.get('.css-1oifytp > .chakra-stack > :nth-child(4)').click();
    cy.wait(1000);
  });

  it("should generate a report with selected format", () => {
      cy.get('.css-1oifytp > .chakra-stack > :nth-child(4)').click();
    cy.wait(1000);
    cy.get('.css-1i7f6ns').click();
    cy.get(':nth-child(1) > .chakra-input__group > #email').type('10');
    cy.get(':nth-child(2) > .chakra-input__group > #email').type('1');

    ["PDF", "CSV"].forEach(format => {
      cy.get('.chakra-select__wrapper > #email').select(format);
    });

    cy.get(':nth-child(3) > .chakra-checkbox__control').click();
    cy.get('.css-q1t2xs > :nth-child(1)').click();
    cy.get('.css-q1t2xs > :nth-child(2)').click();
    cy.get('.chakra-modal__footer > .chakra-button').click();
    cy.wait(1000);
  });

  it("should view details of a specific block", () => {
      cy.get('.css-1oifytp > .chakra-stack > :nth-child(4)').click();
    cy.wait(1000);
    cy.get(':nth-child(1) > :nth-child(5) > .css-wdvcop > .css-16hxjyz > .css-13yq3yu').click();
  });
});