function fn() {
    var env = karate.env || 'QA';
    
    // Claves secretas por ambiente
    var secrets = {
        QA: '7b5880f7-a781-4b39-9ceb-f8e3bfbce32d',
        CERT: '8ca330f7-a781-4b39-9ceb-f8e3bf51366a'
    };
    
    var secretKey = secrets[env];
    
    // Función para encriptar SHA256
    function sha256(text) {
        var digest = java.security.MessageDigest.getInstance('SHA-256');
        var hash = digest.digest(text.getBytes('UTF-8'));
        var hex = '';
        for (var i = 0; i < hash.length; i++) {
            var h = java.lang.Integer.toHexString(0xff & hash[i]);
            hex += h.length() == 1 ? '0' + h : h;
        }
        return hex;
    }
    
    var encrypted = sha256(secretKey);
    
    // Log de inicio (Requerimiento del reto)
    karate.log('=========================================');
    karate.log('AMBIENTE: ' + env);
    karate.log('CLAVE ENCRIPTADA (SHA256): ' + encrypted);
    karate.log('INICIO: ' + new Date().toISOString());
    karate.log('=========================================');
    
    return {
        apiUrl: 'https://pokeapi.co/api/v2',
        encryptedSecret: encrypted
    };
}