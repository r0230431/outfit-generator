import {sql} from 'drizzle-orm'
import {Category} from '@/models/enum/Category'
import {Color} from '@/models/enum/Color'
import {Season} from '@/models/enum/Season'
import {Occasion} from '@/models/enum/Occasion'
import {ClothingSize} from '@/models/enum/ClothingSize'
import {ShoeSize} from '@/models/enum/ShoeSize'
import {GarmentType} from '@/models/enum/GarmentType'
import {ShoeType} from '@/models/enum/ShoeType'
import {AccessoryType} from '@/models/enum/AccessoryType'
import {SubCategory} from '@/models/enum/SubCategory'
import {Fit} from '@/models/enum/Fit'

//Category
const categoryValues = Object.values(Category)
  .map(value => `'${value}'`)
  .join(', ')
export const categoryCheckSql = sql.raw(`category IN (${categoryValues})`)

//Color
const colorValues = Object.values(Color)
  .map(value => `'${value}'`)
  .join(', ')
export const colorCheckSql = sql.raw(`color IN (${colorValues})`)

//Season
const seasonValues = Object.values(Season)
  .map(value => `'${value}'`)
  .join(', ')
export const seasonCheckSql = sql.raw(`season IN (${seasonValues})`)

//Occasion
const occasionValues = Object.values(Occasion)
  .map(value => `'${value}'`)
  .join(', ')
export const occasionCheckSql = sql.raw(`occasion IN (${occasionValues})`)

//ItemType
const itemTypeValues = [...Object.values(GarmentType), ...Object.values(ShoeType), ...Object.values(AccessoryType)]
const itemTypePlaceholders = itemTypeValues.map(value => `'${value}'`).join(', ')
export const itemTypeCheckSql = sql.raw(`itemType IN (${itemTypePlaceholders})`)

//ItemSize
const allSizeValues = [...Object.values(ClothingSize), ...Object.values(ShoeSize)]
const itemSizeValues = allSizeValues.filter((v, i, a) => a.indexOf(v) === i)
const itemSizePlaceholders = itemSizeValues.map(value => `'${value}'`).join(', ')
export const itemSizeCheckSql = sql.raw(`itemSize IN (${itemSizePlaceholders})`)

//SubCategory
const subCategoryValues = Object.values(SubCategory)
  .map(value => `'${value}'`)
  .join(', ')
export const subCategoryCheckSql = sql.raw(`subCategory IN (${subCategoryValues})`)

//Fit
const fitValues = Object.values(Fit)
  .map(value => `'${value}'`)
  .join(', ')
export const fitCheckSql = sql.raw(`fit IN (${fitValues})`)
