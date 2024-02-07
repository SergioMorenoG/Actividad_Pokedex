let listaPokemonFiltrada = [];
// Array vacío que contendrá los pokémon filtrados por el buscador.

cambiarTema();
// Se ejecuta la función para poder cambiar el tema de la página.

Promise.all(obtenerDatosPokemon())
  // Se ejecuta la función para buscar los datos de los pokémon.
  // "Promise.all" se asegura que se han ejecutado con éxito todas las peticiones a la API.

  .then(resultado => {
    // Una vez terminada las peticiones, ejecuta el array "resultado" que contiene 
    // los datos del array "listaPokemon".

    const pokemon = resultado.map(datos => {
      // Con la función "map" creamos un nuevo array "pokemon" que contendrá solo los datos
      // necesarios de cada pokémon específico.
      // Para hacerlo, creamos un objeto "datos" con las propiedades necesarias de cada pokémon.

      const pokemonData = {
        // Separamos el tipo del pokémon de las demás propiedades.

        name: datos.name,
        // Nombre del pokémon.

        id: datos.id,
        // Número del pokémon.

        image: datos.sprites.other['official-artwork']['front_default'],
        // URL de la imagen del pokémon.
      };

      if (datos.past_types.length > 0) {
        pokemonData.type = datos.past_types[0].types.map(type => tiposTraducidos()[type.type.name])
          .join(" ");
        // Si el tipo del pokémon antes era otro, se asignará el antiguo.

      } else {
        pokemonData.type = datos.types.map(type => tiposTraducidos()[type.type.name]).join(" ");
        // Si no tiene uno antiguo, se asignará con normalidad el tipo.
      }

      return pokemonData;
      // Se devuelven los datos para agregarlos al array "pokemon".
    });

    listaPokemonFiltrada = pokemon.map((datos) => datos);
    // Copiamos los datos del array "pokemon" al array "listaPokemonFiltrada".

    mostrarPokemon(pokemon);
    // Llamamos a la función "mostrarPokemon" con los datos del array "pokemon".
  });