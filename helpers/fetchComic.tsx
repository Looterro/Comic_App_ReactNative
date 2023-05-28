import { Comic, ComicSource } from "../constants/types";

//Separate component to fetch the comic data from the API URL
export const fetchComic = async (comicNum: number, source: ComicSource) => {

    let apiUrl = '';

    // Set the API URL based on the selected source
    if (source === 'xkcd') {
            
            apiUrl = `https://xkcd.com/${comicNum}/info.0.json`;
    
    //Additional sources can be added here with another else if statements
    // } else if (source === 'another_source') {
        // apiUrl = `https://api.replacethislink.com/comics/${comicNum}`;

    }

    // Fetch the comic data from the API URL
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data as Comic;

}