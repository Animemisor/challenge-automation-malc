/**
 * ARCHIVO: pages/hotel-booking.page.ts
 * PROPÓSITO: Representar la página de reserva de hotel Burj Al Arab.
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { config } from '../config/environment';
import { testData } from '../data/test-data';

export class HotelBookingPage extends BasePage {
  private readonly nationalityModal: Locator;
  private readonly nationalitySelect: Locator;
  private readonly quantitySelect: Locator;
  private readonly selectButton: Locator;
  private readonly continueButton: Locator;
  private readonly titleSelect: Locator;
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly emailInput: Locator;
  private readonly countryCodeSelect: Locator;
  private readonly phoneInput: Locator;
  private readonly creditCardOption: Locator;
  private readonly makePaymentButton: Locator;
  private readonly proceedPaymentButton: Locator;
  private readonly cardNumberInput: Locator;
  private readonly cardExpiryInput: Locator;
  private readonly cardCvcInput: Locator;
  private readonly billingNameInput: Locator;
  private readonly payButton: Locator;
  private readonly confirmButton: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    
    this.nationalityModal = page.locator(config.selectors.nationalityModal).filter({ hasText: 'Seleccione Nacionalidad' });
    this.nationalitySelect = page.locator(config.selectors.nationalitySelect);
    this.quantitySelect = page.locator(config.selectors.quantitySelect).first();
    this.selectButton = page.locator(config.selectors.selectButton).first();
    this.continueButton = page.locator(config.selectors.continueButton).first();
    
    this.titleSelect = page.locator('select[x-model="primary_guest.title"]');
    this.firstNameInput = page.locator('input[x-model="primary_guest.first_name"]');
    this.lastNameInput = page.locator('input[x-model="primary_guest.last_name"]');
    this.emailInput = page.locator('input[x-model="primary_guest.email"]');
    this.countryCodeSelect = page.locator('select[x-model="primary_guest.country_code"]');
    this.phoneInput = page.locator('input[x-model="primary_guest.phone"]');
    
    this.creditCardOption = page.locator('div.radio-item').filter({ hasText: 'Credit Card' }).filter({ hasText: 'Stripe' });
    this.makePaymentButton = page.locator(config.selectors.makePaymentButton);
    this.proceedPaymentButton = page.locator(config.selectors.proceedPaymentButton);
    this.cardNumberInput = page.locator('input#cardNumber');
    this.cardExpiryInput = page.locator('input#cardExpiry');
    this.cardCvcInput = page.locator('input#cardCvc');
    this.billingNameInput = page.locator('input#billingName');
    this.payButton = page.locator(config.selectors.payButton);
    this.confirmButton = page.locator(config.selectors.confirmButton);
    this.successMessage = page.locator('div.alert-success', { hasText: testData.successMessages.paymentSuccessful });
  }

  async navigateToHotel(): Promise<void> {
    await this.page.goto(`${config.baseURL}${config.endpoints.hotel}`, { timeout: config.timeouts.long });
    await this.page.waitForLoadState('networkidle');
    this.logger.success('🏨 Página del hotel cargada');
  }

  async selectNationality(): Promise<void> {
    this.logger.info(`📍 Seleccionando nacionalidad: ${testData.nationality.peru.name}`);
    await this.nationalityModal.waitFor({ state: 'visible', timeout: config.timeouts.medium });
    await this.nationalitySelect.selectOption(testData.nationality.peru.code);
    await this.page.waitForURL(testData.expectedUrls.nationalityRedirect, { timeout: config.timeouts.medium });
    await this.page.waitForLoadState('networkidle');
    this.logger.success(`✅ Nacionalidad ${testData.nationality.peru.name} seleccionada`);
  }

  async selectRoomQuantity(): Promise<void> {
    this.logger.info('🛏️ Seleccionando cantidad: 1 habitación');
    await this.quantitySelect.waitFor({ state: 'visible', timeout: config.timeouts.medium });
    await this.quantitySelect.selectOption('1');
    this.logger.success('✅ Cantidad seleccionada: 1');
  }

  async clickSelectButton(): Promise<void> {
    await this.click(this.selectButton, 'Seleccionar');
  }

  async clickContinueButton(): Promise<void> {
    await this.click(this.continueButton, 'Continuar reservando');
    await this.page.waitForURL(testData.expectedUrls.booking, { timeout: config.timeouts.medium });
    this.logger.success('📍 Redirigido a booking');
  }

  async fillPersonalDetails(): Promise<void> {
    this.logger.info('📝 Completando datos personales');
    await this.titleSelect.waitFor({ state: 'visible', timeout: config.timeouts.medium });
    await this.titleSelect.selectOption(testData.customer.title);
    await this.firstNameInput.fill(testData.customer.firstName);
    await this.lastNameInput.fill(testData.customer.lastName);
    await this.emailInput.fill(testData.customer.email);
    await this.countryCodeSelect.selectOption(testData.customer.countryCode);
    await this.phoneInput.fill(testData.customer.phone);
    this.logger.success(`✅ Datos: ${testData.customer.firstName} ${testData.customer.lastName}`);
  }

  async selectCreditCardPayment(): Promise<void> {
    this.logger.info('💳 Seleccionando método de pago: Credit Card Stripe');
    await this.creditCardOption.waitFor({ state: 'visible', timeout: config.timeouts.medium });
    await this.creditCardOption.click();
    this.logger.success('✅ Método de pago seleccionado');
  }

  async acceptTerms(): Promise<void> {
    this.logger.info('📜 Aceptando términos y condiciones');
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('input#terms_accepted') as HTMLInputElement;
      if (checkbox && !checkbox.checked) {
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        checkbox.dispatchEvent(new Event('click', { bubbles: true }));
      }
    });
    this.logger.success('✅ Términos aceptados');
  }

  async confirmBooking(): Promise<void> {
    this.logger.info('🔘 Confirmando reserva');
    await this.click(this.confirmButton, 'Confirmar Reserva');
    this.logger.success('✅ Reserva confirmada');
  }

  async waitForInvoicePage(): Promise<void> {
    this.logger.info('📄 Esperando página de factura...');
    await this.page.waitForURL(testData.expectedUrls.invoice, { timeout: config.timeouts.veryLong });
    this.logger.success(`📍 Factura: ${this.page.url()}`);
  }

  async clickMakePayment(): Promise<void> {
    this.logger.info('💰 Click en "Realizar pago"');
    await this.click(this.makePaymentButton, 'Realizar pago');
  }

  async waitForPaymentPage(): Promise<void> {
    this.logger.info('💳 Esperando página de pago...');
    await this.page.waitForURL(testData.expectedUrls.payment, { timeout: config.timeouts.veryLong });
    this.logger.success(`📍 Pago: ${this.page.url()}`);
  }

  async clickProceedToPayment(): Promise<void> {
    this.logger.info('🔘 Click en "Proceed to Payment"');
    await this.click(this.proceedPaymentButton, 'Proceed to Payment');
  }

  async fillCardDetails(cardData: { number: string; expiry: string; cvc: string; holderName: string }): Promise<void> {
    this.logger.info(`💳 Completando tarjeta terminada en ${cardData.number.slice(-4)}`);
    await this.page.waitForSelector('input#cardNumber', { timeout: config.timeouts.medium });
    await this.cardNumberInput.fill(cardData.number);
    await this.cardExpiryInput.fill(cardData.expiry);
    await this.cardCvcInput.fill(cardData.cvc);
    await this.billingNameInput.fill(cardData.holderName);
    this.logger.success('✅ Datos de tarjeta completados');
  }

  async clickPayButton(): Promise<void> {
    this.logger.info('🔘 Click en "Pagar"');
    await this.payButton.waitFor({ state: 'visible', timeout: config.timeouts.medium });
    await this.payButton.click();
    this.logger.success('✅ Pago procesado');
  }

  async validatePaymentSuccess(): Promise<void> {
    this.logger.info('🎉 [CASO 1 - PAGO EXITOSO] Validando pago...');
    await this.page.waitForURL(testData.expectedUrls.invoice, { timeout: config.timeouts.veryLong });
    await this.successMessage.waitFor({ state: 'visible', timeout: config.timeouts.medium });
    this.logger.success('✅ [CASO 1] Payment Successful - Reserva completada exitosamente');
  }

  async validatePaymentError(expectedErrorMessage: string): Promise<void> {
    this.logger.info('❌ [CASO 2 - PAGO RECHAZADO] Validando mensaje de error...');
    
    const errorMessageLocator = this.page.locator(`.FieldError:has-text("${expectedErrorMessage}")`);
    await errorMessageLocator.waitFor({ state: 'visible', timeout: config.timeouts.medium });
    
    const currentUrl = this.page.url();
    if (currentUrl.includes('/invoice/')) {
      throw new Error(`❌ Se redirigió a factura pero se esperaba un error. URL: ${currentUrl}`);
    }
    
    this.logger.success(`✅ [CASO 2] Mensaje de error validado correctamente`);
  }
}