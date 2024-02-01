const listaPokemon = [];
// Array vacío que contendrá la lista de los 151 Pokémon
for (let i = 1; i <= 151; i++) {
  // Bucle que muestra los 151 Pokémon
  const datosPokemon = `https://pokeapi.co/api/v2/pokemon/${i}`;
  // Sacamos los datos de la PokéAPI

  listaPokemon.push(fetch(datosPokemon).then(lista => lista.json()));
  // Convertimos los datos de .json a JavaScript y los ponemos en el array
}

Promise.all(listaPokemon).then(resultado => {
  // Llamadas API asíncronas en paralelo mediante promesas
  // Promise.all espera a que terminen todas las peticiones a la API
  // Una vez terminada las peticiones, ejecuta la variable resultado que tiene acceso al array
  const pokemon = resultado.map(datos => ({
    // De todos los datos, nos quedamos solo los que necesitamos en la variable "pokemon"
    // Utilizando la función ".map"
    name: datos.name,
    // Nombre del pokémon
    id: datos.id,
    // Número del pokémon
    image: datos.sprites["front_default"],
    // Imágen del pokémon
    type: datos.types.map(type => type.type.name).join(", "),
    // Tipo del pokémon
  }));
  mostrarPokemon(pokemon);
  
});

const mostrarPokemon = pokemon => {

  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      pokeman =>
        ` <li class="card"> <img class="card-image" src="${pokeman.image}"/> <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2> <p class="card-subtitle">Tipo: ${pokeman.type}</p> </li> `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};
