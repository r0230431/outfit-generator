import {IOutfit} from '@/models/IOutfit'

export interface IFavoriteOutfit {
  id?: number | undefined
  name: string
  description?: string | null
  outfit?: IOutfit
}
