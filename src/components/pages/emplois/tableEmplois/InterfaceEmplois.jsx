import React, { useState, useRef, useEffect } from 'react';
import './InterfaceEmplois.css';
import DialogContext from '../../animation/DialogContext';
import Disponibilite from '../Disponibilite';
import { useQuery } from 'react-query';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import { verificationSalleDisponible } from '../../../authservice/create_emplois_request/createEmploisRequest';
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const hours = [
  "08:30", "09:30", "09:30", "10:30", "10:30", "11:30", "11:30", "12:30",
  "12:30", "13:30", "13:30", "14:30", "14:30", "15:30", "15:30", "16:30",
  "16:30", "17:30", "17:30", "18:30"
];
export default function InterfaceEmplois({data}) {
  const {currentGroupeEmplois,dataEmploisFormateur,setDataEmploisFormateur, setDataSemploisSalle,setEmploisData,dataEmploisSalle, emploisData,openBac}=data

  
  const emplois={
    "Lundi":emploisData?.filter(element=>element.day==="Lundi"),
    "Mardi":emploisData?.filter(element=>element.day==="Mardi"),
    "Mercredi":emploisData?.filter(element=>element.day==="Mercredi"),
    "Jeudi":emploisData?.filter(element=>element.day==="Jeudi"),
    "Vendredi":emploisData?.filter(element=>element.day==="Vendredi"),
    "Samedi":emploisData?.filter(element=>element.day==="Samedi")
}
  const hasOneNotEmpty = Object.values(emplois)?.some(array => array?.length > 0);

// Recupeartion d'emplois du sallle ****************
  const emploisSalle={
    "Lundi":dataEmploisSalle.data?.filter(element=>element.day==="Lundi"),
    "Mardi":dataEmploisSalle.data?.filter(element=>element.day==="Mardi"),
    "Mercredi":dataEmploisSalle.data?.filter(element=>element.day==="Mercredi"),
    "Jeudi":dataEmploisSalle.data?.filter(element=>element.day==="Jeudi"),
    "Vendredi":dataEmploisSalle.data?.filter(element=>element.day==="Vendredi"),
    "Samedi":dataEmploisSalle.data?.filter(element=>element.day==="Samedi")
}
  const hasOneNotEmptySalle = Object.values(emploisSalle)?.some(array => array?.length > 0);
// console.log(hasOneNotEmptySalle)

// Recupeartion d'emplois du formateur ****************
const emploisFormateur={
  "Lundi":dataEmploisFormateur.data?.filter(element=>element.day==="Lundi"),
  "Mardi":dataEmploisFormateur.data?.filter(element=>element.day==="Mardi"),
  "Mercredi":dataEmploisFormateur.data?.filter(element=>element.day==="Mercredi"),
  "Jeudi":dataEmploisFormateur.data?.filter(element=>element.day==="Jeudi"),
  "Vendredi":dataEmploisFormateur.data?.filter(element=>element.day==="Vendredi"),
  "Samedi":dataEmploisFormateur.data?.filter(element=>element.day==="Samedi")
}
const hasOneNotEmptyFormateur = Object.values(emploisFormateur)?.some(array => array?.length > 0);


  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [selected, setSelected] = useState(false);
  const [width, setWidth] = useState(0);
  const [actuellePosition, setActuellePosition] = useState(45);
  const [cursor, setCursor] = useState(false);
  const containerRef = useRef(null);
  const [indexDay,setIndexDay]=useState(null)
  const [selection,setSelection]=useState({})
  const [nombreSeance,setNombreSeance]=useState(0)
  // const [right,setRight]=useState(0)
  // const [cordonne,setCordonne]=useState({x:null,y:null})

 
  useEffect(()=>{
    const nombreSeance=width/45
    const resultNombre=nombreSeance*0.5
    setNombreSeance(resultNombre)

  },[width])

  function handleMouseMove(event) {
    
    const { pageX,
      //  pageY 
      } = event;
    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = pageX - containerRect.left;
    // const relativeY = pageY - containerRect.top;
  // setCordonne({x:relativeX,y:relativeY})
    if (!selected) return;

    setCursor(true);

    let valeur = (relativeX - actuellePosition) / 45;
    let valeurWidthAdd = 45;
    const maxValue = 18;

    for (let i = 0; i <= maxValue; i++) {
      if (valeur > i) {
        valeurWidthAdd += 45;
      }
    }
    setWidth(valeurWidthAdd);
  }

  useEffect(()=>{
    setWidth(0)
  },[currentGroupeEmplois?.id])
  function  calculeRight(){
       let valeurInit=0;
       if(left===0){
           valeurInit=((width/45)*5)-5
       }else if(left==5){
           valeurInit=((width/45)*5)
       }else if(left==10){
        valeurInit=((width/45)*5)+5;
        }else if(left==15){
          valeurInit=((width/45)*5)+10;
          }else if(left==20){
            valeurInit=((width/45)*5)+15;
            }else if(left==25){
              valeurInit=((width/45)*5)+20;
              }else if(left==30){
                valeurInit=((width/45)*5)+25;
                }else if(left==35){
                  valeurInit=((width/45)*5)+30;
                  }else if(left==40){
                    valeurInit=((width/45)*5)+35;
                    }else if(left==45){
                      valeurInit=((width/45)*5)+40;
                      }else if(left==50){
                        valeurInit=((width/45)*5)+45;
                        }else if(left==55){
                          valeurInit=((width/45)*5)+50;
                          }else if(left==60){
                            valeurInit=((width/45)*5)+55;
                            }else if(left==65){
                              valeurInit=((width/45)*5)+60;
                              }else if(left==70){
                                valeurInit=((width/45)*5)+65;
                                }else if(left==75){
                                  valeurInit=((width/45)*5)+70;
                                  }else if(left==80){
                                    valeurInit=((width/45)*5)+75;
                                    }else if(left==85){
                                      valeurInit=((width/45)*5)+80;
                                      }else if(left==90){
                                        valeurInit=((width/45)*5)+85;
                                        }else if(left==95){
                                          valeurInit=((width/45)*5)+90;
                                          }
        return valeurInit;
  }
  function calculeLeft(valeurX) {
    if (valeurX > 900) {
      valeurX = 900;
    }

    let pourcentage = 0;
    let position = 45;
    if (valeurX <= 45) {
      pourcentage = 0;
      position = 45;
    } else if (valeurX <= 90) {
      pourcentage = 5;
      position = 90;
    } else if (valeurX <= 135) {
      pourcentage = 10;
      position = 135;
    } else if (valeurX <= 180) {
      pourcentage = 15;
      position = 180;
    } else if (valeurX <= 225) {
      pourcentage = 20;
      position = 225;
    } else if (valeurX <= 270) {
      pourcentage = 25;
      position = 270;
    } else if (valeurX <= 315) {
      pourcentage = 30;
      position = 315;
    } else if (valeurX <= 360) {
      pourcentage = 35;
      position = 360;
    } else if (valeurX <= 405) {
      pourcentage = 40;
      position = 405;
    } else if (valeurX <= 450) {
      pourcentage = 45;
      position = 450;
    } else if (valeurX <= 495) {
      pourcentage = 50;
      position = 495;
    } else if (valeurX <= 540) {
      pourcentage = 55;
      position = 540;
    } else if (valeurX <= 585) {
      pourcentage = 60;
      position = 585;
    } else if (valeurX <= 630) {
      pourcentage = 65;
      position = 630;
    } else if (valeurX <= 675) {
      pourcentage = 70;
      position = 675;
    } else if (valeurX <= 720) {
      pourcentage = 75;
      position = 720;
    } else if (valeurX <= 765) {
      pourcentage = 80;
      position = 765;
    } else if (valeurX <= 810) {
      pourcentage = 85;
      position = 810;
    } else if (valeurX <= 855) {
      pourcentage = 90;
      position = 855;
    } else if (valeurX <= 900) {
      pourcentage = 95;
      position = 900;
    } else {
      pourcentage = 100;
      position = 900;
    }

    setLeft(pourcentage);
    setActuellePosition(position);
  }

  function calculeTop(valeurY) {
    if (valeurY > 310) {
      valeurY = 310;
    }
    let indexDay=null
    let pourcentage = 0;
    if (valeurY <= 51.66) {
      pourcentage = 0;
      indexDay=0;
    } else if (valeurY <= 103.32) {
      pourcentage = 16.66; 
      indexDay=1  // La formule de calcule de pourcentage est la suivante : (51.66/310)*100
    } else if (valeurY <= 154.98) {
      pourcentage = 33.32;
      indexDay=2
    } else if (valeurY <= 206.64) {
      pourcentage = 49.98;
      indexDay=3
    } else if (valeurY <= 258.3) {
      pourcentage = 66.65;
      indexDay=4;
    } else if (valeurY <= 309.96) {
      pourcentage = 83.32;
      indexDay=5
    } else {
      pourcentage = 83.32;
      indexDay=5
    }
    setTop(pourcentage);
    setIndexDay(indexDay)
  }
  var right = 0;

  function handleMouseDown(event) {
    if(dataEmploisSalle?.selectedSalle){
      return
   }
   if(dataEmploisFormateur?.selectedFormateur){
    return
 }
      const { pageX, pageY } = event;
      setWidth(45);
      right = 0; // Reset right to zero on mousedown
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeX = pageX - containerRect.left;
      const relativeY = pageY - containerRect.top;
      calculeLeft(relativeX);
      calculeTop(relativeY);
      setSelected(true);
  }

  // debut de verifcation des salles dispinibles .......
  const [errorServer,setErrorServer]=useState({})
  const [sallesDisponibles, setSallesDisponibles] = useState([]);
  const [formateursDisponibles, setFormateursDisponibles] = useState([]);

  const [startFetching, setStartFetching] = useState(false);

  const {  isLoading } = useQuery(
    ['verification-salle-disponible', selection],
    async () => {
      try {
        const response = await verificationSalleDisponible({idGroupe:currentGroupeEmplois?.id, day:selection.day,start:selection.startIndex,end:selection.endIndex});
        return response.data;
      } catch (error) {
        setErrorServer(error.response?.data || 'Une erreur est survenue');
      }
    },
    {
      enabled: startFetching,
      onSuccess: (data) => {
        setSallesDisponibles(data?.salles);
        setFormateursDisponibles(data?.formateurs)
        setStartFetching(false);
      },
      onError: () => {
        setStartFetching(false);
      }
    }
  );

  useEffect(() => {
    if (!isLoading && startFetching) {
      setStartFetching(false);
    }
  }, [isLoading, startFetching]);

  // fin de  la verifcation des salles  et formateurs disponibles .......
  function handleMouseUp() {
      setSelected(false);
      setCursor(false);
      right = calculeRight(); // Calculate right value on mouseup
      setSelection({ day: days[indexDay], top: top, endIndex: right, startIndex: left, width: width });
      if (right > left) {
          handleClickOpen();
          if (!isLoading) {
              setStartFetching(true);
              right = 0; // Reset right after starting fetch
          }
      }
  }
  

useEffect(()=>{
  setDataSemploisSalle(prev=> ({...prev,selectedSalle:false}))
  setDataEmploisFormateur(prev=> ({...prev,selectedFormateur:false}))

},[currentGroupeEmplois])

// useEffect(()=>{
//   setDataEmploisFormateur(prev=> ({...prev,selectedFormateur:false}))

// },[dataEmploisSalle])



  // ouverture de dialogue pour les salles disponible
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(()=>{
      if(!dataEmploisSalle?.loading && dataEmploisSalle?.selectedSalle){
         setWidth(0)
      }
  },[dataEmploisSalle?.selectedSalle,dataEmploisSalle?.loading])

  useEffect(()=>{
    if(!dataEmploisFormateur?.loading && dataEmploisFormateur?.selectedFormateur){
       setWidth(0)
    }
},[dataEmploisFormateur?.selectedFormateur,dataEmploisFormateur?.loading])



  const showNotification = () => {
    notification.info({
      message: 'Salle est totalement disponible ',
      description: 'La salle est actuellement libre. Vous pouvez effectuer une réservation si nécessaire. Merci!',
      icon: <SmileOutlined style={{ color: 'rgb(10, 148, 102)' }} />,
      duration: 6,
      placement: 'topLeft',
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!hasOneNotEmptySalle && dataEmploisSalle?.selectedSalle && !dataEmploisSalle.loading) {
        showNotification();
      }
    }, 500);

    // Nettoyage du timeout lorsque le composant est démonté ou les dépendances changent
    return () => clearTimeout(timeoutId);
  }, [hasOneNotEmptySalle, dataEmploisSalle?.selectedSalle, dataEmploisSalle.loading]);
// console.log(hasOneNotEmptySalle)

console.log(dataEmploisFormateur?.selectedFormateur)

  return (
    <section className='sectionEmplois'>
       <DialogContext setOpen={setOpen} open={open}>
        <Disponibilite  
          start={selection.startIndex}
          end={selection.endIndex}
          day={selection.day}
          width={selection.width}
          isLoadingSalleGet={isLoading}
          salles={sallesDisponibles}
          formateurs={formateursDisponibles}
          setStartFetching={setStartFetching}
          handleClose={handleClose}
          top={top}
          setEmploisData={setEmploisData}
          nombreSeance={nombreSeance}
          currentGroupeEmplois={currentGroupeEmplois}
        />
      </DialogContext>
      <article className="headerEmplois">
          <div className='jourHeure'>
               J/H
          </div>
          <div className='HeureEmplois'>
           {
            hours.map((hour,index)=>{
                  return <span  style={{borderRight:index%2!==0?"1px solid #ffff":"1px dashed #ffffffad"}}  className='hourEmploisSpan' key={index}>{hour}</span>
            })
          }
           {/* {JSON.stringify(selection)} */}
          </div>
      </article>
      <article className="bodyEmplois">
  <div className="dayEmplois">
    {days.map((day, index) => (
      <span
        style={{ borderBottom: index === 5 ? "none" : "" }}
        className="dayEmploisSpan"
        key={index}
      >
        {day}
      </span>
    ))}
  </div>
  <div style={{ width: 900, height: 310, position: "relative" }} className="backdropEmplois">
    <div
      ref={containerRef}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className={`containerEmplois ${cursor ? "cursorResize" : ""}`}
    >
      <span
        style={{
          width: `${width}px`,
          top: `${top}%`,
          left: `${left}%`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        className="spanCol"
      >
        <span className={`${width > 0 ? "howNombreSeance" : "hideNombreSeance"}`}>
          {nombreSeance}h
        </span>
      </span>
      {dataEmploisSalle?.selectedSalle ? (
        !dataEmploisSalle.loading?
        hasOneNotEmptySalle ?
        Object.keys(emploisSalle).map((day) => (
          <React.Fragment key={day}>
            {emploisSalle[day].map((emploi, index) => (
              <span
                className="SpanSeanceGroupe"
                style={{
                  backgroundColor: "green" ,
                  top: `${emploi.startTop}%`,
                  left: `${emploi.startIndex}%`,
                  width: emploi.width,
                }}
                key={index}
              >
                <span style={{ textTransform: "capitalize", fontSize: "14px" }}>
                  {emploi?.formateurInfo}
                </span>
                  <span style={{ fontSize: "13px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    {/* <span style={{ fontSize: "11px" }}>{emploi.module}</span> */}
                    <span>{emploi.groupe}</span>
                  </span>
                
              </span>
            ))}
          </React.Fragment>
        )):null
      :null) : 
      dataEmploisFormateur.selectedFormateur?
      (
        !dataEmploisFormateur.loading?
        hasOneNotEmptyFormateur ?
        Object.keys(emploisFormateur).map((day) => (
          <React.Fragment key={day}>
            {emploisFormateur[day].map((emploi, index) => (
              <span
                className="SpanSeanceGroupe"
                style={{
                  backgroundColor: emploi.typeReservation === "FAD" ? "sienna" : "mediumblue",
                  top: `${emploi.startTop}%`,
                  left: `${emploi.startIndex}%`,
                  width: emploi.width,
                }}
                key={index}
              >
                <span style={{ textTransform: "capitalize", fontSize: "14px" }}>
                  {emploi?.formateurInfo}
                </span>
                  <span style={{ fontSize: "13px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    {/* <span style={{ fontSize: "11px" }}>{emploi.module}</span> */}
                    <span>{emploi.groupe}</span>
                  </span>
                
              </span>
            ))}
          </React.Fragment>
        )):null
      :null) 

        :
         (
        hasOneNotEmpty &&
        Object.keys(emplois).map((day) => (
          <React.Fragment key={day}>
            {emplois[day].map((emploi, index) => (
              <span
                className="SpanSeanceGroupe"
                style={{
                  backgroundColor: emploi.typeReservation === "FAD" ? "rgba(148, 0, 211, 0.599)" : "",
                  top: `${emploi.startTop}%`,
                  left: `${emploi.startIndex}%`,
                  width: emploi.width,
                }}
                key={index}
              >
                <span style={{ textTransform: "capitalize", fontSize: "13px" }}>
                  {emploi?.formateurInfo}
                </span>

                {emploi.typeReservation === "FP" ? (
                  <span style={{ fontSize: "10px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <span style={{ fontSize: "11px" }}>{emploi.module}</span>
                    <span>{emploi.salle}</span>
                  </span>
                ) : (
                  <span style={{ fontSize: "10px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <span style={{ fontSize: "11px" }}>{emploi.module}</span>
                    <span>{emploi.typeReservation}</span>
                  </span>
                )
                
                }


              </span>
            ))}
          </React.Fragment>
        ))
      )}
    </div>
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: openBac ? "flex" : "none",
      }}
      open={openBac}
    >
      <CircularProgress style={{ marginTop: "-40px" }} color="inherit" />
    </Backdrop>
  </div>
</article>

    </section>
  );
}
