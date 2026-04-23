# Repositorio de Automatización de Pruebas

En este repositorio puedes hallar la automatización de 2 proyectos:
- *backend* → Pruebas automatizadas para la API de Pokémon usando Karate DSL
- *front-phptravels* → Automatización de la web front PHPTravels

## 📋 Requisitos previos

| Proyecto | Requisitos |
|----------|------------|
| Backend | Java 11+ y Maven 3.6+ |
| Frontend | Node.js (LTS) y npm |

## 🚀 Ejecutar cada proyecto

## Backend (API Pokémon)
cd challenge-automation-malc\backend

# Ejecutar pruebas
mvn clean test -Dkarate.env=QA

## Frontend (PHPTravels)
cd challenge-automation-malc\front-phptravels

npm install

npx playwright install

# Ejecutar pruebas 
npm run test

## 📖 Documentación adicional
Para más detalles (reportes, estructura, ambientes), consultar en las siguientes rutas:

backend/README.md

front-phptravels/README.md
