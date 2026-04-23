/**
 * ARCHIVO: config/environment.ts
 * PROPÓSITO: Centralizar todas las configuraciones del entorno.
 */

export const config = {
  // URLs base y específicas
  baseURL: 'https://phptravels.net',
  endpoints: {
    home: '/',
    languageSpanish: '/lang?lang=es',
    currencyUSD: '/currency?currency=USD',
    hotel: '/stay/burj-al-arab/200/hotels/_/25-05-2026/26-05-2026/NULL/1/2-0'
  },
  
  // Timeouts centralizados
  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000,
    veryLong: 60000
  },
  
  // Selectores comunes (evita duplicación)
  selectors: {
    languageButton: 'button:has-text("English")',
    currencyButton: 'button:has-text("EGP")',
    nationalityModal: 'div.inline-block.align-bottom.bg-white.rounded-lg.overflow-hidden.shadow-xl',
    nationalitySelect: 'select[x-model="selectedNationality"]',
    quantitySelect: 'select[x-model*="optionQuantities"]',
    selectButton: 'button:has-text("Seleccionar")',
    continueButton: 'button:has-text("Continuar reservando")',
    makePaymentButton: 'button#makePaymentBtn',
    proceedPaymentButton: 'button#proceedPaymentBtn',
    payButton: 'button.SubmitButton.SubmitButton--complete[type="submit"]',
    termsCheckbox: 'input#terms_accepted',
    confirmButton: 'button[type="submit"]:has-text("Confirmar Reserva")'
  }
} as const;
