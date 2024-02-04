let listaPokemon = [];
// Array vacío que contendrá las promesas de las peticiones a la API de los 151 Pokémon.

let listaPokemonFiltrada = [];
// Array vacío que contendrá los pokémon filtrados por el buscador.

for (let i = 1; i <= 151; i++) {
  // Bucle que hace las 151 peticiones de los Pokémon.

  const URLPokemon = `https://pokeapi.co/api/v2/pokemon/${i}`;
  // Ponemos en la variable "URLPokemon" la URL del Pokémon específico.

  const peticion = fetch(URLPokemon);
  // Con la función "fetch" realizamos la petición a la URL del Pokémon específico.

  const datosPokemon = peticion.then(datos => datos.json());
  // La función "then" se asegura que la petición se ha realizado con éxito antes
  // de continuar, después convierte la respuesta de la petición a formato JSON
  // y la almacena en la variable "datosPokemon".

  listaPokemon.push(datosPokemon);
  // La función "push" introduce los datos de la variable "datosPokemon" en la
  // primera posición que esté disponible del array "listaPokemon".
}

const tipoPokemon = { // Objeto en el que traducimos los tipos al Español.
  normal: 'Normal',
  fighting: 'Lucha',
  flying: 'Volador',
  poison: 'Veneno',
  ground: 'Tierra',
  rock: 'Roca',
  bug: 'Bicho',
  ghost: 'Fantasma',
  steel: 'Acero',
  fire: 'Fuego',
  water: 'Agua',
  grass: 'Planta',
  electric: 'Eléctrico',
  psychic: 'Psíquico',
  ice: 'Hielo',
  dragon: 'Dragón',
  dark: 'Siniestro',
};

Promise.all(listaPokemon)
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

        id: `Nº ${String(datos.id).padStart(3, '0')}`,
        // Número del pokémon, con la función "padStart" nos aseguramos de que tenga tres cifras
        // y rellenamos de ceros las cifras que falten.
        // Convertimos el número a una cadena con "String" para representarlo junto a "Nº".

        image: datos.sprites.versions['generation-iii']['firered-leafgreen']['front_default'],
        // URL de la imagen del pokémon.
      };

      if (datos.past_types.length > 0) {
        pokemonData.type = datos.past_types[0].types.map(type => tipoPokemon[type.type.name])
          .join(" ");
        // Si el tipo del pokémon antes era otro, se asignará el antiguo.

      } else {
        pokemonData.type = datos.types.map(type => tipoPokemon[type.type.name]).join(" ");
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

function buscarPokemon() {
  // Función para filtrar los pokémon al realizar una búsqueda.

  const nombreIntroducido = document.getElementById('searchInput').value.toLowerCase();
  // Obtiene el nombre y lo convierte a minúsculas, luego lo guarda en "nombreIntroducido".

  const resultado = listaPokemonFiltrada.filter(pokemon => pokemon.name && pokemon.name.toLowerCase()
    .includes(nombreIntroducido));
  // Con la función "filter" filtra la lista de Pokémon del array "listaPokemonFiltrada" y se
  // asegura de que los nombres de los pokémon en el array estén en minúsculas para que coincidan.
  // La función "includes" verifica si el nombre introducido está en el array "listaPokemonFiltrada".

  if (resultado.length > 0) {
    mostrarPokemon(resultado);
    // Si hay algún pokémon que en su nombre esté el texto introducido, se mostrarán.

  } else {
    pokedex.innerHTML = '<p class="textoSinResultado">No se ha encontrado ningún Pokémon.</p>';
    // Si no encuentra nada, muestra un mensaje.
  }
}

function mostrarPokemon(pokemon) {
  // Función para mostrar los datos almacenados en el array "pokemon".

  console.log(pokemon);
  // Mostramos por consola los datos, para verificar que no hay errores.

  const pokemonHTMLString = pokemon.map(pokemonData =>
    // Generamos una cadena HTML utilizando "map" en el array "pokemon".
    // Creamos las tarjetas donde ponemos los datos.

    ` <li class="card"> 
      <img class="card-image" src="${pokemonData.image}"/>
      <h2 class="card-title">${pokemonData.id}</h2>
      <p class="card-subtitle-nombre">${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name
      .slice(1)}</p>
      <p class="card-subtitle-tipo">${pokemonData.type.split(" ").map((type) =>
        `<span class="type ${type}" style="border-radius: 26px; padding: 12px 12px;">${type}</span>`)
      .join(" ")}</p></li>`).join("");
  // Con "charAt", "toUpperCase" y "slice(1)" ponemos la primera letra del nombre del pokémon en mayúscula.
  // Con "split" separamos el tipo en dos elementos distintos para darles un color diferente.
  // Con el primer "join" volvemos a unir los tipos del pokémon y les damos un espacio entre ellos.
  // El segundo "join" une todas las cadenas HTML de los distintos pokémon en una sola cadena.

  pokedex.innerHTML = pokemonHTMLString;
  // Introducimos la cadena HTML en el elemento "pokedex".
};

const temaPagina = document.querySelector('#boton-tema');
  // Creamos una variable que acceda al id del botón.

temaPagina.addEventListener('click', () => {
  // Esta función se activa cuando el usuario da lick al botón.
  document.body.classList.toggle('oscuro');
  temaPagina.classList.toggle('active');
    // Cambiamos el tipo de los elementos body a "oscuro" y ponemos el tema en activo para que el botón se actualice.
})