import React from 'react';
import { AiOutlineReload } from "react-icons/ai";
import {  CiSearch } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import Modifcation from './Modifcation';
import Checkbox from '@mui/material/Checkbox';
import DialogContext from '../../animation/DialogContext';
import './listeFormateurs.css';
import listeObjets from './formateur';
import Button from '@mui/material/Button';
import { FaPlus } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const options = [
  'None',
  'Atria',
  'Callisto',

];

const ITEM_HEIGHT = 48;



export default function ListeFormateurs() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
      setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
};

  return (
    <section className='formateurs-container'>
      <article className='description-container'>
        <span>Liste des formateurs de l ISTA BOUZNIKA</span>
        <Button> <FaPlus className='plusFormateur'></FaPlus>Nouveau Formateur</Button>
      </article>
    
      {/* Filtres */}
      <article className='filter-container'>
        <div className='filter-item-one'>
          <CiSearch className='filter-search' />
          <input className='filter-input' type="text" placeholder='Rechercher un formateur ...' />
          <AiOutlineReload className="filter-button" />
        </div>
        <div className='filter-item-two'>
        <IconButton
        aria-label="more"
        id="long-button"
        style={{height:"40px"}}
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
        style={{ boxShadow:"none",}}
        onClose={handleCloseMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            padding:"10px",
            borderRadius:"10px",
            boxShadow:"  0px 0px 2px 0px rgba(145, 158, 171, 0.24),  -20px 20px 40px -4px rgba(145, 158, 171, 0.24)"
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleCloseMenu}>
            {option}
          </MenuItem>
        ))}
      </Menu>
        </div>
      </article>

      {/* Tableau de formateurs */}
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
          {listeObjets.map((formateur, index) => (
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
              <td>{formateur.prénom}</td>
              <td>{formateur.email}</td>
              <td>{formateur.métier}
              <div className='edition'>
                  <MdEdit  onClick={handleClickOpen} className='edition-button' />
                </div>
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
       <section className="pagination">
       <Stack spacing={3}>
        
      <Pagination
        count={10}
        style={{width:"350px",marginTop:'10px', marginLeft:"100%"}}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
       </section>
        <DialogContext setOpen={setOpen} open={open}>
                <Modifcation></Modifcation>
        </DialogContext>
    </section>
  );
}
