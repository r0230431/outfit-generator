import {IItem} from '@/models/IItem'
import {IOutfit} from '@/models/IOutfit'
import {
  getAllTopOverItems,
  getAllTopUnderItems,
  getAllBottomItems,
  getAllFullBodyItems,
  getAllOuterwearItems,
  getAllShoes,
  getAllAccessories,
} from '@/db/dbAPI'

// Empty item
// ----------

export const emptyItem: IItem = {
  image: '',
  category: '',
  subCategory: null,
  itemType: '',
  color: null,
  season: null,
  occasion: null,
  fit: null,
  brand: null,
  itemSize: null,
  description: null,
}

// Random outfit
// --------------

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomOutfit = async (): Promise<IOutfit> => {
  const topOverItems = await getAllTopOverItems()
  const topUnderItems = await getAllTopUnderItems()
  const bottomItems = await getAllBottomItems()
  const fullBodyItems = await getAllFullBodyItems()
  const outerwearItems = await getAllOuterwearItems()
  const shoes = await getAllShoes()
  const accessories = await getAllAccessories()

  const randomOutfit1: IOutfit = {
    topOver: topOverItems.length !== 0 ? topOverItems[getRandomNumber(0, topOverItems.length - 1)] : undefined,
    topUnder: topUnderItems.length !== 0 ? topUnderItems[getRandomNumber(0, topUnderItems.length - 1)] : undefined,
    bottom: bottomItems.length !== 0 ? bottomItems[getRandomNumber(0, bottomItems.length - 1)] : undefined,
    fullBody: fullBodyItems.length !== 0 ? fullBodyItems[getRandomNumber(0, fullBodyItems.length - 1)] : undefined,
    shoes: shoes.length !== 0 ? shoes[getRandomNumber(0, shoes.length - 1)] : undefined,
    outerwear: outerwearItems.length !== 0 ? outerwearItems[getRandomNumber(0, outerwearItems.length - 1)] : undefined,
    accessory: accessories.length !== 0 ? accessories[getRandomNumber(0, accessories.length - 1)] : undefined,
  }

  const randomOutfit2: IOutfit = {
    topOver: topOverItems.length !== 0 ? topOverItems[getRandomNumber(0, topOverItems.length - 1)] : undefined,
    fullBody: fullBodyItems.length !== 0 ? fullBodyItems[getRandomNumber(0, fullBodyItems.length - 1)] : undefined,
    shoes: shoes.length !== 0 ? shoes[getRandomNumber(0, shoes.length - 1)] : undefined,
    outerwear: outerwearItems.length !== 0 ? outerwearItems[getRandomNumber(0, outerwearItems.length - 1)] : undefined,
    accessory: accessories.length !== 0 ? accessories[getRandomNumber(0, accessories.length - 1)] : undefined,
  }

  const i = bottomItems.length !== 0 ? bottomItems.length / (bottomItems.length + fullBodyItems.length) : 1
  return Math.random() < i ? randomOutfit1 : randomOutfit2
}
