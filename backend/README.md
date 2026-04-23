# Challenge Automation - MALC
Pruebas automatizadas para la API de Pokémon usando Karate DSL.

## Requisitos cumplidos

✅ Multi-ambiente (QA / CERT)
✅ Clave secreta encriptada con SHA256
✅ Log de la clave antes de cada prueba
✅ Validación de Pokémon por ID y por nombre
✅ Tiempo de respuesta menor a 10 segundos
✅ Log de fecha y hora al finalizar cada prueba

# Requisitos previos
Antes de empezar, necesitas tener instalado:

| Herramienta | Versión | ¿Para qué? |
|-------------|---------|-------------|
| Java | 11 o 17 | Ejecutar Maven y las pruebas |
| Maven | 3.6+ | Descargar dependencias y ejecutar tests |
| Git | Cualquiera | Clonar el repositorio |

# Verificar instalación
java -version
mvn -version

# Instalación y configuración
1. Clonar o descargar el proyecto
git clone <url-del-repositorio>

2. El proyecto ya incluye configuración Maven
No necesitas instalar nada adicional. El archivo pom.xml ya tiene todas las dependencias:

# Ejecutar las pruebas
primero debes dirigirte a la carpeta backend:
cd backend

## Comando básico de ejecución
mvn clean test -Dkarate.env=QA

# Comandos disponibles
Comando	-> Qué hace
mvn clean test -Dkarate.env=QA -> Ejecuta en ambiente QA
mvn clean test -Dkarate.env=CERT -> Ejecuta en ambiente CERT
mvn clean test -> Ejecuta con QA por defecto

# Ver reporte HTML
Después de ejecutar, abre en tu navegador:
target/karate-reports/karate-summary.html

# Qué pruebas hace
Obtiene 3 Pokémon por ID (bulbasaur, pikachu, snorlax)
Obtiene los mismos 3 Pokémon por nombre
Valida que la respuesta sea correcta
Valida que el tiempo no pase los 10 segundos