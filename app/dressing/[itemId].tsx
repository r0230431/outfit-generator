import {FunctionComponent, useContext} from 'react'
import PageSetup from '@/components/custom/PageSetup'
import {Text} from '@/components/ui/text'
import {Card} from '@/components/ui/card'
import {router, useLocalSearchParams} from 'expo-router'
import {themeColors} from '@/context/themeProvider'
import {Button, ButtonIcon, ButtonText} from '@/components/ui/button'
import {EditIcon} from 'lucide-react-native'
import {InputFormContext} from '@/context/inputFormContext'
import ItemDetailList from '@/components/custom/ItemDetailList'
import LinkButton from '@/components/custom/LinkButton'
import {useGetItem} from '@/db/dbAPI'

const ItemDetails: FunctionComponent = () => {
  const itemId = useLocalSearchParams<{itemId: string}>()
  const {object, setObject} = useContext(InputFormContext)
  const id = Number(itemId.itemId)
  const {data: item} = useGetItem(id)

  if (!item) {
    return (
      <PageSetup>
        <Text className="text-center text-xl font-bold mt-10">Item not found</Text>
      </PageSetup>
    )
  }

  return (
    <InputFormContext.Provider value={{object, setObject}}>
      <PageSetup>
        <Card className="p-5 py-10 rounded-lg m-3" style={{backgroundColor: themeColors.background}}>
          <ItemDetailList item={item} />
          <Button
            size="lg"
            className="rounded-l mt-10"
            action="positive"
            onPress={() => {
              setObject(item)
              router.push('/dressing/inputForm')
            }}>
            <ButtonIcon as={EditIcon} />
            <ButtonText>Edit</ButtonText>
          </Button>
        </Card>
        <LinkButton page="dressing" text="Back to dressing" hasIconLeft={true} hasIconRight={false} />
      </PageSetup>
    </InputFormContext.Provider>
  )
}

export default ItemDetails
