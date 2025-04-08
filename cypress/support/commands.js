Cypress.Commands.add("loginUI", (identifier, password) => {
  cy.visit(Cypress.env("DASHBOARD_URL") + "/auth/signin");

  cy.get("#identifier", { timeout: 15000 }).should("be.visible").type(identifier);
  cy.get("#email").should("be.visible").type(password);
  cy.get(".chakra-button").click();
});
Cypress.Commands.add("clickModalFooterButton", (timeout = 10000) => {
  cy.get('.chakra-modal__footer > .chakra-button', { timeout })
    .should('have.length', 1)  // Assurer qu'il n'y a qu'un seul bouton
    .first()  // Sélectionner le premier bouton s'il y en a plusieurs
    .click({ force: true });  // Forcer le clic si nécessaire
});

Cypress.Commands.add("login", (identifier, password, retryCount = 0) => {
  const MAX_RETRIES = 3; // 🔥 Nombre maximal de tentatives
  let RETRY_DELAY = 5000; // ⏳ Délai initial avant une nouvelle tentative (5s)

  cy.request({
    method: "POST",
    url: `${Cypress.env("API_URL")}/auth/login`,
    body: { identifier, password },
    headers: { "Content-Type": "application/json" },
    failOnStatusCode: false // ✅ Évite que Cypress échoue directement en cas d'erreur
  }).then((response) => {
    if (response.status === 200 && response.body.data) {
      // ✅ Authentification réussie
      const { token } = response.body.data;
      cy.wrap(token).as("authToken");
      window.localStorage.setItem("authToken", token);
      cy.log(`✅ Connexion réussie pour ${identifier}`);
    } else if (response.status === 429) {
      // ⚠️ Trop de requêtes, on regarde s'il y a un en-tête `Retry-After`
      const retryAfter = response.headers["retry-after"];
      if (retryAfter) {
        RETRY_DELAY = parseInt(retryAfter) * 1000; // Convertir en millisecondes
      } else {
        RETRY_DELAY *= 2; // 🔥 Backoff exponentiel (2x plus long à chaque échec)
      }

      if (retryCount < MAX_RETRIES) {
        cy.log(`⚠️ Trop de requêtes pour ${identifier}, nouvelle tentative dans ${RETRY_DELAY / 1000} secondes...`);
        cy.wait(RETRY_DELAY);
        cy.login(identifier, password, retryCount + 1);
      } else {
        cy.log(`❌ Échec après ${MAX_RETRIES} tentatives pour ${identifier}`);
      }
    } else {
      // ❌ Autres erreurs (ex: 401 Unauthorized)
      cy.log(`❌ Échec de connexion pour ${identifier} - Status: ${response.status}`);
    }
  });
});
 import Mailosaur from "mailosaur";

Cypress.Commands.add("getEmail", (serverId, apiKey) => {
  const mailosaur = new Mailosaur(apiKey);
  return mailosaur.messages.waitFor(serverId, { timeout: 30000 });
});

