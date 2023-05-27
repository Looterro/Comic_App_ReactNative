import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MainNavigator from './navigation/MainNavigator';

// set up react-query client for caching and fetching data from the API
const queryClient = new QueryClient();

export default function App() {

  return (
    
    <QueryClientProvider client={queryClient}>

      <MainNavigator />

    </QueryClientProvider>

  );

}
