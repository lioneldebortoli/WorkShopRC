import Navbar from './components/Navbar.jsx'
import { HeroPublicidad } from './components/HeroPublicidad'
import { Agenda } from './components/Agenda'
import { CompraSegura } from './components/CompraSegura'
import { Footer } from './components/Footer'

function App() {


  return (
    <>
      <Navbar />

      <section>
        <main>
          
          <HeroPublicidad />
          <Agenda />
          <CompraSegura />
        </main>
      </section>

      <Footer />
    </>
  )
}

export default App