import { Route, Routes } from "react-router"
import Navbar from './components/Navbar.jsx'
import { HeroPublicidad } from './components/HeroPublicidad'
import Estadisticas from "./components/Estadisticas.jsx"
import { Speakers } from './components/Speakers.jsx'
import { Agenda } from './components/Agenda'
import Entradas from "./components/Entradas"
import { CompraSegura } from './components/CompraSegura'
import { Footer } from './components/Footer'
import NotFound from "./pages/Error404.jsx"
import { UbicacionEvento } from "./components/UbicacionEvento.jsx"

function Landing() {
  return (
    <>
      <Navbar />
      <main>
        <HeroPublicidad />
        <Estadisticas />
        <Speakers />
        <Agenda />
        <Entradas />
        <CompraSegura />
        <UbicacionEvento />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App