import {FunctionComponent, PropsWithChildren} from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {SafeAreaView, ScrollView} from 'react-native'
import {themeColors} from '@/context/themeProvider'

const PageSetup: FunctionComponent<PropsWithChildren> = ({children}) => {
  return (
    <SafeAreaProvider style={{backgroundColor: themeColors.background}}>
      <SafeAreaView>
        <ScrollView>{children}</ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default PageSetup
