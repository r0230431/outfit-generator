import {Color} from '@/models/enum/Color'
import {createContext, FunctionComponent, PropsWithChildren, useState} from 'react'
import {GarmentType} from '@/models/enum/GarmentType'
import {ShoeType} from '@/models/enum/ShoeType'
import {AccessoryType} from '@/models/enum/AccessoryType'
import {Season} from '@/models/enum/Season'
import {Occasion} from '@/models/enum/Occasion'

export type itemType = GarmentType | ShoeType | AccessoryType

export type FilterState = {
  types: itemType[]
  colors: Color[]
  seasons: Season[]
  occasions: Occasion[]
}

const initialFilterState: FilterState = {
  types: [],
  colors: [],
  occasions: [],
  seasons: [],
}

interface FilterContextProps {
  draftFilters: FilterState
  activeFilters: FilterState
  setDraftFilters: (filters: FilterState) => void
  applyFilters: () => void
  resetFilters: () => void
}

export const FilterContext = createContext<FilterContextProps>({
  draftFilters: initialFilterState,
  activeFilters: initialFilterState,
  setDraftFilters: () => {
    console.warn('setFilters function not implemented')
  },
  applyFilters: () => {
    console.warn('applyFilters function not implemented')
  },
  resetFilters: () => {
    console.warn('resetFilters function not implemented')
  },
})

const FilterContextProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [draftFilters, setDraftFilters] = useState<FilterState>(initialFilterState)
  const [activeFilters, setActiveFilters] = useState<FilterState>(initialFilterState)

  const applyFilters = () => {
    setActiveFilters(draftFilters)
  }

  const resetFilters = () => {
    setDraftFilters(initialFilterState)
    setActiveFilters(initialFilterState)
  }

  return (
    <FilterContext.Provider
      value={{
        draftFilters,
        activeFilters,
        setDraftFilters,
        applyFilters,
        resetFilters,
      }}>
      {children}
    </FilterContext.Provider>
  )
}

export default FilterContextProvider
