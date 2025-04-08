
import { users } from "../../../fixtures/fakedata";

const user = users.find((u) => u.role === "SDCC");

describe("SDCC Blocs Management", () => {

  beforeEach(() => {
    // Ensure the user is logged in before each test
    cy.loginUI(user.identifier, user.password);
    cy.url({ timeout: 15000 }).should("include", "/dashboard");
  });

  it("should log in and navigate to the blocs dashboard", () => {
    cy.url({ timeout: 15000 }).should("include", "/dashboard");
    cy.get('[href="/dashboard/blocs"]').click();
    cy.wait(1000);
  });

  it("should generate a report in the selected format", () => {
      cy.get('[href="/dashboard/blocs"]').click();
    cy.wait(1000);
    cy.get('.css-1i7f6ns').click();

    // Remplir les champs nécessaires
    cy.get(':nth-child(1) > .chakra-input__group > #email').type('10');
    cy.get(':nth-child(2) > .chakra-input__group > #email').type('1');

    // Sélectionner le format de sortie
    const exportFormat = "PDF"; // Modifier en "CSV" si nécessaire
    cy.get('.chakra-select__wrapper > #email').select(exportFormat);

    // Sélectionner les options supplémentaires
    cy.get(':nth-child(3) > .chakra-checkbox__control').click();

    // Valider et générer le rapport
    cy.get('.css-q1t2xs > :nth-child(1)').click();
    cy.get('.css-q1t2xs > :nth-child(2)').click();
    cy.get('.chakra-modal__footer > .chakra-button').click();
    cy.wait(20000);
  });

  it("should view blocs details", () => {
        cy.get('[href="/dashboard/blocs"]').click();
    cy.wait(20000);
    cy.get(':nth-child(1) > :nth-child(4) > .css-wdvcop > .css-16hxjyz > .css-13yq3yu').click();
  });

  it("should view sector details within a block", () => {
        cy.get('[href="/dashboard/blocs"]').click();
    cy.wait(20000);
   cy.get(':nth-child(1) > :nth-child(4) > .css-wdvcop > .css-16hxjyz > .css-13yq3yu').click();
  });
});