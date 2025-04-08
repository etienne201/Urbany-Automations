import 'cypress-file-upload';
import { users } from "../../../fixtures/fakedata";

// Récupérer l'utilisateur Super DSI
const dsiUser = users.find((u) => u.role === "Super DSI");

// Fonction pour se connecter
const login = () => {
    cy.session("login", () => {
        cy.visit("/auth/signin");
        cy.loginUI(dsiUser.identifier, dsiUser.password);
        cy.url({ timeout: 15000 }).should("include", "/dashboard");
    });
};

// Fonction pour naviguer vers la page des partenaires
const navigateToPartnersPage = () => {
    cy.visit("/dashboard/partners");
    cy.url().should("include", "/dashboard/partners");
};

describe("DSI - Partner Management", () => {
    before(() => {
        login(); // Gestion de la session avant tous les tests
    });

    beforeEach(() => {
        navigateToPartnersPage();
    });

    it("should create, update, and delete a partner", () => {
        cy.wait(5000);

        // Création d'un partenaire
        cy.get('.css-2x7gud > .chakra-button').should('be.visible').click();
        cy.get(':nth-child(1) > .chakra-input__group > #email').type("Partner Name");
        cy.get(':nth-child(2) > .chakra-input__group > #email').type("partner@example.com");
        cy.get(':nth-child(3) > .chakra-input__group > #email').type("1234567890");
        cy.clickModalFooterButton();

        // Vérification et ouverture des détails du partenaire
        cy.get(':nth-child(1) > .chakra-card__footer > .css-13afc1b', { timeout: 15000 })
            .should('exist')
            .should('be.visible')
            .click();

        // Ajout d'une application au partenaire
        cy.get('.css-1lekzkb > .chakra-button').click();
        cy.get(':nth-child(1) > .chakra-input__group > #email').type("dev@example.com");
        cy.get(':nth-child(2) > .chakra-input__group > #email').type("1234567890");
        cy.get(':nth-child(3) > .chakra-input__group > #email').type("Test Application");

        // Upload d'un fichier
        cy.get('input[type="file"]')
            .attachFile('assets/logo/BlueWindow.png', { force: true })
            .trigger('change', { force: true });

        cy.get(':nth-child(5) > #email').type("Application Description");
        cy.wait(1000)
        cy.clickModalFooterButton();

       // Mise à jour d'un partenaire
        cy.get('.css-1b6nt2t').should('exist').should('be.visible').as('updateButton');
        cy.wait(2000); // Attente pour stabiliser l'élément
        cy.get('@updateButton').click();

        cy.get('.chakra-card__header > .chakra-button').should('exist').should('be.visible').as('actionButton');
        cy.get('@actionButton').click({ multiple: true });
        cy.get('.chakra-select__wrapper > #email').select("True");
        cy.get('.chakra-input__group > #email').clear().type("500");
        cy.clickModalFooterButton();

        // Suppression du partenaire
        cy.get('.chakra-modal__content-container').should('be.visible').click();
        cy.get('.css-41aesz').click();
    });
});
