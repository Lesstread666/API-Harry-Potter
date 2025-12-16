const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';
const spellApiUrl = 'https://potterapi-fedeperin.vercel.app/en/spells/random';
const searchInput = document.querySelector("#searchInput");
const results = document.querySelector(".results");
const loadingState = document.querySelector('.loadingState');
const confirmMessageContainer = document.querySelector('.confirmation');
const castSpellButton = document.querySelector("#castSpell");

let typingTimer;

const clearContainer = (container) => {
  container.innerHTML = "";
}

const renderError = (message => {
  clearContainer(results);

  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;
  errorMessage.classList.add('error');

  results.appendChild(errorMessage);
})

const getData = async (url, errorMessage = 'Something went wrong') => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${errorMessage} (${response.status})`);
  }
  return response.json();
};

const searchCharacter = async () => {
  let searchValue = searchInput.value.trim();

  if (!searchValue) {
    renderError('Please enter a Harry Potter character name ⚡');
    return;
  }
  clearContainer(results);
  loadingState.classList.remove('hidden');
  const url = `${apiUrl}?search=${searchValue}`;
  try {
    const character = await getData(url);
    displayCharacter(character);

  } catch (error) {
    renderError(`${error.message}. Try again!`)
  } finally {
    loadingState.classList.add('hidden');
  }
}

const displayCharacter = (characters) => {
  clearContainer(results);

  if (!characters.length) {
    renderError('No results found.');
    return;
  }

  localStorage.setItem('lastViewedCharacter', JSON.stringify(characters[0]));

  characters.forEach(character => {
    const resultContainer = document.createElement("div")
    resultContainer.classList.add("container")

    resultContainer.innerHTML =
      `<img src=${character.image}></img>

   <div class="card-content">
    <h2>${character.fullName}</h2>
    <p><span class="label">Nickname:</span> ${character.nickname || "—"}</p>
    <p><span class="label">Birthdate:</span> ${character.birthdate || "—"}</p>
    <p><span class="label">House:</span> ${character.hogwartsHouse || "—"}</p>
    <p><span class="label">Family:</span> ${character.children && character.children.length ? character.children.join(", ") : "—"}</p>
  </div>`
    results.appendChild(resultContainer)
  })
}

const fetchRandomSpell = async () => {
  try {
    const spell = await getData(spellApiUrl, "Could not cast a spell");
    displaySpell(spell);
  } catch (error) {
    clearContainer(results);
    renderError(`Something went wrong ${error.message}. Try again!`)
  }
}

const displaySpell = (spell) => {
  clearContainer(results);
  const isFavorite = isSpellFavourite(spell.index);

  const spellContainer = document.createElement("div");
  spellContainer.classList.add("spell-container");

  spellContainer.innerHTML = `
  <img src="./visuals/spells.png" alt="${spell.spell}" />
    <div class="card-content">
      <h2>${spell.spell || "—"}</h2>
      <p><span class="label">Description:</span> ${spell.use || "—"}</p>
      <button class ="btn">${isFavorite ? '🪄 Remove from favourites' : '🪄 Add to favourites '}</button>
    </div>
  `;

  const button = spellContainer.querySelector('.btn');
  button.addEventListener('click', () => {
    toggleFavoriteButton(spell, button);
  })

  results.appendChild(spellContainer);
}

const confirmationMessage = (message => {
  clearContainer(confirmMessageContainer);

  const msg = document.createElement('p');
  msg.textContent = message;
  msg.classList.add('confirmed');

  confirmMessageContainer.appendChild(msg);

  setTimeout(() => {
    clearContainer(confirmMessageContainer);
  }, 3000)
});

const saveSpells = (spells => {
  localStorage.setItem('favouriteSpells', JSON.stringify(spells))
});

const favouriteSpells = () => {
  return JSON.parse(localStorage.getItem('favouriteSpells') || '[]');
};

const isSpellFavourite = (spellIndex => {
  const favourites = favouriteSpells();
  return favourites.some(spell => spell.index === spellIndex);
});

const addFavoriteSpell = (spell => {
  const favourites = favouriteSpells();

  if (!favourites.some(s => s.index === spell.index)) {

    const addSpell = {
      index: spell.index,
      spell: spell.spell,
      use: spell.use
    }
    favourites.push(addSpell);
    saveSpells(favourites);
    confirmationMessage("Added to favourites!");
  }
})

const removeFavoriteSpell = (index => {
  const favourites = favouriteSpells().filter(i => i.index !== index);
  saveSpells(favourites);
  confirmationMessage("Removed from favourites!");
})

const toggleFavoriteButton = (spell, element) => {

  if (isSpellFavourite(spell.index)) {
    removeFavoriteSpell(spell.index);
    element.textContent = '🪄 Add to favourites ';
  } else {
    addFavoriteSpell(spell);
    element.textContent = '🪄 Remove from favourites'
  }
}

//Event listeners
searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer)
  clearContainer(results);
  typingTimer = setTimeout(searchCharacter, 300)
});

castSpellButton.addEventListener("click", () => {
  fetchRandomSpell();
});

window.addEventListener('DOMContentLoaded', () => {
  const viewedCharacter = localStorage.getItem('lastViewedCharacter');

  if (viewedCharacter) {
    const character = JSON.parse(viewedCharacter);
    displayCharacter([character])
  }
});