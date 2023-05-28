export type RootStackParamList = {
    Dashboard: undefined;
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
  