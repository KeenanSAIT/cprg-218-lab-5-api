// Function to fetch Pokémon data from PokeAPI
async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}
 
// Function to populate dropdown with Pokémon names
async function populateDropdown() {
    const selectElement = document.getElementById("pokemonSelect");
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const data = await response.json();
        data.results.forEach(pokemon => {
            const option = document.createElement("option");
            option.value = pokemon.name;
            option.textContent = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            selectElement.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching Pokémon list:', error);
    }
}
 
// Function to display Pokémon details
async function displayPokemonDetails(pokemonName) {
    const pokemonDetailsDiv = document.getElementById("pokemonDetails");
    pokemonDetailsDiv.style.display = "block";
    const data = await fetchPokemonData(pokemonName);
    if (data) {
        document.getElementById("pokemonName").textContent = data.name.toUpperCase();
        document.getElementById("pokemonHeight").textContent = data.height;
        document.getElementById("pokemonWeight").textContent = data.weight;
        const abilities = data.abilities.map(ability => ability.ability.name).join(", ");
        document.getElementById("pokemonAbilities").textContent = abilities;
    } else {
        // Clear the details if there's an error or no data
        document.getElementById("pokemonName").textContent = "";
        document.getElementById("pokemonHeight").textContent = "";
        document.getElementById("pokemonWeight").textContent = "";
        document.getElementById("pokemonAbilities").textContent = "";
    }
}
 
// Event listener for dropdown change
document.getElementById("pokemonSelect").addEventListener("change", function() {
    const selectedPokemon = this.value;
    if (selectedPokemon) {
        displayPokemonDetails(selectedPokemon);
    } else {
        // Hide details if no Pokémon is selected
        document.getElementById("pokemonDetails").style.display = "none";
    }
});
 
// Populate dropdown when the page loads
populateDropdown();