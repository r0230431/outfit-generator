import {FunctionComponent} from 'react'
import {View} from 'react-native'
import CameraUI from '@/components/custom/CameraUI'

const CameraScreen: FunctionComponent = () => {
  return (
    <View style={{flex: 1}}>
      <CameraUI />
    </View>
  )
}

export default CameraScreen
