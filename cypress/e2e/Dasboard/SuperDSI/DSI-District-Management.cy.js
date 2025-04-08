import { users } from "../../../fixtures/fakedata";

describe("DSI-District-Management Functionality", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  const user = users.find((u) => u.role === "Super DSI");

  describe("Super DSI - Dashboard Access and Report Export", () => {
    beforeEach(() => {
      cy.loginUI(user.identifier, user.password);
    });

    it("should log in, navigate to districts, and export a report", () => {
      cy.url({ timeout: 15000 }).should("include", "/dashboard");

      // Naviguer vers la gestion des arrondissements
      cy.get('[href="/dashboard/arrondissements"]').click();
      cy.wait(5000);

      // Obtenir le rapport
      cy.get('.css-1ufrzn0 > .chakra-button').click();

      // Remplir les champs nécessaires
      cy.get(':nth-child(1) > .chakra-input__group > #email').type('10');
      cy.get(':nth-child(2) > .chakra-input__group > #email').type('1');

      // Choisir le format de sortie (PDF ou CSV)
      const exportFormat = "PDF"; // Modifier en "CSV" si nécessaire
      if (exportFormat === "PDF") {
        cy.get('.chakra-select__wrapper > #email').select('PDF');
      } else {
        cy.get('.chakra-select__wrapper > #email').select('CSV');
      }

      // Sélectionner les options supplémentaires
      cy.get(':nth-child(3) > .chakra-checkbox__control').click();

      // Valider et générer le rapport
      cy.get('.css-q1t2xs > :nth-child(1)').click();
      cy.get('.css-q1t2xs > :nth-child(2)').click();
      cy.get('.chakra-modal__footer > .chakra-button').click();
    });

    it("should view details of a specific district", () => {
      cy.url({ timeout: 15000 }).should("include", "/dashboard");

      // Naviguer vers la gestion des arrondissements
      cy.get('[href="/dashboard/arrondissements"]').click();
      cy.wait(5000);

      // Voir les détails d’un arrondissement
      cy.get(':nth-child(1) > :nth-child(5) > .css-wdvcop > .css-16hxjyz > .css-13yq3yu').click();
    });
  });
});