import {FunctionComponent} from 'react'
import ThemeProvider from '@/context/themeProvider'
import {Stack} from 'expo-router'

const FavoriteOutfitItemLayout: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Item details',
            headerShown: true,
            headerBackVisible: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}

export default FavoriteOutfitItemLayout
