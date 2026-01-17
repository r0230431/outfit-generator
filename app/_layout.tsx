import {Tabs} from 'expo-router'
import '@/global.css'
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import ThemeProvider from '@/context/themeProvider'
import InputFormContextProvider from '@/context/inputFormContext'
import OutfitContextProvider from '@/context/outfitContext'
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import {Suspense} from 'react'
import {ActivityIndicator} from 'react-native'
import {SQLiteProvider} from 'expo-sqlite'
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator'
import migrations from '@/drizzle/migrations'
import {drizzleDb} from '@/db/database'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import SelectedItemsProvider from '@/context/SelectedItemsProvider'
import FilterContextProvider from '@/context/FilterContextProvider'
import ShowCameraContextProvider from '@/context/ShowCameraContextProvider'

export const DATABASE_NAME = 'outfitgenerator'

export default function RootLayout() {
  const {success, error} = useMigrations(drizzleDb, migrations)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: !__DEV__,
        staleTime: Infinity,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <SQLiteProvider databaseName={DATABASE_NAME} options={{enableChangeListener: true}} useSuspense>
          <ThemeProvider>
            <GestureHandlerRootView style={{flex: 1}}>
              <ShowCameraContextProvider>
                <FilterContextProvider>
                  <InputFormContextProvider>
                    <SelectedItemsProvider>
                      <OutfitContextProvider>
                        <Tabs>
                          <Tabs.Screen
                            name="index"
                            options={{
                              title: 'Home',
                              tabBarIcon: ({color, size}) => <FontAwesome name="home" size={size} color={color} />,
                            }}
                          />
                          <Tabs.Screen
                            name="dressing"
                            options={{
                              title: 'My virtual dressing room',
                              headerShown: false,
                              tabBarLabel: 'Dressing',
                              tabBarIcon: ({color, size}) => (
                                <MaterialCommunityIcons name="hanger" size={size} color={color} />
                              ),
                            }}
                          />
                          <Tabs.Screen
                            name="outfit"
                            options={{
                              title: 'My outfit',
                              headerShown: false,
                              tabBarLabel: 'Outfit',
                              tabBarIcon: ({color, size}) => <Ionicons name="shirt" size={size} color={color} />,
                            }}
                          />
                          <Tabs.Screen
                            name="favorites"
                            options={{
                              title: 'My favorite outfits',
                              headerShown: false,
                              tabBarLabel: 'Favorites',
                              tabBarIcon: ({color, size}) => <FontAwesome name="heart" size={size} color={color} />,
                            }}
                          />
                        </Tabs>
                      </OutfitContextProvider>
                    </SelectedItemsProvider>
                  </InputFormContextProvider>
                </FilterContextProvider>
              </ShowCameraContextProvider>
            </GestureHandlerRootView>
          </ThemeProvider>
        </SQLiteProvider>
      </Suspense>
    </QueryClientProvider>
  )
}
