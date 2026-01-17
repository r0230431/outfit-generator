import {FunctionComponent, useState} from 'react'
import {Card} from '@/components/ui/card'
import {HStack} from '@/components/ui/hstack'
import {Text} from '@/components/ui/text'
import {Box} from '@/components/ui/box'
import {Button, ButtonIcon} from '@/components/ui/button'
import {router} from 'expo-router'
import {Eye, TrashIcon} from 'lucide-react-native'
import {FontAwesome} from '@expo/vector-icons'
import {Heading} from '@/components/ui/heading'
import {IFavoriteOutfit} from '@/models/IFavoriteOutfit'
import {themeColors} from '@/context/themeProvider'
import ModalWrapper from '@/components/custom/ModalWrapper'
import {View} from 'react-native'
import {useDeleteFavoriteOutfit} from '@/db/dbAPI'

interface FavoriteOutfitCardProps {
  outfit: IFavoriteOutfit
}

const FavoriteOutfitCard: FunctionComponent<FavoriteOutfitCardProps> = ({outfit}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const id: number = outfit.id as number
  const {mutate: deleteFavoriteOutfit} = useDeleteFavoriteOutfit()

  const deleteFromFavoriteOutfits: () => void = () => {
    deleteFavoriteOutfit({id})
    setShowDeleteModal(false)
  }

  return (
    <View>
      <Card className="p-5 rounded-lg m-3" style={{backgroundColor: themeColors.text}}>
        <HStack className="items-center justify-between rounded-lg" space="md">
          <FontAwesome name="heart" size={40} color={themeColors.primary} />
          <Box className="w-[50%]">
            <Heading className="text-rose-100">{outfit.name}</Heading>
            <Text className="text-white">{outfit.description}</Text>
          </Box>
          <Box className="justify-center">
            <HStack>
              <Button
                size="lg"
                className="rounded-l p-4 m-2"
                action="negative"
                onPress={() => setShowDeleteModal(true)}>
                <ButtonIcon as={TrashIcon} />
              </Button>
              <Button
                size="lg"
                className="rounded-l p-4 m-2"
                style={{backgroundColor: themeColors.primary}}
                onPress={() => router.push(`/favorites/${outfit.id}`)}>
                <ButtonIcon as={Eye} />
              </Button>
            </HStack>
          </Box>
        </HStack>
      </Card>

      <ModalWrapper
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        heading="Delete favorite outfit"
        okBtnText="Delete"
        onOk={() => deleteFromFavoriteOutfits()}>
        <Text>Are you sure you want to delete this favorite outfit?</Text>
      </ModalWrapper>
    </View>
  )
}

export default FavoriteOutfitCard
