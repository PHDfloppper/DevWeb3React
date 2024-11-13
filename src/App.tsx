import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListePerso from './components/ListePerso'
import DetailPerso from './components/DetailsPerso'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useParams,
} from 'react-router-dom';

function Modele() {
  return (
    <div>
      <a href="/">Page principale | </a> 
      <a href="/dadams">Ajouter Perso | </a> 
      <a href="/listeP">Liste perso | </a>
      <br />
      <Outlet />
    </div>
  );
}
function PagePrincipale() {
  return <h1>Page principale</h1>;
}

function DouglasAdams() {
  return (
    <>
      <h1>Page de Douglas Adams</h1> 
      <a href="/livre/1">Livre 1</a> 
      <a href="/livre/2">Livre 2</a> 
    </>
  );
}

function Livre() {
  const { id } = useParams();
  return <h1>Livre #{id}</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Modele />}>
          <Route index element={<PagePrincipale />} />
          <Route path="dadams" element={<DouglasAdams />} />
          <Route path="livre/:id" element={<Livre />} />
          <Route path="listeP" element={<ListePerso/>}/>
          <Route path="/joueur/:nomJoueur" element={<DetailPerso />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
