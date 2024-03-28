// Function to fetch Pokémon data from the PokeAPI
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const pokemonData = await response.json();
        return pokemonData;
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
}
 
// Function to display Pokémon details in a card
async function displayPokemonDetails(pokemonName, cardId) {
    const pokemonData = await fetchPokemonData(pokemonName);
    // Display Pokémon details in the specified card
    const card = document.getElementById(cardId);
    card.querySelector('h3').textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
    card.querySelector('img').src = pokemonData.sprites.front_default;
    card.querySelector('img').alt = pokemonData.name;
    card.querySelector('p:nth-of-type(1) span').textContent = pokemonData.height;
    card.querySelector('p:nth-of-type(2) span').textContent = pokemonData.weight;
}
 
// Populate the dropdown menu with Pokémon names for each card
async function populateDropdowns() {
    const dropdowns = document.querySelectorAll('.pokemon-select');
    dropdowns.forEach(async dropdown => {
        // Fetch a list of Pokémon
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
        const data = await response.json();
        const pokemons = data.results;
        // Populate the dropdown with Pokémon names
        pokemons.forEach(pokemon => {
            const option = document.createElement('option');
            option.value = pokemon.name;
            option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // Capitalize first letter
            dropdown.appendChild(option);
        });
    });
}
 
// Add event listener to the dropdown menus to display Pokémon details when selected
document.querySelectorAll('.pokemon-select').forEach(dropdown => {
    dropdown.addEventListener('change', function() {
        const selectedPokemon = this.value;
        if (!selectedPokemon) return; // If no Pokémon selected, do nothing
        const cardId = this.dataset.card;
        displayPokemonDetails(selectedPokemon, cardId);
    });
});
 
// Populate the dropdown menus when the page loads
populateDropdowns();