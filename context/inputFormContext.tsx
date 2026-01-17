import {createContext, FunctionComponent, PropsWithChildren, useState} from 'react'
import {IItem} from '@/models/IItem'
import {emptyItem} from '@/utils/utils'

export interface InputFormContextProps {
  object: IItem
  setObject: (object: IItem, key?: string, value?: string) => void
}

export const InputFormContext = createContext<InputFormContextProps>({
  object: emptyItem,
  setObject: () => {
    console.warn('setObject function not implemented')
  },
})

const InputFormContextProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [object, updateObject] = useState<IItem>(emptyItem)

  const setObject = (object: IItem, key?: string, value?: string) => {
    if (key && value) {
      updateObject({...object, [key]: value})
    } else {
      updateObject(object)
    }
  }

  return <InputFormContext.Provider value={{object, setObject}}>{children}</InputFormContext.Provider>
}
export default InputFormContextProvider
