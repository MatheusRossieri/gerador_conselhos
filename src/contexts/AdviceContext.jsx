import React, { createContext, useState } from 'react'

export const AdviceContext = createContext()

export function AdviceProvider({ children }) {
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  return (
    <AdviceContext.Provider value={{ advice, setAdvice, loading, setLoading, error, setError }}>
      {children}
    </AdviceContext.Provider>
  )
}
