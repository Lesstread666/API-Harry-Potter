const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';
const searchInput = document.querySelector("#searchInput");
const results = document.querySelector(".results");
const loadingState = document.querySelector('.loadingState');

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

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer)
  clearContainer(results);
  typingTimer = setTimeout(searchCharacter, 300)
})