# 🪄 World of Wizardry

## ✨ Overview
It is a fun, interactive web application that allows users to explore the Wizarding World by:
- 🔍 Searching for Harry Potter characters
- 🪄 Casting random spells
- 🗂️ Saving favourite spells
- 📜 Automatically restoring the last viewed character upon page load

The app uses:
> HTML/CSS/JavaScript

>Fetch API for HTTP requests

>PotterAPI → https://potterapi-fedeperin.vercel.app/

## ⚙️ Core Features
**🔍 Character Search**
- Search for characters using a search input
- Display multiple matching characters when available
- Shows character details
- Last viewed character is saved in **_localStorage_** and restored on page load

**🪄 Random Spell Casting**
- Button fetches a random spell from the spells endpoint
- Displays spells name and use
- Users can:
   > Add spells to favourites

  > Remove spells from favourites
- Button state updates dynamically based on status

**⚡️ Favourites**
- Favourite spells are stored using localStorage
- Prevents duplicate spells from being added
- Confirmation message to provide user feedback.

## 🚀 How It Works
1. User types into the search input
2. Matching characters are displayed dynamically
3. User can switch context and cast a random spell
4. Favourite spells and last viewed character are saved locally

Only one feature renders at a time to keep the interface clean and focused.

## 🧰 Built With
- 🖥️ **HTML5** – For pages and contents structure
- 🎨 **CSS3** - For styling , layout and responsiveness
- 🧠 **JavaScript(Vanilla)** - Main logic and state handling
- 🪄 **PotterApi** - No authentication required!

## 📚 API Reference

Full documentation:

[PotterApi](https://github.com/fedeperin/potterapi?utm_source=chatgpt.com)


## 🚀 Future Improvements or Plans
- Filter character by hogwarts house
- Optional light and dark mode

## Acknowledgements
A big thanks to everyone who shares feedback and especially to our teacher , **Antonella Morittu** who introduced us to the world of APIs.

## 🤝 How To Contribute
We love community contributions! Here is how you can help improve this project:

1. **Fork** the repository
2. **Clone** the repository
3. **Create** a new branch
```bash 
 git checkout -b improve-feature
```
4. **Make** the appropriate changes and add changes to reflect the changes made
5. **Commit** your changes
```bash 
git commit -am "Improve feature"
```
6. **Push** to your branch
```bash 
git push origin improve-feature
```

7. **Submit** a Pull Request. Click Compare & Pull Request and describe your contribution.

💬 _We will review your PR as soon a possible_ 😊

## 🧙‍♂️ Team
A simple project made for fun by two developers who love magic ✨

✨ [Vlad](https://github.com/Lesstread666)

❤️ [Michelle](https://github.com/themichellesarmiento)
  
  
