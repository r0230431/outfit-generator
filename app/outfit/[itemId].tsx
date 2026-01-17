import {FunctionComponent} from 'react'
import PageSetup from '@/components/custom/PageSetup'
import {Text} from '@/components/ui/text'
import {Card} from '@/components/ui/card'
import {useLocalSearchParams} from 'expo-router'
import ItemDetailList from '@/components/custom/ItemDetailList'
import LinkButton from '@/components/custom/LinkButton'
import {useGetItem} from '@/db/dbAPI'
import {themeColors} from '@/context/themeProvider'

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
      <LinkButton page="outfit" text="Back to outfit" hasIconLeft={true} hasIconRight={false} />
    </PageSetup>
  )
}

export default ItemDetails
