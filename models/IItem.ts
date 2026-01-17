import {Category} from '@/models/enum/Category'
import {Season} from '@/models/enum/Season'
import {Occasion} from '@/models/enum/Occasion'
import {Color} from '@/models/enum/Color'
import {SubCategory} from '@/models/enum/SubCategory'
import {GarmentType} from '@/models/enum/GarmentType'
import {ShoeType} from '@/models/enum/ShoeType'
import {AccessoryType} from '@/models/enum/AccessoryType'
import {ClothingSize} from '@/models/enum/ClothingSize'
import {ShoeSize} from '@/models/enum/ShoeSize'
import {Fit} from '@/models/enum/Fit'

export interface IItem {
  id?: number
  image: string
  category: Category | string
  itemType: GarmentType | ShoeType | AccessoryType | string
  subCategory?: SubCategory | string | null
  color?: Color | string | null
  brand?: string | null
  season?: Season | string | null
  occasion?: Occasion | string | null
  itemSize?: ClothingSize | ShoeSize | string | null
  fit?: Fit | string | null
  description?: string | null
}
