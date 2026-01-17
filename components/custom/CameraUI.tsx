import {FunctionComponent, useContext, useEffect, useRef, useState} from 'react'
import {Camera, useCameraDevice, useCameraPermission} from 'react-native-vision-camera'
import {Text, TouchableOpacity, View, StyleSheet, Modal} from 'react-native'
import ModalWrapper from '@/components/custom/ModalWrapper'
import {MaterialIcons} from '@expo/vector-icons'
import {themeColors} from '@/context/themeProvider'
import * as MediaLibrary from 'expo-media-library'
import {InputFormContext} from '@/context/inputFormContext'
import {useNavigation} from 'expo-router'
import {ShowCameraContext} from '@/context/ShowCameraContextProvider'

const CameraUI: FunctionComponent = () => {
  const {hasPermission: hasCameraPermission, requestPermission: requestCameraPermission} = useCameraPermission()
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions()
  const {showCamera, setShowCamera} = useContext(ShowCameraContext)
  const [facing, setFacing] = useState<'front' | 'back'>('back')
  const device = useCameraDevice(facing)
  const cameraRef = useRef<Camera>(null)
  const {object, setObject} = useContext(InputFormContext)
  const [showCameraPermissionModal, setShowCameraPermissionModal] = useState(true)
  const navigate = useNavigation()

  useEffect(() => {
    void requestCameraPermission()
    void requestMediaPermission()
  }, [requestCameraPermission, requestMediaPermission])

  if (!hasCameraPermission) {
    return (
      <ModalWrapper
        heading="Camera Permission"
        isOpen={showCameraPermissionModal}
        onClose={() => setShowCameraPermissionModal(false)}
        onOk={async () => {
          await requestCameraPermission()
          setShowCameraPermissionModal(false)
        }}>
        <Text>We need your permission to show the camera</Text>
      </ModalWrapper>
    )
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'))
  }

  const takePicture = async () => {
    if (!cameraRef.current) return
    const photo = await cameraRef.current?.takePhoto()

    if (photo) {
      const asset = await MediaLibrary.createAssetAsync(photo.path)
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id)
      const itemPhoto = assetInfo.localUri
      setObject(object, 'image', itemPhoto)
      setShowCamera(false)
      navigate.goBack()
    }
  }

  return (
    <Modal>
      <Camera device={device!} ref={cameraRef} isActive={showCamera} style={styles.absoluteFill} photo />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <MaterialIcons name="flip-camera-ios" size={36} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePicture}>
          <MaterialIcons name="photo-camera" size={36} color="black" />
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    marginBottom: 30,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: themeColors.primary,
  },
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
})

export default CameraUI
