import { users } from "../../../fixtures/fakedata";

const user = users.find((u) => u.role === "Super DSI");

describe("DSI User Management", () => {
  before(() => {
    cy.session("login", () => {
      cy.visit("/auth/signin");
      cy.loginUI(user.identifier, user.password);
      cy.url({ timeout: 15000 }).should("include", "/dashboard");
    });
  });

  beforeEach(() => {
    cy.visit("/dashboard/users");
    cy.url().then((url) => {
      if (url.includes("/auth/signin")) {
        cy.loginUI(user.identifier, user.password);
        cy.visit("/dashboard/users");
      }
    });
    cy.url().should("include", "/dashboard/users");
  });

  const roles = [
    "RECETTE-MUNICIPALE", "RECETTE-MUNICIPALE-OPERATIONNEL", "SDCC", "MAIRE-OPERATIONNEL",
    "AGENT", "GUICHET-UNIQUE-OPERATIONNEL", "DIRECTION-DE-POLICE-MUNICIPALE", "MAIRE",
    "DAFIB-OPERATIONNEL", "GUICHET-UNIQUE", "DAFIB", "DIRECTION-DE-POLICE-MUNICIPALE-OPERATIONNEL"
  ];

  roles.forEach((role) => {
    it(`should DSI can  manage a user(CURD) with role ${role}`, () => {
      cy.loginUI(user.identifier, user.password);

      // Vérifier et cliquer sur le menu Utilisateurs
      cy.get('[href="/dashboard/users"] > span').click();

      const uniqueId = Date.now();
      const uniqueEmail = `john.doe+${uniqueId}@example.com`;
      const uniqueMatricule = `123456${Math.floor(Math.random() * 1000)}`;

      cy.log("Creating a new user");
      cy.get(".css-1gdfc59", { timeout: 20000 }).should("be.visible").click();

      cy.get(':nth-child(1) > .chakra-input__group > #email').type("John Doe");
      cy.get(':nth-child(2) > .chakra-input__group > #email').type(uniqueMatricule);
      cy.get(':nth-child(3) > .chakra-input__group > #email').type(uniqueEmail);
      cy.get(':nth-child(4) > .chakra-input__group > #email').type("1234567890");

      // Vérifier que le champ select contient bien les rôles attendus
      cy.get(':nth-child(5) > .chakra-select__wrapper > #email',{ timeout: 5000 })
        .should("be.visible")
        .find("option")
        .then((options) => {
          const availableRoles = [...options].map(o => o.textContent.trim());
          cy.log("Available roles:", availableRoles);

          if (!availableRoles.includes(role)) {
            cy.log(`Role "${role}" not found in select options`);
            return;
          }
        });

      // Attente explicite et sélection du rôle
      cy.get(':nth-child(5) > .chakra-select__wrapper > #email',{ timeout: 15000 })
        .should("not.be.empty")
        .select(role, { force: true });

      // Sélection d'une autre option requise
      cy.get(':nth-child(1) > .chakra-select__wrapper > #email').select("CUD");

      // Validation de la création
      cy.get(".css-1749gbk").click();
      cy.contains("John Doe", { timeout: 20000 }).should("exist");

      // Vérification des détails de l'utilisateur
      cy.log("Viewing user details");
      cy.get(':nth-child(1) > :nth-child(6) > .css-wdvcop > .css-16hxjyz > .css-13yq3yu').click();
      cy.contains("Détails de l'utilisateur").should("exist");
      cy.get(".chakra-modal__close-btn").click();

      // Mise à jour de l'utilisateur
      cy.log("Updating user");
      cy.get(':nth-child(1) > :nth-child(6) > .css-wdvcop > .css-16hxjyz > .css-1ovb70h').click();
      cy.get(':nth-child(1) > .chakra-input__group > #email').clear().type("Jane Doe");
      cy.get(".css-1749gbk").click();
      cy.contains("Jane Doe", { timeout: 20000 }).should("exist");

      // Suppression de l'utilisateur
      cy.log("Deleting user");
      cy.get(':nth-child(1) > :nth-child(6) > .css-wdvcop > .css-16hxjyz > .css-1wlapav').click();
      cy.get(".css-41aesz").click();
      cy.contains("Jane Doe", { timeout: 20000 }).should("not.exist");
    });
  });
});
