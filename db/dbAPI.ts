import {drizzleDb} from './database'
import {desc, eq, inArray, and} from 'drizzle-orm'
import {itemTable, outfitTable, outfitItemTable} from '@/db/schema'
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query'
import {IFavoriteOutfit} from '@/models/IFavoriteOutfit'
import {Category} from '@/models/enum/Category'
import {SubCategory} from '@/models/enum/SubCategory'
import {IItem} from '@/models/IItem'
import {GarmentType} from '@/models/enum/GarmentType'
import {ShoeType} from '@/models/enum/ShoeType'
import {AccessoryType} from '@/models/enum/AccessoryType'
import {Color} from '@/models/enum/Color'
import {Season} from '@/models/enum/Season'
import {Occasion} from '@/models/enum/Occasion'

// QUERIES AND MUTATIONS
// =====================

// Item
// ----

export const useGetAllItems = (): UseSuspenseQueryResult<IItem[], Error> => {
  return useSuspenseQuery({
    queryKey: ['items'],
    queryFn: getAllItems,
    staleTime: 0,
    refetchOnMount: true,
  })
}

export const useGetItem = (id?: number): UseSuspenseQueryResult<IItem | null, Error> => {
  return useSuspenseQuery({
    queryKey: ['item', id],
    queryFn: () => (id ? getItem(id) : null),
    staleTime: 0,
    refetchOnMount: true,
  })
}

export const useCreateItem = (): UseMutationResult<IItem, Error, IItem, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createItem,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['items']})
    },
  })
}

export const useUpdateItem = (): UseMutationResult<IItem, Error, IItem, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateItem,
    onSuccess: async updatedItem => {
      await queryClient.invalidateQueries({queryKey: ['item', updatedItem.id]})
    },
  })
}

export const useDeleteItem = (): UseMutationResult<void, Error, DeleteItemParams, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteItem,
    onMutate: ({id}) => {
      queryClient.setQueryData<IItem[]>(['items'], old => (old ?? []).filter(item => item.id !== id))
      queryClient.setQueryData<IItem>(['item', id], undefined)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['items']})
    },
  })
}

// Outfit
// ------

export const useGetFavoriteOutfits = (): UseSuspenseQueryResult<IFavoriteOutfit[], Error> => {
  return useSuspenseQuery({
    queryKey: ['favoriteOutfits'],
    queryFn: getAllFavoriteOutfits,
  })
}

export const useGetFavoriteOutfit = (id?: number): UseSuspenseQueryResult<IFavoriteOutfit | null, Error> => {
  return useSuspenseQuery({
    queryKey: ['favoriteOutfit', id],
    queryFn: () => (id ? getFavoriteOutfit(id) : null),
    staleTime: 0,
    refetchOnMount: true,
  })
}

export const useCreateFavoriteOutfit = (): UseMutationResult<IFavoriteOutfit, Error, IFavoriteOutfit, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createFavoriteOutfit,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['favoriteOutfits']})
    },
  })
}

export const useDeleteFavoriteOutfit = (): UseMutationResult<void, Error, DeleteItemParams, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteFavoriteOutfit,
    onMutate: ({id}) => {
      queryClient.setQueryData<IFavoriteOutfit[]>(['favoriteOutfits'], old =>
        (old ?? []).filter(item => item.id !== id),
      )
      queryClient.setQueryData<IFavoriteOutfit>(['favoriteOutfit', id], undefined)
    },
  })
}

// API FUNCTIONS
// =============

// Item
// ----

export const getAllItems = async (): Promise<IItem[]> => {
  return drizzleDb.select().from(itemTable)
}

const getItem = async (id: number): Promise<IItem> => {
  const items = await drizzleDb.select().from(itemTable).where(eq(itemTable.id, id))

  const item = items[0]

  if (!item) {
    throw new Error(`Item with id ${id} not found`)
  }

  return {...item}
}

export const getItemsByItemType = async (itemType: GarmentType | ShoeType | AccessoryType): Promise<IItem[]> => {
  return drizzleDb.select().from(itemTable).where(eq(itemTable.itemType, itemType))
}

export const getItemsByColor = async (color: Color): Promise<IItem[]> => {
  return drizzleDb.select().from(itemTable).where(eq(itemTable.color, color))
}

export const getItemsBySeason = async (season: Season): Promise<IItem[]> => {
  return drizzleDb.select().from(itemTable).where(eq(itemTable.season, season))
}

export const getItemsByOccasion = async (occasion: Occasion): Promise<IItem[]> => {
  return drizzleDb.select().from(itemTable).where(eq(itemTable.occasion, occasion))
}

const createItem = async (item: IItem): Promise<IItem> => {
  await drizzleDb.insert(itemTable).values(item)

  const [newItem] = await drizzleDb
    .select()
    .from(itemTable)
    .where(eq(itemTable.image, item.image))
    .orderBy(desc(itemTable.id))
    .limit(1)
  return {...newItem}
}

const updateItem = async (item: IItem): Promise<IItem> => {
  if (!item.id) {
    throw new Error('Item ID is required for update.')
  }

  const {id, ...itemToUpdate} = item

  await drizzleDb.update(itemTable).set(itemToUpdate).where(eq(itemTable.id, id))

  const updatedItems: IItem[] = await drizzleDb.select().from(itemTable).where(eq(itemTable.id, id))
  const updatedItem = updatedItems[0]
  return {...updatedItem}
}

//Delete
interface DeleteItemParams {
  id: number
}

const deleteItem = async ({id}: DeleteItemParams): Promise<void> => {
  if (!id) {
    throw new Error('Item ID is required for delete.')
  }
  await drizzleDb.delete(itemTable).where(eq(itemTable.id, id))
}

// Filter items
// ---------------

export const getAllTopOverItems = async (): Promise<IItem[]> => {
  return drizzleDb
    .select()
    .from(itemTable)
    .where(and(inArray(itemTable.category, [Category.CLOTHES]), inArray(itemTable.subCategory, [SubCategory.TOP_OVER])))
}

export const getAllTopUnderItems = async (): Promise<IItem[]> => {
  return drizzleDb
    .select()
    .from(itemTable)
    .where(
      and(inArray(itemTable.category, [Category.CLOTHES]), inArray(itemTable.subCategory, [SubCategory.TOP_UNDER])),
    )
}

export const getAllBottomItems = async (): Promise<IItem[]> => {
  return drizzleDb
    .select()
    .from(itemTable)
    .where(and(inArray(itemTable.category, [Category.CLOTHES]), inArray(itemTable.subCategory, [SubCategory.BOTTOM])))
}

export const getAllFullBodyItems = async (): Promise<IItem[]> => {
  return drizzleDb
    .select()
    .from(itemTable)
    .where(
      and(inArray(itemTable.category, [Category.CLOTHES]), inArray(itemTable.subCategory, [SubCategory.FULL_BODY])),
    )
}

export const getAllOuterwearItems = async (): Promise<IItem[]> => {
  return drizzleDb
    .select()
    .from(itemTable)
    .where(
      and(inArray(itemTable.category, [Category.CLOTHES]), inArray(itemTable.subCategory, [SubCategory.OUTERWEAR])),
    )
}

export const getAllShoes = async (): Promise<IItem[]> => {
  return drizzleDb
    .select()
    .from(itemTable)
    .where(and(inArray(itemTable.category, [Category.SHOES])))
}

export const getAllAccessories = async (): Promise<IItem[]> => {
  return drizzleDb
    .select()
    .from(itemTable)
    .where(and(inArray(itemTable.category, [Category.ACCESSORIES])))
}

// Outfit
// ------

// Read
async function getAllFavoriteOutfits(): Promise<IFavoriteOutfit[]> {
  const result = await drizzleDb
    .select({
      outfit: outfitTable,
      item: itemTable,
    })
    .from(outfitTable)
    .innerJoin(outfitItemTable, eq(outfitItemTable.outfitId, outfitTable.id))
    .innerJoin(itemTable, eq(outfitItemTable.itemId, itemTable.id))

  const outfitMap = new Map<number, IFavoriteOutfit>()

  for (const row of result) {
    const outfitId = row.outfit.id

    if (!outfitMap.has(outfitId)) {
      outfitMap.set(outfitId, {
        id: outfitId,
        name: row.outfit.name,
        description: row.outfit.description,
        outfit: {
          topOver: null,
          topUnder: null,
          bottom: null,
          fullBody: null,
          shoes: null,
          outerwear: null,
          accessory: null,
        },
      })
    }

    const outfit = outfitMap.get(outfitId)!
    const item = row.item

    switch (item.subCategory) {
      case SubCategory.TOP_OVER:
        outfit.outfit!.topOver = item
        break
      case SubCategory.TOP_UNDER:
        outfit.outfit!.topUnder = item
        break
      case SubCategory.BOTTOM:
        outfit.outfit!.bottom = item
        break
      case SubCategory.FULL_BODY:
        outfit.outfit!.fullBody = item
        break
      case SubCategory.OUTERWEAR:
        outfit.outfit!.outerwear = item
        break
    }

    if (item.category === (Category.SHOES as string)) {
      outfit.outfit!.shoes = item
    }
    if (item.category === (Category.ACCESSORIES as string)) {
      outfit.outfit!.accessory = item
    }
  }

  return Array.from(outfitMap.values())
}

export async function getFavoriteOutfit(id: number): Promise<IFavoriteOutfit> {
  const result = await drizzleDb
    .select({
      outfit: outfitTable,
      item: itemTable,
    })
    .from(outfitTable)
    .where(eq(outfitTable.id, id))
    .innerJoin(outfitItemTable, eq(outfitItemTable.outfitId, id))
    .innerJoin(itemTable, eq(outfitItemTable.itemId, itemTable.id))

  if (result.length === 0) {
    throw new Error(`No outfit found with id ${id}`)
  }

  const outfit = result[0].outfit

  const items = result.map(r => r.item)

  const selectedFavoriteOutfit: IFavoriteOutfit = {
    id: outfit.id,
    name: outfit.name,
    description: outfit.description,
    outfit: {
      topOver: items.find(i => i.subCategory === SubCategory.TOP_OVER) || null,
      topUnder: items.find(i => i.subCategory === SubCategory.TOP_UNDER) || null,
      bottom: items.find(i => i.subCategory === SubCategory.BOTTOM) || null,
      fullBody: items.find(i => i.subCategory === SubCategory.FULL_BODY) || null,
      shoes: items.find(i => i.category === (Category.SHOES as string)) || null,
      outerwear: items.find(i => i.subCategory === SubCategory.OUTERWEAR) || null,
      accessory: items.find(i => i.category === (Category.ACCESSORIES as string)) || null,
    },
  }

  return selectedFavoriteOutfit
}

// Create
export const createFavoriteOutfit = async (outfit: IFavoriteOutfit): Promise<IFavoriteOutfit> => {
  const inserted = await drizzleDb
    .insert(outfitTable)
    .values({
      name: outfit.name,
      description: outfit.description,
    })
    .returning({insertedId: outfitTable.id})

  const newFavoriteOutfitId = inserted[0]?.insertedId

  if (!newFavoriteOutfitId) {
    throw new Error('Failed to insert favorite outfit')
  }

  if (outfit.outfit != null && outfit.outfit.topOver?.id) {
    await drizzleDb.insert(outfitItemTable).values({
      outfitId: newFavoriteOutfitId,
      itemId: outfit.outfit.topOver.id,
    })
  }

  if (outfit.outfit != null && outfit.outfit.topUnder?.id) {
    await drizzleDb.insert(outfitItemTable).values({
      outfitId: newFavoriteOutfitId,
      itemId: outfit.outfit.topUnder.id,
    })
  }

  if (outfit.outfit != null && outfit.outfit.bottom?.id) {
    await drizzleDb.insert(outfitItemTable).values({
      outfitId: newFavoriteOutfitId,
      itemId: outfit.outfit.bottom.id,
    })
  }

  if (outfit.outfit != null && outfit.outfit.fullBody?.id) {
    await drizzleDb.insert(outfitItemTable).values({
      outfitId: newFavoriteOutfitId,
      itemId: outfit.outfit.fullBody.id,
    })
  }

  if (outfit.outfit != null && outfit.outfit.shoes?.id) {
    await drizzleDb.insert(outfitItemTable).values({
      outfitId: newFavoriteOutfitId,
      itemId: outfit.outfit.shoes.id,
    })
  }

  if (outfit.outfit != null && outfit.outfit.outerwear?.id) {
    await drizzleDb.insert(outfitItemTable).values({
      outfitId: newFavoriteOutfitId,
      itemId: outfit.outfit.outerwear.id,
    })
  }

  if (outfit.outfit != null && outfit.outfit.accessory?.id) {
    await drizzleDb.insert(outfitItemTable).values({
      outfitId: newFavoriteOutfitId,
      itemId: outfit.outfit.accessory.id,
    })
  }

  const result = await drizzleDb
    .select({
      outfit: outfitTable,
      item: itemTable,
      outfitItem: outfitItemTable,
    })
    .from(outfitTable)
    .where(eq(outfitTable.id, newFavoriteOutfitId))
    .innerJoin(outfitItemTable, eq(outfitItemTable.outfitId, outfitTable.id))
    .innerJoin(itemTable, eq(outfitItemTable.itemId, itemTable.id))

  const items: IItem[] = result.map(r => r.item)

  const createdOutfit: IFavoriteOutfit = {
    id: newFavoriteOutfitId,
    name: outfit.name,
    description: outfit.description,
    outfit: {
      topOver: items.find(i => i.subCategory === 'topOver') || null,
      topUnder: items.find(i => i.subCategory === 'topUnder') || null,
      bottom: items.find(i => i.subCategory === 'bottom') || null,
      fullBody: items.find(i => i.subCategory === 'fullBody') || null,
      shoes: items.find(i => i.category === 'shoes') || null,
      outerwear: items.find(i => i.subCategory === 'outerwear') || null,
      accessory: items.find(i => i.category === 'accessory') || null,
    },
  }
  return createdOutfit
}

// Delete
interface DeleteFavoriteOutfitParams {
  id: number
}

async function deleteFavoriteOutfit({id}: DeleteFavoriteOutfitParams): Promise<void> {
  await drizzleDb.delete(outfitTable).where(eq(outfitTable.id, id))
  await drizzleDb.delete(outfitItemTable).where(eq(outfitItemTable.outfitId, id))
}
