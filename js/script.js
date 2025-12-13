const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';
const searchInput = document.querySelector("#searchInput");
const results = document.querySelector(".results");

const renderError = (message => {
  results.insertAdjacentText('beforeend', message);
})

const searchCharacter = async () => {
  let searchValue = searchInput.value.trim();
  console.log(searchValue);
  const url = `${apiUrl}?search=${searchValue}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network reponse was not ok")
    }
    const character = await response.json();
    displayCharacter(character);
  } catch (error) {
    renderError(`Something went wrong ${error.message}. Try again!`)
  }
}


let typingTimer

searchInput.addEventListener('input', () => {
  clearTimeout(typingTimer)
  typingTimer = setTimeout(searchCharacter, 300)
})

const displayCharacter = (character) => {
  results.innerHTML = "";

  if (!character.length) {
    results.textContent = "No results found.";
    return;
  }
  const result = character[0];
  // DATA returns an array
  const { fullName, nickname, birthdate, hogwartsHouse, image, children } = result;

  const resultContainer = document.createElement("div")
  resultContainer.classList.add("container")

  resultContainer.innerHTML = `<h2>${fullName}</h2>
  <img src=${image} alt=${fullName} image"></img>
  `
  results.appendChild(resultContainer)
}