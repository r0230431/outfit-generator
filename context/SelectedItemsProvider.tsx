import {IItem} from '@/models/IItem'
import {createContext, FunctionComponent, PropsWithChildren, useState} from 'react'

export interface SelectedItemsContextProps {
  selectedItems: IItem[]
  setSelectedItems: (item?: IItem | IItem[]) => void
}

export const SelectedItemsContext = createContext<SelectedItemsContextProps>({
  selectedItems: [],
  setSelectedItems: () => {
    console.warn('setSelectedItems function not implemented')
  },
})

const SelectedItemsProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [selectedItems, updateSelectedItems] = useState<IItem[]>([])

  const setSelectedItems = (item?: IItem | IItem[]): void => {
    if (!item) {
      updateSelectedItems([])
      return
    }

    if (item instanceof Array) {
      updateSelectedItems(item)
      return
    }

    if (!(item instanceof Array)) {
      const isItemInSelectedItems = selectedItems.some(selectedItem => selectedItem.id === item.id)
      if (isItemInSelectedItems) {
        const newSelectedItems = selectedItems.filter(selectedItem => selectedItem.id !== item.id)
        updateSelectedItems(newSelectedItems)
      } else {
        updateSelectedItems([...selectedItems, item])
      }
    }
  }

  return (
    <SelectedItemsContext.Provider value={{selectedItems, setSelectedItems}}>{children}</SelectedItemsContext.Provider>
  )
}

export default SelectedItemsProvider
