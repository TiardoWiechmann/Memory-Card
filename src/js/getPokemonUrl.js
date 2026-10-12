export default async function getPokemonUrl(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await response.json();
    return {
        url: pokemon.sprites.front_default,
        name: pokemon.name,
        id: id,
    }
}