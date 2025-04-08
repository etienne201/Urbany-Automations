import { users } from "../../../fixtures/fakedata";

describe("DSI-Building-Coordinates Functionality", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  const user = users.find((u) => u.role === "Super DSI");

  describe("Super DSI - Dashboard Access, Filtering, and Data Copy", () => {
    beforeEach(() => {
      cy.loginUI(user.identifier, user.password);
    });

    it("should log in and access the dashboard", () => {
      cy.url({ timeout: 15000 }).should("include", "/dashboard");
      cy.get('[href="/dashboard/constructions"]').click();
        cy.wait(5000);
    });

    it("should verify section contents", () => {
      cy.get('[href="/dashboard/constructions"]').click();
        cy.wait(10000);
      cy.get('.css-1mfzynb').should("contain", "TOTAL CONSTRUCTIONS");
      cy.get('.css-k8k4lm').invoke('text').as('totalConstructions');

      cy.get(':nth-child(2) > .css-ubq4m6').should("contain", "Conforme");
      cy.get(':nth-child(2) > .css-1w0rpsw').invoke('text').as('conformeCount');

      cy.get('.css-1le267c').should("contain", "Non Vérifiés");
      cy.get(':nth-child(3) > .css-1w0rpsw').invoke('text').as('nonVerifiesCount');

      cy.get(':nth-child(4) > .css-ubq4m6').should("contain", "Convoqués");
      cy.get(':nth-child(4) > .css-1w0rpsw').invoke('text').as('convoquesCount');
    });

    it("should filter constructions by status", () => {
      cy.get('[href="/dashboard/constructions"]').click();
              cy.wait(10000);

      cy.get('[id="field-:rm:"]').select("Tout");
      cy.get('[id="field-:rm:"]').select("IN ORDER");
      cy.get('[id="field-:rm:"]').select("NOT VERIFIED");
      cy.get('[id="field-:rm:"]').select("VERIFIED");
      cy.get('[id="field-:rm:"]').select("SUMMONED");
    });

    it("should filter constructions by state", () => {
      cy.get('[href="/dashboard/constructions"]').click();
              cy.wait(10000);

      cy.get('[id="field-:rl:"]').select("Tout");
      cy.get('[id="field-:rl:"]').select("EN CONSTRUCTION");
      cy.get('[id="field-:rl:"]').select("TERMINÉ");
    });

    it("should filter constructions by date", () => {
      cy.get('[href="/dashboard/constructions"]').click();
      cy.get('.chakra-input').click();
    });

    it("should filter constructions by period", () => {
      cy.get('[href="/dashboard/constructions"]').click();
              cy.wait(10000);

      cy.get('[id="popover-trigger-:re:"]').click(); // Semaine
      cy.get('[id="popover-trigger-:rh:"]').click(); // Mois
      cy.get('[id="popover-trigger-:rk:"]').click(); // Année
      cy.get('.react-datepicker__input-container > .chakra-button').click(); // Jours
    });

    it("should view construction details", () => {
      cy.get('[href="/dashboard/constructions"]').click();
              cy.wait(10000);

      cy.get(':nth-child(1) > :nth-child(6) > .css-wdvcop > .css-16hxjyz > .css-13yq3yu').click();
         cy.wait(10000);
    });
  });
});