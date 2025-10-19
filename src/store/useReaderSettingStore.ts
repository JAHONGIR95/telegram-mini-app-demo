import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ReadingSettingsState {
  fontSize: number
  fontfamily: string
  setFontSize: (fontSize: number) => void
  setFontFamily: (fontfamily: string) => void
  reset: () => void
}

const initialState = {
  fontSize: 16,
  fontfamily: 'Arial',

} as const

export const useReaderSettingsStore = create<ReadingSettingsState>()(
  persist(
    (set) => ({
      ...initialState,
      setFontSize: (fontSize) => set({ fontSize }),
      setFontFamily: (fontfamily) => set({ fontfamily }),
      reset: () => set(initialState),
    }),
    {
      name: 'reading-settings', // localStorage kaliti
    }
  )
)
