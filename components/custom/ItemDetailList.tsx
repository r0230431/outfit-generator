import {FunctionComponent} from 'react'
import {IItem} from '@/models/IItem'
import {VStack} from '@/components/ui/vstack'
import {Text} from '@/components/ui/text'
import {HStack} from '@/components/ui/hstack'
import {Box} from '@/components/ui/box'
import {Divider} from '@/components/ui/divider'
import {themeColors} from '@/context/themeProvider'
import {StyleSheet, View} from 'react-native'
import {ImageZoom} from '@likashefqet/react-native-image-zoom'

interface ItemDetailListProps {
  item: IItem
}

const ItemDetailList: FunctionComponent<ItemDetailListProps> = ({item}) => {
  const i = Object.keys(item).length

  return (
    <VStack style={styles.border} className="rounded-lg m-1 p-8">
      {item.image ? (
        <View>
          <ImageZoom
            uri={item.image}
            alt={item.category}
            style={styles.image}
            resizeMode="cover"
            minScale={1}
            maxScale={2}
            doubleTapScale={2}
            isPanEnabled={false}
            isDoubleTapEnabled={true}
            isPinchEnabled={true}
          />
        </View>
      ) : (
        <Text className="align-middle mx-auto font-bold text-xl">No image found</Text>
      )}

      <VStack className="mt-10">
        {Object.entries(item).map(
          ([key, value], index) =>
            key !== 'id' &&
            key !== 'image' &&
            key !== 'isSelectedForOutfit' && (
              <VStack key={index}>
                <HStack space="md" className="py-3">
                  <Box className="w-25">
                    {key === 'clothingSize' && (
                      <Text className="font-bold" style={{color: themeColors.primary}}>{`${key.slice(8)}:`}</Text>
                    )}
                    {key === 'subCategory' && (
                      <Text className="font-bold" style={{color: themeColors.primary}}>
                        Subcategory:
                      </Text>
                    )}
                    {key === 'itemType' && (
                      <Text className="font-bold" style={{color: themeColors.primary}}>
                        Type:
                      </Text>
                    )}
                    {key === 'itemSize' && (
                      <Text className="font-bold" style={{color: themeColors.primary}}>
                        Size:
                      </Text>
                    )}
                    {key !== 'clothingSize' && key !== 'subCategory' && key !== 'itemSize' && key !== 'itemType' && (
                      <Text
                        className="font-bold"
                        style={{color: themeColors.primary}}>{`${key.charAt(0).toUpperCase()}${key.slice(1)}:`}</Text>
                    )}
                  </Box>
                  <Box className="w-60">{value !== undefined ? <Text>{value}</Text> : <Text>/</Text>}</Box>
                </HStack>
                {index < i - 1 && <Divider className="my-2" />}
              </VStack>
            ),
        )}
      </VStack>
    </VStack>
  )
}

const styles = StyleSheet.create({
  border: {
    borderColor: themeColors.primary,
    borderWidth: 3,
  },
  image: {
    width: 256,
    height: 256,
    borderRadius: 12,
    alignSelf: 'center',
    zIndex: 1,
  },
})

export default ItemDetailList
