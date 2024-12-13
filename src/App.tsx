import './App.css';
import ListePerso from './components/ListePerso';
import DetailPerso from './components/DetailsPerso';
import AjoutPerso from './components/AjoutPerso';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ListePersoNom from './components/ListePersoNom';
import ListePersoVersion from './components/ListePersoVersion';
import { FormattedMessage, IntlProvider } from 'react-intl';
import frMessages from './lang/fr.json';
import enMessages from './lang/en.json'; // Assurez-vous d'importer les messages en anglais
import { useState } from 'react';

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
  const [locale, setLocale] = useState('fr'); // Langue par défaut : français

  // Fonction pour changer la langue
  const handleLanguageChange = (lang: string) => {
    setLocale(lang);
  };

  return (
    <IntlProvider //je dois utiliser les boutons, pas trouvé comment faire en sorte que la langue reste la même à travers le site
      locale={locale}
      messages={locale === 'fr' ? frMessages : enMessages}
    >
      <BrowserRouter>
      <div>
          <button onClick={() => handleLanguageChange('fr')}>Français</button>
          <button onClick={() => handleLanguageChange('en')}>English</button>
        </div>
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

export default App;
