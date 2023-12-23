const loadMoreButton = document.getElementById("loadMore");
const loadDetails = document.getElementById("loadDetails");
const limit = 20;
let offset = 0;

function convertPokemonStatsToLi(pokemon) {
  return `
    <li class="pokemon-stats-list">
     <span class="pokemon-stats-name">Name: ${pokemon.n4me}</span>

     <img src="${pokemon.sprite}">     
     <span class="pokemon-order">#${pokemon.order}</span>
      <div class="pokemon-Stats">
        <div class="heigthweight>
          <span class="pokemon-stats-weigth">Weigth: ${pokemon.weight}</span>
          <span class="pokemon-stats-height">Height: ${pokemon.height}</span>
        </div>
        <span class="pokemon-stats-abilities">Abilities: ${pokemon.abilities
          .map(
            (abilities) =>
              `<ol class="type ${abilities}"> ${abilities.ability.name}  </ol>`
          )
          .join("")}
          </span>
          <span class="pokemon-stats-moves">Moves:${pokemon.moves
            .map(
              (moves) => `<ol class="type ${moves}"> ${moves.move.name} </ol>`
            )
            .join("")}
          </span>
      </div>
    </li>
    
      
`
}

function convertPokemonToLi(pokemon) {
  return `
        <li class="pokemon ${pokemon.type}"  >
          <span class="number">#${pokemon.number}</span>
          <span class="name">${pokemon.name}</span>
          <div class="detail">
            <ol class="types">
              ${pokemon.types
                .map((type) => `<li class="type ${type}">${type}</li>`)
                .join("")}
            </ol>
            <img src="${pokemon.photo}" 
            alt="${pokemon.name}">
          </div>
          <button action="loadDetails" id="loadDetails" onclick="loadStats(${
            pokemon.number
          });"
           class="loadDetails">Details</button>
        </li>
    `;
}

const pokemonList = document.getElementById("pokemonList");

function loadStats(number) {
  pokeApi.getPokemonStats(number).then((stats) => {
    pokemonList.innerHTML = convertPokemonStatsToLi(stats);
  });
  buttonHider();
}

function loadPokemons(offset = 0, limit = 20) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join("");
  });
}

function backPokedex (offset =0, limit = 20){
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML = pokemons.map(convertPokemonToLi).join("");
  });
  buttonFinder();

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


loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadPokemons(offset, limit);
  loadMoreButton.disabled = true;
  setTimeout(() => {
    loadMoreButton.disabled = false;
  }, 1000);
});


function buttonHider(){
  loadMoreButton.style.display = "none";
  loadDetails.style.display = "none";
  loadMoreButton.disabled = true;
  setTimeout(() => {
    loadMoreButton.disabled = false;
  }, 1000);
  setTimeout(() => {
    loadMoreButton.style.display = "block";
    loadDetails.style.display = "block";
  }, 2000);
  return buttonHider;

}

function buttonFinder(){
  loadMoreButton.style.display = "block";
  loadDetails.style.display = "block";
  return buttonFinder;

}
