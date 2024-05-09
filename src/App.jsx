import {BrowserRouter,Routes,Route}  from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import NavBarBottom from './components/dashboard/navbarbotom/NavBarBottom'
import NouveauFormateur from './components/pages/formateur/ajout/NouveauFormateur'
import ListeFormateurs from './components/pages/formateur/liste/ListeFormateurs'
import { useAxiosErrorHandler } from './components/authservice/api'
import DetailFormateur from './components/pages/formateur/detail/DetailFormateur'
const baseUrl = import.meta.env.VITE_BASE_URL;

export default function App() {
  const {error}=useAxiosErrorHandler()

  if(error){
      return "Errror !!!"
  }
  console.log(baseUrl)
  return (
    <BrowserRouter>
            <Routes>
                     <Route path="/" element={<Dashboard/>}>
                             <Route path='dashboard' element={<NavBarBottom></NavBarBottom>}></Route>
                             <Route path='formateur/ajouter-formateur' element={<NouveauFormateur></NouveauFormateur>}></Route>
                             <Route path='formateur/liste-formateur' element={<ListeFormateurs></ListeFormateurs>}></Route>
                             <Route path='formateur/detail-formateur/:id' element={<DetailFormateur></DetailFormateur>}></Route>
                     </Route>
            </Routes>
    </BrowserRouter>
  )
}

   