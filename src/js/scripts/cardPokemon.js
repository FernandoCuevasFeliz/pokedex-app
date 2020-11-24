import Pokedex from './Pokedex';

const $imgPokemon = document.getElementById('img-pokemon');
const $cardPokemonFooter = document.getElementById('card-pokemon__footer');
const $cardNamePokemon = document.getElementById('card-name-pokemon');
const $cardPokemonResult = document.getElementById('pokemon-result');
const $cardTitleResult = document.getElementById('title-result');
const $btnNewGame = document.getElementById('card-pokemon__btn');

const fragment = document.createDocumentFragment();

const pokedex = new Pokedex();

(async function () {
  await pokedex.getAllPokemons();
  await pokedex.setOptionsPokemons();
  pokedex.setOptionPokemon();

  const pokemon = await pokedex.getDataPokemon(pokedex.optionPokemon.name);

  $imgPokemon.src = pokemon?.front_default;
  $imgPokemon.alt = pokemon?.name;

  for (const pokeOpt of pokedex.optionsPokemon) {
    const pokeOptItem = document.createElement('button');
    pokeOptItem.classList = 'card-pokemon__opt';
    pokeOptItem.textContent = pokeOpt.name;

    fragment.append(pokeOptItem);
  }

  $cardPokemonFooter.append(fragment);

  $cardPokemonFooter.addEventListener('click', (e) => {
    if (e.target.classList.contains('card-pokemon__opt')) {
      if (pokedex.optionPokemon.name === e.target.textContent) {
        $cardTitleResult.textContent = 'Correct!';
      } else {
        $cardTitleResult.textContent = 'Incorrect!';
      }
      $imgPokemon.classList.add('img-pokemon--show');
      $cardNamePokemon.textContent = pokedex.optionPokemon.name;
      $cardPokemonResult.classList.add('result--show');
      return;
    }
  });
})();

$btnNewGame.addEventListener('click', () => window.location.reload());
