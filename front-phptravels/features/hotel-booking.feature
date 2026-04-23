# language: es
# ARCHIVO: features/hotel-booking.feature
# PROPÓSITO: Definir los escenarios de prueba en lenguaje Gherkin

Característica: Reserva de hotel en PHPTravels
  Como usuario viajero
  Quiero realizar una reserva completa de hotel
  Para asegurar mi alojamiento con pago exitoso

  Background:
    Dado que el usuario accede a la página principal de PHPTravels

  @regression @e2e @success
  Escenario: Reserva exitosa de hotel Burj Al Arab con pago con tarjeta
    # Configuración inicial
    Dado que el usuario cambia el idioma a "Español"
    Y el usuario cambia la moneda a "USD"
    Entonces el usuario debe ver el mensaje de bienvenida "¡Viaja como amas!"

    # Selección de hotel y habitación
    Cuando el usuario navega al hotel "Burj Al Arab"
    Y el usuario selecciona la nacionalidad "Peru"
    Y el usuario selecciona "1" habitación
    Y el usuario hace clic en el botón "Seleccionar"
    Y el usuario hace clic en el botón "Continuar reservando"
    Entonces el usuario debe ser redirigido a la página de booking

    # Datos personales
    Cuando el usuario completa el formulario con:
      | Título | Nombre | Apellido | Email             | Teléfono  |
      | Mr     | Miguel | Livia    | miguel1@gmail.com | 987456321 |
    Y el usuario selecciona el código de país "PE"
    Entonces los datos personales deben ser guardados correctamente

    # Método de pago y confirmación inicial
    Cuando el usuario selecciona el método de pago "Credit Card Stripe"
    Y el usuario acepta los términos y condiciones
    Y el usuario confirma la reserva
    Entonces el usuario debe ser redirigido a la página de factura

    # Proceso de pago con tarjeta
    Cuando el usuario hace clic en "Realizar pago"
    Entonces el usuario debe ser redirigido a la página de pago

    Cuando el usuario hace clic en "Proceed to Payment"
    Y el usuario completa los datos de la tarjeta:
      | Número           | Expiración | CVC | Nombre completo |
      | 4242424242424242 | 1230       | 123 | Miguel Livia    |
    Y el usuario hace clic en el botón "Pagar"
    Entonces el usuario debe ser redirigido a la página de factura
    Y debe visualizar el mensaje "Payment Successful"

  @regression @e2e @rejected
  Escenario: Pago rechazado por fondos insuficientes
    # Configuración inicial
    Dado que el usuario cambia el idioma a "Español"
    Y el usuario cambia la moneda a "USD"
    Entonces el usuario debe ver el mensaje de bienvenida "¡Viaja como amas!"

    # Selección de hotel y habitación
    Cuando el usuario navega al hotel "Burj Al Arab"
    Y el usuario selecciona la nacionalidad "Peru"
    Y el usuario selecciona "1" habitación
    Y el usuario hace clic en el botón "Seleccionar"
    Y el usuario hace clic en el botón "Continuar reservando"
    Entonces el usuario debe ser redirigido a la página de booking

    # Datos personales
    Cuando el usuario completa el formulario con:
      | Título | Nombre | Apellido | Email             | Teléfono  |
      | Mr     | Miguel | Livia    | miguel1@gmail.com | 987456321 |
    Y el usuario selecciona el código de país "PE"
    Entonces los datos personales deben ser guardados correctamente

    # Método de pago y confirmación inicial
    Cuando el usuario selecciona el método de pago "Credit Card Stripe"
    Y el usuario acepta los términos y condiciones
    Y el usuario confirma la reserva
    Entonces el usuario debe ser redirigido a la página de factura

    # Proceso de pago con tarjeta rechazada
    Cuando el usuario hace clic en "Realizar pago"
    Entonces el usuario debe ser redirigido a la página de pago

    Cuando el usuario hace clic en "Proceed to Payment"
    Y el usuario completa los datos de la tarjeta:
      | Número           | Expiración | CVC | Nombre completo |
      | 4000000000009995 | 1230       | 123 | Miguel Livia    |
    Y el usuario hace clic en el botón "Pagar"
    Entonces debe visualizar el mensaje de error "Se rechazó tu tarjeta de crédito debido a que no tiene fondos suficientes. Intenta pagar con una tarjeta de débito."