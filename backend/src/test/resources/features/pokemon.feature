Feature: Pruebas de la API de Pokémon

Background:
    * url apiUrl
    * configure readTimeout = 10000
    * configure connectTimeout = 10000
    * configure headers = { 'Accept': 'application/json' }

@Smoke @Read
Scenario Outline: Validar Pokémon por ID
    * print "========================================="
    * print "CLAVE ENCRIPTADA: " + encryptedSecret
    * print "INICIO TEST: " + new Date().toISOString()
    * print "ID: " + <id>
    * print "========================================="
    
    * def start = java.lang.System.currentTimeMillis()
    Given path 'pokemon', <id>
    When method GET
    Then status 200
    
    * def duration = java.lang.System.currentTimeMillis() - start
    * print "DURACIÓN: " + duration + "ms"
    * assert duration < 10000
    
    And match response contains { id: '#number', name: '#string', abilities: '#array' }
    And assert response.id == <id>
    And assert response.name == "<name>"
    
    * print "✅ EXITOSO: " + response.name
    * print "FIN TEST: " + new Date().toISOString()
    * print "========================================="

Examples:
    | id | name       |
    | 1  | bulbasaur  |
    | 25 | pikachu    |
    | 143| snorlax    |

@Smoke @Read
Scenario Outline: Validar Pokémon por Nombre
    * print "========================================="
    * print "CLAVE ENCRIPTADA: " + encryptedSecret
    * print "INICIO TEST: " + new Date().toISOString()
    * print "NOMBRE: " + "<name>"
    * print "========================================="
    
    * def start = java.lang.System.currentTimeMillis()
    Given path 'pokemon', "<name>"
    When method GET
    Then status 200
    
    * def duration = java.lang.System.currentTimeMillis() - start
    * print "DURACIÓN: " + duration + "ms"
    * assert duration < 10000
    
    And match response contains { id: '#number', name: '#string' }
    And assert response.name == "<name>"
    And assert response.id == <id>
    
    * print "✅ EXITOSO: " + response.name
    * print "FIN TEST: " + new Date().toISOString()
    * print "========================================="

Examples:
    | name       | id  |
    | bulbasaur  | 1   |
    | pikachu    | 25  |
    | snorlax    | 143 |