// Root paths for the app
export type RootStackParamList = {
    // Route name: 'Dashboard' with no parameters
    Dashboard: undefined;
    // Route name: 'ComicDetail' with a parameter 'comic' of type Comic
    ComicDetail: { comic: Comic };
};

// Define the ComicSource type, ability to add more sources
export type ComicSource = 'xkcd' | 'another_source';

// Define the Comic type from xkcd.com API
export interface Comic {

    month: string;
    num: number;
    link: string;
    year: string;
    news: string;
    safe_title: string;
    transcript: string;
    alt: string;
    img: string;
    title: string;
    day: string;
    
}
  