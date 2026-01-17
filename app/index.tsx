import {VStack} from '@/components/ui/vstack'
import {Center} from '@/components/ui/center'
import {themeColors} from '@/context/themeProvider'
import Tile from '@/components/custom/Tile'
import LottieAnimation from '@/components/custom/LottieAnimation'
import welcome from '@/assets/animations/welcome.json'
import frontAnimation from '@/assets/animations/dressingTransparant150.json'
import shirtAnimation from '@/assets/animations/shirtTransparent100.json'
import heartAnimation from '@/assets/animations/heartTransparent175.json'
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin'
import {useSQLiteContext} from 'expo-sqlite'

export default function Index() {
  const db = useSQLiteContext()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  useDrizzleStudio(db)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themeColors.background,
    },
  })

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <ScrollView>
          <VStack className="mt-10" space="md" reversed={false}>
            <Center>
              <LottieAnimation media={welcome} height={80} />
            </Center>

            <Tile
              text="Take a stroll through your virtual wardrobe and put together a fabulous outfit!"
              linkUrl="dressing"
              linkBtnText="Go to your dressing room">
              <LottieAnimation media={frontAnimation} height={400} />
            </Tile>

            <Tile
              text="Curious about the outfit you have chosen? Or maybe you have no inspiration today and want our outfit generator to make one for you?"
              linkUrl="outfit"
              linkBtnText="Check or generate your outfit">
              <LottieAnimation media={shirtAnimation} />
            </Tile>

            <Tile
              text="Or maybe you prefer an outfit that has already made you look stunning?"
              linkUrl="favorites"
              linkBtnText="Your favorite outfits">
              <LottieAnimation media={heartAnimation} />
            </Tile>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
