const numeroDelPokemon = sessionStorage.getItem("numeroPokemon");
// Obtenemos el número del pokémon que guardamos en la sesión del navegador.

cambiarTema();
// Se ejecuta la función para poder cambiar el tema de la página.

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

            image: datos.sprites.other['official-artwork']['front_default'],
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
            // Se ejecuta la función "obtenerDatosAvanzadosDeUnPokemon" para conseguir más datos del Pokémon.

            .then(datosAvanzados => {
                // Una vez terminada la petición, ejecuta el objeto "datosAvanzados" que contiene más datos del Pokémon.

                pokemonData.descripcion = descripcion(datosAvanzados);
                // En la propiedad "descripcion" de "pokemonData" guardamos la descripción del Pokémon.
                // Para hacerlo, ejecutamos la función "descripcion" con los datos del Pokémon.

                pokemonData.stats = estadisticas(pokemonData.stats);
                // En la propiedad "stats" de "pokemonData" guardamos las estadísticas del Pokémon.
                // Para hacerlo, ejecutamos la función "estadisticas" con los datos del Pokémon.

                obtenerListaNombrePokemon().then(datosNombre => {
                    // Se ejecuta la función "obtenerListaNombrePokemon" para conseguir la lista de Pokémon de Kanto.

                    let listaPokemonKanto = datosNombre;
                    // Se almacena en "listaPokemonKanto" la lista con todos los nombres de los Pokémon de Kanto.

                    obtenerEvolucionesDelPokemon(datosAvanzados).then(datosEvoluciones => {
                        // Se ejecuta la función "obtenerEvolucionesDelPokemon" para conseguir la lista de evoluciones del Pokémon.

                        let evolucionesPokemon = datosEvoluciones[0];
                        // Se almacena en "evolucionesPokemon" la lista con todas las evoluciones del Pokémon.

                        pokemonData.metodoEvoluciones = metodosTraducidos(datosEvoluciones[1]);
                        // En la propiedad "metodoEvoluciones" de "pokemonData" guardamos los métodos de evolución en español.
                        // Para hacerlo, ejecutamos la función "metodosTraducidos" y los traducimos al español.

                        pokemonData.evoluciones = filtarEvoluciones(evolucionesPokemon, listaPokemonKanto);
                        // En la propiedad "evoluciones" de "pokemonData" guardamos las evoluciones del Pokémon.
                        // Para hacerlo, ejecutamos la función "filtarEvoluciones" y dejamos solo los Pokémon de Kanto.

                        obtenerImagenEvolucion(pokemonData.evoluciones).then(imagenes => {
                            // Se ejecuta la función "obtenerImagenEvolucion" para conseguir la lista de imágenes de la cadena evolutiva del Pokémon.

                            pokemonData.evolucionesImagenes = imagenes;
                            // En la propiedad "evolucionesImagenes" de "pokemonData" guardamos las imágenes de la cadena evolutiva del Pokémon.

                            obtenerNumeroEvolucion(pokemonData.evoluciones).then(numeros => {
                                // Se ejecuta la función "obtenerNumeroEvolucion" para conseguir la lista de IDs de los Pokémon de la cadena evolutiva.

                                pokemonData.evolucionesNumeros = numeros;
                                // En la propiedad "evolucionesNumeros" de "pokemonData" guardamos los IDs de los Pokémon de la cadena evolutiva.

                                obtenerTiposEvolucion(pokemonData.evoluciones).then(tipos => {
                                    // Se ejecuta la función "obtenerTiposEvolucion" para conseguir la lista de tipos de los Pokémon de la cadena evolutiva.

                                    pokemonData.evolucionesTipos = tipos;
                                    // En la propiedad "evolucionesTipos" de "pokemonData" guardamos los tipos de los Pokémon de la cadena evolutiva.

                                    mostrarDatosDeUnPokemon(pokemonData);
                                    // Llamamos a la función "mostrarDatoDeUnPokemon" con los datos de "pokemonData".
                                });
                            });
                        });
                    });
                });
            });
    });