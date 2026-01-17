import {int, sqliteTable, text, check} from 'drizzle-orm/sqlite-core'

import {
  categoryCheckSql,
  colorCheckSql,
  fitCheckSql,
  itemSizeCheckSql,
  itemTypeCheckSql,
  occasionCheckSql,
  seasonCheckSql,
  subCategoryCheckSql,
} from '@/db/sqlQueries'

export const itemTable = sqliteTable(
  'Items',
  {
    id: int().primaryKey({autoIncrement: true}),
    image: text().notNull(),
    category: text().notNull(),
    subCategory: text(),
    itemType: text().notNull(),
    color: text(),
    season: text(),
    occasion: text(),
    fit: text(),
    brand: text(),
    itemSize: text(),
    description: text(),
  },
  () => ({
    categoryCheck: check('category_check', categoryCheckSql),
    subCategoryCheck: check('subCategory_check', subCategoryCheckSql),
    itemTypeCheck: check('itemType_check', itemTypeCheckSql),
    colorCheck: check('color_check', colorCheckSql),
    seasonCheck: check('season_check', seasonCheckSql),
    occasionCheck: check('occasion_check', occasionCheckSql),
    itemSizeCheck: check('itemSize_check', itemSizeCheckSql),
    fitCheck: check('fit_check', fitCheckSql),
  }),
)

export const outfitTable = sqliteTable('Outfits', {
  id: int().primaryKey({autoIncrement: true}),
  name: text().notNull(),
  description: text(),
})

export const outfitItemTable = sqliteTable('OutfitItems', {
  id: int().primaryKey({autoIncrement: true}),
  outfitId: int()
    .notNull()
    .references(() => outfitTable.id, {onDelete: 'cascade', onUpdate: 'cascade'}),
  itemId: int()
    .notNull()
    .references(() => itemTable.id, {onDelete: 'cascade', onUpdate: 'cascade'}),
})
