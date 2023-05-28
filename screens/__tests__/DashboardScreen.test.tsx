import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from 'react-query';

import DashboardScreen from "../DashboardScreen";

// Mock react-navigation to test the DashboardScreen component
describe("DashboardScreen", () => {

    // Create a QueryClient instance
    const queryClient = new QueryClient();

    // Cleanup the component after each test to prevent memory leaks
    afterEach(() => {
        cleanup();
        queryClient.clear();
    });

    it('should render the dashboard screen', () => {

        // Render the DashboardScreen component within a NavigationContainer and QueryClientProvider
        const { getByTestId } = render(

            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <DashboardScreen />
                </NavigationContainer>
            </QueryClientProvider>

        );

        // Get the acitivty indicator element by its testID
        const activityIndicator = getByTestId("activity-indicator");

        // Assert that the activity indicator element is defined
        expect(activityIndicator).toBeDefined();

    });

});