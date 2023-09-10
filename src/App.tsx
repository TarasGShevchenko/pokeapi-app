import React, { FC } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { styled } from '@mui/material'

import { Header, Footer, PokesTable, Pokemon } from './components'

const AppContainer = styled('div')(() => ({
  textAlign: 'center',
  display: 'grid',
  height: '100vh',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: ['header', 'main', 'footer'],
}))

const App: FC = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path={'/'} element={<PokesTable />} />
          <Route path={'/:name'} element={<Pokemon />} />
        </Routes>
        <Footer />
      </AppContainer>
    </BrowserRouter>
  )
}

export default App
