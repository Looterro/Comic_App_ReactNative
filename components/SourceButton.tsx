import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ComicSource } from "../constants/types";


interface SourceButtonProps {
    source: ComicSource;
    selectedSource: ComicSource;
    onPress: (source: ComicSource) => void;
}

// Component that renders a source button in the source selection bar in DashboardScreen
const SourceButton: React.FC<SourceButtonProps> = ({ source, selectedSource, onPress }) => {

    return (

        <TouchableOpacity
            onPress = {() => onPress(source)}
            style = {selectedSource === source ? styles.selectedSourceButton : styles.sourceButton}
        >

            <Text style={styles.sourceText}>{source}</Text>

        </TouchableOpacity>

    );

};

const styles = StyleSheet.create({

    sourceButton: {
        paddingVertical: 4,
        paddingHorizontal: 1,
    },
    selectedSourceButton: {
    paddingVertical: 4,
    paddingHorizontal: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    alignSelf: 'flex-start',
    },
    sourceText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 0,
    },
      
}); 
    
export default SourceButton;