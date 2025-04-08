import { users } from "../../../fixtures/fakedata";
import { faker } from "@faker-js/faker";
import "cypress-file-upload"; // ✅ Ensure the plugin is imported

const user = users.find((u) => u.role === "SDCC");
const futureDate = new Date(2025, 9, 10).toISOString().split("T")[0]; // "2025-10-10"

describe("🔹 SDCC Convocation and Fine Management", () => {
  beforeEach(() => {
    cy.loginUI(user.identifier, user.password);
    cy.url().should("include", "/dashboard");
  });

  it("📝 Should create a new fine successfully", () => {
    // 🏢 Navigate to convocations page
    cy.get('[href="/dashboard/convocations"]').click();
    cy.url().should("include", "/dashboard/convocations");
    cy.wait(45000);

    // 🔎 Check if 'Add Fine' button exists before clicking
    cy.get("body").then(($body) => {
      if ($body.find(".css-1k9efnl").length) {
        cy.get(':nth-child(1) > :nth-child(6) > .css-wdvcop > .css-1k9efnl > .css-hipoo1').click();
      }
    });

    // 🎯 Step 1: Fill in fine details
    const fineData = {
      number: `FINE-${faker.number.int({ min: 1000, max: 9999 })}`,
      amount: faker.number.int({ min: 50000, max: 200000 }).toString(),
      payerName: faker.person.fullName(),
      payerPhone: `+2376${faker.number.int({ min: 10000000, max: 99999999 })}`,
      dueDate: futureDate,
      installment: faker.helpers.arrayElement(["Oui", "Non"]),
      installmentCount: faker.helpers.arrayElement([2, 4, 5]),
      promoterCardNumber: faker.finance.creditCardNumber(), // Numéro carte du promoteur
      payerCardNumber: faker.finance.creditCardNumber(), // Numéro carte du payeur
    };

    cy.get(':nth-child(1) > .chakra-input__group > #email').type(fineData.number);
    cy.get(':nth-child(2) > .chakra-input__group > #email').type(fineData.amount);
    cy.get(':nth-child(3) > .chakra-input__group > #email').type(fineData.payerName);
    cy.get(':nth-child(4) > .chakra-input__group > #email').type(fineData.payerPhone);
    cy.get(':nth-child(5) > .chakra-input__group > #email').type(fineData.dueDate);
    cy.get('.chakra-select__wrapper > #email').select(fineData.installment);

    if (fineData.installment === "Oui") {
      cy.get(':nth-child(7) > .chakra-input__group > #email').type(fineData.installmentCount.toString());
    }
   cy.get('.css-1hj09ks').click();
    cy.wait(3000);
       // 📂 Step 2: Upload documents using input[type="file"]
cy.get(':nth-child(1) > .chakra-input__group > #email').type(fineData.promoterCardNumber); // Numéro carte du promoteur
cy.get(':nth-child(2) > .chakra-input__group > #email').type(fineData.payerCardNumber); // Numéro carte du payeur


    cy.get('input[type="file"]')  // Find all file input fields
      .each((input) => {
        cy.wait(3000); // Attendre 3 secondes avant chaque upload
        cy.wrap(input)
          .attachFile('assets/logo/BlueWindow.png', { force: true })
          .trigger('change', { force: true });
      });

    // 📜 Click the 4 buttons after uploading
    const buttonSelectors = [
      '.css-14tmoe4 > :nth-child(3) > .chakra-button',
      '.css-14tmoe4 > :nth-child(4) > .chakra-button',
      ':nth-child(5) > .chakra-button',
      ':nth-child(6) > .chakra-button'
    ];

    buttonSelectors.forEach((selector) => {
      cy.wait(10000); // Attendre 10 secondes avant chaque clic
      cy.get(selector).click();
    });
     cy.wait(10000);
    cy.get('.chakra-modal__footer > :nth-child(3)').click();
   // cy.get('.chakra-modal__footer > :nth-child(3)').click();
    cy.wait(10000);
     // 📸 Step 4: Upload Construction Images
    cy.get('#email').type(faker.number.int({ min: 50, max: 500 }).toString());
    // 📍 Step 5: Upload Plan Construction & Plan Localisation
    cy.get('input[type="file"]')
      .attachFile('assets/logo/BlueWindow.png', { force: true })
      //.trigger('change', { force: true });

    cy.get('input[type="file"]')
      .attachFile('assets/logo/BlueWindow.png', { force: true })
      .trigger('change', { force: true });

    cy.get('input[type="file"]')
      .attachFile('assets/images/image1.png', { force: true })
      .trigger('change', { force: true });

    cy.get('input[type="file"]')
      .attachFile('assets/images/image2.png', { force: true })
      .trigger('change', { force: true });



    cy.get('.css-1749gbk').click();
  });
});
