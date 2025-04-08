import { users } from "../../../fixtures/fakedata";
import dayjs from "dayjs"; // Librairie pour manipuler les dates

const user = users.find((u) => u.role === "SDCC");

describe("SDCC Amends Management", () => {
  beforeEach(() => {
    // Connexion avant chaque test
    cy.loginUI(user.identifier, user.password);
    cy.get('[href="/dashboard/amendes"] > span').click();
    cy.url().should("include", "/dashboard/amendes");
  });


  it("should view fine details", () => {
  cy.wait(20000)
    cy.get(':nth-child(1) > :nth-child(7) > .css-wdvcop > .css-m5zw6q > .css-13yq3yu').click();

    // Vérifier que la page "Détails de l'amende" est bien affichée
    cy.contains("Détails de l'amende").should("be.visible");
  });

it("should filter fines by status", () => {
  cy.wait(15000); // Attendre le chargement des données

  // Sélectionner "PAYE" dans la liste déroulante
  cy.get('#email').select("PAYE");
  cy.wait(1000);
  cy.contains("PAYE").should("be.visible");

  // Sélectionner "NON_PAYE" dans la liste déroulante
  cy.get('#email').select("NON_PAYE");
  cy.wait(1000);
  cy.contains("NON_PAYE").should("be.visible");
});


  it("should search fines by amount", () => {
    cy.get('.chakra-input').type(2000);
    cy.wait(1000);
    cy.contains("2000").should("be.visible"); // Vérifie que le montant est bien affiché
  });

  it("should filter fines by date range", () => {
    const today = dayjs().format("DD/MM/YYYY");
    const lastWeek = dayjs().subtract(7, "day").format("DD/MM/YYYY");
  cy.wait(10000);
    cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > .date')
      .clear()
      .type(today)
      .blur(); // Entrer la date d’aujourd’hui
  cy.wait(10000);
    cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > .date')
      .clear()
      .type(lastWeek)
      .blur(); // Entrer la date d'il y a une semaine

    cy.wait(1000);

  });

  it("should generate and download a report", () => {
    cy.wait(10000); // Attendre 10 secondes pour charger les données
    cy.get('.css-1i7f6ns').click(); // Ouvrir le menu de rapport

    // Remplir les champs
    cy.get(':nth-child(1) > .chakra-input__group > #email').type('3');
    cy.get(':nth-child(2) > .chakra-input__group > #email').type('1');

    // Sélectionner le format de sortie
    const exportFormat = "PDF";
   cy.get('.css-1b08k1p > .chakra-select__wrapper > #email').select(exportFormat);

    // Sélectionner les cases à cocher
    const checkboxes = [
      ':nth-child(1) > .chakra-checkbox__control',
      ':nth-child(5) > .chakra-checkbox__control',
      ':nth-child(7) > .chakra-checkbox__control',
      ':nth-child(9) > .chakra-checkbox__control',
      ':nth-child(11) > .chakra-checkbox__control',
      ':nth-child(8) > .chakra-checkbox__control',
    ];

    checkboxes.forEach((selector) => {
      cy.get(selector).click();
    });

    // Valider la sélection
    cy.get('.css-q1t2xs > :nth-child(1)').click();
cy.get('.chakra-modal__footer > .chakra-button').click()
    // Vérifier que le rapport est généré

  });
});
