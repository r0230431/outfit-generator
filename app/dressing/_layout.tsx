import {FunctionComponent} from 'react'
import ThemeProvider from '@/context/themeProvider'
import {Stack} from 'expo-router'

const DressingPageLayout: FunctionComponent = () => {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'My virtual dressing room',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="[itemId]"
          options={{
            title: 'Item Details',
            headerBackVisible: true,
          }}
        />
        <Stack.Screen
          name="inputForm"
          options={{
            title: 'Add or edit item',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="cameraScreen"
          options={{
            title: 'Take a picture from your item!',
            headerBackVisible: true,
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}

export default DressingPageLayout
