import {FunctionComponent} from 'react'
import {ActivityIndicator, TouchableOpacity, View} from 'react-native'
import {useGetBrandsBySearch} from '@/data/brandAPI'
import {IBrand} from '@/models/IBrand'
import {themeColors} from '@/context/themeProvider'
import {Text} from '@/components/ui/text'
import {Divider} from '@/components/ui/divider'
import {useState} from 'react'

interface BrandsListProps {
  searchValue: string
  handleSelectedValue: (value: IBrand) => void
}

const BrandsList: FunctionComponent<BrandsListProps> = props => {
  const {searchValue, handleSelectedValue} = props
  const {data, isLoading} = useGetBrandsBySearch(searchValue)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const brands: IBrand[] = data ?? []
  const i = brands?.length ?? 0

  const handleSelectBrand = (brand: IBrand) => {
    handleSelectedValue(brand)
    setIsVisible(false)
  }

  if (isLoading) {
    return <ActivityIndicator size="large" />
  }

  if (!brands || brands.length === 0) {
    return (
      <View className="my-3">
        <Text className="text-center">Sorry, no brands are matching your search :-(</Text>
      </View>
    )
  }

  if (isVisible && brands.length > 0) {
    return (
      <View className="mx-5 p-5 border-l-1 border-solid border-l-gray-300">
        <Text className="font-bold mb-3">Choose a brand from this list:</Text>
        {brands
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((brand: IBrand, index) => {
            return (
              <TouchableOpacity key={brand.id} onPress={() => handleSelectBrand(brand)}>
                <Text style={{color: themeColors.primary}}>{brand.name}</Text>
                {index < i - 1 && <Divider className="my-2" />}
              </TouchableOpacity>
            )
          })}
      </View>
    )
  }

  return <></>
}

export default BrandsList
