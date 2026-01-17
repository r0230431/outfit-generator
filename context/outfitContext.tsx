import {createContext, FunctionComponent, PropsWithChildren, useState} from 'react'
import {IItem} from '@/models/IItem'
import {IOutfit} from '@/models/IOutfit'

interface OutfitContextProps {
  outfit: IOutfit
  setOutfit: (outfit?: IOutfit, name?: string, value?: IItem) => void
}

export const OutfitContext = createContext<OutfitContextProps>({
  outfit: {
    topOver: undefined,
    topUnder: undefined,
    bottom: undefined,
    fullBody: undefined,
    shoes: undefined,
    outerwear: undefined,
    accessory: undefined,
  },
  setOutfit: () => {
    console.warn('setOutfit function not implemented')
  },
})

const OutfitContextProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [outfit, updateOutfit] = useState<IOutfit>({
    topOver: undefined,
    topUnder: undefined,
    bottom: undefined,
    fullBody: undefined,
    shoes: undefined,
    outerwear: undefined,
    accessory: undefined,
  })

  const setOutfit = (outfit?: IOutfit, name?: string, value?: IItem) => {
    if (outfit && name && value) {
      updateOutfit({...outfit, [name]: value})
    } else if (outfit && !name && !value) {
      updateOutfit(outfit)
    } else {
      updateOutfit({
        topOver: undefined,
        topUnder: undefined,
        bottom: undefined,
        fullBody: undefined,
        shoes: undefined,
        outerwear: undefined,
        accessory: undefined,
      })
    }
  }

  return <OutfitContext.Provider value={{outfit, setOutfit}}>{children}</OutfitContext.Provider>
}

export default OutfitContextProvider
