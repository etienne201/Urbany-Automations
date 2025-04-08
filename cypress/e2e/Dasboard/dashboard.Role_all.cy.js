import { users } from "../../fixtures/fakedata";

describe("Dashboard Role-Based Functionality", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  const rolePermissions = {
    "Super DSI": "Admin Panel",
    "SDCC": "SDCC Dashboard",
    "Dirpom": "Dirpom Overview",
    "Maire": "Mairie Section",
    "GUCE": "Guichet Unique",
    "Dafib": "Finance Section",
    "Agent": "Agent Tasks",
    "Recette municipale": "Recette Panel",
    "Police municipale": "Police Dashboard",
    "Partner": "Partner Portal",
  };

  users.forEach(({ identifier, password, role }) => {
    it(`should allow ${role} to log in and access their dashboard`, () => {
      cy.loginUI(identifier, password);
        cy.url({ timeout: 15000 }).should("include", "/dashboard");

     // cy.contains(role).should("be.visible");
    });
  });

  it("should deny access with incorrect credentials", () => {
    cy.loginUI("invalidUser", "wrongPassword");
    cy.contains("Invalid credentials").should("be.visible");
  });

  users.forEach(({ identifier, password, role }) => {
    describe(`Role: ${role}`, () => {
      beforeEach(() => {
        cy.loginUI(identifier, password);
      });

      it(`should allow ${role} to view their allowed pages`, () => {
        if (rolePermissions[role]) {
          cy.contains(rolePermissions[role]).should("be.visible");
        }
      });

      it(`should restrict ${role} from unauthorized pages`, () => {
        if (role !== "Super DSI") {
          cy.visit("/admin");
          cy.contains("Access Denied").should("be.visible");
        }
      });
    });
  });
});
