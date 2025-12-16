const container = document.querySelector('.favourites-container');

//DIRECTLY remove favourite spells from the page:

const getFavouriteSpells = () => {
  try {
    return JSON.parse(localStorage.getItem('favouriteSpells') || '[]');
  } catch {
    return [];
  }
};

const saveFavouriteSpells = (spells => {
  localStorage.setItem('favouriteSpells', JSON.stringify(spells))
});

const removeFavouriteSpell = (index => {
  const updateList = getFavouriteSpells().filter(i => i.index !== index);
  saveFavouriteSpells(updateList);
  showFavourites();
})

const showFavourites = () => {

  if (!container) {
    return;
  }
  container.innerHTML = "";

  const savedSpells = getFavouriteSpells();

  if (savedSpells.length === 0) {
    container.innerHTML = `<p class="empty-list">No favourite spells added yet.</p>`
    return;
  }

  savedSpells.forEach(spell => {

    const favouriteContainer = document.createElement("div");
    favouriteContainer.classList.add("spell-container");

    favouriteContainer.innerHTML = `
  <img src="./visuals/spells.png" alt="${spell.spell}" />
    <div class="card-content">
      <h2>${spell.spell || "—"}</h2>
      <p><span class="label">Description:</span> ${spell.use || "—"}</p>
      <button class='btn'>Remove from list</button>
    </div>
  `;
    favouriteContainer.querySelector('.btn').addEventListener('click', () => {
      removeFavouriteSpell(spell.index);
    })
    container.appendChild(favouriteContainer);
  })
}

window.addEventListener('DOMContentLoaded', showFavourites);
