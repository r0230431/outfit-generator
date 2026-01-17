import {FunctionComponent} from 'react'
import ThemeProvider from '@/context/themeProvider'
import {Stack} from 'expo-router'

const FavoritesPageLayout: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'My favorite outfits',
            headerShown: true,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="[outfitId]"
          options={{
            title: 'Outfit items',
            headerShown: false,
            headerBackVisible: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}

export default FavoritesPageLayout
