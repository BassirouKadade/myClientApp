import React, { useState, useRef, useEffect } from 'react';
import './InterfaceEmplois.css';
import DialogContext from '../../animation/DialogContext';
import Disponibilite from '../Disponibilite';
import { useQuery } from 'react-query';
import { verificationSalleDisponible } from '../../../authservice/create_emplois_request/createEmploisRequest';
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const hours = [
  "08:30", "09:30", "09:30", "10:30", "10:30", "11:30", "11:30", "12:30",
  "12:30", "13:30", "13:30", "14:30", "14:30", "15:30", "15:30", "16:30",
  "16:30", "17:30", "17:30", "18:30"
];
export default function InterfaceEmplois({data}) {
  const {currentGroupeEmplois}=data

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [selected, setSelected] = useState(false);
  const [width, setWidth] = useState(45);
  const [actuellePosition, setActuellePosition] = useState(45);
  const [cursor, setCursor] = useState(false);
  const containerRef = useRef(null);
  const [indexDay,setIndexDay]=useState(null)
  const [selection,setSelection]=useState({})
  // const [right,setRight]=useState(0)
  // const [cordonne,setCordonne]=useState({x:null,y:null})
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
  const [startFetching, setStartFetching] = useState(false);

  const {  isLoading } = useQuery(
    ['verification-salle-disponible', selection],
    async () => {
      try {
        const response = await verificationSalleDisponible({day:selection.day,start:selection.startIndex,end:selection.endIndex});
        return response.data;
      } catch (error) {
        setErrorServer(error.response?.data || 'Une erreur est survenue');
      }
    },
    {
      enabled: startFetching,
      onSuccess: (data) => {
        setSallesDisponibles(data);
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
  

  // ouverture de dialogue pour les salles disponible
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

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
          setStartFetching={setStartFetching}
          handleClose={handleClose}
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
          {
            days.map((day,index)=>{
                  return <span style={{borderBottom:index===5?"none":""}} className='dayEmploisSpan' key={index}>{day}</span>
            })
          }
        </div>
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
              display:"flex",
              justifyContent:"center",
              alignItems:"center",
              flexDirection:"column"
            }} 
            className='spanCol'
          >
               <span>
                   S102
               </span>
               <span>
                  RIAD
               </span>
          </span>
        </div>
      </article>
    </section>
  );
}
