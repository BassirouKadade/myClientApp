import React, { useEffect, useState } from 'react';
import { AiOutlineReload } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import Modifcation from './Modifcation'; // Importation du composant de modification
import Checkbox from '@mui/material/Checkbox';
import DialogContext from '../../animation/DialogContext'; // Contexte de la boîte de dialogue
import './listeFormateurs.css';
import Button from '@mui/material/Button';
import { Popconfirm } from 'antd';
import { FaPlus } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import listeObjets from './formateur'; // Liste d'objets factices pour le chargement squelettique
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from '@mui/material/Pagination';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { listeFormateur, formateurSearch } from '../../../authservice/formateur-request/formateurRquest'; // Fonctions de requête pour récupérer la liste et rechercher des formateurs
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MdDelete } from "react-icons/md";
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { message } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import { SmileOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { FaArrowUp } from "react-icons/fa6";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { PiExportBold } from "react-icons/pi";
import { Tooltip } from 'antd';
import { supprimerformateur } from '../../../authservice/formateur-request/formateurRquest'; // Fonction pour supprimer un formateur
import { MdModeEditOutline } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
// import markPeopleImage from '../../../assets/mark-people.png';
// import backgroundImage from '../../../assets/1616615797_51-p-krasnii-fon-na-ves-ekran-57.jpg';
import { FaExclamationCircle } from "react-icons/fa";
/*
   1 ---- Probeleme de pagination pour la recherche  
   2 ----  Probleme de rechercher pour le loading   
   3 ----  Probleme de note found pour la list au niveau de demarae
   4 ----  Porbeleme de detaill
   5 ----  Ajout des modules users
   6 ----  xprter en PDF la liste des users
   7 ---- Afficher le message pour le suer lors de deamarde pour Entrer au niveau de recheche
*/

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const ITEM_HEIGHT = 48;

/* 
****************************************
            A  NOTER   ------------------
Temps d'attente pour les opérations asynchrones
   Merci de supprimer le temps d'attente en mode production */

const timeTest = import.meta.env.VITE_TIME;


export default function ListeFormateurs() {
  // Gestion du menu contextuel
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false); // Gestion de la boîte de dialogue de modification
  const [currentPage, setCurrentPage] = useState(1); // Gestion de la pagination
  const [totalPages,setTotalePages]=useState(0)
  // Récupération de la liste des formateurs avec React Query
  const { data, isLoading } = useQuery(['liste-formateur',currentPage], async () => {
    try {
      await new Promise(resolve=>setTimeout(resolve,timeTest))
      const response = await listeFormateur(currentPage);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  

  // Fonction pour fermer la boîte de dialogue de modification
  const handleClose = () => {
    setOpen(false);
  };

  // Fonction pour ouvrir la boîte de dialogue de modification
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Fonction pour changer de page lors de la pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Gestion de la sélection des formateurs à supprimer
  const [dataToDelete, setDataToDelete] = useState([]);
  const [deleteTrChecked, setDeleteTrChecked] = useState(false);

  function handleClickToDelete(event){
    setDeleteTrChecked(event.target.checked)
    if(event.target.checked && data?.formateurs){
      setDataToDelete( data.formateurs.map(element => ({id:element.id ,delete: true})))
    }else{
      setDataToDelete( data.formateurs.map(element => ({id:element.id ,delete: false})))
    }
  }

  // Fonction pour changer l'état de suppression d'un formateur
  function onChangeInput(e, index) {
    if (dataToDelete.find((element) => element.id === index)) {
      setDataToDelete(prev => prev.map(element => (element.id === index ? {...element, delete: e.target.checked} : element)));
    } else {
      setDataToDelete(prev => ([...prev, {id: index, delete: e.target.checked}]));
    }
  }

  
  const queryClient = useQueryClient();
  // Mutation pour supprimer un formateur
  const { mutate } = useMutation(async (data) => {
    try {
      await supprimerformateur(data);
    } catch (error) {
      console.error(error);
    }
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['liste-formateur', currentPage]);
    }
  });

  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  // Affichage de la confirmation de suppression
  const showPopconfirm = () => {
    setOpenDelete(true);
  };

  // Validation de la suppression
  const handleOk = async () => {
    const nouvelleListe = dataToDelete.map(element => element.delete === true ? element.id : undefined).join('-');
    setConfirmLoading(true);

    try {
      await new Promise(resolve=>setTimeout(resolve,timeTest))
      await mutate(nouvelleListe);
      setOpenDelete(false);
      message.success('Le formateur a été supprimé avec succès', 2);
      setDataToDelete([]);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la suppression du formateur:", error);
      message.error('Une erreur s\'est produite lors de la suppression du formateur', 2);
    } finally {
      setConfirmLoading(false);
    }
  };

  // Annulation de la suppression
  const handleCancel = () => {
    message.error('La suppression a été annulée', 2);
    setOpenDelete(false);
  };

  // État pour stocker les données du formateur à modifier
  const [formateurMod,setFormateurMod]=useState({})
  const [formateurDetailId,setFormateurDtailId]=useState(null)

  const options = [
    {
       1: <Link style={{textDecoration:"none"}} to={`/formateur/detail-formateur/${formateurDetailId}`}> <div  style={{fontSize:"16px",color:"rgb(0, 167, 111)",width:"100%", display:"flex",alignItems:"center"}}> <MdInfoOutline style={{fontSize:"18px", marginRight:"7px"}}/>   Détail</div></Link>
    },{
       2:<div  style={{fontSize:"16px",display:"flex",alignItems:"center"}}> <MdModeEditOutline  style={{marginRight:"7px"}}/> Editér</div>
    }
  ];

  // Notification de succès pour la modification du formateur
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      placement: "bottomRight",
      message: 'Modification Formateur',
      description: 'Formateur est modifié avec succès',
      icon: (
        <SmileOutlined
          style={{
            color: '#007bff',
          }}
        />
      ),
      duration: 1.5
    });
  };

  // État et fonction pour la recherche de formateurs
  const [formDataSearch, setFormDataSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [dataGlobal, setDataGlobal] = useState([]);
  const [valInit, setValpInit] = useState('~~');

  const { isLoading: loadingDataSearch, data: dataSearchValue } = useQuery(
    ['formateur-search-formateur', formDataSearch],
    async () => {
      try {
        // Ajouter une petite pause pour améliorer l'expérience utilisateur
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await formateurSearch(formDataSearch);
        setValpInit(formDataSearch);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    {
      enabled: isSearching && isSearching && formDataSearch !== valInit ,
    }
  );

  // Gestion de la recherche
  const handleSearch = () => {
    if (formDataSearch && valInit !== formDataSearch) {
      setIsSearching(true);
    }
  };

  // Mise à jour des données globales après la recherche
  useEffect(() => {
    if (!loadingDataSearch && dataSearchValue?.formateurs) {
      setDataGlobal(dataSearchValue.formateurs);
      setTotalePages(dataSearchValue?.totalPages); // Assurez-vous de définir setTotalPages correctement
    }
  }, [loadingDataSearch, dataSearchValue?.formateurs]);

  // Réinitialisation de l'état de recherche après le chargement des données
  useEffect(() => {
    if (!loadingDataSearch) {
      setIsSearching(false);
    }
  }, [loadingDataSearch]);

  // Mise à jour des données globales après le chargement initial ou la recherche
  const [actualiser,setActualiser]=useState(false)
  useEffect(()=>{
    if(!isLoading ||formDataSearch===" " ){
      setDataGlobal(data?.formateurs)
      setTotalePages(data?.totalPages)
    }
    if(data){
        if(data.formateurs.length===0 && currentPage>1){
           setCurrentPage(page=>page-1)
        }
    }
  },[isLoading,data,actualiser,formDataSearch])


  // Le tri des donnés .....
  const [order, setOrder] = useState('desc');
const [overButtonTh, setOverButtonTh]=useState('matricule')

const [currentValueTri,setCuurentValueTri]=useState('matricule')
  function triData(referenceData) {
    switch(referenceData) {
        case "nom":
            setDataGlobal(prev => {
                if (order === "desc") {
                    return prev.sort((a, b) => b.nom.localeCompare(a.nom));
                } else {
                    return prev.sort((a, b) => a.nom.localeCompare(b.nom));
                }
            });
            break;
          case "prenom":
              setDataGlobal(prev => {
                  if (order === "desc") {
                      return prev.sort((a, b) => b.prenom.localeCompare(a.prenom));
                  } else {
                      return prev.sort((a, b) => a.prenom.localeCompare(b.prenom));
                  }
              });
              break;
              case "matricule":
                setDataGlobal(prev => {
                    if (order === "desc") {
                        return prev.sort((a, b) => b.matricule.localeCompare(a.matricule));
                    } else {
                        return prev.sort((a, b) => a.matricule.localeCompare(b.matricule));
                    }
                });
                break;
                case "metier":
                setDataGlobal(prev => {
                    if (order === "desc") {
                        return prev.sort((a, b) => b.metier.localeCompare(a.metier));
                    } else {
                        return prev.sort((a, b) => a.metier.localeCompare(b.metier));
                    }
                });
                break;
                case "email":
                  setDataGlobal(prev => {
                      if (order === "desc") {
                          return prev.sort((a, b) => b.email.localeCompare(a.email));
                      } else {
                          return prev.sort((a, b) => a.email.localeCompare(b.email));
                      }
                  });
                  break;
        default:
            break;
    }
}

function handleSort(referenceValue) {
  setOrder(order === 'desc' ? 'asc' : 'desc');
  triData(referenceValue);
  setCuurentValueTri(referenceValue)
}


  return (
    <section className='formateurs-container'>
      {contextHolder}
      <article className='description-container'>
        <span>Liste des formateurs de l ISTA BOUZNIKA</span>
        <Link to="/formateur/ajouter-formateur">
          <Button>
            <FaPlus className='plusFormateur' />
            Nouveau Formateur
          </Button>
        </Link>
      </article>

      <article className='filter-container'>
        <div className="chargement" >
         <div className='filter-item-one'>
          <CiSearch   className='filter-search' />
          <input onChange={e=>setFormDataSearch(e.target.value)}  value={formDataSearch} onKeyUp={(e) => { if (e.key === 'Enter') handleSearch() }} className='filter-input' type="text" placeholder='Rechercher un formateur ...' />
          <AiOutlineReload onClick={()=>setActualiser(prev=>!prev)} className="filter-button" />
        </div>
             {loadingDataSearch&&<LinearProgress style={{height:"0.14rem",borderRadius:"10px", width:"97%"}} color="success" />}
        </div>
        <div className='filter-item-two'>
        <Tooltip color={"blue"} key={"blue"} placement="top" title={ <span  className="wider-text" > Exporter la liste en PDF</span>}>
          <IconButton
            aria-label="more"
            id="long-button"
            style={{fontSize:"20px"}}
            aria-haspopup="true"
          >
            <PiExportBold /> 
          </IconButton>
          </Tooltip>
        </div>
      </article>
      {
        dataToDelete.some(element => element.delete === true) && 
        <div  className='supressionData'>
          <span style={{display:"flex",alignItems:"center"}} >
            <Checkbox
              {...label}
              onChange={handleClickToDelete}
              checked={dataToDelete.some(element => element.delete === true)}
              sx={{
                transform: "scale(0.8)",
                marginLeft: "12px",
                color: "rgb(99, 115, 129)",
                '&.Mui-checked': {
                  color: "rgba(0, 167, 111, 0.897)",
                },
              }}
            />
            <span style={{fontSize:"14px"}}> {
              dataToDelete.filter((formateur)=>formateur.delete===true).length 
            } <span> Formateurs selectionnés</span> </span>
          </span>

          <Popconfirm
            title="Suppression"
            description="Êtes-vous sûr de vouloir supprimer le formateur ?"
            open={openDelete}
            placement='top'
            onConfirm={handleOk}
            cancelText="Non"
            okText="Oui"
            okButtonProps={{
              loading: confirmLoading,
              style: { backgroundColor: 'red', borderColor: 'red' }
            }}
            onCancel={handleCancel}
          >
            <IconButton aria-label="delete"  onClick={showPopconfirm}>
              <DeleteIcon style={{fontSize:"19px",color:"brown"}} />
            </IconButton>
          </Popconfirm>
        </div>
      }
      <table className='formateurs-table'>
        <thead >
          {
            !dataToDelete.some(element => element.delete === true) &&
            <tr > 
              <th style={{borderRadius:"3px 0 0 0"}}>
                <Checkbox
                  {...label}
                  onChange={handleClickToDelete}
                  checked={dataToDelete.some(element => element.delete === true)}
                  sx={{
                    transform: "scale(0.8)",
                    zIndex:100000000,
                    marginLeft: "10px",
                    color: "rgb(99, 115, 129)",
                    '&.Mui-checked': {
                      color: "rgba(0, 167, 111, 0.897)",
                    },
                  }}
                />
              </th>
              <th>
                <button onMouseOver={()=>setOverButtonTh("matricule")} className="buttonTH" onClick={()=>handleSort('matricule')}  >Matricule <FaArrowUp className={`${currentValueTri==="matricule" && order==="asc"?"buttonTH-icons-rotate":""}  ${overButtonTh ==="matricule"?"iconsDiaplay":""} buttonTH-icons`}/> </button>
              </th>
              <th>
                <button onMouseOver={()=>setOverButtonTh("nom")} className="buttonTH"  onClick={()=>handleSort('nom')}>Nom <FaArrowUp  className={`${currentValueTri==="nom" && order==="asc"?"buttonTH-icons-rotate":""}  ${overButtonTh ==="nom"?"iconsDiaplay":""} buttonTH-icons`}/> </button>
              </th>
              <th>
              <button onMouseOver={()=>setOverButtonTh("prenom")} className="buttonTH"  onClick={()=>handleSort('prenom')}>Prénom <FaArrowUp  className={`${currentValueTri==="prenom" && order==="asc"?"buttonTH-icons-rotate":""}  ${overButtonTh ==="prenom"?"iconsDiaplay":""} buttonTH-icons`}/> </button>
              </th>
              <th>
               <button onMouseOver={()=>setOverButtonTh("email")} className="buttonTH"  onClick={()=>handleSort('email')}>Email <FaArrowUp  className={`${currentValueTri==="email" && order==="asc"?"buttonTH-icons-rotate":""}  ${overButtonTh ==="email"?"iconsDiaplay":""} buttonTH-icons`}/> </button>
              </th>
              <th style={{borderRadius:"0 3px 0 0"}}>
               <button onMouseOver={()=>setOverButtonTh("metier")} className="buttonTH"  onClick={()=>handleSort('metier')}>Métier <FaArrowUp  className={`${currentValueTri==="metier" && order==="asc"?"buttonTH-icons-rotate":""}  ${overButtonTh ==="metier"?"iconsDiaplay":""} buttonTH-icons`}/> </button>
              </th>
            </tr> 
          }
        </thead>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={openMenu}
          style={{ boxShadow: "none" }}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
              padding: "10px",
              borderRadius: "10px",
              outline: "0px",
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              // backgroundImage: `url(${backgroundImage}, url(${markPeopleImage})`,
              // backgroundRepeat: "no-repeat, no-repeat",
              // backgroundPosition: "right top, left bottom",
              // backgroundSize: "50%, 50%",
              boxShadow: "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
              overflow: "inherit",
              marginTop: "-6px",
            },
          }}
        >
          {options.map((option,index) => (
            <MenuItem  key={option}  onClick={()=>{
              if(index===1){
                 handleClickOpen()
              }
              handleCloseMenu()
            }}>
              {option[index+1]}
            </MenuItem>
          ))}
        </Menu>
        <tbody className='formateurs-list'>
          {!isLoading?
            dataGlobal.length===0?
             <div className="empty-container">
                  <FaExclamationCircle  size="large" />
                 <p>Aucun résultat trouvé</p>
            </div>:
            dataGlobal.map((formateur, index) => (
              <tr key={index}>
                <td>
                  <Checkbox
                    {...label}
                    checked={dataToDelete.some(element => element.id === formateur.id && element.delete)}
                    onChange={(e)=>onChangeInput(e,formateur.id)}
                    sx={{
                      transform: "scale(0.8)",
                      marginLeft: "10px",
                      color: "rgb(99, 115, 129)",
                      '&.Mui-checked': {
                        color: "rgba(0, 167, 111, 0.897)",
                      },
                    }}
                  />
                </td>
                <td>{formateur.matricule}</td>
                <td>{formateur.nom}</td>
                <td>{formateur.prenom}</td>
                <td>{formateur.email}</td>
                <td>{formateur.metier}
                  <div className='edition'>
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={openMenu ? 'long-menu' : undefined}
                      aria-expanded={openMenu ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(event)=>{
                        handleClick(event)
                        setFormateurDtailId(formateur.id)
                        setFormateurMod(formateur)
                      }}
                    >
                      <MoreVertIcon style={{fontSize:"16px"}} />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))
        :null}
        </tbody>
      </table>
      {isLoading  && <div style={{ padding: 0 }} className='container'>
        {listeObjets.map((_, index) => (
          <Skeleton baseColor='#f7f7f7' highlightColor='#ebebeb' style={{ margin: "5px 0", width: "100%", height: "45px" }} key={index} />
        ))}
      </div>}
      {data && data?.totalPages > 1 && (
        <section className="pagination">
          <Pagination page={currentPage}   onChange={handlePageChange} count={totalPages} hidePrevButton hideNextButton />
        </section>
      )}
      <DialogContext setOpen={setOpen} open={open}>
        <Modifcation openNotification={openNotification} handleClose={handleClose} currentPage={currentPage} formateur={formateurMod} />
      </DialogContext>
    </section>
  );
}
