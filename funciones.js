function obtenerDatosPokemon() {
    // Función para obtener los datos de los pokémon que se muestran en la página principal.

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

function metodosTraducidos(datos) {
    // Función para traducir los métodos de evolución al Español.

    let listaMetodosTraducidos = [];
    // Array vacío que contendrá los métodos de evolución.

    for (let pokemon of datos) {
        // Bucle que muestra todas las evoluciones del Pokémon.

        if (pokemon.trigger_name == "level-up") {
            pokemon.trigger_name = "Nivel";

        }

        if (pokemon.trigger_name == "trade") {
            pokemon.trigger_name = "Intercambio";
        }

        if (pokemon.trigger_name == "use-item") {
            pokemon.trigger_name = "Usar";
        }

        if (pokemon.item != null) {
            // Para los Pokémon que necesitan una piedra evolutiva.

            if (pokemon.item.name == "leaf-stone") {
                pokemon.item.name = "piedra hoja";
            }

            if (pokemon.item.name == "fire-stone") {
                pokemon.item.name = "piedra fuego";
            }

            if (pokemon.item.name == "moon-stone") {
                pokemon.item.name = "piedra lunar";
            }

            if (pokemon.item.name == "water-stone") {
                pokemon.item.name = "piedra Agua";
            }

            if (pokemon.item.name == "thunder-stone") {
                pokemon.item.name = "piedra trueno";
            }

        }

        listaMetodosTraducidos.push(pokemon);
        // Almacenamos en el array con "push" los métodos ya traducidos.
    }

    return listaMetodosTraducidos;
    // Se devuelve la lista.
}

function estadisticas(pokemonData) {
    // Función para obtener las estadísticas del Pokémon.

    const estadisticasPokemon = {
        hp: pokemonData[0].base_stat,
        attack: pokemonData[1].base_stat,
        defense: pokemonData[2].base_stat,
        specialAttack: pokemonData[3].base_stat,
        specialDefense: pokemonData[4].base_stat,
        speed: pokemonData[5].base_stat,
        total: pokemonData[0].base_stat + pokemonData[1].base_stat +
            pokemonData[2].base_stat + pokemonData[3].base_stat + pokemonData[4].base_stat +
            pokemonData[5].base_stat,
    };

    return estadisticasPokemon;
    // Se devuelven las estadísticas del Pokémon.
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
    // Función para mostrar los datos de los 151 Pokémon en la página principal.

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
        // Con "forEach" hacemos que se ejecute por cada tarjeta.

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
    // Función para mostrar los datos de un único Pokémon en la página de la ficha del Pokémon.

    console.log(pokemon);
    // Mostramos por consola los datos, para verificar que no hay errores.

    if (pokemon.id == 106) {
        pokemon.evoluciones.splice(1, 1);
        pokemon.evolucionesImagenes.splice(1, 1);
        pokemon.evolucionesNumeros.splice(1, 1);
        pokemon.evolucionesTipos.splice(1, 1);
        // Con la función "splice" eliminamos datos de un array.
        // Si el Pokémon es "Hitmonlee" elimina a "Hitmonchan" para que no lo muestre como su evolución.
    }

    if (pokemon.id == 107) {
        pokemon.evoluciones.splice(0, 1);
        pokemon.evolucionesImagenes.splice(0, 1);
        pokemon.evolucionesNumeros.splice(0, 1);
        pokemon.evolucionesTipos.splice(0, 1);
        // Con la función "splice" eliminamos datos de un array.
        // Si el Pokémon es "Hitmonchan" elimina a "Hitmonlee" para que no lo muestre como su evolución.
    }

    const pokemonHTMLString =
        // Generamos una cadena HTML y creamos la tarjeta donde ponemos los datos.

        ` <div class="card"> 
            <img class="card-image" src="${pokemon.image}"/>
            <p class="card-subtitle-nombre">${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}</p>
            <p class="card-title">Nº ${String(pokemon.id).padStart(3, '0')}</p>
            <p class="card-subtitle-tipo">${pokemon.type.split(" ").map((type) => `<span class="type ${type}" style="border-radius: 26px; padding: 12px 12px;">${type}</span>`).join(" ")}</p>
            <p class="card-subtitle-peso">- Peso: ${pokemon.weight}</p>
            <p class="card-subtitle-altura">- Altura: ${pokemon.height}</p>
            <p class="card-subtitle-descripcion">- Descripción:</p>
            <p class="card-subtitle-descripcion">${pokemon.descripcion}</p>
            <p class="card-subtitle-estadisticas-nombre">- Estadísticas Base:</p>
            <div class="estadisticas-container">
                <div class="estadistica-item">
                    <p class="card-subtitle-estadisticas">PS</p>
                    <p class="card-subtitle-estadisticas">🠚</p>
                    <p class="card-subtitle-estadisticas">${pokemon.stats.hp}</p>
                    <progress class="barra-progreso" value="${pokemon.stats.hp}" max="255"></progress>
                </div>
                <div class="estadistica-item">
                    <p class="card-subtitle-estadisticas">Ataque</p>
                    <p class="card-subtitle-estadisticas">🠚</p>
                    <p class="card-subtitle-estadisticas">${pokemon.stats.attack}</p>
                    <progress class="barra-progreso" value="${pokemon.stats.attack}" max="255"></progress>
                </div>
                <div class="estadistica-item">
                    <p class="card-subtitle-estadisticas">Defensa</p>
                    <p class="card-subtitle-estadisticas">🠚</p>
                    <p class="card-subtitle-estadisticas">${pokemon.stats.defense}</p>
                    <progress class="barra-progreso" value="${pokemon.stats.defense}" max="255"></progress>
                </div>
                <div class="estadistica-item">
                    <p class="card-subtitle-estadisticas">At. esp.</p>
                    <p class="card-subtitle-estadisticas">🠚</p>
                    <p class="card-subtitle-estadisticas">${pokemon.stats.specialAttack}</p>
                    <progress class="barra-progreso" value="${pokemon.stats.specialAttack}" max="255"></progress>
                </div>
                <div class="estadistica-item">
                        <p class="card-subtitle-estadisticas">Def. esp.</p>
                        <p class="card-subtitle-estadisticas">🠚</p>
                        <p class="card-subtitle-estadisticas">${pokemon.stats.specialDefense}</p>
                        <progress class="barra-progreso" value="${pokemon.stats.specialDefense}" max="255"></progress>
                </div>
                <div class="estadistica-item">
                        <p class="card-subtitle-estadisticas">Velocidad</p>
                        <p class="card-subtitle-estadisticas">🠚</p>
                        <p class="card-subtitle-estadisticas">${pokemon.stats.speed}</p>
                        <progress class="barra-progreso" value="${pokemon.stats.speed}" max="255"></progress>
                </div>
            </div>
            <p class="card-subtitle-estadisticas-total">Total: ${pokemon.stats.total}</p>
            <p class="card-subtitle-evoluciones">- Evoluciones:</p>
            <div class="evoluciones"> ${pokemon.evoluciones.map((evolucion, indice) => `
                <div class="evolucion">
                    <a href="index2.html" class="evolucion-link">
                        <div class="evolucion-info">
                            <img class="evolucion-image" src="${pokemon.evolucionesImagenes[indice]}"/>
                            ${pokemon.name === evolucion ? `<p class="evolucion-nombre-actual"> ${evolucion.charAt(0).toUpperCase()}${evolucion.slice(1)}</p>` : `<p class="evolucion-nombre">${evolucion.charAt(0).toUpperCase()}${evolucion.slice(1)}</p>`}
                            <p class="card-subtitle-tipo">${pokemon.evolucionesTipos[indice].split(" ").map((type) => `<span class="type ${type}" style="border-radius: 26px; padding: 12px 12px;">${type}</span>`).join(" ")}</p>
                        </div>
                    </a>
                    <div class="${pokemon.evoluciones.length > 1 ? 'evolucion-contenedor' : ''}">
                        <div class="evolucion-metodo">
                        ${indice === 0 && pokemon.metodoEvoluciones[0] && pokemon.metodoEvoluciones[0].trigger_name !== null && pokemon.id !== "143" && pokemon.id !== "137" && pokemon.id !== "133" && pokemon.id !== "134" && pokemon.id !== "108" && pokemon.id !== "106" && pokemon.id !== "107" && pokemon.id !== "39" && pokemon.id !== "40" && pokemon.id !== "25"
                        && pokemon.id !== "26" && pokemon.id !== "135" && pokemon.id !== "136" && pokemon.id !== "126" && pokemon.id !== "125" && pokemon.id !== "124" && pokemon.id !== "123" && pokemon.id !== "122" && pokemon.id !== "114" && pokemon.id !== "113" && pokemon.id !== "95" && pokemon.id !== "83" && pokemon.id !== "35" && pokemon.id !== "36"
                        ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[0].trigger_name}</p>` : ''}
                    
                        ${indice === 0 && pokemon.metodoEvoluciones[0] && pokemon.metodoEvoluciones[0].min_level !== null && pokemon.id !== "143" && pokemon.id !== "137" && pokemon.id !== "133" && pokemon.id !== "134" && pokemon.id !== "108" && pokemon.id !== "106" && pokemon.id !== "107" && pokemon.id !== "39" && pokemon.id !== "40" && pokemon.id !== "25"
                        && pokemon.id !== "26" && pokemon.id !== "135" && pokemon.id !== "136" && pokemon.id !== "126" && pokemon.id !== "125" && pokemon.id !== "124" && pokemon.id !== "123" && pokemon.id !== "122" && pokemon.id !== "114" && pokemon.id !== "113" && pokemon.id !== "95" && pokemon.id !== "83" && pokemon.id !== "35" && pokemon.id !== "36"
                        ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[0].min_level}</p>` : ''}
                    
                        ${indice === 0 && pokemon.metodoEvoluciones[0] && pokemon.metodoEvoluciones[0].item !== null && pokemon.id !== "143" && pokemon.id !== "137" && pokemon.id !== "133" && pokemon.id !== "134" && pokemon.id !== "108" && pokemon.id !== "106" && pokemon.id !== "107" && pokemon.id !== "39" && pokemon.id !== "40" && pokemon.id !== "25"
                        && pokemon.id !== "26" && pokemon.id !== "135" && pokemon.id !== "136" && pokemon.id !== "126" && pokemon.id !== "125" && pokemon.id !== "124" && pokemon.id !== "123" && pokemon.id !== "122" && pokemon.id !== "114" && pokemon.id !== "113" && pokemon.id !== "95" && pokemon.id !== "83" && pokemon.id !== "35" && pokemon.id !== "36"
                        ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[0].item.name}</p>` : ''}

                        ${indice < pokemon.evoluciones.length - 1 && indice >= pokemon.evoluciones.length - 2 && pokemon.id !== "41" && pokemon.id !== "42" && pokemon.id !== "56" && pokemon.id !== "57" && pokemon.id !== "79" && pokemon.id !== "80" && pokemon.id !== "81" && pokemon.id !== "82" && pokemon.id !== "133" && pokemon.id !== "134"
                        && pokemon.id !== "135" && pokemon.id !== "136" && pokemon.id !== "116" && pokemon.id !== "117" && pokemon.id !== "111" && pokemon.id !== "112" && pokemon.id !== "53" && pokemon.id !== "52" && pokemon.metodoEvoluciones.length > 1 && pokemon.metodoEvoluciones[1].trigger_name !== null
                        ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[1].trigger_name}</p>` : ''}
                    
                        ${indice < pokemon.evoluciones.length - 1 && indice >= pokemon.evoluciones.length - 2 && pokemon.id !== "41" && pokemon.id !== "42" && pokemon.id !== "56" && pokemon.id !== "57" && pokemon.id !== "79" && pokemon.id !== "80" && pokemon.id !== "81" && pokemon.id !== "82" && pokemon.id !== "133" && pokemon.id !== "134"
                        && pokemon.id !== "135" && pokemon.id !== "136" && pokemon.id !== "116" && pokemon.id !== "117" && pokemon.id !== "111" && pokemon.id !== "112" && pokemon.id !== "53" && pokemon.id !== "52" && pokemon.metodoEvoluciones.length > 1 && pokemon.metodoEvoluciones[1].min_level !== null
                        ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[1].min_level}</p>` : ''}
                    
                        ${indice < pokemon.evoluciones.length - 1 && indice >= pokemon.evoluciones.length - 2 && pokemon.id !== "41" && pokemon.id !== "42" && pokemon.id !== "56" && pokemon.id !== "57" && pokemon.id !== "79" && pokemon.id !== "80" && pokemon.id !== "81" && pokemon.id !== "82" && pokemon.id !== "133" && pokemon.id !== "134"
                        && pokemon.id !== "135" && pokemon.id !== "136" && pokemon.id !== "116" && pokemon.id !== "117" && pokemon.id !== "111" && pokemon.id !== "112" && pokemon.id !== "53" && pokemon.id !== "52" && pokemon.metodoEvoluciones.length > 1 && pokemon.metodoEvoluciones[1].item !== null
                        ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[1].item.name}</p>` : ''}

                        ${(pokemon.id == "133" || pokemon.id == "134" || pokemon.id == "135" || pokemon.id == "136") && indice == 0 ? '<p class="arrow">⮕</p>' : ''}
                        ${(pokemon.id == "133" || pokemon.id == "134" || pokemon.id == "135" || pokemon.id == "136") && indice == 1 ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[0].trigger_name}</p>` : ''}
                        ${(pokemon.id == "133" || pokemon.id == "134" || pokemon.id == "135" || pokemon.id == "136") && indice == 1 ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[0].item.name}</p>` : ''}
                        ${(pokemon.id == "133" || pokemon.id == "134" || pokemon.id == "135" || pokemon.id == "136") && indice == 2 ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[1].trigger_name}</p>` : ''}
                        ${(pokemon.id == "133" || pokemon.id == "134" || pokemon.id == "135" || pokemon.id == "136") && indice == 2 ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[1].item.name}</p>` : ''}
                        ${(pokemon.id == "133" || pokemon.id == "134" || pokemon.id == "135" || pokemon.id == "136") && indice == 3 ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[2].trigger_name}</p>` : ''}
                        ${(pokemon.id == "133" || pokemon.id == "134" || pokemon.id == "135" || pokemon.id == "136") && indice == 3 ? `<p class="evoTrigger">${pokemon.metodoEvoluciones[2].item.name}</p>` : ''}
                        </div>
                        <div class="flecha-contenedor">
                        ${indice < pokemon.evoluciones.length - 1 && pokemon.id !== "133" && pokemon.id !== "134" && pokemon.id !== "135" && pokemon.id !== "136" ? '<p class="arrow">⮕</p>' : ''}
                        </div>
                    </div>
                </div> `).join("")}
            </div>
        </div>`;
    // Con "charAt", "toUpperCase" y "slice(1)" ponemos la primera letra del nombre del pokémon en mayúscula.
    // Con "padStart" nos aseguramos de que tenga tres cifras y rellenamos de ceros las cifras que falten.
    // Con "split" separamos el tipo en dos elementos distintos para darles un color diferente.
    // Con "join" volvemos a unir los tipos del pokémon y les damos un espacio entre ellos.
    // En "evoluciones", se usa "map" para poder mostrar todas las evoluciones y sus imágenes, creando una tarjeta para cada una.
    // Se utiliza un operador ternario para los Pokémon que tienen evoluciones, aplicarles otros estilos.
    // Se utiliza otro operador ternario para poner en negrita el nombre del Pokémon de la cadena evolutiva si es el mismo que el de la ficha.
    // Se utiliza otro operador ternario para mostrar una flecha en caso de que el Pokémon tenga una evolución.
    // Se utilizan varios operadores ternarios para mostrar los métodos evolutivos y poner los datos correctos en el caso de los Pokémon con evoluciones fuera de Kanto.
    // Se utilizan unos últimos operadores ternarios para mostrar los datos correctos en el caso de Eevee.
    // Con el segundo "join" unimos las tarjetas de las evoluciones de los Pokémon.

    pokedex.innerHTML = pokemonHTMLString;
    // Introducimos la cadena HTML en el elemento "pokedex".

    const cards = document.getElementsByClassName('evolucion-link');
    // Creamos la variable "cards" para almacenar la lista de todas las tarjetas de evoluciones del Pokémon.

    Array.from(cards).forEach((tarjeta, indice) => {
        // Convertimos "cards" en un array con la función "Array.from".
        // Con "forEach" hacemos que se ejecute por cada tarjeta. 

        tarjeta.addEventListener('click', () => {
            // Agregamos un evento de click en cada tarjeta.

            const pokemonId = pokemon.evolucionesNumeros[indice];
            // Obtenemos el número del pokémon que ha sido seleccionado.

            sessionStorage.setItem("numeroPokemon", pokemonId);
            // Guardamos el número del pokémon en la sesión del navegador.
        });
    });
}

async function obtenerDatosDeUnPokemon(pokemon) {
    // Función para obtener los datos de un único Pokémon.

    const URLPokemon = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    // Ponemos en la variable "URLPokemon" la URL del Pokémon específico.

    const datos = await fetch(URLPokemon);
    // Con la función "fetch" realizamos la petición a la URL del Pokémon específico.

    const pokemonData = await datos.json();
    // Se convierte la respuesta de la petición a formato JSON y se almacena en "pokemonData".

    return pokemonData;
    // Se devuelven los datos.
}

async function obtenerDatosAvanzadosDeUnPokemon(pokemon) {
    // Función para obtener los datos avanzados de un único Pokémon.

    const URLPokemon = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
    // Ponemos en la variable "URLPokemon" la URL del Pokémon específico.

    const datos = await fetch(URLPokemon);
    // Con la función "fetch" realizamos la petición a la URL del Pokémon específico.

    const pokemonData = await datos.json();
    // Se convierte la respuesta de la petición a formato JSON y se almacena en "pokemonData".

    return pokemonData;
    // Se devuelven los datos.
}

async function obtenerListaNombrePokemon() {
    // Función para obtener los nombres de los 151 Pokémon.

    const resultados = await Promise.all(obtenerDatosPokemon());
    // Almacenamos en "resultados" todos los datos de los 151 Pokémon.

    return resultados.map(datos => datos.name);
    // Solo nos quedamos con el nombre y devolvemos los datos.
}

async function obtenerEvolucionesDelPokemon(pokemon) {
    // Función para obtener las evoluciones del Pokémon en la página de la ficha del Pokémon.

    let listaPokemonEvoluciones = [];
    // Array vacío que contendrá las evoluciones del Pokémon.

    let listaPokemonMetodosEvoluciones = [];
    // Array vacío que contendrá los métodos de las evoluciones del Pokémon.

    const URLPokemon = pokemon.evolution_chain.url;
    // Ponemos en la variable "URLPokemon" la URL del Pokémon específico.

    const datos = await fetch(URLPokemon);
    // Con la función "fetch" realizamos la petición a la URL del Pokémon específico.

    const pokemonData = await datos.json();
    // Almacenamos en "pokemonData" los datos obtenidos en formato JSON.

    const evoChain = pokemonData.chain;
    // Almacenamos en "evoChain" los datos específicos de las evoluciones.

    listaPokemonEvoluciones.push(evoChain.species.name);
    // Almacenamos en el array con "push" el primer Pokémon de la cadena evolutiva.

    if (evoChain.evolves_to.length > 0 && evoChain.evolves_to.length < 2) {
        listaPokemonEvoluciones.push((evoChain.evolves_to[0].species.name));
        // Si el Pokémon tiene una evolución, lo almacena en el segundo lugar del array.

        const evoTrigger = evoChain.evolves_to[0].evolution_details[0];
        // Almacenamos en "evoTrigger" la ubicación del método evolutivo.

        const primeraEvolucion = { // Creamos un objeto con los datos del método evolutivo.
            "min_level": !evoTrigger ? 1 : evoTrigger.min_level,
            "trigger_name": !evoTrigger ? null : evoTrigger.trigger.name,
            "item": !evoTrigger ? null : evoTrigger.item
        };

        listaPokemonMetodosEvoluciones.push(primeraEvolucion);
        // Se almacena en el array el método evolutivo.

        if (evoChain.evolves_to[0].evolves_to.length > 0) {
            listaPokemonEvoluciones.push(evoChain.evolves_to[0].evolves_to[0].species.name);
            // Si el Pokémon tiene una segunda evolución, lo almacena en el tercer lugar del array.

            const evoTrigger2 = evoChain.evolves_to[0].evolves_to[0].evolution_details[0];
            // Almacenamos en "evoTrigger" la ubicación del método evolutivo.

            const segundaEvolucion = { // Creamos un objeto con los datos del método evolutivo.
                "min_level": !evoTrigger2 ? 1 : evoTrigger2.min_level,
                "trigger_name": !evoTrigger2 ? null : evoTrigger2.trigger.name,
                "item": !evoTrigger2 ? null : evoTrigger2.item
            };

            listaPokemonMetodosEvoluciones.push(segundaEvolucion);
            // Se almacena en el array el método evolutivo.
        }
    }

    if (evoChain.evolves_to.length >= 2) {
        for (let evos of evoChain.evolves_to) {
            // Si el Pokémon tiene muchas evoluciones (Eevee), las almacena en el array con el bucle.

            const evoTrigger = evos.evolution_details[0];
            const primeraEvolucion = { // Creamos un objeto con los datos del método evolutivo.
                "min_level": !evoTrigger ? 1 : evoTrigger.min_level,
                "trigger_name": !evoTrigger ? null : evoTrigger.trigger.name,
                "item": !evoTrigger ? null : evoTrigger.item
            };

            listaPokemonMetodosEvoluciones.push(primeraEvolucion);
            listaPokemonEvoluciones.push(evos.species.name);
        }
    }

    return [listaPokemonEvoluciones, listaPokemonMetodosEvoluciones];
    // Se devuelven ambas listas.
}

function filtarEvoluciones(evolucionesPokemon, listaPokemonKanto) {
    // Función para filtrar la lista de evoluciones y quedarnos solo con los de Kanto.

    const resultado = evolucionesPokemon.filter(nombre => listaPokemonKanto.includes(nombre));
    // Con la función "filter" filtra la lista de evoluciones del array "evolucionesPokemon".
    // La función "includes" verifica si el nombre del Pokémon está en el array "listaPokemonKanto".

    return resultado;
    // Se devuelve la lista filtrada.
}

async function obtenerImagenEvolucion(pokemonNameList) {
    // Función para obtener las imágenes de los Pokémon de la lista de evoluciones.

    let listaImagenEvoluciones = [];
    // Array vacío que contendrá las imágenes de los Pokémon.

    for (let pokemon of pokemonNameList) {
        // Bucle que hace las peticiones de las imágenes.

        const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        // Con la función "fetch" realizamos la petición a la URL del Pokémon específico.

        const datos = await peticion.json();
        // Almacenamos en "datos" los datos obtenidos en formato JSON.

        listaImagenEvoluciones.push(datos.sprites.versions["generation-iii"]["firered-leafgreen"]["front_default"]);
        // Almacenamos en el array con "push" la imagen del Pokémon.
    }
    return listaImagenEvoluciones;
    // Se devuelve la lista.
}

async function obtenerNumeroEvolucion(pokemonNameList) {
    // Función para obtener el número del Pokémon de la lista de evoluciones.

    let listaNumeroEvoluciones = [];
    // Array vacío que contendrá los números de los Pokémon.

    for (let pokemon of pokemonNameList) {
        // Bucle que hace las peticiones de los números.

        const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        // Con la función "fetch" realizamos la petición a la URL del Pokémon específico.

        const datos = await peticion.json();
        // Almacenamos en "datos" los datos obtenidos en formato JSON.

        listaNumeroEvoluciones.push(datos.id);
        // Almacenamos en el array con "push" el número del Pokémon.
    }
    return listaNumeroEvoluciones;
    // Se devuelve la lista.
}

async function obtenerTiposEvolucion(pokemonNameList) {
    // Función para obtener los tipos de los Pokémon de la lista de evoluciones.

    let listaTiposEvoluciones = [];
    // Array vacío que contendrá los tipos de los Pokémon.

    for (let pokemon of pokemonNameList) {
        // Bucle que hace las peticiones de los tipos.

        const peticion = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        // Con la función "fetch" realizamos la petición a la URL del Pokémon específico.

        const datos = await peticion.json();
        // Almacenamos en "datos" los datos obtenidos en formato JSON.

        if (datos.past_types.length > 0) {
            listaTiposEvoluciones.push(datos.past_types[0].types.map(type => tiposTraducidos()[type.type.name])
                .join(" "));
            // Si el tipo del pokémon antes era otro, se asignará el antiguo.
            // Almacenamos en el array con "push" los tipos del Pokémon.

        } else {
            listaTiposEvoluciones.push(datos.types.map(type => tiposTraducidos()[type.type.name]).join(" "));
            // Si no tiene uno antiguo, se asignará con normalidad el tipo.
            // Almacenamos en el array con "push" los tipos del Pokémon.
        }
    }
    return listaTiposEvoluciones;
    // Se devuelve la lista.
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
}

function cambiarTema() {
    // Función para cambiar de modo claro a modo oscuro.

    const temaPagina = document.getElementById('boton-tema');
    // Creamos una variable que acceda al id del botón.

    const temaAlmacenado = localStorage.getItem('tema');
    // Creamos una variable que verifica si hay un tema almacenado en localStorage.

    if (temaAlmacenado) {
        document.body.classList.add(temaAlmacenado);
        // Si hay un tema almacenado, se añade a la clase del body.

        if (temaAlmacenado === 'oscuro') {
            temaPagina.classList.add('active');
            // Si el tema almacenado es oscuro, se actualiza el estado del botón.
        }
    }

    temaPagina.addEventListener('click', () => {
        // Esta función se activa cuando el usuario da click al botón.

        document.body.classList.toggle('oscuro');
        // Cambiamos el tipo de los elementos del body a "oscuro" o "claro".

        if (document.body.classList.contains('oscuro')) {
            localStorage.setItem('tema', 'oscuro');
            temaPagina.classList.add('active');
            // Si el tema seleccionado es oscuro, lo guardamos en localStorage con el nombre "oscuro".
            // Se actualiza el estado del botón.

        } else {
            localStorage.setItem('tema', 'claro');
            temaPagina.classList.remove('active');
            // Si el tema seleccionado no es oscuro, se guarda en localStorage con el nombre "claro".
            // Se actualiza el estado del botón.
        }
    });
}