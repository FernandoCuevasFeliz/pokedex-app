class Pokedex {
  constructor(_limit = 151) {
    this.allPokemons = null;
    this.optionsPokemon = null;
    this.optionPokemon = null;
    this.limit = _limit;
    this.route = 'https://pokeapi.co/api/v2/pokemon';
  }

  async getAllPokemons() {
    const pokemons = await fetch(`${this.route}?limit=${this.limit}`);
    this.allPokemons = [...(await pokemons.json()).results];
  }

  numberRandom(min = 1, max = this.limit) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async setOptionsPokemons(limit = 3) {
    let randomPokemons = [];

    while (randomPokemons.length < limit) {
      const indexPokemon = this.numberRandom();
      const condition = randomPokemons.indexOf(this.allPokemons[indexPokemon]);

      if (condition == -1) {
        const dataPokemon = await this.getDataPokemon(
          this.allPokemons[indexPokemon].name
        );
        randomPokemons.push(dataPokemon);
      }
    }
    this.optionsPokemon = randomPokemons;
  }

  setOptionPokemon() {
    const index = this.numberRandom(0, 2);
    this.optionPokemon = this.optionsPokemon[index];
  }

  isThePokemon(pokemon) {
    if (pokemon.trim() != this.optionPokemon.name) {
      return false;
    }
    return true;
  }

  async getDataPokemon(namePokemon) {
    const res = await fetch(`${this.route}-form/${namePokemon.trim()}`);
    if (res.status === 404) {
      return {
        name: '',
        back_default: '',
        back_shiny: '',
        front_default: '',
        front_shiny: '',
      };
    }
    const dataPokemon = await res.json();
    const { name, sprites } = dataPokemon;
    const pokemon = {
      name,
      ...sprites,
    };
    return pokemon;
  }
}

export default Pokedex;
