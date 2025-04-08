import { users } from "../../../fixtures/fakedata";

const user = users.find((u) => u.role === "SDCC");

describe("🏗 Building Permits Management - SDCC", () => {

  beforeEach(() => {
    // Log in before each test
    cy.loginUI(user.identifier, user.password);
    cy.url().should("include", "/dashboard"); // Verify login success
  });

  it("✅ Should navigate to the building permits dashboard", () => {
    cy.get('[href="/dashboard/licences"] > span').click();
    cy.url().should("include", "/dashboard/licences"); // Verify page navigation
  });

  it("📜 Should view a building permit's details", () => {
  cy.wait(5000)
    cy.get('[href="/dashboard/licences"] > span').click()
    cy.url().should("include", "/dashboard/licences"); // Verify page navigat;
      cy.wait(30000)

    cy.get(':nth-child(1) > :nth-child(6) > .css-wdvcop > .css-16hxjyz > .chakra-button').click();

  });

  it("📅 Should filter building permits by start and end date", () => {
    cy.get('[href="/dashboard/licences"] > span').click();


    // Select today's date for the start filter
    const today = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
    cy.get(':nth-child(2) > .chakra-input').clear().type(today);

    // Select 2020 date for the end filter
    cy.get(':nth-child(3) > .chakra-input').clear().type("2020-12-31");


  });

  it("🔎 Should search for building permits by ID (1 to 10)", () => {
    cy.get('[href="/dashboard/licences"] > span').click();

    // Loop through IDs 1 to 10 and search
    for (let i = 1; i <= 10; i++) {
      cy.get('.chakra-input__group > .chakra-input').clear().type(i);

    }
  });
});
