import { useState } from "react"
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
import { BotonArriba } from "./components/BotonArriba.jsx"
import { Chatbot } from "./components/Chatbot.jsx"
import { Sponsors } from "./components/Sponsors.jsx"
import { SumateSponsor } from "./components/SumateSponsor.jsx"
import { Testimonios } from "./components/Testimonios.jsx"
import { PreguntasSpeakers } from "./components/PreguntasSpeakers.jsx"
import { ENTRADAS } from "./data/entradas.js"
import { useEvento } from "./hooks/useEvento.js"
import { EVENTOS } from "./utils/eventos.js"

function Landing() {
  const [cantidades, setCantidades] = useState({ early: 0, general: 0, virtual: 0 })

  const irAComprar = (id) => {
    setCantidades((actuales) => (actuales[id] > 0 ? actuales : { ...actuales, [id]: 1 }))
    document.getElementById("comprar").scrollIntoView({ behavior: "smooth" })
  }

  useEvento(EVENTOS.cargarEntradas, ({ id, cantidad }) => {
    const { stock } = ENTRADAS.find((entrada) => entrada.id === id)
    setCantidades((actuales) => ({ ...actuales, [id]: Math.min(cantidad, stock) }))
    document.getElementById("comprar").scrollIntoView({ behavior: "smooth" })
  })

  return (
    <>
      <Navbar />
      <main>
        <HeroPublicidad />
        <Estadisticas />
        <Speakers />
        <Agenda />
        <PreguntasSpeakers />
        <Sponsors />
        <Testimonios />
        <Entradas onComprar={irAComprar} />
        <CompraSegura cantidades={cantidades} setCantidades={setCantidades} />
        <SumateSponsor />
        <UbicacionEvento />
      </main>
      <Footer />
      <BotonArriba />
      <Chatbot />
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