import React, { useState, useEffect } from 'react';
import './CreerEmplois.css';

import { useQuery } from 'react-query';
import { getModuleFiliereGoupe } from '../../authservice/module-request/moduleRequest';
import 'react-loading-skeleton/dist/skeleton.css';
import { getInfoGroupesTotatles } from '../../authservice/groupe-request/groupeRequest';
import DialogContext from '../animation/DialogContext';
import Disponibilite from './Disponibilite';
import SallesVerification from './SallesVerification';
import { verificationSalleDisponible } from '../../authservice/create_emplois_request/createEmploisRequest';
import Table from './tableEmplois/Table';
import HeaderSection from './tableEmplois/HeaderSection';
import DataSearch from './DataSearch/DataSearch';
import { getEmploisGroupe } from '../../authservice/create_emplois_request/createEmploisRequest';
import InterfaceEmplois from './tableEmplois/InterfaceEmplois';
import LogEmplois from '../../assets/eemplois.jpeg'
export default function CreerEmplois() {
  // State management
  const [currentGroupeEmplois, setCurrentGroupeEmplois] = useState(null);
  const [formDataSearch, setFormDataSearch] = useState("");
  const [loadingDataSearch, setLoadingDataSearch] = useState(false);
  const [groupesFilter, setGroupesFilter] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [selection, setSelection] = useState({
    select: false,
    day: null,
    startIndex: null,
    endIndex: null,
  });
  const [errorServer, setErrorServer] = useState({});
  const [openSalle, setOpenSalle] = useState(false);

  const { data: getInfoGroupes, isLoading: isLoadingGetGroupes } = useQuery(
    ['liste-groupes-centre'],
    async () => {
      try {
        const response = await getInfoGroupesTotatles();
        return response.data;
      } catch (error) {
        console.error(error);
        setErrorServer(error.response.data);
        throw error;
      }
    }
  );

  useEffect(() => {
    if (!isLoadingGetGroupes) {
      setGroupes(getInfoGroupes);
      setGroupesFilter(getInfoGroupes);
    }
  }, [getInfoGroupes, isLoadingGetGroupes]);

  const handleSearch = () => {
    setLoadingDataSearch(true);
    setTimeout(() => {
      setLoadingDataSearch(false);
      setGroupesFilter(
        groupes.filter(groupe =>
          groupe.code.toLowerCase().includes(formDataSearch.toLowerCase())
        ));
    }, 1000);
  };

  const refreshModuleList = () => {
    setGroupesFilter(groupes);
  };

  const { data: getModuleFiliereGroupe, isLoading: isLoadingModuleFiliereGroupes } = useQuery(
    ['get-Module-Filiere-groupe', currentGroupeEmplois?.id],
    async () => {
      if (!currentGroupeEmplois?.id) {
        throw new Error("L'ID du groupe n'est pas disponible");
      }
      try {
        const response = await getModuleFiliereGoupe(currentGroupeEmplois.id);
        return response.data;
      } catch (error) {
        console.error(error);
        setErrorServer(error.response?.data || "Une erreur est survenue lors de la récupération des données");
        throw error;
      }
    },
    {
      enabled: !!currentGroupeEmplois?.id
    }
  );

 
  const handleClickOpenSalle = () => {
    setOpenSalle(true);
  };

 
  
  const { data: getEmplois, isLoading: loadingGetEmplois } = useQuery(
    ['get-emplois-groupe', currentGroupeEmplois?.id],
    async () => {
      if (!currentGroupeEmplois?.id) {
        throw new Error("L'ID du groupe n'est pas disponible");
      }
      try {
        await new Promise(resolve=>setTimeout(resolve,3000))

        const response = await getEmploisGroupe(currentGroupeEmplois.id);
        return response.data;
      } catch (error) {
        console.error(error);
        setErrorServer(error.response?.data || "Une erreur est survenue lors de la récupération des données");
        throw error;
      }
    },
    {
      enabled: !!currentGroupeEmplois?.id
    }
  );
 
  const emplois={
        "Lundi":getEmplois?.filter(element=>element.day==="Lundi"),
        "Mardi":getEmplois?.filter(element=>element.day==="Mardi"),
        "Mercredi":getEmplois?.filter(element=>element.day==="Mercredi"),
        "Jeudi":getEmplois?.filter(element=>element.day==="Jeudi"),
        "Vendredi":getEmplois?.filter(element=>element.day==="Vendredi"),
        "Samedi":getEmplois?.filter(element=>element.day==="Samedi")
  }
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR');
    setCurrentDate(formattedDate);
  }, []);

  const [openBac, setOpenBac] = useState(false);


  useEffect(()=>{
   if(!loadingGetEmplois){
       setOpenBac(false);
   }
   else{
    setOpenBac(true);
   }
  },[loadingGetEmplois])

 

  return (
    <div className='div-creation-emplois'>
     
      <DialogContext setOpen={setOpenSalle} open={openSalle}>
        <SallesVerification />
      </DialogContext>
      <div className='div-emplois-headers'>
      
         <img style={{borderRadius:"50%"}} width={65} height={65} src={LogEmplois} alt="" />
        <div>
        <span className='dateStyle'>ISTA Bouznika {currentDate}</span>
        </div>
      </div>
      <div className="div-emplois-body">
        <DataSearch
          data={{
            setFormDataSearch,
            refreshModuleList,
            loadingDataSearch,
            isLoadingGetGroupes,
            groupesFilter,
            isLoadingModuleFiliereGroupes,
            getModuleFiliereGroupe,
            handleSearch,
            formDataSearch,
            setCurrentGroupeEmplois,
          }}
        />
        <div style={{width:"74%"}}>
          <HeaderSection
            data={{
              currentGroupeEmplois,
              handleClickOpenSalle,
              // handleOpenBac
            }}
          />
          <InterfaceEmplois
           data={{openBac,emplois, currentGroupeEmplois}}
          
          ></InterfaceEmplois>
          {/* <Table
            data={{
              loadingGetEmplois,
              handleMouseDown,
              openBac,
              handleMouseMove,
              // handleCloseBac,
              handleMouseUp,
              selection
            }}
            days={days}
            hours={hours}
          /> */}
        </div>
      </div>
    </div>
  );
}
