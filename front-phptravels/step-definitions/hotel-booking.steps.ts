/**
 * ARCHIVO: step-definitions/hotel-booking.steps.ts
 * PROPÓSITO: Implementar los pasos definidos en el archivo .feature
 * NOTA: Los logs se manejan en los Page Objects (evitar duplicidad)
 */

import { Given, When, Then, Before, After, setWorldConstructor } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { HotelBookingPage } from '../pages/hotel-booking.page';
import { config } from '../config/environment';
import { testData } from '../data/test-data';

class CustomWorld {
  browser: Browser;
  page: Page;
  homePage: HomePage;
  hotelBookingPage: HotelBookingPage;

  async init(): Promise<void> {
    this.browser = await chromium.launch({ 
      headless: false, 
      slowMo: 500,
      timeout: config.timeouts.long 
    });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.homePage = new HomePage(this.page);
    this.hotelBookingPage = new HotelBookingPage(this.page);
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

setWorldConstructor(CustomWorld);

Before({ timeout: config.timeouts.long }, async function (this: CustomWorld) {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 NUEVO ESCENARIO - INICIANDO...');
  console.log('='.repeat(60));
  await this.init();
});

After({ timeout: config.timeouts.medium }, async function (this: CustomWorld) {
  console.log('\n' + '='.repeat(60));
  console.log('🏁 ESCENARIO FINALIZADO');
  console.log('='.repeat(60) + '\n');
  await this.close();
});

// ============================================================================
// GIVEN
// ============================================================================

Given('que el usuario accede a la página principal de PHPTravels', { timeout: config.timeouts.long }, async function (this: CustomWorld) {
  await this.homePage.open();
});

Given('que el usuario cambia el idioma a {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, idioma: string) {
  await this.homePage.selectLanguageSpanish();
});

Given('el usuario cambia la moneda a {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, moneda: string) {
  await this.homePage.selectCurrencyUSD();
});

Given('el usuario selecciona el código de país {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, codigo: string) {
});

// ============================================================================
// WHEN
// ============================================================================

When('el usuario navega al hotel {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, hotel: string) {
  await this.hotelBookingPage.navigateToHotel();
});

When('el usuario selecciona la nacionalidad {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, nacionalidad: string) {
  await this.hotelBookingPage.selectNationality();
});

When('el usuario selecciona {string} habitación', { timeout: config.timeouts.long }, async function (this: CustomWorld, cantidad: string) {
  await this.hotelBookingPage.selectRoomQuantity();
});

When('el usuario hace clic en el botón {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, boton: string) {
  if (boton === 'Seleccionar') {
    await this.hotelBookingPage.clickSelectButton();
  } else if (boton === 'Continuar reservando') {
    await this.hotelBookingPage.clickContinueButton();
  } else if (boton === 'Pagar') {
    await this.hotelBookingPage.clickPayButton();
  }
});

When('el usuario hace clic en "Realizar pago"', { timeout: config.timeouts.long }, async function (this: CustomWorld) {
  await this.hotelBookingPage.clickMakePayment();
});

When('el usuario hace clic en "Proceed to Payment"', { timeout: config.timeouts.long }, async function (this: CustomWorld) {
  await this.hotelBookingPage.clickProceedToPayment();
});

When('el usuario completa el formulario con:', { timeout: config.timeouts.long }, async function (this: CustomWorld, dataTable: any) {
  await this.hotelBookingPage.fillPersonalDetails();
});

When('el usuario selecciona el método de pago {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, metodo: string) {
  await this.hotelBookingPage.selectCreditCardPayment();
});

When('el usuario acepta los términos y condiciones', { timeout: config.timeouts.long }, async function (this: CustomWorld) {
  await this.hotelBookingPage.acceptTerms();
});

When('el usuario confirma la reserva', { timeout: config.timeouts.long }, async function (this: CustomWorld) {
  await this.hotelBookingPage.confirmBooking();
});

When('el usuario completa los datos de la tarjeta:', { timeout: config.timeouts.long }, async function (this: CustomWorld, dataTable: any) {
  const datos = dataTable.hashes()[0];
  const cardData = {
    number: datos.Número.replace(/\s/g, ''),
    expiry: datos.Expiración,
    cvc: datos.CVC,
    holderName: datos['Nombre completo']
  };
  await this.hotelBookingPage.fillCardDetails(cardData);
});

// ============================================================================
// THEN
// ============================================================================

Then('el usuario debe ver el mensaje de bienvenida {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, mensaje: string) {
  await this.homePage.validateSpanishText();
});

Then('el usuario debe ser redirigido a la página de booking', { timeout: config.timeouts.long }, async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(testData.expectedUrls.booking);
});

Then('los datos personales deben ser guardados correctamente', { timeout: config.timeouts.long }, async function (this: CustomWorld) {
});

Then('el usuario debe ser redirigido a la página de factura', { timeout: config.timeouts.long }, async function (this: CustomWorld) {
  await this.hotelBookingPage.waitForInvoicePage();
});

Then('el usuario debe ser redirigido a la página de pago', { timeout: config.timeouts.long }, async function (this: CustomWorld) {
  await this.hotelBookingPage.waitForPaymentPage();
});

Then('debe visualizar el mensaje {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, mensaje: string) {
  await this.hotelBookingPage.validatePaymentSuccess();
});

Then('debe visualizar el mensaje de error {string}', { timeout: config.timeouts.long }, async function (this: CustomWorld, mensajeError: string) {
  await this.hotelBookingPage.validatePaymentError(mensajeError);
});
