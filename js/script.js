const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';
const spellApiUrl = 'https://potterapi-fedeperin.vercel.app/en/spells/random';
const searchInput = document.querySelector("#searchInput");
const results = document.querySelector(".results");
const loadingState = document.querySelector('.loadingState');
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
    results.innerHTML = ``;
    renderError(`Something went wrong ${error.message}. Try again!`)
  }
}

const displaySpell = (spell) => {
  results.innerHTML = ``;

  const spellContainer = document.createElement("div");
  spellContainer.classList.add("spell-container"); 

  spellContainer.innerHTML = `
  <img src="./visuals/spells.png" alt="${spell.spell}" />
    <div class="card-content">
      <h2>${spell.spell || "—"}</h2>
      <p><span class="label">Description:</span> ${spell.use || "—"}</p>
    </div>
  `;

  results.appendChild(spellContainer);
}

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer)
  clearContainer(results);
  typingTimer = setTimeout(searchCharacter, 300)
})

castSpellButton.addEventListener("click", () => {
  fetchRandomSpell();
});