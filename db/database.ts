import {openDatabaseSync} from 'expo-sqlite'
import {drizzle} from 'drizzle-orm/expo-sqlite'

export const DATABASE_NAME = 'outfitgenerator'

export const expoDb = openDatabaseSync(DATABASE_NAME)
export const drizzleDb = drizzle(expoDb)
