import Pokedex from './Pokedex';

const $imgPokemon = document.getElementById('img-pokemon');
const $cardPokemonFooter = document.getElementById('card-pokemon__footer');
const $cardNamePokemon = document.getElementById('card-name-pokemon');
const fragment = document.createDocumentFragment();

const pokedex = new Pokedex();
(async function () {
  await pokedex.getAllPokemons();
  await pokedex.setOptionsPokemons();
  pokedex.setOptionPokemon();
  console.log(pokedex.optionsPokemon);
  console.log(pokedex.optionPokemon);
  const pokemon = await pokedex.getDataPokemon(pokedex.optionPokemon.name);

  $imgPokemon.src = pokemon?.front_default;
  $imgPokemon.alt = pokemon?.name;

  for (const pokeOpt of pokedex.optionsPokemon) {
    const pokeOptItem = document.createElement('div');
    pokeOptItem.classList = 'card-pokemon__opt';

    const pokeOptImg = document.createElement('img');
    pokeOptImg.classList = 'img-pokemon__opt';
    pokeOptImg.src = pokeOpt.front_default;
    pokeOptImg.alt = pokeOpt.name;

    pokeOptItem.append(pokeOptImg);
    fragment.append(pokeOptItem);
  }
  $cardPokemonFooter.append(fragment);

  $cardPokemonFooter.addEventListener('click', (e) => {
    if (e.target.classList.contains('img-pokemon__opt')) {
      if (pokedex.optionPokemon.name === e.target.alt) {
        $imgPokemon.classList.add('img-pokemon--show');
        $cardNamePokemon.textContent = e.target.alt;
        console.log('Correcto');
        return;
      }
      console.log('Incorrecto');
      return;
    }
  });
})();
