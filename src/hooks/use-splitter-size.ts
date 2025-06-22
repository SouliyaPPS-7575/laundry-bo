import { useState, useEffect } from "react"

export const useSplitterSize = (defaultSize: (string | number)[] = ["70%", "30%"], storageKey = "splitter-size") => {
     const [splitterSize, setSplitterSize] = useState<(string | number)[]>(() => {
          if (typeof window !== "undefined") {
               const saved = localStorage.getItem(storageKey)
               return saved ? JSON.parse(saved) : defaultSize
          }
          return defaultSize
     })

     useEffect(() => {
          if (typeof window !== "undefined") {
               localStorage.setItem(storageKey, JSON.stringify(splitterSize))
          }
     }, [splitterSize, storageKey])

     const resetToDefault = () => {
          setSplitterSize(defaultSize)
     }

     const setPreset = (preset: "balanced" | "left-focus" | "right-focus" | "minimal-right" | "minimal-left") => {
          const presets = {
               balanced: ["50%", "50%"],
               "left-focus": ["70%", "30%"],
               "right-focus": ["30%", "70%"],
               "minimal-right": ["85%", "15%"],
               "minimal-left": ["15%", "85%"],
          }
          setSplitterSize(presets[preset])
     }

     return {
          splitterSize,
          setSplitterSize,
          resetToDefault,
          setPreset,
     }
}
