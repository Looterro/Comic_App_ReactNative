import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";

import { Comic } from "../constants/types";

interface ComicItemProps {
    comic: Comic;
    onPress: (comic: Comic) => void;
}

// Component that renders a comic description and thumbnail image in a list cell in DashboardScreen
const ComicItem: React.FC<ComicItemProps> = ({ comic, onPress }) => {

    return (
        <View>

            <TouchableOpacity onPress={() => onPress(comic)} style={styles.comicItem}>

                <Image source={{ uri: comic.img }} style={styles.thumbnail} />
                <Text style={styles.title}> {comic.title} </Text>

            </TouchableOpacity>

            <View style={styles.divider} />
            
        </View>
    );

};

const styles = StyleSheet.create({

    comicItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    thumbnail: {
        width: 60,
        height: 0,
        aspectRatio: 1,
        marginRight: 12,
        resizeMode: 'contain',
    },
        title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
        divider: {
        height: 1,
        backgroundColor: '#ffffff',
        marginVertical: 8,
    },

});

export default ComicItem;