const numeroDelPokemon = sessionStorage.getItem("numeroPokemon");
// Obtenemos el número del pokémon que guardamos en la sesión del navegador.

obtenerDatosDeUnPokemon(numeroDelPokemon)
    // Se ejecuta la función para buscar los datos del pokémon.

    .then(datos => {
        // Una vez terminada la petición, ejecuta "datos" que contiene todos los datos del Pokémon.

        const pokemonData = {
            // Creamos el objeto "pokemonData" que contendrá solo los datos necesarios del Pokémon.

            name: datos.name,
            // Nombre del pokémon.

            id: numeroDelPokemon,
            // Número del pokémon.

            image: datos.sprites.other['dream_world']['front_default'],
            // URL de la imagen del pokémon.

            weight: `${String(datos.weight / 10)} kg`,
            // Peso del pokémon.

            height: `${String(datos.height / 10)} m`,
            // Altura del pokémon.

            stats: datos.stats,
            // Estadísticas del pokémon.
        };

        if (datos.past_types.length > 0) {
            pokemonData.type = datos.past_types[0].types.map(type => tiposTraducidos()[type.type.name])
                .join(" ");
            // Si el tipo del pokémon antes era otro, se asignará el antiguo.

        } else {
            pokemonData.type = datos.types.map(type => tiposTraducidos()[type.type.name]).join(" ");
            // Si no tiene uno antiguo, se asignará con normalidad el tipo.
        }

        obtenerDatosAvanzadosDeUnPokemon(numeroDelPokemon)
            // Llamamos a la función "obtenerDatosAvanzadosDeUnPokemon" para conseguir más datos del Pokémon.

            .then(datos => {
                // Una vez terminada la petición, ejecuta el objeto "datos" que contiene más datos del Pokémon.

                pokemonData.descripcion = descripcion(datos);
                // En la propiedad "descripcion" de "pokemonData" guardamos la descripción del Pokémon.
                // Para hacerlo, ejecutamos la función "descripcion" con los datos del Pokémon.

                mostrarDatosDeUnPokemon(pokemonData);
                // Llamamos a la función "mostrarDatoDeUnPokemon" con los datos de "pokemonData".
            });
    });