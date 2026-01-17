import {FunctionComponent} from 'react'
import {Box} from '@/components/ui/box'
import {Text} from '@/components/ui/text'
import {VStack} from '@/components/ui/vstack'
import {IOutfit} from '@/models/IOutfit'
import ItemCard from '@/components/custom/ItemCard'

interface OutfitDetailListProps {
  outfit: IOutfit | undefined
  hasDeleteButton: boolean
}

const OutfitDetailList: FunctionComponent<OutfitDetailListProps> = ({outfit, hasDeleteButton}) => {
  const outfitItems = [
    outfit?.topOver,
    outfit?.topUnder,
    outfit?.bottom,
    outfit?.fullBody,
    outfit?.shoes,
    outfit?.outerwear,
    outfit?.accessory,
  ]
  const deleteFromOutfit: () => void = () => {}

  return (
    <Box className="justify-center">
      {outfitItems.every(item => !item) ? (
        <Text className="text-center text-xl">No items added to your outfit yet</Text>
      ) : (
        <VStack>
          {outfitItems.map(
            (item, index) =>
              item && (
                <ItemCard
                  key={index}
                  item={item}
                  hasAddButton={false}
                  hasViewButton={true}
                  hasDeleteBtn={hasDeleteButton}
                  page="outfit"
                  deleteAction={() => () => deleteFromOutfit()}
                />
              ),
          )}
        </VStack>
      )}
    </Box>
  )
}

export default OutfitDetailList
