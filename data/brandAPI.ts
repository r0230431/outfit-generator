import {UseSuspenseQueryResult, useSuspenseQuery} from '@tanstack/react-query'
import {IBrand} from '@/models/IBrand'

const baseUrl = 'https://myoutfitgenerator-api-app.azurewebsites.net'

// QUERIES
// -------

export const useGetAllBrands = (): UseSuspenseQueryResult<IBrand[], Error> => {
  return useSuspenseQuery({
    queryKey: ['brands'],
    queryFn: () => getAllBrands(),
  })
}

export const useGetBrandsBySearch = (query: string): UseSuspenseQueryResult<IBrand[], Error> => {
  return useSuspenseQuery({
    queryKey: ['searchedBrands', query],
    queryFn: () => getBrandsBySearch(query),
  })
}

// API
// ---

export const getAllBrands = async (): Promise<IBrand[]> => {
  const url = new URL('/brands', baseUrl)

  const response = await fetch(url)
  return (await response.json()) as IBrand[]
}

const getBrandsBySearch = async (search: string): Promise<IBrand[]> => {
  const url = new URL('/brands/search', baseUrl)
  url.searchParams.set('name', search)

  const response = await fetch(url)
  const json: unknown = await response.json()

  if (!Array.isArray(json)) {
    return []
  }

  return json as IBrand[]
}
