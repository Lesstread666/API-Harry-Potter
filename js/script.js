const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';
const searchInput = document.querySelector("#searchInput");
const results = document.querySelector(".results");
const loadingState = document.querySelector('.loadingState');

let typingTimer;

const renderError = (message => {
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
  loadingState.classList.remove('hidden');
  const url = `${apiUrl}?search=${searchValue}`;
  try {
    const character = await getData(url);
    loadingState.classList.add('hidden');
    displayCharacter(character);

  } catch (error) {
    loadingState.classList.add('hidden');
    renderError(`${error.message}. Try again!`)
  }
}

const displayCharacter = (character) => {
  results.innerHTML = "";

  if (!character.length) {
    renderError('No results found.');
    return;
  }
  const result = character[0];
  // DATA returns an array
  const { fullName, nickname, birthdate, hogwartsHouse, image, children } = result;

  const resultContainer = document.createElement("div")
  resultContainer.classList.add("container")

  resultContainer.innerHTML =
    `<img src=${image}></img>

   <div class="card-content">
    <h2>${fullName}</h2>
    <p><span class="label">Nickname:</span> ${nickname || "—"}</p>
    <p><span class="label">Birthdate:</span> ${birthdate || "—"}</p>
    <p><span class="label">House:</span> ${hogwartsHouse || "—"}</p>
    <p><span class="label">Family:</span> ${children && children.length ? children.join(", ") : "—"}</p>
  </div>`
  results.appendChild(resultContainer)
}

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer)
  typingTimer = setTimeout(searchCharacter, 300)
})