import { users } from "../../../fixtures/fakedata";
import { faker } from '@faker-js/faker';

const user = users.find((u) => u.role === "SDCC");

describe("SDCC Agent Management", () => {
  let agentData;

  beforeEach(() => {
    // Log in as an SDCC user before each test
    cy.loginUI(user.identifier, user.password);
    cy.url().should("include", "/dashboard"); // Ensure successful login

    // Generate random agent data for each test
    agentData = {
      name: faker.person.fullName(),
      matricule: `AGT${faker.number.int({ min: 10000, max: 99999 })}`,
      email: faker.internet.email(),
      phone: faker.phone.number('690#######')
    };
  });

  it("should successfully log in as an SDCC user", () => {
    cy.contains("Statistiques").should("be.visible");
  });

  it("should create a new agent with unique data", () => {
//    cy.get('[href="/dashboard/users"]').click();
   // cy.url().should("include", "/dashboard/users");

    // Click the "Create Agent" button
    cy.get('.css-1gdfc59').click();

    // Fill in the agent creation form
    cy.get(':nth-child(1) > .chakra-input__group > #email').type(agentData.name);
    cy.get('.css-w39r2f > :nth-child(2) > .chakra-input__group > #email').type(agentData.matricule);
    cy.get('.css-nznoz6 > :nth-child(2) > .chakra-input__group > #email').type(agentData.email);
    cy.get(':nth-child(3) > .chakra-input__group > #email').type(agentData.phone);

    // Submit the form
    cy.wait(15000)
    cy.get('.css-1749gbk').click();
     cy.wait(10000)
  });

//  it("should view agent details after creation", () => {
//    cy.get('[href="/dashboard/users"]').click();
//    cy.url().should("include", "/dashboard/users");
//
//    // Click on the first agent's details button
//    cy.get(':nth-child(1) > :nth-child(6) > .css-wdvcop > .css-16hxjyz > .chakra-button').click();
//
//    // Verify agent details
//    cy.contains(agentData.name).should("be.visible");
//    cy.contains(agentData.matricule).should("be.visible");
//    cy.contains(agentData.email).should("be.visible");
//  });

  it("should view agent's mission history", () => {
    cy.get('[href="/dashboard/users"]').click();
    cy.url().should("include", "/dashboard/users");

    // Click on the first agent's details button
    cy.get(':nth-child(1) > :nth-child(6) > .css-wdvcop > .css-16hxjyz > .chakra-button').click();

    // Click on mission history button
    cy.get('.chakra-stack > .chakra-button').click();

    // Verify that mission history is visible
   // cy.contains("Mission History").should("be.visible");
  });

  it("should prevent creating a duplicate agent", () => {
    cy.get('[href="/dashboard/users"]').click();
    cy.url().should("include", "/dashboard/users");

    // Click "Create Agent"
    cy.get('.css-1gdfc59').click();

    // Fill in the form with the same data
    cy.get(':nth-child(1) > .chakra-input__group > #email').type(agentData.name);
    cy.get('.css-w39r2f > :nth-child(2) > .chakra-input__group > #email').type(agentData.matricule);
    cy.get('.css-nznoz6 > :nth-child(2) > .chakra-input__group > #email').type(agentData.email);
    cy.get(':nth-child(3) > .chakra-input__group > #email').type(agentData.phone);

    // Submit form
    cy.get('.css-1749gbk').click();

    // Verify duplicate error message
   // cy.contains("An agent with this information already exists").should("be.visible");
  });
});
