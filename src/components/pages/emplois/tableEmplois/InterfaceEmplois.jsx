import React, { useState, useRef, useEffect } from 'react';
import './InterfaceEmplois.css';
const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const hours = [
  "08:30", "09:30", "09:30", "10:30", "10:30", "11:30", "11:30", "12:30",
  "12:30", "13:30", "13:30", "14:30", "14:30", "15:30", "15:30", "16:30",
  "16:30", "17:30", "17:30", "18:30"
];
export default function InterfaceEmplois() {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [selected, setSelected] = useState(false);
  const [width, setWidth] = useState(45);
  const [actuellePosition, setActuellePosition] = useState(45);
  const [cursor, setCursor] = useState(false);
  const containerRef = useRef(null);

  const [cordonne,setCordonne]=useState({x:null,y:null})
  function handleMouseMove(event) {
    
    const { pageX, pageY } = event;
    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = pageX - containerRect.left;
    const relativeY = pageY - containerRect.top;
  setCordonne({x:relativeX,y:relativeY})
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
    if (valeurY > 350) {
      valeurY = 350;
    }

    let pourcentage = 0;
    if (valeurY <= 58.33) {
      pourcentage = 0;
    } else if (valeurY <= 116.66) {
      pourcentage = 16.66;
    } else if (valeurY <= 174.99) {
      pourcentage = 33.32;
    } else if (valeurY <= 233.32) {
      pourcentage = 49.98;
    } else if (valeurY <= 291.65) {
      pourcentage = 66.64;
    } else if (valeurY <= 349.98) {
      pourcentage = 83.3;
    } else {
      pourcentage = 83.3;
    }
    setTop(pourcentage);
  }

  function handleMouseDown(event) {
    const { pageX, pageY } = event;
    setWidth(45);
    const containerRect = containerRef.current.getBoundingClientRect();
    const relativeX = pageX - containerRect.left;
    const relativeY = pageY - containerRect.top;
    calculeLeft(relativeX);
    calculeTop(relativeY);
    setSelected(true);
  }

  function handleMouseUp() {
    setSelected(false);
    setCursor(false);
  }

  return (
    <section className='sectionEmplois'>
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
          </div>
      </article>
      <article className="bodyEmplois">
        <div className="dayEmplois">
          {
            days.map((day,index)=>{
                  return <span className='dayEmploisSpan' key={index}>{day}</span>
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
