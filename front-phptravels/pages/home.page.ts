/**
 * ARCHIVO: pages/home.page.ts
 * PROPÓSITO: Representar la página principal de PHPTravels.
 * PATRÓN: Page Object Model (POM)
 */

import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { config } from '../config/environment';
import { testData } from '../data/test-data';

export class HomePage extends BasePage {
  // Selectores de la página
  private readonly spanishTitle: Locator;
  private readonly spanishParagraph: Locator;
  private readonly usdPrice: Locator;

  constructor(page: Page) {
    super(page);
    
    this.spanishTitle = page.locator('h1', { hasText: testData.language.spanish.title });
    this.spanishParagraph = page.locator('p', { hasText: testData.language.spanish.paragraph });
    this.usdPrice = page.locator(`text=${testData.currency.usd.regex.source}`);
  }

  async open(): Promise<void> {
    await this.navigate(config.endpoints.home);
    await this.page.waitForSelector('body', { timeout: config.timeouts.long });
    await this.page.waitForTimeout(2000);
    this.logger.success('🏠 Página principal cargada');
  }

  /**
   * Cambia el idioma a Español navegando directamente a la URL
   */
  async selectLanguageSpanish(): Promise<void> {
    this.logger.info('🌐 Cambiando idioma a Español...');
    await this.page.goto(`${config.baseURL}${config.endpoints.languageSpanish}`, { timeout: config.timeouts.long });
    await this.page.waitForLoadState('networkidle', { timeout: config.timeouts.medium });
    await this.page.waitForTimeout(2500);  // Pausa para ver el cambio de idioma
    this.logger.success('✅ Idioma cambiado a Español');
  }

  async validateSpanishText(): Promise<void> {
    this.logger.info('🔍 Validando texto en español...');
    await expect(this.spanishTitle).toBeVisible({ timeout: config.timeouts.medium });
    await expect(this.spanishParagraph).toBeVisible({ timeout: config.timeouts.medium });
    await this.page.waitForTimeout(1000);  // Pausa para leer el texto
    this.logger.success('✅ Texto en español validado');
  }

  /**
   * Cambia la moneda a USD navegando directamente a la URL
   */
  async selectCurrencyUSD(): Promise<void> {
    this.logger.info('💵 Cambiando moneda a USD...');
    await this.page.goto(`${config.baseURL}${config.endpoints.currencyUSD}`, { timeout: config.timeouts.long });
    await this.page.waitForLoadState('networkidle', { timeout: config.timeouts.medium });
    await this.page.waitForTimeout(2500);  // Pausa para ver los precios en USD
    this.logger.success('✅ Moneda cambiada a USD');
  }

  async validateUSDPrice(): Promise<void> {
    this.logger.info('🔍 Validando precios en USD...');
    await expect(this.usdPrice.first()).toBeVisible({ timeout: config.timeouts.medium });
    await this.page.waitForTimeout(1000);  // Pausa para ver los precios
    this.logger.success('✅ Precios en USD validados');
  }
}