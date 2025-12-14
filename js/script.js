const apiUrl = 'https://potterapi-fedeperin.vercel.app/en/characters';
const searchInput = document.querySelector("#searchInput");
const results = document.querySelector(".results");

const searchCharacter = async () => {
  let searchValue = searchInput.value.trim();

  console.log(searchValue);

  const url = `${apiUrl}?search=${searchValue}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const character = await response.json();
    displayCharacter(character);
  } catch (error) {
    results.textContent = error
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