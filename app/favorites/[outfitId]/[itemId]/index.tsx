import {FunctionComponent} from 'react'
import {useLocalSearchParams} from 'expo-router'
import {themeColors} from '@/context/themeProvider'
import PageSetup from '@/components/custom/PageSetup'
import {Text} from '@/components/ui/text'
import {Card} from '@/components/ui/card'
import ItemDetailList from '@/components/custom/ItemDetailList'
import {useGetItem} from '@/db/dbAPI'

const ItemDetails: FunctionComponent = () => {
  const itemId = useLocalSearchParams<{itemId: string}>()
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
    <PageSetup>
      <Card className="p-5 py-10 rounded-lg m-3" style={{backgroundColor: themeColors.background}}>
        <ItemDetailList item={item} />
      </Card>
    </PageSetup>
  )
}

export default ItemDetails
