const pokeApi = {};

function displayDetailsPokemon(pokeStats) {
  const pokemon = new pokeDetails();
  pokemon.n4me = pokeStats.name;
  pokemon.order = pokeStats.order;
  pokemon.type = pokeStats.types.map((typeSlot) => typeSlot.type.name);
  pokemon.weight = pokeStats.weight;
  pokemon.height = pokeStats.height;
  pokemon.abilities = pokeStats.abilities;
  pokemon.moves = pokeStats.moves;
  pokemon.sprite = pokeStats.sprites.other.dream_world.front_default;
  console.log(pokemon)
  console.log(pokemon.n4me)
  console.log(pokemon.weight)
  console.log(pokemon.abilities)
  console.log(pokemon.moves)
  return(pokemon)
}

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
    .then((pokemon) => {
      return pokemon;
    });
};

pokeApi.getPokemons = (offset = 0, limit = 20) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getPokemonStats = (pokeNumber) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeNumber}`;
  return fetch(url)
  .then((response) => response.json())
  .then((convertToStats) => displayDetailsPokemon(convertToStats))
  .then((pokemonStatus) => pokemonStatus) 
}