import {FunctionComponent, useContext, useEffect, useState} from 'react'
import PageSetup from '@/components/custom/PageSetup'
import {VStack} from '@/components/ui/vstack'
import {Text} from '@/components/ui/text'
import {Button, ButtonText} from '@/components/ui/button'
import {HeartIcon, TrashIcon} from 'lucide-react-native'
import {Icon} from '@/components/ui/icon'
import {HStack} from '@/components/ui/hstack'
import {SimpleLineIcons} from '@expo/vector-icons'
import ModalWrapper from '@/components/custom/ModalWrapper'
import {OutfitContext} from '@/context/outfitContext'
import FormInput from '@/components/custom/FormInput'
import {IFavoriteOutfit} from '@/models/IFavoriteOutfit'
import {IOutfit} from '@/models/IOutfit'
import TextAreaInputControl from '@/components/custom/TextAreaInputControl'
import {getRandomOutfit} from '@/utils/utils'
import {IItem} from '@/models/IItem'
import {Box} from '@/components/ui/box'
import ItemCard from '@/components/custom/ItemCard'
import {Category} from '@/models/enum/Category'
import {SubCategory} from '@/models/enum/SubCategory'
import {themeColors} from '@/context/themeProvider'
import {SelectedItemsContext} from '@/context/SelectedItemsProvider'
import {useCreateFavoriteOutfit} from '@/db/dbAPI'

const OutfitPage: FunctionComponent = () => {
  const {outfit, setOutfit} = useContext(OutfitContext)
  const {setSelectedItems} = useContext(SelectedItemsContext)
  const {mutate: createFavoriteOutfit} = useCreateFavoriteOutfit()
  const [outfitItems, setOutfitItems] = useState<IItem[]>([])
  const [selectedOutfitItem, setSelectedOutfitItem] = useState<IItem | undefined>(undefined)
  const [showFavoritesModal, setShowFavoritesModal] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [isAddToFavoritesDisabled, setIsAddToFavoritesDisabled] = useState<boolean>(false)
  const [favoriteOutfit, setFavoriteOutfit] = useState<IFavoriteOutfit>({
    name: '',
    description: '',
    outfit: {} as IOutfit,
  })

  useEffect(() => {
    const isAllNotDefined = Object.values(outfit).every(value => value === undefined)
    setIsAddToFavoritesDisabled(isAllNotDefined)
    if (outfit) {
      const outfitItems = [
        outfit?.topOver,
        outfit?.topUnder,
        outfit?.bottom,
        outfit?.fullBody,
        outfit?.shoes,
        outfit?.outerwear,
        outfit?.accessory,
      ].filter(item => item !== undefined) as IItem[]
      setOutfitItems(outfitItems)
    }
  }, [outfit])

  const trashIcon = <Icon as={TrashIcon} size="lg" color="white" />
  const heartIcon = <Icon as={HeartIcon} size="lg" color="white" />
  const randomizerIcon = <SimpleLineIcons name="magic-wand" size={20} color={themeColors.text} />

  const addToFavorites: () => void = () => {
    if (favoriteOutfit.name.trim().length === 0) {
      setError('Outfit name is required.')
    } else {
      setError(null)
      favoriteOutfit.outfit = outfit
      createFavoriteOutfit(favoriteOutfit)
      setFavoriteOutfit({
        name: '',
        description: '',
        outfit: {} as IOutfit,
      })
      setShowFavoritesModal(false)
    }
  }

  const clearOutfit: () => void = () => {
    setOutfit()
    setSelectedItems()
  }

  const randomizeOutfit: () => void = async () => {
    clearOutfit()
    const randomOutfit = await getRandomOutfit()
    setOutfit(randomOutfit)
    const randomlySelectedItems: IItem[] = [
      randomOutfit.topOver,
      randomOutfit.topUnder,
      randomOutfit.bottom,
      randomOutfit.fullBody,
      randomOutfit.outerwear,
      randomOutfit.shoes,
      randomOutfit.accessory,
    ].filter((item): item is IItem => item != null)

    setSelectedItems(randomlySelectedItems)
  }

  const deleteFromOutfit: (item: IItem | undefined) => void = item => {
    if (!item) return

    setSelectedItems(item)

    let key: keyof IOutfit | undefined

    if ((item.category as Category) === Category.CLOTHES) {
      const sub = item.subCategory as SubCategory

      const subCategoryMap: Record<SubCategory, keyof IOutfit> = {
        [SubCategory.TOP_OVER]: 'topOver',
        [SubCategory.TOP_UNDER]: 'topUnder',
        [SubCategory.BOTTOM]: 'bottom',
        [SubCategory.FULL_BODY]: 'fullBody',
        [SubCategory.OUTERWEAR]: 'outerwear',
      }

      key = subCategoryMap[sub]
    }
    if ((item.category as Category) === Category.SHOES) {
      key = 'shoes' as keyof IOutfit
    }
    if ((item.category as Category) === Category.ACCESSORIES) {
      key = 'accessory' as keyof IOutfit
    }

    if (key) {
      setOutfit({
        ...outfit,
        [key]: undefined,
      })
    }
  }

  return (
    <PageSetup>
      <VStack>
        <HStack className="justify-between">
          <Button
            size="xl"
            variant="solid"
            className="rounded-none w-[50%]"
            action="primary"
            onPress={() => {
              setShowFavoritesModal(true)
            }}
            isDisabled={isAddToFavoritesDisabled}>
            {heartIcon}
            <ButtonText>Add to Favorites</ButtonText>
          </Button>
          <Button
            size="xl"
            variant="solid"
            className="rounded-none w-[50%]"
            action="negative"
            onPress={() => clearOutfit()}>
            {trashIcon}
            <ButtonText>Clear outfit</ButtonText>
          </Button>
        </HStack>
        <Button
          size="xl"
          variant="solid"
          className="rounded-lg my-14 mb-11 mx-20"
          style={{backgroundColor: themeColors.primary}}
          onPress={() => randomizeOutfit()}>
          {randomizerIcon}
          <ButtonText style={{color: themeColors.text}}>Choose random outfit</ButtonText>
        </Button>
        <ModalWrapper
          isOpen={showFavoritesModal}
          onClose={() => {
            setFavoriteOutfit({
              name: '',
              description: '',
              outfit: {} as IOutfit,
            })
            setShowFavoritesModal(false)
            setError(null)
          }}
          heading="Add to favorite outfits"
          okBtnText="Add"
          onOk={() => addToFavorites()}>
          <FormInput
            label="Outfit name"
            placeholder="Name for your favorite outfit"
            value={favoriteOutfit.name ?? undefined}
            isRequired={true}
            onChange={newValue => setFavoriteOutfit({...favoriteOutfit, name: newValue})}
            isInvalid={error !== null}
            errorMessage={error ?? undefined}
          />
          <TextAreaInputControl
            label="Description"
            placeholder="Enter a description for your outfit..."
            value={favoriteOutfit.description ?? undefined}
            onChange={(newValue: string) => setFavoriteOutfit({...favoriteOutfit, description: newValue})}
          />
        </ModalWrapper>
        <ModalWrapper
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          heading="Remove item from outfit"
          okBtnText="Remove"
          onOk={() => {
            deleteFromOutfit(selectedOutfitItem)
            setSelectedItems(selectedOutfitItem)
            setShowDeleteModal(false)
          }}>
          <Text>This item will be removed from your outfit. Are you sure?</Text>
        </ModalWrapper>

        <Box className="justify-center">
          {outfitItems.every((item: IItem | undefined) => !item) ? (
            <Text className="text-center text-xl">No items added to your outfit yet</Text>
          ) : (
            <VStack>
              {outfitItems.map(
                (item: IItem | undefined, index) =>
                  item && (
                    <ItemCard
                      key={index}
                      item={item}
                      hasAddButton={false}
                      hasViewButton={true}
                      hasDeleteBtn={true}
                      page="outfit"
                      deleteAction={() => {
                        setShowDeleteModal(true)
                        setSelectedOutfitItem(item)
                      }}
                    />
                  ),
              )}
            </VStack>
          )}
        </Box>
      </VStack>
    </PageSetup>
  )
}

export default OutfitPage
