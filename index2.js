Promise.all(obtenerDatosPokemon()).then(resultado => {
    const pokemon = resultado.map(datos => {
        const pokemonData = {
            name: datos.name,
            id: `Nº ${String(datos.id).padStart(3, '0')}`,
            image: datos.sprites.versions['generation-iii']['firered-leafgreen']['front_default'],
            weight: `${String(datos.weight/ 10)} kg`,
            height: `${String(datos.height/ 10)} m`,
            stats: datos.stats,
        };

        if (datos.past_types.length > 0) {
            pokemonData.type = datos.past_types[0].types.map(type => tiposTraducidos()[type.type.name])
                .join(" ");
        } else {
            pokemonData.type = datos.types.map(type => tiposTraducidos()[type.type.name]).join(" ");
        }
        return pokemonData;
    });
    console.log(pokemon)
});