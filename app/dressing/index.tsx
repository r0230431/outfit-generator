import {FunctionComponent, useContext, useState} from 'react'
import {ActivityIndicator, SafeAreaView, ScrollView} from 'react-native'
import {VStack} from '@/components/ui/vstack'
import {HStack} from '@/components/ui/hstack'
import {Button, ButtonText} from '@/components/ui/button'
import {Box} from '@/components/ui/box'
import {Text} from '@/components/ui/text'
import {Accordion} from '@/components/ui/accordion'
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons'
import FilterAccordionItem from '@/components/custom/FilterAccordionItem'
import ModalWrapper from '@/components/custom/ModalWrapper'
import PageSetup from '@/components/custom/PageSetup'
import {IItem} from '@/models/IItem'
import {InputFormContext} from '@/context/inputFormContext'
import {OutfitContext} from '@/context/outfitContext'
import {Category} from '@/models/enum/Category'
import {SubCategory} from '@/models/enum/SubCategory'
import ItemCard from '@/components/custom/ItemCard'
import {router} from 'expo-router'
import {themeColors} from '@/context/themeProvider'
import {useGetAllItems} from '@/db/dbAPI'
import {useDeleteItem} from '@/db/dbAPI'
import {emptyItem} from '@/utils/utils'
import {SelectedItemsContext} from '@/context/SelectedItemsProvider'
import {FilterContext, FilterState, itemType} from '@/context/FilterContextProvider'
import {GarmentType} from '@/models/enum/GarmentType'
import {AccessoryType} from '@/models/enum/AccessoryType'
import {ShoeType} from '@/models/enum/ShoeType'
import {Color} from '@/models/enum/Color'
import {Season} from '@/models/enum/Season'
import {Occasion} from '@/models/enum/Occasion'
import {SafeAreaProvider} from 'react-native-safe-area-context'

const DressingPage: FunctionComponent = () => {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [showOverwriteModal, setShowOverwriteModal] = useState<{
    key: string
    oldItem: IItem | undefined | null
    oldItem2?: IItem | undefined | null
    newItem: IItem | undefined
    showModalStatus: boolean
  }>({
    key: '',
    oldItem: undefined,
    oldItem2: undefined,
    newItem: undefined,
    showModalStatus: false,
  })
  const [showDeleteModal, setShowDeleteModal] = useState<{
    deleteItem: IItem | undefined
    showModalStatus: boolean
  }>({
    deleteItem: undefined,
    showModalStatus: false,
  })
  const {data: allItems = [], isLoading} = useGetAllItems()
  const {mutate: deleteItem, isPending} = useDeleteItem()
  const {draftFilters, activeFilters, setDraftFilters, applyFilters, resetFilters} = useContext(FilterContext)
  const {setObject} = useContext(InputFormContext)
  const {selectedItems, setSelectedItems} = useContext(SelectedItemsContext)
  const {outfit, setOutfit} = useContext(OutfitContext)

  const filterIcon = <MaterialCommunityIcons name="filter" size={20} color="white" />
  const clearFilterIcon = <MaterialCommunityIcons name="filter-off" size={20} color="white" />
  const addIcon = <MaterialIcons name="add-box" size={20} color="white" />

  const filteredItems = allItems.filter(
    item =>
      (activeFilters.types.length === 0 || activeFilters.types.includes(item.itemType as itemType)) &&
      (activeFilters.colors.length === 0 || activeFilters.colors.includes(item.color as Color)) &&
      (activeFilters.occasions.length === 0 || activeFilters.occasions.includes(item.occasion as Occasion)) &&
      (activeFilters.seasons.length === 0 || activeFilters.seasons.includes(item.season as Season)),
  )

  const updateFilter = (key: keyof FilterState, values: string[]) => {
    switch (key) {
      case 'types':
        setDraftFilters({
          ...draftFilters,
          types: values as itemType[],
        })
        break
      case 'colors':
        setDraftFilters({
          ...draftFilters,
          colors: values as Color[],
        })
        break
      case 'seasons':
        setDraftFilters({
          ...draftFilters,
          seasons: values as Season[],
        })
        break
      case 'occasions':
        setDraftFilters({
          ...draftFilters,
          occasions: values as Occasion[],
        })
        break
    }
  }

  const resetItem: () => void = () => {
    setObject(emptyItem)
  }

  const filterDressing: () => void = () => {
    setShowFilterModal(false)
    applyFilters()
  }

  const checkForOutfit: (item: IItem) => void = item => {
    if ((item.category as Category) === Category.SHOES && !outfit.shoes) {
      addToOutfit('shoes', item)
    }

    if ((item.category as Category) === Category.SHOES && outfit.shoes) {
      setShowOverwriteModal({
        key: 'shoes',
        oldItem: outfit.shoes,
        newItem: item,
        showModalStatus: true,
      })
    }

    if ((item.category as Category) === Category.ACCESSORIES && !outfit.accessory) {
      addToOutfit('accessory', item)
    }

    if ((item.category as Category) === Category.ACCESSORIES && outfit.accessory) {
      setShowOverwriteModal({
        key: 'accessory',
        oldItem: outfit.accessory,
        newItem: item,
        showModalStatus: true,
      })
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.TOP_OVER &&
      !outfit.topOver
    ) {
      addToOutfit('topOver', item)
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.TOP_UNDER &&
      !outfit.topUnder &&
      !outfit.fullBody
    ) {
      addToOutfit('topUnder', item)
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.BOTTOM &&
      !outfit.bottom &&
      !outfit.fullBody
    ) {
      addToOutfit('bottom', item)
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.OUTERWEAR &&
      !outfit.outerwear
    ) {
      addToOutfit('outerwear', item)
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.TOP_OVER &&
      outfit.topOver
    ) {
      setShowOverwriteModal({
        key: 'topOver',
        oldItem: outfit.topOver,
        newItem: item,
        showModalStatus: true,
      })
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.TOP_UNDER &&
      outfit.topUnder
    ) {
      setShowOverwriteModal({
        key: 'topUnder',
        oldItem: outfit.topUnder,
        newItem: item,
        showModalStatus: true,
      })
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.TOP_UNDER &&
      outfit.fullBody
    ) {
      setShowOverwriteModal({
        key: 'topUnder',
        oldItem: outfit.fullBody,
        newItem: item,
        showModalStatus: true,
      })
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.BOTTOM &&
      outfit.bottom
    ) {
      setShowOverwriteModal({
        key: 'bottom',
        oldItem: outfit.bottom,
        newItem: item,
        showModalStatus: true,
      })
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.BOTTOM &&
      outfit.fullBody
    ) {
      setShowOverwriteModal({
        key: 'bottom',
        oldItem: outfit.fullBody,
        newItem: item,
        showModalStatus: true,
      })
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.OUTERWEAR &&
      outfit.outerwear
    ) {
      setShowOverwriteModal({
        key: 'outerwear',
        oldItem: outfit.outerwear,
        newItem: item,
        showModalStatus: true,
      })
    }

    if (
      (item.category as Category) === Category.CLOTHES &&
      (item.subCategory as SubCategory) === SubCategory.FULL_BODY &&
      (outfit.topUnder || outfit.bottom)
    ) {
      setShowOverwriteModal({
        key: 'fullBody',
        oldItem: outfit.bottom,
        oldItem2: outfit.topUnder,
        newItem: item,
        showModalStatus: true,
      })
    }
  }

  const addToOutfit: (name: string, newItem: IItem, oldItem?: IItem, oldItem2?: IItem) => void = (
    name,
    newItem,
    oldItem?,
    oldItem2?,
  ) => {
    const selectedItemsWithoutOldItems = selectedItems.filter(
      item => item.id !== oldItem?.id && item.id !== oldItem2?.id,
    )
    const updatedSelectedItems: IItem[] = [...selectedItemsWithoutOldItems, newItem]
    setSelectedItems(updatedSelectedItems)
    setOutfit(outfit, name, newItem)
  }

  const deleteOutfitItem = (item: IItem): void => {
    if (!item?.id) return

    deleteItem({id: item.id})
    setShowDeleteModal({
      deleteItem: undefined,
      showModalStatus: false,
    })
  }

  if (isLoading || isPending) {
    return (
      <SafeAreaProvider style={{backgroundColor: themeColors.background}}>
        <SafeAreaView>
          <ActivityIndicator size="large" color={themeColors.primary} className="justify-self-center" />
        </SafeAreaView>
      </SafeAreaProvider>
    )
  }

  return (
    <PageSetup>
      <VStack space="md" reversed={false}>
        <HStack className="justify-between fixed top-0 right-0 left-0">
          <Button
            size="xl"
            variant="solid"
            className="rounded-none w-[30%]"
            action="primary"
            onPress={() => {
              setShowFilterModal(true)
            }}>
            {filterIcon}
            <ButtonText>Filter</ButtonText>
          </Button>
          <Button size="xl" variant="solid" className="rounded-none w-[40%]" action="negative" onPress={resetFilters}>
            {clearFilterIcon}
            <ButtonText>Clear filter</ButtonText>
          </Button>
          <Button
            size="xl"
            variant="solid"
            className="rounded-none w-[30%]"
            action="primary"
            onPress={() => {
              resetItem()
              router.push('/dressing/inputForm')
            }}>
            {addIcon}
            <ButtonText>Add</ButtonText>
          </Button>
        </HStack>

        <Text className="text-right mx-5">{filteredItems.length} items</Text>

        <ModalWrapper
          isOpen={showFilterModal}
          onClose={() => {
            setShowFilterModal(false)
          }}
          heading="Filters"
          okBtnText="Apply filters"
          onOk={filterDressing}>
          <ScrollView>
            <Accordion>
              <FilterAccordionItem
                filterValues={draftFilters.types}
                setFilterValues={value => updateFilter('types', value)}
                title="Clothes"
                list={Object.values(GarmentType)}
              />
              <FilterAccordionItem
                filterValues={draftFilters.types}
                setFilterValues={value => updateFilter('types', value)}
                title="Shoes"
                list={Object.values(ShoeType)}
              />
              <FilterAccordionItem
                filterValues={draftFilters.types}
                setFilterValues={value => updateFilter('types', value)}
                title="Accessories"
                list={Object.values(AccessoryType)}
              />
              <FilterAccordionItem
                filterValues={draftFilters.colors}
                setFilterValues={value => updateFilter('colors', value)}
                title="Colors"
                list={Object.values(Color)}
              />
              <FilterAccordionItem
                filterValues={draftFilters.seasons}
                setFilterValues={value => updateFilter('seasons', value)}
                title="Season"
                list={Object.values(Season)}
              />
              <FilterAccordionItem
                filterValues={draftFilters.occasions}
                setFilterValues={value => updateFilter('occasions', value)}
                title="Occasion"
                list={Object.values(Occasion)}
              />
            </Accordion>
          </ScrollView>
        </ModalWrapper>

        <ModalWrapper
          isOpen={showOverwriteModal.showModalStatus}
          onClose={() => setShowOverwriteModal({...showOverwriteModal, showModalStatus: false})}
          heading="Alert"
          okBtnText="Yes"
          onOk={() => {
            addToOutfit(
              showOverwriteModal.key,
              {...(showOverwriteModal.newItem as IItem)},
              {...(showOverwriteModal.oldItem as IItem)},
              {...(showOverwriteModal.oldItem2 as IItem)},
            )
            setShowOverwriteModal({...showOverwriteModal, showModalStatus: false})
          }}>
          <Text>There is already an item added to your outfit for this category. Do you want to replace it?</Text>
        </ModalWrapper>

        <ModalWrapper
          isOpen={showDeleteModal.showModalStatus}
          onClose={() => setShowDeleteModal({...showDeleteModal, showModalStatus: false})}
          heading="Delete item"
          okBtnText="Delete"
          onOk={() => deleteOutfitItem(showDeleteModal.deleteItem as IItem)}>
          <Text>This item will be removed from your dressing. Are you sure?</Text>
        </ModalWrapper>

        <Box className="justify-center">
          {filteredItems.map(item => (
            <ItemCard
              key={item.id}
              item={item}
              hasAddButton={true}
              hasViewButton={true}
              hasDeleteBtn={true}
              addAction={() => checkForOutfit(item)}
              page="dressing"
              deleteAction={() => {
                setShowDeleteModal({
                  deleteItem: item,
                  showModalStatus: true,
                })
              }}
            />
          ))}
        </Box>
      </VStack>
    </PageSetup>
  )
}

export default DressingPage
