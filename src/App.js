import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

import Inicio from './components/pages/Inicio'
import NovoProjeto from './components/pages/NovoProjeto'
import Projetos from './components/pages/Projetos'
import Empresa from './components/pages/Empresa'
import Contato from './components/pages/Contato'

import Container from './components/layout/Container'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Container customClass='min-height'>
          <Routes>                                                              {/*Antigo SWITCH mudou para ROUTES */}
            <Route exact path="/" element={<Inicio />}> </Route>                {/*exact serve para definir que o home só vai ser acessado quando o usuário entrar exatamente com o endereço "/" */}
            <Route path="/novoprojeto" element={<NovoProjeto />}> </Route>
            <Route path="/projetos" element={<Projetos />}> </Route>
            <Route path="/empresa" element={<Empresa />}> </Route>
            <Route path="/contato" element={<Contato />}> </Route>
          </Routes>
        </Container>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
