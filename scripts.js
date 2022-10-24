const pokemonRepository = (function() {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=51';

  function getAll() {
    console.table(pokemonList)
    pokemonList.sort((a, b) => {
      let na = a.name
          nb = b.name
  
      if (na < nb) {
          return -1;
      }
      if (na > nb) {
          return 1;
      }
      return 0;
  });
  //console.table(pokemonList)

    return pokemonList;
  };

  function add(pokemon) {
  if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
    pokemonList.push(pokemon);
  } else {
    console.log('pokemon is not correct')
  }
}

function addListItem(pokemon) {
  const allPokemon = document.querySelector('.pokemon-list');
  const listItem = document.createElement('li');
  const button = document.createElement('button');
  button.innerHTML = pokemon.name;
  button.classList.add('button');
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', '#pokemon-modal')
  button.classList.add('btn')
  listItem.appendChild(button);
  allPokemon.appendChild(listItem);
  button.addEventListener('click', function(event) 
  {
    showDetails(pokemon); 
  });
};

  function loadList() {
      return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        cap_name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
        const pokemon = {
          name: cap_name,
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
    item.types = details.types.map((type) => type.type.name).join(', ');
    item.weight = details.weight;
  }).catch(function (e) {
    console.error(e);
  });
};

function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    showModal(pokemon)
  });
}

  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
    showDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

function showModal(p){
  let e=$(".modal-body"),t=$(".modal-title");t.empty(),e.empty();
  const name = p.name;
  const cap_name = name.charAt(0).toUpperCase() + name.slice(1);
  const type = p.types;
  const cap_type = type.charAt(0).toUpperCase() + type.slice(1);
  let a=$("<h1>"+cap_name+"</h1>"),d=$('<img class="modal-img">');d.attr("src",p.imageUrl);


  let l=$("<h3><p>Height:\u00A0\u00A0\u00A0\u00A0\u00A0</p>"+ p.height+"ft</h3>"),i=$("<h3><p>Weight:\u00A0\u00A0\u00A0\u00A0</p>"+p.weight+"lbs</h3>"),m=$("<h3><p>Types:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0</p>"+cap_type+"</h3>");t.append(a),e.append(d),e.append(l),e.append(i),e.append(m)
}

