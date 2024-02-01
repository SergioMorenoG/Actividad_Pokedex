const listaPokemon = [];
for (let i = 1; i <= 151; i++) {
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  listaPokemon.push(fetch(url).then(lista => lista.json()));
}

Promise.all(listaPokemon).then(resultado => {
  const pokemon = resultado.map(datos => ({
    name: datos.name,
    id: datos.id,
    image: datos.sprites["front_default"],
    type: datos.types.map(type => type.type.name).join(", "),
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
