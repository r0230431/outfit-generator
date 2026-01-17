import {FunctionComponent, PropsWithChildren} from 'react'
import {useColorScheme} from 'react-native'
import {StatusBar} from 'expo-status-bar'
import {DefaultTheme, ThemeProvider as NavigationThemeProvider} from '@react-navigation/native'
import '../global.css'
import {GluestackUIProvider} from '@/components/ui/gluestack-ui-provider'
import colors from 'tailwindcss/colors'

interface Colors {
  primary: string
  background: string
  card: string
  text: string
  border: string
  notification: string
}

export const themeColors: Colors = {
  primary: '#c08081',
  background: '#f4f1eb',
  card: '#2b2926',
  text: '#2b2926',
  border: '#2b2926',
  notification: '#7f1d1d',
}

interface Theme {
  dark: boolean
  colors: Colors
}

const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#c08081',
    background: colors.black,
    card: colors.neutral[950],
    text: colors.neutral[300],
    border: colors.neutral[500],
    notification: colors.neutral[700],
  },
}

const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#c08081',
    background: colors.neutral[50],
    card: colors.neutral[100],
    text: colors.neutral[800],
    border: colors.neutral[500],
    notification: colors.neutral[700],
  },
}

const ThemeProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const isDark = useColorScheme() === 'dark'
  const activeTheme = isDark ? darkTheme : lightTheme

  return (
    <GluestackUIProvider>
      <NavigationThemeProvider value={{...DefaultTheme, ...activeTheme}}>
        <StatusBar style="auto" backgroundColor={activeTheme.colors.card} />
        {children}
      </NavigationThemeProvider>
    </GluestackUIProvider>
  )
}

export default ThemeProvider
