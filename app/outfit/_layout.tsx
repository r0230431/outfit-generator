import {FunctionComponent} from 'react'
import ThemeProvider from '@/context/themeProvider'
import {Stack} from 'expo-router'

const OutfitPageLayout: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'My outfit',
            headerShown: true,
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="[itemId]"
          options={{
            title: 'Item Details',
            headerShown: true,
            headerBackVisible: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}

export default OutfitPageLayout
