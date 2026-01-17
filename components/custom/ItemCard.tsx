import {FunctionComponent} from 'react'
import {IItem} from '@/models/IItem'
import {Card} from '@/components/ui/card'
import {HStack} from '@/components/ui/hstack'
import {Image} from '@/components/ui/image'
import {Text} from '@/components/ui/text'
import {Box} from '@/components/ui/box'
import {Button, ButtonIcon} from '@/components/ui/button'
import {AddIcon} from '@/components/ui/icon'
import {useRouter} from 'expo-router'
import {Eye, TrashIcon} from 'lucide-react-native'
import {themeColors} from '@/context/themeProvider'
import {Gesture, GestureDetector} from 'react-native-gesture-handler'
import {Animated} from 'react-native'
import {runOnJS} from 'react-native-reanimated'
import {useContext} from 'react'
import {SelectedItemsContext} from '@/context/SelectedItemsProvider'

interface ItemCardProps {
  item: IItem
  hasAddButton: boolean
  hasViewButton: boolean
  hasDeleteBtn: boolean
  addAction?: (item: IItem) => void
  page?: string
  deleteAction?: (item: IItem) => void
}

const ItemCard: FunctionComponent<ItemCardProps> = props => {
  const {item, hasAddButton, hasViewButton, hasDeleteBtn, addAction, page, deleteAction} = props
  const router = useRouter()
  const {selectedItems} = useContext(SelectedItemsContext)

  const navigateTo = (): void => router.push(`./${page}/${item.id}`)

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => runOnJS(navigateTo)())

  return (
    <Card className="p-5 rounded-lg m-3" style={{backgroundColor: themeColors.card}} key={item.id}>
      <HStack className="justify-between">
        <GestureDetector gesture={doubleTap}>
          <Animated.View>
            {item.image ? (
              <Image size="2xl" source={{uri: item.image}} alt={item.category} />
            ) : (
              <Text className="text-xl align-middle">No image found</Text>
            )}
          </Animated.View>
        </GestureDetector>

        <Box className="justify-center">
          {hasAddButton && (
            <Button
              size="lg"
              className="rounded-l p-8 m-2"
              action="positive"
              isDisabled={selectedItems.some(selectedItem => selectedItem.id === item.id)}
              onPress={() => addAction && addAction(item)}>
              <ButtonIcon as={AddIcon} />
            </Button>
          )}

          {hasViewButton && (
            <Button
              size="lg"
              className="rounded-l p-8 m-2"
              style={{backgroundColor: themeColors.primary}}
              onPress={() => page && item.id && router.push(`./${page}/${item.id}`)}>
              <ButtonIcon as={Eye} />
            </Button>
          )}

          {hasDeleteBtn && (
            <Button
              size="lg"
              className="rounded-l p-8 m-2"
              action="negative"
              onPress={() => deleteAction && deleteAction(item)}>
              <ButtonIcon as={TrashIcon} />
            </Button>
          )}
        </Box>
      </HStack>
    </Card>
  )
}

export default ItemCard
