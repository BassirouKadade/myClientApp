import React, { useEffect, useState } from 'react';
import { AiOutlineReload } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import Modifcation from './Modifcation';
import Checkbox from '@mui/material/Checkbox';
import DialogContext from '../../animation/DialogContext';
import './listeFormateurs.css';
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import listeObjets from './formateur';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { listeFormateur } from '../../../authservice/formateur-request/formateurRquest';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const options = [
  'None',
  'Atria',
  'Callisto',
];

const ITEM_HEIGHT = 48;

export default function ListeFormateurs() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery(['liste-formateur',currentPage], async () => {
    try {
      const response = await listeFormateur(currentPage);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  console.log('page',currentPage)
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <section className='formateurs-container'>
      <article className='description-container'>
        <span>Liste des formateurs de l'ISTA BOUZNIKA</span>
        <Link to="/formateur/ajouter-formateur">
          <Button>
            <FaPlus className='plusFormateur' />
            Nouveau Formateur
          </Button>
        </Link>
      </article>

      <article className='filter-container'>
        <div className='filter-item-one'>
          <CiSearch   className='filter-search' />
          <input className='filter-input' type="text" placeholder='Rechercher un formateur ...' />
          <AiOutlineReload className="filter-button" />
        </div>
        <div className='filter-item-two'>
          <IconButton
            aria-label="more"
            id="long-button"
            style={{ height: "40px" }}
            aria-controls={openMenu ? 'long-menu' : undefined}
            aria-expanded={openMenu ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
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
                boxShadow: "0px 0px 2px 0px rgba(145, 158, 171, 0.24),  -20px 20px 40px -4px rgba(145, 158, 171, 0.24)"
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} onClick={handleCloseMenu}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </article>

      <table className='formateurs-table'>
        <thead>
          <tr>
            <th>
              <Checkbox
                {...label}
                sx={{
                  transform: "scale(0.8)",
                  marginLeft: "10px",
                  color: "rgb(99, 115, 129)",
                  '&.Mui-checked': {
                    color: "rgba(0, 167, 111, 0.897)",
                  },
                }}
              />
            </th>
            <th>Matricule</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Métier</th>
          </tr>
        </thead>
        <tbody className='formateurs-list'>
          {!isLoading &&
            data?.formateurs.map((formateur, index) => (
              <tr key={index}>
                <td>
                  <Checkbox
                    {...label}
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
                    <MdEdit onClick={handleClickOpen} className='edition-button' />
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
 
       {/* Affichage du skeleton pendant le chargement */}
       {isLoading && <div style={{ padding: 0 }} className='container'>
         {listeObjets.map((_, index) => (
           <Skeleton baseColor='#f7f7f7' highlightColor='#ebebeb' style={{ margin: "5px 0", width: "100%", height: "45px" }} key={index} />
         ))}
       </div>}
       
      {data && data?.totalPages > 1 && (
        <section className="pagination">
            <Pagination
              count={data?.totalPages}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                />
              )}
            />
        </section>
      )}

      <DialogContext setOpen={setOpen} open={open}>
        <Modifcation />
      </DialogContext>
    </section>
  );
}
