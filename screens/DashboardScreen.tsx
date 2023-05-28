import React, { useState } from "react";
import { Text, View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from "react-native";
import { useQuery } from "react-query";

import { Comic, ComicSource } from "../constants/types";
import { fetchComic } from "../helpers/fetchComic";

const DashboardScreen: React.FC = () => {

    // Use state to keep track of the selected source and the list of comics
    const [selectedSource, setSelectedSource] = useState<ComicSource>('xkcd');
    const [comics, setComics] = useState<Comic[]>([]);

    // Fetch the latest comic data using react-query
    const { data: latestComicData, isLoading: isLatestComicLoading, isError: isLatestComicError } = useQuery(
        // Use a unique key for this query to ensure it is re-run when the source changes
        // since the latest comic number will change
        'latestComic',
        async () => {

            if(selectedSource === 'xkcd') {

                const response = await fetch('https://xkcd.com/info.0.json');
                const data = await response.json();
                return data;

            //Additional sources can be added here with another else if statements
            // } else if (selectedSource === 'another_source') {

            //     const response = await fetch('https://api.replacethislink.com/comics/latest');
            //     const data = await response.json();
            //     return data;

            }

        }
    );

    // Fetch the list of comics based on the selected source and latest comic data using react-query
    const { isLoading, isError } = useQuery(
        // Use a unique key for this query to ensure it is re-run when the source changes
        ['comics', selectedSource],
        async () => {

            // Get the latest comic number from the latest comic data
            const latestComicNum = latestComicData?.num;
            // Create an empty array to store the initial list of comics
            const initalComics: Comic[] = [];
            // Load up to 10 comics initally or less if there are less than 10
            const numToLoad = Math.min(latestComicNum + 1, 10);

            // Fetch the latest comic first so it's available when the user navigates to the comic detail screen
            for (let i = latestComicNum; i >= latestComicNum - numToLoad; i--) {

                // Fetch the comic data from the API URL and add it to the list of comics
                const comic = await fetchComic(i, selectedSource);
                initalComics.push(comic);

            }

            return initalComics;

        },
        // Enable the query when the latest comic data is available
        {
            enabled: Boolean(latestComicData),
            onSuccess: (data) => {
                setComics(data);
            },
        }
    );

    // Handle when the user scroll to the end of the list to load more comics
    const handleLoadMore = async () => {

        // Only load more comics if the latest comic has not been reached
        if (!isLoading && comics.length < latestComicData?.num + 1) {

            try {

                // Fetch the next page of comics
                const nextPageComicNum = comics[comics.length - 1].num - 1;
                const comic = await fetchComic(nextPageComicNum, selectedSource);
                
                // Add the new comics to the existing list of comics
                setComics((prevComics) => [...prevComics, comic]);

            } catch (error) {

                console.log('Error loading more comics:', error);

            }

        }

    };

    // Handle loading new comics when the user selects a different source
    const handleSourceChange = async (source: ComicSource) => {

        // Pass if the selected source is the same as the current source
        if (source === selectedSource) return;

        // Set the selected source and reset the list of comics
        setSelectedSource(source);
        setComics([]);

    };

    // Show the loading indicator if the latest comic or next comics are loading
    if (isLatestComicLoading || isLoading) {

        return (

            <View style={styles.containerLoad}>
                <ActivityIndicator size="large" color="gray" />
            </View>

        );

    }

    // Show the error message if there is an error loading the latest comic or next comics
    if (isLatestComicError || isError) {

        return (

            <View style={styles.container}>
                <Text>Error fetching comics</Text>
            </View>

        );

    }


    return (

        <View style={styles.container}>

            {/* Source selection */}
            <View style={styles.sourceContainer}>

                <Text style={styles.sourceText}>Source: </Text>
                
                <Text style={styles.sourceText}> xkcd </Text>
                {/* Additional source buttons as needed */}

            </View>

            {/* List of comics */}
            <FlatList
                data={comics}
                keyExtractor={(item) => item.num.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={20}
                // Use getItemLayout to improve performance by skipping measurement of dynamic content
                getItemLayout={(_, index) => ({
                    length: 92,
                    offset: 92 * index,
                    index,
                })}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                      <Text>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>

    );

};

const styles = StyleSheet.create({

    container: {
      flex: 1,
      padding: 16,
      borderRadius: 5,
    },
    containerLoad: {
      flex: 1,
      padding: 16,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sourceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'black',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 5,
      marginBottom: 16,
    },
    sourceText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      paddingRight: 8,
    },
  
  });

export default DashboardScreen;