package com.pokemon.runners;

import com.intuit.karate.junit5.Karate;

public class TestRunner {
    
    @Karate.Test
    Karate testPokemonAPI() {
        return Karate.run("classpath:features")
                .relativeTo(getClass());
    }
}