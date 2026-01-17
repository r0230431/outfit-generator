import {FunctionComponent, useContext, useEffect, useState} from 'react'
import SelectWrapper from '@/components/custom/SelectWrapper'
import {InputFormContext} from '@/context/inputFormContext'
import TextAreaInputControl from '@/components/custom/TextAreaInputControl'
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {HStack} from '@/components/ui/hstack'
import PageSetup from '@/components/custom/PageSetup'
import {VStack} from '@/components/ui/vstack'
import {Text} from '@/components/ui/text'
import {themeColors} from '@/context/themeProvider'
import {router} from 'expo-router'
import {IBrand} from '@/models/IBrand'
import {CloseCircleIcon} from '@/components/ui/icon'
import FormInput from '@/components/custom/FormInput'
import BrandsList from '@/components/custom/BrandsList'
import {Box} from '@/components/ui/box'
import {emptyItem} from '@/utils/utils'
import ModalWrapper from '@/components/custom/ModalWrapper'
import {useCreateItem, useUpdateItem} from '@/db/dbAPI'
import {TouchableOpacity, View} from 'react-native'
import {Spinner} from '@/components/ui/spinner'
import {Category} from '@/models/enum/Category'
import {SubCategory} from '@/models/enum/SubCategory'
import {GarmentType} from '@/models/enum/GarmentType'
import {ShoeType} from '@/models/enum/ShoeType'
import {AccessoryType} from '@/models/enum/AccessoryType'
import {Color} from '@/models/enum/Color'
import {Season} from '@/models/enum/Season'
import {Occasion} from '@/models/enum/Occasion'
import {ClothingSize} from '@/models/enum/ClothingSize'
import {Fit} from '@/models/enum/Fit'
import {ShoeSize} from '@/models/enum/ShoeSize'
import {Image} from '@/components/ui/image'
import {ShowCameraContext} from '@/context/ShowCameraContextProvider'

const InputForm: FunctionComponent = () => {
  const {object, setObject} = useContext(InputFormContext)
  const {mutate: createItem, isPending: createPending} = useCreateItem()
  const {mutate: updateItem, isPending: updatePending} = useUpdateItem()
  const {setShowCamera} = useContext(ShowCameraContext)
  const [showImageModal, setShowImageModal] = useState<boolean>(false)
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false)
  const [showSubcategoryModal, setShowSubcategoryModal] = useState<boolean>(false)
  const [showItemTypeModal, setShowItemTypeModal] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState(searchValue)
  const [brandListVisible, setBrandListVisible] = useState<boolean>(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchValue(searchValue)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [searchValue])

  useEffect(() => {
    if (debouncedSearchValue === '') {
      setBrandListVisible(false)
    }
  }, [debouncedSearchValue, object.brand])

  useEffect(() => {
    if (object.image) {
    }
  }, [object.image])

  const clearBrandSearch = (): void => {
    setSearchValue('')
    setBrandListVisible(false)
    setObject({...object, brand: null})
  }

  const saveItem = (): void => {
    if (!object.image) {
      setShowImageModal(true)
      return
    }

    if (!object.category || object.category === '') {
      setShowCategoryModal(true)
      return
    }

    if (object.category === 'Clothes' && !object.subCategory) {
      setShowSubcategoryModal(true)
      return
    }

    if (!object.itemType || object.itemType === '') {
      setShowItemTypeModal(true)
      return
    }

    if (!object.id) {
      createItem(object)
      setObject(emptyItem)
    }

    if (object.id) {
      updateItem(object)
    }

    router.back()
  }

  const cancelItem = (): void => {
    setObject(emptyItem)
    router.back()
  }

  return (
    <PageSetup>
      {(createPending || updatePending) && (
        <View className="flex-1 justify-center items-center">
          <Spinner size="large" color={themeColors.primary} />
        </View>
      )}
      {showImageModal && (
        <ModalWrapper
          isOpen={showImageModal}
          onClose={() => setShowImageModal(false)}
          onOk={() => setShowImageModal(false)}
          heading="Warning">
          <Text>Please take a picture before adding your item to your dressing.</Text>
        </ModalWrapper>
      )}
      {showCategoryModal && (
        <ModalWrapper
          isOpen={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          onOk={() => setShowCategoryModal(false)}
          heading="Warning">
          <Text>Please select a category.</Text>
        </ModalWrapper>
      )}
      {showSubcategoryModal && (
        <ModalWrapper
          isOpen={showSubcategoryModal}
          onClose={() => setShowSubcategoryModal(false)}
          onOk={() => setShowSubcategoryModal(false)}
          heading="Warning">
          <Text>Please select a subcategory.</Text>
        </ModalWrapper>
      )}
      {showItemTypeModal && (
        <ModalWrapper
          isOpen={showItemTypeModal}
          onClose={() => setShowItemTypeModal(false)}
          onOk={() => setShowItemTypeModal(false)}
          heading="Warning">
          <Text>Please select a type for your item.</Text>
        </ModalWrapper>
      )}

      <TouchableOpacity
        className="py-5 px-12 my-7 rounded-md mx-auto"
        style={{backgroundColor: themeColors.primary}}
        onPress={() => {
          setShowCamera(true)
          router.push('/dressing/cameraScreen')
        }}>
        <MaterialCommunityIcons name="camera-plus" size={24} color="white" />
      </TouchableOpacity>

      {object.image && <Image size="2xl" className="mb-5 mx-auto" source={object.image} alt={object.category} />}

      <VStack className="mx-5">
        <SelectWrapper
          categoryName="Category"
          categoryOptions={Object.values(Category)}
          placeholder="Select category"
          value={object.category}
          onChange={newValue => setObject({...object, category: newValue})}
          isRequired={true}
        />
        {object.category === 'Clothes' && (
          <SelectWrapper
            categoryName="Subcategory"
            categoryOptions={Object.values(SubCategory)}
            placeholder="Select subcategory"
            value={object.subCategory ?? undefined}
            onChange={newValue => setObject({...object, subCategory: newValue})}
            isRequired={true}
          />
        )}
        {object.category === 'Clothes' && (
          <SelectWrapper
            categoryName="Type of clothes"
            categoryOptions={Object.values(GarmentType)}
            placeholder="Select type of clothes"
            value={object.itemType ?? undefined}
            onChange={newValue => setObject({...object, itemType: newValue})}
            isRequired={true}
          />
        )}
        {object.category === 'Shoes' && (
          <SelectWrapper
            categoryName="Type of shoes"
            categoryOptions={Object.values(ShoeType)}
            placeholder="Select type of shoes"
            value={object.itemType ?? undefined}
            onChange={newValue => setObject({...object, itemType: newValue})}
            isRequired={true}
          />
        )}
        {object.category === 'Accessories' && (
          <SelectWrapper
            categoryName="Type of accessories"
            categoryOptions={Object.values(AccessoryType)}
            placeholder="Select type of accessories"
            value={object.itemType ?? undefined}
            onChange={newValue => setObject({...object, itemType: newValue})}
            isRequired={true}
          />
        )}

        <FormInput
          label="Brand"
          placeholder="Search for brand..."
          value={object.brand ?? searchValue}
          onChange={newValue => {
            setSearchValue(newValue)
            setBrandListVisible(true)
          }}
          isRequired={false}
        />

        {brandListVisible && (
          <Box>
            <Button size="md" action="negative" className="my-3 mx-auto" onPress={clearBrandSearch}>
              <ButtonIcon as={CloseCircleIcon} />
              <ButtonText>Clear brand</ButtonText>
            </Button>
            <BrandsList
              searchValue={debouncedSearchValue}
              handleSelectedValue={(selectedValue: IBrand) => {
                setObject({...object, brand: selectedValue.name})
                setSearchValue(selectedValue.name)
              }}
            />
          </Box>
        )}

        <SelectWrapper
          categoryName="Color"
          categoryOptions={Object.values(Color)}
          placeholder="Select color"
          value={object.color ?? undefined}
          onChange={newValue => setObject({...object, color: newValue})}
          isRequired={false}
        />

        <SelectWrapper
          categoryName="Season"
          categoryOptions={Object.values(Season)}
          placeholder="Select season"
          value={object.season ?? undefined}
          onChange={newValue => setObject({...object, season: newValue})}
          isRequired={false}
        />

        <SelectWrapper
          categoryName="Occasion"
          categoryOptions={Object.values(Occasion)}
          placeholder="Select occasion"
          value={object.occasion ?? undefined}
          onChange={newValue => setObject({...object, occasion: newValue})}
          isRequired={false}
        />

        {object.category === 'Clothes' && (
          <SelectWrapper
            categoryName="Fit"
            categoryOptions={Object.values(Fit)}
            placeholder="Select fit"
            value={object.fit ?? undefined}
            onChange={newValue => setObject({...object, fit: newValue})}
            isRequired={false}
          />
        )}

        {object.category === 'Clothes' && (
          <SelectWrapper
            categoryName="Size (Clothes)"
            categoryOptions={Object.values(ClothingSize)}
            placeholder="Select size"
            value={object.itemSize ?? undefined}
            onChange={newValue => setObject({...object, itemSize: newValue})}
            isRequired={false}
          />
        )}

        {object.category === 'Shoes' && (
          <SelectWrapper
            categoryName="Size (Shoes)"
            categoryOptions={Object.values(ShoeSize)}
            placeholder="Select size"
            value={object.itemSize ?? undefined}
            onChange={newValue => setObject({...object, itemSize: newValue})}
            isRequired={false}
          />
        )}

        <TextAreaInputControl
          label="Description"
          placeholder="Enter a description for your item..."
          value={object.description ?? undefined}
          onChange={(newValue: string) => setObject({...object, description: newValue})}
        />
      </VStack>
      <HStack className="mb-3 py-7 mx-auto" space="lg">
        <Button size="lg" variant="outline" onPress={() => cancelItem()} isDisabled={createPending || updatePending}>
          <ButtonText>Cancel</ButtonText>
        </Button>
        <Button size="lg" action="positive" onPress={() => saveItem()} isDisabled={createPending || updatePending}>
          <ButtonText>Save</ButtonText>
        </Button>
      </HStack>
    </PageSetup>
  )
}

export default InputForm
