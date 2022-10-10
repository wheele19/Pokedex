const pokemonRepository = (function() {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=51';

  function getAll() {
    return pokemonList;
  };

  function add(pokemon) {
  if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
    pokemonList.push(pokemon);
  } else {
    console.log('pokemon is not correct')
  }
}

  function loadList() {
      return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        const pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon.name);
      });
    }).catch(function (e) {
      console.error(e);
    })
  };

function loadDetails(item) {
  const url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types.map((type) => type.type.name).join(',');
    item.weight = details.weight;
  }).catch(function (e) {
    console.error(e);
  });
};

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
  });
}

  return {
    getAll,
    add,
    loadList,
    loadDetails,
    showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
  });
});
