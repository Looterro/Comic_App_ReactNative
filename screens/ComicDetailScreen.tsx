import React from "react";
import { Text, Image, StyleSheet, ScrollView } from "react-native";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../constants/types";

//  Define types for the route for the route and navigation props
type ComicDetailScreenRouteProp = RouteProp<RootStackParamList, 'ComicDetail'>;
type ComicDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ComicDetail'>;

// Define the props for the ComicDetailScreen
type ComicDetailScreenProps = {
    route: ComicDetailScreenRouteProp;
    navigation: ComicDetailScreenNavigationProp;
};

// Define the ComicDetailScreen component
const ComicDetailScreen: React.FC<ComicDetailScreenProps> = ({ route, navigation }) => {

    // Extract the comic object from the route params
    const { comic } = route.params;

    React.useLayoutEffect(() => {

        // Set navigation option for the upper title bar
        navigation.setOptions({
            title: comic.title + ' Detail',
            headerStyle: {
                backgroundColor: "black",
            },
            headerTitleStyle: {
                color: "white",
            },
            headerTintColor: "white",
        });

    }, [navigation, comic]);

    // Function to remove HTML tags from a string
    const removeHTMLTags = (html: string) => {

        return html.replace(/<[^>]*>?/gm, '');

    };

    return (
        
        <ScrollView contentContainerStyle={styles.container}>
            
            <Image source={{ uri: comic.img }} style={styles.image} resizeMode="contain" />

            <Text style={styles.title}>{comic.title}</Text>
            <Text style={styles.subtitle}>Number: {comic.num}</Text>

            {/* Render date if available */}
            {comic.day && comic.month && comic.year && (
                <Text style={styles.text}>Date: {comic.day}/{comic.month}/{comic.year}</Text>
            )}

            {/* Render news if available */}
            {comic.news && <Text style={styles.text}>News: {removeHTMLTags(comic.news)}</Text>}

            {/* Render transcript if available */}
            {comic.transcript && <Text style={styles.text}>Transcript: {removeHTMLTags(comic.transcript)}</Text>}

        </ScrollView>

    );

};

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
        backgroundColor: 'white',
    },
    image: {
        width: 300,
        height: 400,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 8,
        color: 'gray',
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        color: 'gray',
    },
  
});
  
export default ComicDetailScreen;