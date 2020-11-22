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
        $cardTitleResult.textContent = 'Correct!';
      } else {
        $cardTitleResult.textContent = 'Incorrect!';
      }
      $imgPokemon.classList.add('img-pokemon--show');
      $cardNamePokemon.textContent = e.target.alt;
      $cardPokemonResult.classList.add('result--show');
      return;
    }
  });
})();

$btnNewGame.addEventListener('click', () => window.location.reload());
