import './App.css'
import ListePerso from './components/ListePerso'
import DetailPerso from './components/DetailsPerso'
import AjoutPerso from './components/AjoutPerso';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

function Modele() {
  return (
    <div>
      <a href="/">Page principale | </a> 
      <a href="/ajoutP">Ajouter Perso | </a> 
      <a href="/listeP">Liste perso | </a>
      <br />
      <Outlet />
    </div>
  );
}
function PagePrincipale() {
  return <h1>Page principale</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Modele />}>
          <Route index element={<PagePrincipale />} />
          <Route path="ajoutP" element={<AjoutPerso />} />
          <Route path="listeP" element={<ListePerso/>}/>
          <Route path="/joueur/:nomJoueur" element={<DetailPerso />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
