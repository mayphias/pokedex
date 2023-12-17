const loadMoreButton = document.getElementById('loadMore')
const limit = 20;
let offset = 0;


function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}"  >
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
            </ol>
            <img src="${pokemon.photo}" 
            alt="${pokemon.name}">
          </div>
        </li>
    `;
}

const pokemonList = document.getElementById("pokemonList");


function loadPokemons(offset = 0, limit = 20) {
pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("");
});
}


//metodo 1 -----------------------------------------
// pokeApi.getPokemons().then((pokemons = [] ) => {
//     const listList = [];

//         for (let i = 0; i < pokemons.length; i++) {
//             const pokemon = pokemons[i];
//             listList.push(convertPokemonToLi(pokemon));
//             //pokemonList.innerHTML += convertPokemonToLi(pokemon);
//         }
//         pokemonList.innerHTML += listList.join('');

//     })



//metodo 2 -----------------------------------------
  // const newList = pokemons.map((pokemon) => convertPokemonToLi(pokemon))

  // const newHTML = newList.join("");
  // pokemonList.innerHTML += newHTML;
loadPokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  loadPokemons(offset, limit);
  loadMoreButton.disabled = true;
  setTimeout(() => {
    loadMoreButton.disabled = false;
  }, 1000);

})