import { HeroPublicidad } from "./components/HeroPublicidad"
import { Agenda } from "./components/Agenda"
import { CompraSegura } from "./components/CompraSegura"
import { UbicacionEvento } from "./components/UbicacionEvento"

function App() {

  return (
    <>
      <section>
        <main>
          <HeroPublicidad/>
          <Agenda/>
          <CompraSegura/>
          <UbicacionEvento/>
        </main>
      </section>
    </>
  )
}

export default App
