/**
 * ARCHIVO: data/test-data.ts
 * PROPÓSITO: Centralizar todos los datos de prueba.
 */

export const testData = {
  // Datos de validación de idioma
  language: {
    spanish: {
      title: '¡Viaja como amas!',
      paragraph: 'Le ayudaremos a planificar su próximo viaje, el que dejará recuerdos para toda la vida.'
    },
    english: {
      title: 'Travel the way you love!',
      paragraph: "Let's help you plan your next journey the one that will leave a lifetime of memories."
    }
  },
  
  // Datos de validación de moneda
  currency: {
    usd: {
      symbol: 'USD',
      regex: /USD\s+[\d,\.]+/
    }
  },
  
  // Datos del cliente
  customer: {
    title: 'Mr',
    firstName: 'Miguel',
    lastName: 'Livia',
    email: 'miguel1@gmail.com',
    phone: '987456321',
    countryCode: 'PE'
  },
  
  // Datos de nacionalidad
  nationality: {
    peru: {
      name: 'Peru',
      code: 'PE'
    }
  },
  
  // Datos de pago - Tarjeta EXITOSA
  paymentCard: {
    number: '4242424242424242',
    expiry: '1230',
    cvc: '123',
    holderName: 'Miguel Livia'
  },
  
  // Datos de pago - Tarjeta RECHAZADA (fondos insuficientes)
  rejectedPaymentCard: {
    number: '4000000000009995',
    expiry: '1230',
    cvc: '123',
    holderName: 'Miguel Livia'
  },
  
  // Mensajes de éxito y error
  successMessages: {
    paymentSuccessful: 'Payment Successful'
  },
  
  errorMessages: {
    insufficientFunds: 'Se rechazó tu tarjeta de crédito debido a que no tiene fondos suficientes. Intenta pagar con una tarjeta de débito.'
  },
  
  // URLs esperadas para validaciones
  expectedUrls: {
    booking: /\/stays\/booking\//,
    invoice: /\/invoice\/stays\//,
    payment: /\/payment\//,
    nationalityRedirect: /\/PE\//
  }
} as const;