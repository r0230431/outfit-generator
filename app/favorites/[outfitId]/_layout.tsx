import {FunctionComponent} from 'react'
import ThemeProvider from '@/context/themeProvider'
import {Stack} from 'expo-router'

const FavoriteOutfitLayout: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Outfit items',
            headerShown: true,
            headerBackVisible: true,
          }}
        />
        <Stack.Screen
          name="[itemId]"
          options={{
            title: 'Item details',
            headerShown: false,
            headerBackVisible: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}

export default FavoriteOutfitLayout
