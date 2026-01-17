import {FunctionComponent} from 'react'
import PageSetup from '@/components/custom/PageSetup'
import {VStack} from '@/components/ui/vstack'
import FavoriteOutfitCard from '@/components/custom/FavoriteOutfitCard'
import {Heading} from '@/components/ui/heading'
import {useGetFavoriteOutfits} from '@/db/dbAPI'
import {Text} from '@/components/ui/text'

const FavoritesPage: FunctionComponent = () => {
  const {data: favoriteOutfits} = useGetFavoriteOutfits()

  return (
    <PageSetup>
      <Heading size="2xl" className="mx-auto my-6">
        My favorite outfits
      </Heading>
      {favoriteOutfits.length === 0 && <Text className="text-center text-xl">No favorite outfits added yet</Text>}
      <VStack>
        {favoriteOutfits.map(favorite => (
          <FavoriteOutfitCard outfit={favorite} key={favorite.id} />
        ))}
      </VStack>
    </PageSetup>
  )
}

export default FavoritesPage
