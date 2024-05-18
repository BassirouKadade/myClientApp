import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CreerEmplois.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineReload } from 'react-icons/ai';
import LinearProgress from '@mui/material/LinearProgress';
import { BiAlarmAdd } from "react-icons/bi";
import { GiBookmark } from 'react-icons/gi';
import { useQuery } from 'react-query';
import {  Empty } from 'antd';
import Skeleton from 'react-loading-skeleton';
import { getModuleFiliereGoupe } from '../../authservice/module-request/moduleRequest';
import 'react-loading-skeleton/dist/skeleton.css';
import { getInfoGroupesTotatles } from '../../authservice/groupe-request/groupeRequest';
export default function CreerEmplois() {
  // State variables
  const  [currentGroupeEmplois,setCurrentGroupeEmplois]=useState({})
  const [formDataSearch, setFormDataSearch] = useState("");
  const [loadingDataSearch, setLoadingDataSearch] = useState(false);
  const [groupesFilter, setGroupesFilter] = useState([]);
  const [groupes,setGroupes]=useState([])
  const [selection, setSelection] = useState({
    select: false,
    day: null,
    startIndex: null,
    endIndex: null
  });
  // Constants
  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const hours = [
    "08:30", "09:30", "09:30", "10:30", "10:30", "11:30", "11:30", "12:30",
    "12:30", "13:30", "13:30", "14:30", "14:30", "15:30", "15:30", "16:30",
    "16:30", "17:30", "17:30", "18:30"
  ];

  const breadcrumbs = [
    <Link
      style={{ fontSize: "15px", textDecoration: "none", color: "rgba(99, 115, 119, 0.7)" }}
      key="1"
      to="/dashboard"
    >
      Dashboard
    </Link>,
    <Typography style={{ fontSize: "15px" }} key="2" color="text.primary">
      Création d'emplois du temps
    </Typography>,
  ];


  const formatHour = (index) => {
    return index >= 0 && index < hours.length ? hours[index] : "Heure non définie";
  };


  const handleMouseDown = (day, startIndex) => {
    setSelection({
      select: true,
      day: day,
      startIndex: startIndex,
      endIndex: startIndex,
    });
  };

  const handleMouseMove = (day, index) => {
    if (selection.select && selection.day === day && selection.startIndex <= index) {
      setSelection(prevState => ({
        ...prevState,
        endIndex: index,
      }));
    }
  };

  const handleMouseUp = () => {
    setSelection(prevState => ({
      ...prevState,
      select: false,
      // startIndex:formatHour( prevState.startIndex),
      // endIndex:formatHour( prevState.endIndex),
    }));
    const data={start:formatHour(selection.startIndex),end:formatHour(selection.endIndex)}
    console.log(data)
  };

/* Gestion de groupe  ***************************
--------------------------------------------------

*/
const [errorServer,setErrorServer]=useState({});

const { data: getInfoGroupes, isLoading: isLoadingGetGroupes } = useQuery(['liste-groupes-centre'], async () => {
  try {
      const response = await getInfoGroupesTotatles();
      return response.data;
  } catch (error) {
      console.error(error);
      setErrorServer(error.response.data)
      throw error;
  }
});


useEffect(() => {
  if (!isLoadingGetGroupes) {
    setGroupes(getInfoGroupes);
    setGroupesFilter(getInfoGroupes);
  }
}, [getInfoGroupes, isLoadingGetGroupes]);

  // Functions
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

/* Gestion des de filiere de groupe donné  ***************************
--------------------------------------------------

*/
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

  // Render
  return (
    <div className='div-creation-emplois'>
      <div className='div-emplois-headers'>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
        <div>
          <span>18/05/2024</span>
        </div>
      </div>
      <div className="div-emplois-body">
        <section className="groupe-module-section-emplois">
          <div className="div-groupe-ul">
            <div className="chargement chargement-module">
              <div style={{ width: "100%" }} className='filter-item-one'>
                <CiSearch className='filter-search' />
                <input
                  onChange={e => setFormDataSearch(e.target.value)}
                  value={formDataSearch}
                  onKeyUp={e => { if (e.key === 'Enter') handleSearch() }}
                  className='filter-input'
                  type="text"
                  style={{ fontSize: "15px" }}
                  placeholder='Rechercher un groupe ...'
                />
                <AiOutlineReload onClick={refreshModuleList} className="filter-button" />
              </div>
              {loadingDataSearch && <LinearProgress style={{ height: "0.14rem", borderRadius: "10px", width: "97%" }} color="success" />}
            </div>
            {/* <ul className='xxx'>
              {["DDOWFS201", "DD101", "DD102", "COM201", "COM202"].map((module, index) => (
                <li key={index}>
                  <span>{module}</span>
                  <BiAlarmAdd className='color-icons-add-emplois' />
                </li>
              ))}
            </ul> */}


            <ul className='groupedisponible-emplois'>
  {isLoadingGetGroupes ? (
    <div style={{ padding: 0 }} className='container'>
      {/* Affichage des indicateurs de chargement */}
      {[1,2,3,4].map((_, index) => (
        <Skeleton
          baseColor='#f7f7f7'
          highlightColor='#ebebeb'
          style={{ margin: "5px 0", width: "100%", height: "35px" }}
          key={index}
        />
      ))}
    </div>
  ) : groupesFilter.length === 0 ? (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
          marginTop:"30px"
        
        }}
        description={<span>Aucun résultat trouvé</span>}
      />
    </div>
  ) : (
    groupesFilter.map((groupe, index) => (
      <li onClick={()=>setCurrentGroupeEmplois({code:groupe.code,id:groupe.id})} key={index}>
         <span>{groupe.code}</span>
         <BiAlarmAdd className='color-icons-add-emplois' />
    </li>
        
    ))
  )}
</ul>












          </div>
          <div className="div-groupe-ul">
            <div className="module-groupe-text">
              Modules de Groupe
            </div>




            <ul className='groupedisponible-emplois'>
  {isLoadingModuleFiliereGroupes ? (
    <div style={{ padding: 0 }} className='container'>
      {/* Affichage des indicateurs de chargement */}
      {[1,2,3,4].map((_, index) => (
        <Skeleton
          baseColor='#f7f7f7'
          highlightColor='#ebebeb'
          style={{ margin: "5px 0", width: "100%", height: "35px" }}
          key={index}
        />
      ))}
    </div>
  ) :!getModuleFiliereGroupe || getModuleFiliereGroupe.length === 0 ? (
    <div>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
          marginTop:"30px"
        
        }}
        description={<span style={{display:"flex",flexDirection:"column"}}>
           <span>Aucun résultat trouvé</span>
           <span>ou</span>
           <span>Groupe non defini</span>
         </span>}
      />
    </div>
  ) : (
    getModuleFiliereGroupe.map((module, index) => (
      <li key={index}>
                  <span>
                    <GiBookmark className='color-icons-add-emplois icons-modules' />
                    {module?.description}
                  </span>
                </li>
        
    ))
  )}
</ul>


            {/* <ul className=''>
              {[
                "Création d'une application cloud", 
                "JavaScript", 
                "Approche Agile", 
                "Développement Front End", 
                "Développement Back End", 
                "Gestion des données"
              ].map((module, index) => (
               
              ))}
            </ul> */}
          </div>
        </section>
        <div>
        <h6 className='alert alert-info'>Création de l'emploi du temps pour le groupe <strong> {currentGroupeEmplois ? currentGroupeEmplois.code : "Veuillez sélectionner un groupe"}</strong></h6>          <table className="schedule-table">
            <thead>
              <tr>
                <th style={{color:"#000000dc", background: "rgb(244, 246, 248)"}} className="day-column">Jour/Heure</th>
                {hours.map((hour, index) => (
                  <th style={{borderLeft:index%2===0&&"1px dashed", color:"#000000dc", background: "rgb(244, 246, 248)" }} key={index} className="hour-column">{hour}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, dayIndex) => (
                <tr key={dayIndex} className="day-row">
                  <td style={{ border: "none" }} className="day-cell">{day}</td>
                  {hours.map((_, index) => (
                    <td
                      key={index}
                      onMouseDown={() => handleMouseDown(day, index)}
                      onMouseMove={() => handleMouseMove(day, index)}
                      onMouseUp={handleMouseUp}
                      className={`schedule-cell ${day === selection.day && index >= selection.startIndex && index <= selection.endIndex ? "selected-cell" : ""}`}
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className='publication-emplois'>
            <button className='btn btn-primary'>Publier</button>
          </div>
        </div>
      </div>
    </div>
  );
}
