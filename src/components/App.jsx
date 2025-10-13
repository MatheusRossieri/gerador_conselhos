import React, { useContext, useRef, useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { AdviceContext } from '../contexts/AdviceContext'
import AdviceCard from './AdviceCard'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f4f8;
  position: relative;
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`

const Title = styled.h1`
  margin: 0 0 8px 0;
  font-size: 50px;
  font-weight: 700;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`

const Button = styled.button`
  background: #2b6cb0;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export default function App() {
  const { advice, setAdvice, loading, setLoading, error, setError } = useContext(AdviceContext)
  const cooldownRef = useRef(false)
  const controlsRef = useRef(null)
  const [titleTop, setTitleTop] = useState(24)

  useLayoutEffect(() => {
    function update() {
      const controlsRect = controlsRef.current?.getBoundingClientRect()
      if (controlsRect) {
        const top = Math.max(24, Math.floor(controlsRect.top / 2))
        setTitleTop(top)
      }
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  async function fetchAdvice() {
    if (cooldownRef.current) return
    cooldownRef.current = true
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`https://api.adviceslip.com/advice?_=${Date.now()}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setAdvice(data.slip.advice)
    } catch (err) {
      setError(err.message || 'Erro ao buscar conselho')
    } finally {
      setLoading(false)
      // libera o cooldown após 800ms
      setTimeout(() => {
        cooldownRef.current = false
      }, 800)
    }
  }

  return (
    <Container>
      <Title style={{ top: titleTop }}>{'💌 Gerador de Conselhos'}</Title>
      <Controls ref={controlsRef}>
        <AdviceCard advice={advice} loading={loading} error={error} />
        <Button onClick={fetchAdvice} disabled={loading} aria-disabled={loading}>
          {loading ? 'Buscando...' : 'Gerar conselho'}
        </Button>
      </Controls>
    </Container>
  )
}
