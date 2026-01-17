import {FunctionComponent} from 'react'
import OutfitDetailList from '@/components/custom/OutfitDetailList'
import {useLocalSearchParams} from 'expo-router'
import {useGetFavoriteOutfit} from '@/db/dbAPI'
import PageSetup from '@/components/custom/PageSetup'
import {Text} from '@/components/ui/text'
import {Heading} from '@/components/ui/heading'

const OutfitItems: FunctionComponent = () => {
  const outfitId = useLocalSearchParams<{outfitId: string}>()
  const {data: favoriteOutfit} = useGetFavoriteOutfit(Number(outfitId.outfitId))

  if (!favoriteOutfit) {
    return (
      <PageSetup>
        <Text className="text-center text-xl font-bold mt-10">Outfit not found</Text>
      </PageSetup>
    )
  }

  return (
    <PageSetup>
      <Heading size="2xl" className="mx-auto mt-10 mb-2">
        {favoriteOutfit.name}
      </Heading>
      <Text className="mx-auto mb-8">{favoriteOutfit.description}</Text>
      <OutfitDetailList outfit={favoriteOutfit.outfit} hasDeleteButton={false} />
    </PageSetup>
  )
}

export default OutfitItems
