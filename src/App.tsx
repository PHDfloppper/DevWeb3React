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
import ListePersoNom from './components/ListePersoNom';
import ListePersoVersion from './components/ListePersoVersion';
import { FormattedMessage, IntlProvider } from 'react-intl';
import frMessages from './lang/fr.json';

function Modele() {
  return (
    <div>
      <a href="/"><FormattedMessage id="navigation.home" /> | </a> 
      <a href="/ajoutP"><FormattedMessage id="navigation.addCharacter" /> | </a> 
      <a href="/listeP"><FormattedMessage id="navigation.listCharacters" /> | </a>
      <br />
      <Outlet />
    </div>
  );
}
function PagePrincipale() {
  return <h1><FormattedMessage id="routes.mainPage" /></h1>;
}

function App() {
  return (
    <IntlProvider locale="fr" messages={frMessages}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Modele />}>
            <Route index element={<PagePrincipale />} />
            <Route path="ajoutP" element={<AjoutPerso />} />
            <Route path="listeP" element={<ListePerso />} />
            <Route path="/joueur/:idJoueur" element={<DetailPerso />} />
            <Route path="/nomJoueur" element={<ListePersoNom />} />
            <Route path="/versionJoueur" element={<ListePersoVersion />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App
