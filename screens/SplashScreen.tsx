import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing, Dimensions } from "react-native";

// Animated Splash Screen that changes logo position upwards and scales the text up
const SplashScreen: React.FC = () => {

    // Create animated values for scaling and position change
    const scaleAnim = useRef( new Animated.Value(0.9) ).current;
    const positionAnim = useRef( new Animated.Value(0) ).current;

    // Get the height of the screen
    const screenHeight = Dimensions.get('window').height;

    useEffect(() => {

        // Define scale animation configuration
        const scaleAnimation = Animated.timing(scaleAnim, {
            toValue: 1.1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        // Define position animation configuration
        const positionAnimation = Animated.timing(positionAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        // Run the scale and position animations in parallel
        Animated.parallel([scaleAnimation, positionAnimation]).start();

        // A timer for handling splash screen disappearance
        const timer = setTimeout(() => {}, 3000);

        return () => {
            
            clearTimeout(timer);
            scaleAnim.stopAnimation();
            positionAnim.stopAnimation();

        };

    }, []);

    // Combined style for scaling and translating the text container
    const scaleAndTranslateStyle = {

        transform: [
            {
                // Scale the text container
                scale: scaleAnim.interpolate({
                    inputRange: [0.9, 1.1],
                    outputRange: [1, 1.2],
                    // Extrapolate the values to prevent the text from shrinking or growing too much
                    extrapolate: 'clamp',
                }),
            },
            {
                // Translate the text container upwards
                translateY: positionAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [screenHeight * 0.1, 0],
                }),
            },
        ],
        opacity: scaleAnim,

    }

    // Style for scaling the text
    const scaleStyle = {

        transform: [
            {
                scale: scaleAnim.interpolate({
                    inputRange: [0.9, 1.1],
                    outputRange: [1, 1.2],
                    extrapolate: 'clamp',
                }),
            },
        ],

    }

    return (
        
        <View style={styles.container}>

            <Animated.View style={[styles.textContainer, scaleAndTranslateStyle]}>

                <Animated.Text style={[styles.text, scaleStyle]}>Comic App</Animated.Text>

            </Animated.View>

        </View>

    );

};

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
    },
    textContainer: {
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 48,
      maxWidth: '80%',
      textAlign: 'center',
    },
  
  });

export default SplashScreen;