import {createContext, FunctionComponent, useState, PropsWithChildren} from 'react'

export interface ShowCameraContextProps {
  showCamera: boolean
  setShowCamera: (newState: boolean) => void
}

export const ShowCameraContext = createContext<ShowCameraContextProps>({
  showCamera: false,
  setShowCamera: () => {
    console.warn('setSelectedItems function not implemented')
  },
})

const ShowCameraContextProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
  const [showCamera, toggleShowCamera] = useState<boolean>(false)
  const setShowCamera = () => {
    toggleShowCamera(current => !current)
  }
  return <ShowCameraContext.Provider value={{showCamera, setShowCamera}}>{children}</ShowCameraContext.Provider>
}

export default ShowCameraContextProvider
