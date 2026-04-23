# 🧪 PHPTravels - Automation Framework
Framework de automatización de pruebas para [PHPTravels](https://phptravels.net) utilizando Playwright, Cucumber (Gherkin) y TypeScript(POM) y principios ISTQB.

## 📝 Descripción General

Este proyecto automatiza el flujo completo de *reserva de hotel* en el sitio web PHPTravels, incluyendo:

- ✅ Cambio de idioma (Español)
- ✅ Cambio de moneda (USD)
- ✅ Selección de hotel con fechas específicas
- ✅ Selección de nacionalidad
- ✅ Completar formulario de datos personales
- ✅ Selección de método de pago (Stripe)
- ✅ Aceptación de términos y condiciones
- ✅ Proceso de pago con tarjeta de prueba
- ✅ Validación de pago exitoso y pago rechazado

El framework está diseñado siguiendo el Patrón Page Object Model (POM) y utiliza Gherkin para la definición de escenarios, permitiendo que sean comprensibles por equipos técnicos y no técnicos.

## 📁 Estructura del Proyecto

front-phptravels/
├── config/
│   └── environment.ts          # Configuraciones (URLs, timeouts, selectores)
├── data/
│   └── test-data.ts            # Datos de prueba centralizados
├── features/
│   └── hotel-booking.feature   # Escenarios Gherkin
├── pages/
│   ├── base.page.ts            # Clase base con métodos comunes
│   ├── home.page.ts            # Page Object de la página principal
│   └── hotel-booking.page.ts   # Page Object de reserva de hotel
├── step-definitions/
│   └── hotel-booking.steps.ts  # Implementación de pasos
├── utils/
│   └── logger.ts               # Logger estructurado
├── reports/                    # Reportes generados
├── screenshots/                # Capturas de pantalla
├── cucumber.js                 # Configuración de Cucumber
├── playwright.config.ts        # Configuración de Playwright
├── package.json                # Dependencias y scripts
└── tsconfig.json               # Configuración de TypeScript

## 🚀 Instalación
1. Navegar a la carpeta del proyecto
cd front-phptravels

2. Instalar dependencias
npm install

3. Instalar navegadores de Playwright
npx playwright install

4. Verificar instalación
npx playwright --version

## 🎯 Ejecución de Pruebas
Ejecutar todas las pruebas
npm run test

Ejecutar con navegador visible
npm run test:headed

Generar reporte HTML
npm run test:report

Modo debug (paso a paso)
npm run test:debug