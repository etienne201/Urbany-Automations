import { users } from "../../../fixtures/fakedata";
import { faker } from "@faker-js/faker";

const user = users.find((u) => u.role === "SDCC");

describe("SDCC Mission Management ", () => {
  let missionData;

  beforeEach(() => {
    // Connexion avant chaque test
    cy.loginUI(user.identifier, user.password);
    cy.url().should("include", "/dashboard"); // Vérifier l'accès au tableau de bord

    // Génération de données aléatoires
    missionData = {
      name: faker.company.name(),
      arrondissement: "Douala 3",
      quartier: "japoma",
      secteur: "Carrefour du Réveil",
      housePrefix: "house-",
      startDate: "Today",
      endDate: "04 November 2025",
      agents: ["Nichole Lubowitz", "Ray Foster"],
    };
  });

  it("✅ should successfully log in and access the missions module", () => {
    cy.get('[href="/dashboard/missions"]').click();
    cy.url().should("include", "/dashboard/missions");
   // cy.contains("Mission Management").should("be.visible");
  });

  it("✅ should create a new mission successfully", () => {
    cy.get('[href="/dashboard/missions"]').click();
    cy.get('.chakra-stack > .css-1749gbk').click(); // Bouton "Créer"

    // Remplir les champs correctement
    cy.get('.css-mes7xp > :nth-child(1) > .chakra-input__group > #email').type(missionData.name);
    cy.get('.css-1kusnq8 > .chakra-button').click();
    cy.get('.css-1i2407o > .chakra-button').click();
    cy.get('.css-1ktp5rg > .chakra-form-control > .chakra-select__wrapper > #email').select(missionData.agents[0]);
    cy.get('.chakra-modal__footer > .chakra-button').click();
//    cy.get('.css-1i2407o > .css-ez23ye').type(missionData.arrondissement).click();
// Vérifier que le champ est visible avant de taper le texte




// Attendre que le champ de sélection soit présent et visible avant d'interagir
cy.get('#field-\\:r1l\\:')
  .should('exist') // Vérifie que l'élément est dans le DOM
  .should('be.visible') // Vérifie qu'il est affiché
  .click()
  .type(missionData.arrondissement);


// Vérifier que la modal contenant les arrondissements est visible
cy.get('.chakra-modal__content-container')
  .should('exist')
  .should('be.visible');

// Vérifier si "Douala 3" est bien affiché avant de cliquer
cy.contains('.chakra-modal__content-container', 'Douala 3')
  .should('exist')
  .should('be.visible')
  .click();



//    cy.get('#field-\\:r1t\\:').type(missionData.quartier).click();
//    cy.get('#field-\\:r21\\:').type(missionData.secteur).click();

    // Ajouter une construction
    cy.get('.css-1kxonj9 > .chakra-button').click();
    cy.get('.css-1i2407o > .chakra-button').click().type(`${missionData.housePrefix}101`);
    cy.get('.chakra-modal__footer > .chakra-button').click();

    // Sélectionner la date de début et de fin
    cy.get('#start-date').click().type(missionData.startDate);
    cy.get('#end-date').click().type(missionData.endDate);

    // Soumettre
    cy.get('.chakra-modal__footer > .chakra-button').click();
   // cy.contains("Mission created successfully").should("be.visible");
  });
//
//  it("❌ should fail to create a mission with missing required fields", () => {
//    cy.get('[href="/dashboard/missions"]').click();
//    cy.get('.chakra-stack > .css-1749gbk').click();
//
//    // Ne pas remplir les champs et essayer de soumettre
//    cy.get('.chakra-modal__footer > .chakra-button').click();
//
//    // Vérifier que les erreurs apparaissent
//    cy.contains("Mission name is required").should("be.visible");
//    //cy.contains("At least one agent must be assigned").should("be.visible");
//  });
//
//  it("✅ should view mission details", () => {
//    cy.get('[href="/dashboard/missions"]').click();
//    cy.get(':nth-child(1) > .chakra-card > .chakra-card__body > .chakra-button').click();
//
//    // Vérifier que les informations s'affichent
//    cy.contains(missionData.name).should("be.visible");
//    cy.contains(missionData.agents[0]).should("be.visible");
//    cy.contains(missionData.secteur).should("be.visible");
//  });
//
//  it("✅ should edit an existing mission", () => {
//    cy.get('[href="/dashboard/missions"]').click();
//    cy.get(':nth-child(1) > .chakra-card > .chakra-card__body > .chakra-button').click();
//    cy.get('.css-41aesz').click();
//
//    // Modifier le nom de la mission
//    const newName = "Updated Mission Name";
//    cy.get('.css-mes7xp > :nth-child(1) > .chakra-input__group > #email').clear().type(newName);
//    cy.get('.css-mes7xp > .chakra-stack > .chakra-button').click();
//
//    // Vérifier que le changement est bien pris en compte
//    //cy.contains("Mission updated successfully").should("be.visible");
//  });
//
//  it("❌ should fail to edit a mission with an empty name", () => {
//    cy.get('[href="/dashboard/missions"]').click();
//    cy.get(':nth-child(1) > .chakra-card > .chakra-card__body > .chakra-button').click();
//    cy.get('.css-41aesz').click();
//
//    // Effacer le nom et soumettre
//    cy.get('.css-mes7xp > :nth-child(1) > .chakra-input__group > #email').clear();
//    cy.get('.css-mes7xp > .chakra-stack > .chakra-button').click();
//
//    // Vérifier que l'erreur apparaît
//   // cy.contains("Mission name is required").should("be.visible");
//  });
//
//  it("✅ should delete a mission", () => {
//    cy.get('[href="/dashboard/missions"]').click();
//    cy.get(':nth-child(1) > .chakra-card > .chakra-card__body > .chakra-button').click();
//    cy.get('.css-41aesz').click(); // Bouton "Modifier"
//    cy.get('.css-41aesz').click(); // Bouton "Supprimer"
//   // cy.contains("Mission deleted successfully").should("be.visible");
//  });
//
//  it("❌ should fail to delete a mission without confirmation", () => {
//    cy.get('[href="/dashboard/missions"]').click();
//    cy.get(':nth-child(1) > .chakra-card > .chakra-card__body > .chakra-button').click();
//    cy.get('.css-41aesz').click(); // Bouton "Modifier"
//
//    // Annuler la suppression
//    cy.get('.css-41aesz').click(); // Cliquer sur supprimer
//    cy.get('.cancel-delete-button').click(); // Annuler
//
//    // Vérifier que la mission est toujours là
//   // cy.contains(missionData.name).should("exist");
//  });
});
