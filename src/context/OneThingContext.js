import { useReducer } from 'react'
import oneThingReducer from './OneThingReducer'

const OneThingContext = createContext()

export const OneThingProvider = ({ children }) => {
  const initialState = {
    progress: '',
  }

  // state management functions

  const [state, dispatch] = useReducer(oneThingReducer, initialState)

  return (
    <OneThingContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </OneThingContext.Provider>
  )
}

export default OneThingContext
