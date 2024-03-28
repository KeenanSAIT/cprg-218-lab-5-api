//scripts files
/**

* Fetch list of pokemon names and urls.

*/

async function fetchnews() {

    try {
    
    // Get a list of news
    
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=150');
    
    const data = await response.json();
    
    return data.results;
    
    //Error handling
    
    } catch (error) {
    
    console.log(error);
    
    }
    
    fetchnews().then((results) => console.log(results))
    }