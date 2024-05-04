import  { useState } from 'react';
import './indexleft.css';
import { VscDebugBreakpointData } from 'react-icons/vsc';
import { SiGoogledomains, SiPowerapps } from 'react-icons/si';
import { MdNavigateNext, MdCheckroom } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { GiTeacher } from 'react-icons/gi';
import { BsBrowserEdge } from 'react-icons/bs';
import Button from '@mui/material/Button';
import { FaUsers, FaBookReader, FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// const date=new Date()
  
// function getDayString(idDay){
//       switch(idDay){
//             case 1:
//                  return "Lundi";
//             case 2:
//                   return "Mardi";
//             case 3:
//                   return "Mercredi";
//             case 4:
//                   return "Jeudi";
//             case 5:
//                   return "Vendredi";
//             case 6:
//                  return "Samedi";
//             case 7:
//                  return "Dimanche";
//             default :
//                    return null
//         }
// }

// function getMonthString(idMonth){
//   switch(idMonth){
//         case 1:
//              return "Janvier";
//         case 2:
//               return "Fevrier";
//         case 3:
//               return "Mars";
//         case 4:
//               return "Avril";
//         case 5:
//               return "Mai";
//         case 6:
//              return "Juin";
//         case 7:
//              return "Juillet";
//              case 8:
//               return "Aout";
//               case 9:
//                 return "Septembre";
//                 case 10:
//                   return "Octobre";
//                   case 11:
//              return "Novembre";
//              case 12:
//               return "Decembre";
//         default :
//                return null
//     }
// }

// const jour=getDayString(date.getDay())
// const journumber=date.getDate();
// const moisSring=getMonthString(date.getMonth()+1)
// const annee=date.getFullYear()

export default function NavBarLeft() {
  // State pour gérer l'état de survol des éléments et l'état d'ouverture des sous-menus
  const [elementHover, setElementHover] = useState(1);
  const [open, setOpen] = useState({
    formateur: true,
    salle: true,
    module: true,
    filiere: true,
    groupe: true,
    admin: true,
    stagiaire: true,
  });

  // State pour gérer les éléments survolés dans les sous-menus
  const [overItems, setOverItems] = useState({
    formateur: null,
    salle: null,
    module: null,
    filiere: null,
    groupe: null,
    admin: null,
    stagiaire: null,
  });

  return (
    <nav className="nav">
      <ul className="nav-ul">
        {/* Emplacement pour l'icône principale */}
        <div className="nav-icon">
          <BsBrowserEdge />

          {/* <span className="date">
              { jour} le {journumber} {moisSring} {annee}
            </span> */}
        </div>
        <li>
          <div className="nav-text">
            <div>Dashboard    </div>
            <ul className="nav-ul-child">
              {/* Sous-menu App */}
              <li onClick={() => setElementHover(1)}>
                <Link to="dashboard"  className="containerLink">
                  <Button className={`contained ${elementHover === 1 ? 'elementHoverBackground' : ''}`} style={{ boxShadow: 'none' }} variant="contained">
                    <span className="span-li">
                      <SiPowerapps style={{ color: elementHover === 1 ? 'rgb(0, 167, 111)' : '' }} className="span-li-icon" /> <span className={`${elementHover === 1 ? 'hoverColor' : ''}`}>App</span>
                    </span>
                  </Button>
                </Link>
              </li>
              {/* Sous-menu Créer emploi */}
              <li onClick={() => setElementHover(2)}>
                <Link className="containerLink">
                  <Button className={`contained ${elementHover === 2 ? 'elementHoverBackground' : ''}`} style={{ boxShadow: 'none' }} variant="contained">
                    <span className="span-li">
                      <FaCalendar style={{ color: elementHover === 2 ? 'rgb(0, 167, 111)' : '' }} className="span-li-icon" /> <span className={`${elementHover === 2 ? 'hoverColor' : ''}`}>Créer emploi</span>
                    </span>
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </li>
        {/* Menu Gestion */}
        <li>
          <div className="nav-text">
            <div>Gestion</div>
            <ul className="nav-ul-child">
              {/* Espace Formateur */}
              <li className="li-parent">
                <Button
                  className={`contained ${elementHover === 3 ? 'elementHoverBackground' : ''}`}
                  onClick={() => {
                    setOpen(prev => ({ ...prev, formateur: !prev.formateur }));
                    setElementHover(3);
                  }}
                  style={{ boxShadow: 'none' }}
                  variant="contained">
                  <span className="span-li">
                    <GiTeacher style={{ color: elementHover === 3 ? 'rgb(0, 167, 111)' : '' }} className="span-li-icon" /> <span className={`${elementHover === 3 ? 'hoverColor' : ''}`}>Formateur</span>
                  </span>
                  <MdNavigateNext style={{ color: elementHover === 3 ? 'rgb(0, 167, 111)' : '' }} className={`icons-init ${!open.formateur ? 'icons-change' : ''}`} />
                </Button>
                {/* Sous-menu Formateur */}
                <ul className={`ul-li-parent`}>
                  <li className={`ss ${open.formateur ? 'sshide' : ''}`}>
                    <Link  to="formateur/ajouter-formateur" className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, formateur: 1 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.formateur === 1 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Nouveau Formateur</span>
                    </Link>
                    <Link to="formateur/liste-formateur" className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, formateur: 2 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.formateur === 2 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Liste des Formateurs </span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Espace Salle */}
              <li className="li-parent">
                <Button
                  className={`contained ${elementHover === 4 ? 'elementHoverBackground' : ''}`}
                  onClick={() => {
                    setOpen(prev => ({ ...prev, salle: !prev.salle }));
                    setElementHover(4);
                  }}
                  style={{ boxShadow: 'none' }}
                  variant="contained">
                  <span className="span-li">
                    <MdCheckroom style={{ color: elementHover === 4 ? 'rgb(0, 167, 111)' : '' }} className="span-li-icon" /> <span className={`${elementHover === 4 ? 'hoverColor' : ''}`}>Salle</span>
                  </span>
                  <MdNavigateNext style={{ color: elementHover === 4 ? 'rgb(0, 167, 111)' : '' }} className={`icons-init ${!open.salle ? 'icons-change' : ''}`} />
                </Button>
                {/* Sous-menu Salle */}
                <ul className={`ul-li-parent`}>
                  <li className={`ss ${open.salle ? 'sshide' : ''}`}>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, salle: 1 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.salle === 1 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Créer</span>
                    </Link>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, salle: 2 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.salle === 2 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Liste</span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Espace Module */}
              <li className="li-parent">
                <Button
                  className={`contained ${elementHover === 5 ? 'elementHoverBackground' : ''}`}
                  onClick={() => {
                    setOpen(prev => ({ ...prev, module: !prev.module }));
                    setElementHover(5);
                  }}
                  style={{ boxShadow: 'none' }}
                  variant="contained">
                  <span className="span-li">
                    <FaBookReader style={{ color: elementHover === 5 ? 'rgb(0, 167, 111)' : '' }} className="span-li-icon" /> <span className={`${elementHover === 5 ? 'hoverColor' : ''}`}>Module</span>
                  </span>
                  <MdNavigateNext style={{ color: elementHover === 5 ? 'rgb(0, 167, 111)' : '' }} className={`icons-init ${!open.module ? 'icons-change' : ''}`} />
                </Button>
                {/* Sous-menu Module */}
                <ul className={`ul-li-parent`}>
                  <li className={`ss ${open.module ? 'sshide' : ''}`}>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, module: 1 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.module === 1 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Créer</span>
                    </Link>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, module: 2 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.module === 2 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Liste</span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Espace Filiere */}
              <li className="li-parent">
                <Button
                  className={`contained ${elementHover === 6 ? 'elementHoverBackground' : ''}`}
                  onClick={() => {
                    setOpen(prev => ({ ...prev, filiere: !prev.filiere }));
                    setElementHover(6);
                  }}
                  style={{ boxShadow: 'none' }}
                  variant="contained">
                  <span className="span-li">
                    <SiGoogledomains style={{ color: elementHover === 6 ? 'rgb(0, 167, 111)' : '' }} className="span-li-icon" /> <span className={`${elementHover === 6 ? 'hoverColor' : ''}`}>Filiere</span>
                  </span>
                  <MdNavigateNext style={{ color: elementHover === 6 ? 'rgb(0, 167, 111)' : '' }} className={`icons-init ${!open.filiere ? 'icons-change' : ''}`} />
                </Button>
                {/* Sous-menu Filiere */}
                <ul className={`ul-li-parent`}>
                  <li className={`ss ${open.filiere ? 'sshide' : ''}`}>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, filiere: 1 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.filiere === 1 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Créer</span>
                    </Link>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, filiere: 2 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.filiere === 2 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Liste</span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Espace Groupe */}
              <li className="li-parent">
                <Button
                  className={`contained ${elementHover === 7 ? 'elementHoverBackground' : ''}`}
                  onClick={() => {
                    setOpen(prev => ({ ...prev, groupe: !prev.groupe }));
                    setElementHover(7);
                  }}
                  style={{ boxShadow: 'none' }}
                  variant="contained">
                  <span className="span-li">
                    <FaUsers style={{ color: elementHover === 7 ? 'rgb(0, 167, 111)' : '' }} className="span-li-icon" /> <span className={`${elementHover === 7 ? 'hoverColor' : ''}`}>Groupe</span>
                  </span>
                  <MdNavigateNext style={{ color: elementHover === 7 ? 'rgb(0, 167, 111)' : '' }} className={`icons-init ${!open.salle ? 'icons-change' : ''}`} />
                </Button>
                {/* Sous-menu Groupe */}
                <ul className={`ul-li-parent`}>
                  <li className={`ss ${open.groupe ? 'sshide' : ''}`}>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, groupe: 1 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.groupe === 1 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Créer</span>
                    </Link>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, groupe: 2 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.groupe === 2 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Liste</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        {/* Menu Administration */}
        <li>
          <div className="nav-text">
            <div>Administration</div>
            <ul className="nav-ul-child">
              {/* Espace Stagiaire */}
              <li className="li-parent">
                <Button
                  className={`contained ${elementHover === 8 ? 'elementHoverBackground' : ''}`}
                  onClick={() => {
                    setOpen(prev => ({ ...prev, stagiaire: !prev.stagiaire }));
                    setElementHover(8);
                  }}
                  style={{ boxShadow: 'none' }}
                  variant="contained">
                  <span className="span-li">
                    <GiTeacher style={{ color: elementHover === 8 ? 'rgb(0, 167, 111)' : '' }} className="span-li-icon" /> <span className={`${elementHover === 8 ? 'hoverColor' : ''}`}>Stagiaire</span>
                  </span>
                  <MdNavigateNext style={{ color: elementHover === 8 ? 'rgb(0, 167, 111)' : '' }} className={`icons-init ${!open.stagiaire ? 'icons-change' : ''}`} />
                </Button>
                {/* Sous-menu Stagiaire */}
                <ul className={`ul-li-parent`}>
                  <li className={`ss ${open.stagiaire ? 'sshide' : ''}`}>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, stagiaire: 1 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.stagiaire === 1 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Créer</span>
                    </Link>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, stagiaire: 2 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.stagiaire === 2 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Liste</span>
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Espace Administrateur */}
              <li className="li-parent">
                <Button
                  className={`contained ${elementHover === 9 ? 'elementHoverBackground' : ''}`}
                  onClick={() => {
                    setOpen(prev => ({ ...prev, admin: !prev.admin }));
                    setElementHover(9);
                  }}
                  style={{ boxShadow: 'none' }}
                  variant="contained">
                  <span className="span-li">
                    <RiAdminFill style={{ color: elementHover === 9 ? 'rgb(0, 167, 111)' : '' }} className="span-li-icon" /> <span className={`${elementHover === 9 ? 'hoverColor' : ''}`}>Administrateur</span>
                  </span>
                  <MdNavigateNext style={{ color: elementHover === 9 ? 'rgb(0, 167, 111)' : '' }} className={`icons-init ${!open.admin ? 'icons-change' : ''}`} />
                </Button>
                {/* Sous-menu Administrateur */}
                <ul className={`ul-li-parent`}>
                  <li className={`ss ${open.admin ? 'sshide' : ''}`}>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, admin: 1 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.admin === 1 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Créer</span>
                    </Link>
                    <Link className="a-ul-li-parent" onClick={() => setOverItems(prev => ({ ...prev, admin: 2 }))}>
                      <VscDebugBreakpointData style={{ fontSize: '10px', color: overItems.admin === 2 ? 'rgb(0, 167, 111)' : '' }} className="point-a" />
                      <span className="text-a">Liste</span>
                    </Link>
                  </li>
                  <div className="padding"></div>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}
