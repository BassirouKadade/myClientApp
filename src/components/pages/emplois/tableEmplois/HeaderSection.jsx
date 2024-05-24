import React from 'react'
import Button from '@mui/material/Button';

export default function HeaderSection({data}) {
    const {handleClickOpenSalle,
      // handleOpenBac,
      currentGroupeEmplois}=data
  return (
    <div className='titreAlert'>
    <span  style={{width:"300px"}}>{currentGroupeEmplois&& <div style={{ color: '#000', fontWeight: 500, fontSize: "18px", width: "60%" }}>Groupe <strong>{currentGroupeEmplois?.code}</strong></div>}</span> 
    <div className='publication-emplois'>
      <Button style={{ background: "rgba(148, 0, 211, 0.699)", color: "#ffffff" }} onClick={handleClickOpenSalle} className='btn btn-primary'>Salles</Button>
      <Button className='btn btn-primary'>Formateurs</Button>
      <Button style={{ background: "aqua" }} className='btn btn-primary'>Publier</Button>
      {/* <Button variant="contained" color="primary" onClick={handleOpenBac}>
          Show backdrop
      </Button> */}
    </div>
  </div>
  )
}
