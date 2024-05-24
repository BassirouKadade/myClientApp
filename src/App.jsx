import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAxiosErrorHandler } from './components/authservice/api';
import { SmileOutlined } from '@ant-design/icons';
import ListeFilieres from './components/pages/filiere/liste/ListeFilieres';
import Dashboard from './components/dashboard/Dashboard';
import NavBarBottom from './components/dashboard/navbarbotom/NavBarBottom';
import NouveauFormateur from './components/pages/formateur/ajout/NouveauFormateur';
import ListeFormateurs from './components/pages/formateur/liste/ListeFormateurs';
import DetailFormateur from './components/pages/formateur/detail/DetailFormateur';
import ListeModule from './components/pages/module/liste/ListeModule';
import ListeSalle from './components/pages/salle/liste/ListeSalle';
import DetailFiliere from './components/pages/filiere/detail/DetailFiliere';
import ListeGroupe from './components/pages/groupe/liste/ListeGroupe';
import CreerEmplois from './components/pages/emplois/CreerEmplois';
import { App as AntdApp } from 'antd';

function MyApp() {
  const {  notification } = AntdApp.useApp();

  const { error } = useAxiosErrorHandler();

  const showNotification = () => {
    notification.info({
      message: 'Actualiser la page',
      description: 'Si certaines mises à jour ne sont pas appliquées, veuillez actualiser la page. Merci!',
      icon: <SmileOutlined style={{ color: 'rgb(10, 148, 102)' }} />,
      duration: 5,
      placement: 'topRight',
    });
  };

  useEffect(() => {
    setTimeout(showNotification, 3000);
  }, []);

  if (error) {
    return "Erreur !!!";
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="dashboard" element={<NavBarBottom />} />
            <Route path="formateur/ajouter-formateur" element={<NouveauFormateur />} />
            <Route path="formateur/liste-formateur" element={<ListeFormateurs />} />
            <Route path="formateur/detail-formateur/:id" element={<DetailFormateur />} />
            <Route path="filiere/liste-filiere" element={<ListeFilieres />} />
            <Route path="module/liste-module" element={<ListeModule />} />
            <Route path="salle/liste-salle" element={<ListeSalle />} />
            <Route path="filiere/detail-filiere/:id" element={<DetailFiliere />} />
            <Route path="groupe/liste-groupe" element={<ListeGroupe />} />
          </Route>
          <Route path="/creer-emploi" element={<CreerEmplois />} />
        </Routes>
      </BrowserRouter>
  );
}


export default function  App(){
     return <AntdApp>
             <MyApp></MyApp>
     </AntdApp>
}
