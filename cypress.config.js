const { defineConfig } = require("cypress");
const dotenvPlugin = require('cypress-dotenv');


module.exports = defineConfig({
  env: {
    API_URL: process.env.API_URL || "https://urbany-api.sevengps.xyz/api",
    DASHBOARD_URL: process.env.DASHBOARD_URL || "https://urbany.sevengps.xyz",
    ENV: process.env.ENV || "staging",
  },

  retries: {
    runMode: 1,
    openMode: 0,
  },

  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    baseUrl: "https://urbany.sevengps.xyz",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/commands.js",

    watchForFileChanges: true,

    screenshotOnRunFailure: true,
    video: true,
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",

    viewportWidth: 1920,
    viewportHeight: 1080,

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,

    setupNodeEvents(on, config) {
      return config;
        config = dotenvPlugin(config);

    },
  },
});
