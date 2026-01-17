import {FunctionComponent, useRef} from 'react'
import {View, StyleSheet} from 'react-native'
import LottieView, {LottieViewProps} from 'lottie-react-native'
import {Text} from '@/components/ui/text'

interface LottieAnimationProps {
  media: LottieViewProps['source']
  width?: number
  height?: number
}

const LottieAnimation: FunctionComponent<LottieAnimationProps> = props => {
  const animation = useRef<LottieView>(null)
  const {media, width, height} = props

  return (
    <View style={styles.animationContainer}>
      <Text>
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={{
            width: width ?? 700,
            height: height ?? 250,
            backgroundColor: '#f4f1eb',
          }}
          source={media}
        />
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})

export default LottieAnimation
