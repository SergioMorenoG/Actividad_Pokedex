function obtenerDatosPokemon() {
    // Función para obtener los datos de los pokémon.

    let listaPokemon = [];
    // Array vacío que contendrá las promesas de las peticiones a la API de los 151 Pokémon.

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

    return listaPokemon;
    // Se devuelve el array con los datos.
}

function tiposTraducidos() {
    // Función para traducir los tipos al Español.

    const tipoPokemon = {
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

    return tipoPokemon;
    // Se devuelven los tipos ya traducidos.
}

function filtrarPokemon() {
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
    // Función para mostrar los datos en la lista de los 151 Pokémon.

    console.log(pokemon);
    // Mostramos por consola los datos, para verificar que no hay errores.

    const pokemonHTMLString = pokemon.map(pokemonData =>
        // Generamos una cadena HTML utilizando "map" en el array "pokemon".
        // Creamos las tarjetas donde ponemos los datos.

        ` <a href="index2.html"><li class="card"> 
      <img class="card-image" src="${pokemonData.image}"/>
      <h2 class="card-title">Nº ${String(pokemonData.id).padStart(3, '0')}</h2>
      <p class="card-subtitle-nombre">${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name
            .slice(1)}</p>
      <p class="card-subtitle-tipo">${pokemonData.type.split(" ").map((type) =>
                `<span class="type ${type}" style="border-radius: 26px; padding: 12px 12px;">${type}</span>`)
            .join(" ")}</p></li></a>`).join("");
    // Con "padStart" nos aseguramos de que tenga tres cifras y rellenamos de ceros las cifras que falten.
    // Con "charAt", "toUpperCase" y "slice(1)" ponemos la primera letra del nombre del pokémon en mayúscula.
    // Con "split" separamos el tipo en dos elementos distintos para darles un color diferente.
    // Con el primer "join" volvemos a unir los tipos del pokémon y les damos un espacio entre ellos.
    // El segundo "join" une todas las tarjetas de los distintos pokémon para que estén juntas.

    pokedex.innerHTML = pokemonHTMLString;
    // Introducimos la cadena HTML en el elemento "pokedex".

    const cards = pokedex.getElementsByClassName("card");
    // Creamos la variable "cards" para almacenar la lista de todas las tarjetas.

    Array.from(cards).forEach((tarjeta, indice) => {
        // Convertimos "cards" en un array con la función "Array.from".
        // Con "forEach" hacemos que se ejecute una función por cada tarjeta.

        tarjeta.addEventListener("click", () => {
            // Agregamos un evento de click en cada tarjeta.

            const pokemonId = pokemon[indice].id;
            // Obtenemos el número del pokémon que ha sido seleccionado.

            sessionStorage.setItem("numeroPokemon", pokemonId);
            // Guardamos el número del pokémon en la sesión del navegador.
        });
    });
}

function mostrarDatosDeUnPokemon(pokemon) {
    // Función para mostrar los datos de un único Pokémon.

    console.log(pokemon);
    // Mostramos por consola los datos, para verificar que no hay errores.

    const pokemonHTMLString =
        // Generamos una cadena HTML y creamos la tarjeta donde ponemos los datos.

        ` <li class="card"> 
            <img class="card-image" src="${pokemon.image}"/>
            <p class="card-subtitle-nombre">${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}</p>
            <p class="card-title">Nº ${String(pokemon.id).padStart(3, '0')}</p>
            <p class="card-subtitle-tipo">${pokemon.type.split(" ").map((type) =>
            `<span class="type ${type}" style="border-radius: 26px; padding: 12px 12px;">${type}</span>`)
            .join(" ")}</p>
            <p class="card-subtitle-peso">Peso: ${pokemon.weight}</p>
            <p class="card-subtitle-altura">Altura: ${pokemon.height}</p>
            <p class="card-subtitle-descripcion">${pokemon.descripcion}</p>
        </li>`;
    // Con "charAt", "toUpperCase" y "slice(1)" ponemos la primera letra del nombre del pokémon en mayúscula.
    // Con "padStart" nos aseguramos de que tenga tres cifras y rellenamos de ceros las cifras que falten.
    // Con "split" separamos el tipo en dos elementos distintos para darles un color diferente.
    // Con "join" volvemos a unir los tipos del pokémon y les damos un espacio entre ellos.

    pokedex.innerHTML = pokemonHTMLString;
    // Introducimos la cadena HTML en el elemento "pokedex".
}

async function obtenerDatosDeUnPokemon(pokemon) {
    // Función para obtener los datos de un único pokémon.

    const URLPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    // Ponemos en la variable "URLPokemon" la URL del Pokémon específico.

    const datos = await fetch(URLPokemon);
    // Con la función "fetch" realizamos la petición a la URL del Pokémon específico.

    const pokemonData = await datos.json();
    // Se convierte la respuesta de la petición a formato JSON y se almacena en "pokemonData". 

    console.log(pokemonData);
    // Mostramos por consola los datos, para verificar que no hay errores.

    return pokemonData;
    // Se devuelven los datos.
}

async function obtenerDatosAvanzadosDeUnPokemon(pokemon) {
    // Función para obtener los datos avanzados de un único pokémon.

    const URLPokemon = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
    // Ponemos en la variable "URLPokemon" la URL del Pokémon específico.

    const datos = await fetch(URLPokemon);
    // Con la función "fetch" realizamos la petición a la URL del Pokémon específico.

    const pokemonData = await datos.json();
    // Se convierte la respuesta de la petición a formato JSON y se almacena en "pokemonData".

    console.log(pokemonData);
    // Mostramos por consola los datos, para verificar que no hay errores.

    return pokemonData;
    // Se devuelven los datos.
}

function descripcion(datosAvanzados) {
    // Función para obtener la descripción de los pokémon.

    for (let descripciones of datosAvanzados.flavor_text_entries) {
        // Bucle que buscará en el array que contiene todas las descripciones.

        if (descripciones.language.name === "es") {
            return descripciones.flavor_text;
            // Si el nombre de la descripción tiene "es" estará en español y la devuelve.
        }
    }
    return "";
    // Si no la encuentra, devuelve una cadena vacía.
}

function cambiarTema() {
    // Función para cambiar de modo claro a modo oscuro.

    const temaPagina = document.querySelector('#boton-tema');
    // Creamos una variable que acceda al id del botón.

    temaPagina.addEventListener('click', () => {
        // Esta función se activa cuando el usuario da click al botón.

        document.body.classList.toggle('oscuro');
        temaPagina.classList.toggle('active');
        // Cambiamos el tipo de los elementos body a "oscuro" y ponemos el tema en activo para que el botón se actualice.
    });
}