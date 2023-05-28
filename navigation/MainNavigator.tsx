import React, { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import SplashScreen from "../screens/SplashScreen";
import DashboardScreen from "../screens/DashboardScreen";
import ComicDetailScreen from "../screens/ComicDetailScreen";
import { RootStackParamList } from "../constants/types";

// Create a stack navigator for the app screens. 
// RootStackParamList is a type that defines the screens and their parameters
const Stack = createStackNavigator<RootStackParamList>();

// Define the MainNavigator component that allows the user to navigate between the screens
const MainNavigator = () => {

    // State to control the visibility of the splash screen
    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {

        // Set a timer to hide the splash screen after 3 seconds
        const timer = setTimeout(() => {
            setIsSplashVisible(false);
        }, 3000);

        // Clear the timer when the component unmounts
        return () => clearTimeout(timer);

    }, []);

    // Set the parameters of the navigator bar for customized styling
    const screenOptions: StackNavigationOptions = {

        headerTitleStyle: {
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
        },
        headerStyle: {
            backgroundColor: "black",
        },
    };

    return (

        <>
            {isSplashVisible ? (

                // Show the splash screen if it is visible
                <SplashScreen />

            ) : (

                <NavigationContainer>

                    <Stack.Navigator screenOptions={screenOptions}>

                        {/* The main dashboard screen */}
                        <Stack.Screen 
                            name="Dashboard" 
                            component={DashboardScreen} 
                            options={{ title: "Comic App" }}
                        />

                        {/* The detail comic screen */}
                        <Stack.Screen 
                            name="ComicDetail" 
                            component={ComicDetailScreen}
                            options={({ route }) => ({
                                // Set the title of the ComicDetail screen based on the selected comic
                                title: route.params.comic.title + ' Detail',
                            })}
                        />

                    </Stack.Navigator>

                </NavigationContainer>
            )}
        </>

    );

};

export default MainNavigator;