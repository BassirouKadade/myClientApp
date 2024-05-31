import React, { useState, useEffect } from 'react';
import './occupation.css'; // Import des styles CSS
import Skeleton from 'react-loading-skeleton'; // Import du composant Skeleton pour l'affichage de chargement
import 'react-loading-skeleton/dist/skeleton.css';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Typography } from '@mui/material';
import { getEmploisDay } from '../../../authservice/create_emplois_request/createEmploisRequest';

export default function OccupationJour() {
  const { day } = useParams(); // Récupération du paramètre de l'URL correspondant au jour

  // Définition des heures de la journée
  const hours = [
    "08:30", "09:30", "09:30", "10:30", "10:30", "11:30", "11:30", "12:30",
    "12:30", "13:30", "13:30", "14:30", "14:30", "15:30", "15:30", "16:30",
    "16:30", "17:30", "17:30", "18:30"
  ];

  // Définition des jours de la semaine
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Définition des éléments de la barre de navigation
  const breadcrumbs = [
    <Link
      key="1"
      to="/dashboard"
      style={{ fontSize: '15px', textDecoration: 'none', color: 'rgba(99, 115, 119, 0.7)' }}
    >
      Dashboard
    </Link>,
    <Link
      key="2"
      to="/creer-emploi"
      style={{ fontSize: '15px', textDecoration: 'none', color: 'rgba(99, 115, 119, 0.7)' }}
    >
      Création d'emplois du temps
    </Link>,
    <Typography key="3" style={{ fontSize: '15px' }} color="text.primary">
      Consultation
    </Typography>,
    <Typography key="4" style={{ fontSize: '15px' }} color="text.primary">
      {day}
    </Typography>
  ];

  // Utilisation de React Query pour récupérer les données de l'API
  const { data, isLoading } = useQuery(['get-Emplois-day', day],
    async () => {
      try {
        // await new Promise(resolve=>setTimeout(resolve,2000))
        const response = await getEmploisDay(day);
        return response.data;
      } catch (error) {
        // Gestion des erreurs
        setErrorServer(error.response?.data || 'Une erreur est survenue');
      }
    },
    {
      enabled: !!day, // Activation de la requête uniquement si day est défini
    }
  );

  // Utilisation de l'état local pour stocker les données des emplois
  const [dataEmplois, setDataEmplois] = useState([]);

  // Effet de mise à jour pour mettre à jour les données des emplois
  useEffect(() => {
    if (!isLoading && data) {
      setDataEmplois(data);
    }
  }, [isLoading, data]);

  // Calcul des salles uniques
  const sallesFind = Array.from(new Set(dataEmplois?.map(emploi =>emploi.salle!=="0"?emploi.salle:null).filter(emploi=>emploi!==null)));
const FAPSeance=dataEmplois?.filter(emploi =>emploi.salle==="0")
  console.log("FAD",FAPSeance)
  // Création d'un objet contenant les emplois par salle
  const salleSeanceEmplois = sallesFind.map((salle) => ({
    [salle]: data?.filter(emploi => emploi.salle === salle)
  }));

  

  console.log(salleSeanceEmplois);

  return (
    <section className='sectionEmploisDay'>
      <div style={{ margin: "16px 0" }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <article className="headerEmplois" style={{height:"50px"}}>
        <div className='jourHeure' style={{borderRight:"1px solid #000"}}>
          SALLES
        </div>
        <div className='HeureEmplois'>
          {/* Affichage des heures */}
          {hours.map((hour, index) => (
            <span
              style={{ borderRight: index % 2 !== 0 ? "1px solid #000" : "1px dashed #fff" }}
              className='hourEmploisSpan'
              key={index}
            >
              {hour}
            </span>
          ))}
        </div>
      </article>
      <article className="bodyEmploisEmploiDay">
      <div className="dayEmploisDay">
  {/* Affichage des salles ou des placeholders si en chargement */}
  {isLoading ?
    [1, 2, 3, 4, 5, 6].map((_, index) => (
      <Skeleton baseColor='#f7f7f7' highlightColor='#ebebeb' style={{ width: "100%", height: "45px" }} key={index} />
    )) :
    <>
      {sallesFind.map((salle, index) => (
        <span
          style={{ backgroundColor:"rgb(199, 194, 194)", borderBottom: index === sallesFind.length - 1 ? "" : "1px solid #fff" }}
          className='salleEmploisKey'
          key={index}
  
        >
          {salle === "0" ? "FAD" : salle}
        </span>
      ))}
      {[...Array(FAPSeance.length)].map((_, index) => (
        <span
          style={{ backgroundColor:"rgb(199, 194, 194)",
          borderTop: index === 0  &&"1px solid #fff",
          borderBottom: index === FAPSeance.length - 1 ? "" : "1px solid #fff" }}
          className='salleEmploisKey'
          key={index + sallesFind.length}
        >
          {"FAD"}
        </span>
      ))}
    </>
  }
</div>

        <div style={{ width: 900, height:"auto", position: "relative" }} className="backdropEmplois">
            {salleSeanceEmplois.map((emploi, index) => {
              return <div className='rowSeanceSalle' style={{ position: "relative" }} key={index}>
                {Object.keys(emploi).map((salle) => {
                  return emploi[salle].map((seance, j) => (
                    <span
                      className="SpanSeanceGroupe"
                      style={{
                        backgroundColor: "violet",
                        top: 0,
                        left: `${seance.startIndex}%`,
                        width: seance.width,
                      }}
                      key={j}
                    >
                      <span style={{ textTransform: "capitalize", fontSize: "14px" }}>
                        {seance?.formateurInfo}
                      </span>
                      <span style={{ fontSize: "13px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <span>{seance.groupe}</span>
                      </span>
                    </span>
                  ))
                })}
               
              </div>
            })}
             {
                  FAPSeance.map((seance,j)=>{
                      return  <div className='rowSeanceSalle' style={{ position: "relative" }} key={j} >
                              <span
                      className="SpanSeanceGroupe"
                      style={{
                        backgroundColor: "green",
                        top: 0,
                        left: `${seance.startIndex}%`,
                        width: seance.width,
                      }}
                      key={j}
                    >
                      <span style={{ textTransform: "capitalize", fontSize: "14px" }}>
                        {seance?.formateurInfo}
                      </span>
                      <span style={{ fontSize: "13px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <span>{seance.groupe}</span>
                      </span>
                    </span>
                      </div>
                  })
                }
        </div>
      </article>
    </section>
  );
}
``
