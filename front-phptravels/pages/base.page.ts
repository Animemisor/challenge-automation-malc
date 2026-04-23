/**
 * ARCHIVO: pages/base.page.ts
 * PROPÓSITO: Clase base abstracta que contiene métodos comunes a todas las páginas.
 * PRINCIPIO ISTQB: Reutilización de código (DRY) y encapsulación.
 * PATRÓN: Page Object Model (POM)
 */

import { Page, Locator } from '@playwright/test';
import { Logger } from '../utils/logger';
import { config } from '../config/environment';

export abstract class BasePage {
  protected logger = Logger;
  
  constructor(protected readonly page: Page) {}

  /**
   * Navega a una URL relativa o absoluta
   * @param path - Ruta relativa (ej: '/login') o vacío para la base
   */
  async navigate(path: string = ''): Promise<void> {
    const url = path ? `${config.baseURL}/${path}` : config.baseURL;
    this.logger.info(`Navegando a: ${url}`);
    await this.page.goto(url, { timeout: config.timeouts.long });
    await this.page.waitForLoadState('domcontentloaded', { timeout: config.timeouts.medium });
    this.logger.success(`Navegado a: ${path || '/'}`);
  }

  /**
   * Espera a que un elemento sea visible y luego hace clic
   * @param element - Locator de Playwright
   * @param name - Nombre descriptivo para logs
   */
  async click(element: Locator, name: string): Promise<void> {
    this.logger.info(`Click en: ${name}`);
    await element.waitFor({ state: 'visible', timeout: config.timeouts.medium });
    await element.click({ timeout: config.timeouts.medium });
  }

  /**
   * Espera a que un elemento sea visible
   * @param element - Locator de Playwright
   * @param timeout - Tiempo máximo de espera (ms)
   */
  async waitForElement(element: Locator, timeout: number = config.timeouts.medium): Promise<void> {
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Toma una captura de pantalla para evidencia
   * @param name - Nombre descriptivo del screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
    this.logger.success(`Screenshot guardado: ${name}`);
  }
}