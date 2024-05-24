import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

export default function HeaderSection({ data }) {
  const {currentGroupeEmplois, handleClickOpenSalle } = data;

  // Breadcrumb navigation
  const breadcrumbs = [
    <Link
      key="1"
      to="/dashboard"
      style={{ fontSize: '15px', textDecoration: 'none', color: 'rgba(99, 115, 119, 0.7)' }}
    >
      Dashboard
    </Link>,
    <Typography key="2" style={{ fontSize: '15px' }} color="text.primary">
      Création d'emplois du temps
    </Typography>,
    currentGroupeEmplois && currentGroupeEmplois.id ? (
      <Typography key="3" style={{ fontSize: '15px' }} color="text.primary">
        {currentGroupeEmplois?.code}
      </Typography>
    ) : null
  ];
  
  return (
    <div className="titreAlert">
      <span>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </span>
      <div className="publication-emplois">
        <Button
          style={{ background: 'rgba(148, 0, 211, 0.699)', color: '#ffffff' }}
          onClick={handleClickOpenSalle}
          className="btn btn-primary"
        >
          Salles
        </Button>
        <Button
          style={{ background: 'green', color: '#ffffff' }}
          className="btn btn-primary"
        >
          Formateurs
        </Button>
        <Button
          style={{ background: 'blue', color: '#ffffff' }}
          className="btn btn-primary"
        >
          Publier
        </Button>
      </div>
    </div>
  );
}
