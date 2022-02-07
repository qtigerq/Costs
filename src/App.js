import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

import Home from './components/pages/Home'
import Container from './components/layout/Container'
import NewProject from './components/pages/NewProject'
import Projects from './components/pages/Projects'
import Project from './components/pages/Project'
import Company from './components/pages/Company'
import Contact from './components/pages/Contact'

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Container customClass='min-height'>
          <Routes>                                                               {/*Antigo SWITCH mudou para ROUTES */}
            <Route exact path="/" element={<Home />}> </Route>                   {/*exact serve para definir que o home só vai ser acessado quando o usuário entrar exatamente com o endereço "/" */}
            <Route path="/newproject" element={<NewProject />}> </Route>
            <Route path="/projects" element={<Projects />}> </Route>
            <Route path="/project/:id" element={<Project />}> </Route>
            <Route path="/company" element={<Company />}> </Route>
            <Route path="/contact" element={<Contact />}> </Route>
          </Routes>
        </Container>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
