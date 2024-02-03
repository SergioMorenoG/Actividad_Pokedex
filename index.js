const listaPokemon = [];
// Array vacío que contendrá las peticiones a la API de los 151 Pokémon
for (let i = 1; i <= 151; i++) {
  // Bucle que muestra los 151 Pokémon
  const datosPokemon = `https://pokeapi.co/api/v2/pokemon/${i}`;
  // Sacamos los datos de la PokéAPI

  listaPokemon.push(fetch(datosPokemon).then(lista => lista.json()));
  // Con la función "fetch" obtenemos los datos en .json de la PokéAPI
  // Convertimos los datos de .json a JavaScript y los ponemos en el array
}

const tipoPokemon = { // Traducimos los tipos al Español
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
  fairy: 'Hada'
};

Promise.all(listaPokemon).then(resultado => {
  // Llamadas API asíncronas en paralelo mediante promesas
  // Promise.all espera a que terminen todas las peticiones a la API
  // Una vez terminada las peticiones, ejecuta el array "resultado" que tiene los datos del array "listaPokemon"
  const pokemon = resultado.map(datos => ({
    // De todos los datos de que contiene "resultado", nos quedamos solo los que necesitamos en el array "pokemon"
    // Utilizando la función "map"
    name: datos.name,
    // Nombre del pokémon
    id: String(datos.id).padStart(3, '0'),
    id: `Nº ${String(datos.id).padStart(3, '0')}`,
    // Número del pokémon, con la función "padStart" le decimos que tenga tres cifras y lo rellene de ceros
    image: datos.sprites["front_default"],
    // Imágen del pokémon
    type: datos.types.map(type => tipoPokemon[type.type.name]).join(" "),
    // Tipo del pokémon
  }));
  mostrarPokemon(pokemon);
});

const mostrarPokemon = pokemon => {
  // Función para mostrar los datos almacenados en el array "pokemon"
  console.log(pokemon);
  // Mostramos por consola los datos, para verificar que no hay errores
  const pokemonHTMLString = pokemon
    // Generamos una cadena HTML con los datos
    .map(
      pokemonData =>
        // Creamos las tarjetas donde ponemos los datos
        ` <li class="card"> 
      <img class="card-image" src="${pokemonData.image}"/>
      <h2 class="card-title">${pokemonData.id}</h2>
      <p class="card-subtitle-nombre">${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name.slice(1)}</p>
      <p class="card-subtitle-tipo">${pokemonData.type
        .split(" ")
        .map((type) => `<span class="type ${type}" style="border-radius: 25px; padding: 10px 10px;">${type}</span>`)
        .join(" ")}</p>
    </li>`
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
  // Metemos los datos en la lista "pokedex" del HTML
};
