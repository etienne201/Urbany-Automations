import { users } from "../../../fixtures/fakedata";

const user = users.find((u) => u.role === "Maire");

describe("Maire Arrondissements Management", () => {

  beforeEach(() => {
    // Ensure the user is logged in before each test
    cy.loginUI(user.identifier, user.password);
    cy.url({ timeout: 15000 }).should("include", "/dashboard");
  });

  it("Exports a district report successfully", () => {
    // Navigate to district management
    cy.get('[href="/dashboard/arrondissements"] > span').click();
    cy.url({ timeout: 15000 }).should("include", "/dashboard/arrondissements");

    // Click the export report button
    cy.get('.css-1ufrzn0 > .chakra-button').click();

    // Fill in required fields
    cy.get(':nth-child(1) > .chakra-input__group > #email').type('10');
    cy.get(':nth-child(2) > .chakra-input__group > #email').type('1');

    // Select export format
    const exportFormat = "PDF"; // Change to "CSV" if necessary
    cy.get('.chakra-select__wrapper > #email').select(exportFormat);

    // Select additional options
    cy.get(':nth-child(3) > .chakra-checkbox__control').click();

    // Confirm and generate the report
    cy.get('.css-q1t2xs > :nth-child(1)').click();
    cy.get('.css-q1t2xs > :nth-child(2)').click();
    cy.get('.chakra-modal__footer > .chakra-button').click();
  });

  it("Searches for a specific district", () => {
    // Navigate to district management
    cy.get('[href="/dashboard/arrondissements"]').click();
    cy.url({ timeout: 15000 }).should("include", "/dashboard/arrondissements");

    // Perform search
    cy.get('.chakra-input').type('360');
  });
});
