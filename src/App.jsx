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

function Landing() {
  const [ticketId, setTicketId] = useState("early")

  const irAComprar = (id) => {
    setTicketId(id)
    document.getElementById("comprar").scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroPublicidad />
        <Estadisticas />
        <Speakers />
        <Agenda />
        <Entradas onComprar={irAComprar} />
        <CompraSegura ticketId={ticketId} setTicketId={setTicketId} />
        <UbicacionEvento />
      </main>
      <Footer />
      <BotonArriba />
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