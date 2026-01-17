import {IItem} from '@/models/IItem'

export interface IOutfit {
  id?: number
  topOver?: IItem | undefined | null
  topUnder?: IItem | undefined | null
  bottom?: IItem | undefined | null
  fullBody?: IItem | undefined | null
  shoes?: IItem | undefined | null
  outerwear?: IItem | undefined | null
  accessory?: IItem | undefined | null
}
