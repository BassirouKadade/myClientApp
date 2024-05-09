import React, { useState } from 'react';
import './listeFormateur.css';
import { useParams } from 'react-router-dom';
import { message, Popconfirm } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { GiBookmark } from 'react-icons/gi';
import { FaCirclePlus } from 'react-icons/fa6';

export default function DetailFormateur() {
    const { id } = useParams();
    const [openDelete, setOpenDelete] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const timeTest = 2000; // Assurez-vous de définir cette constante ou de l'importer depuis un autre fichier

    // Affichage de la confirmation de suppression
    const showPopconfirm = () => {
        setOpenDelete(true);
    };

    // Validation de la suppression
    const handleOk = async () => {
        setConfirmLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, timeTest));
            setOpenDelete(false);
            message.success('Le formateur a été supprimé avec succès', 2);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la suppression du formateur:", error);
            message.error("Une erreur s'est produite lors de la suppression du formateur", 2);
        } finally {
            setConfirmLoading(false);
        }
    };

    // Annulation de la suppression
    const handleCancel = () => {
        message.error('La suppression a été annulée', 2);
        setOpenDelete(false);
    };

    return (
        <section className='detail-container'>
            <article className="profile-detail">
                <article className="header-info">
                    <span>Bassirou Kadadé Mahamadou</span>
                    <span>Développeur</span>
                </article>
            </article>
            <article className="container-profile">
                <div className="nav-left-profile">
                    <article className="nombre-module">
                        <span>30</span>
                        <span>Modules enseignés</span>
                    </article>
                    <article className="about-formateur">
                        <h5>Liste de ses modules</h5>
                        <ul className='list-module-formateur'>
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
                                <li>
                                    <span>
                                        <GiBookmark className='icons-modules'></GiBookmark>
                                        JavaScript
                                    </span>
                                    <span>
                                        <IconButton aria-label="delete" onClick={showPopconfirm}>
                                            <DeleteIcon style={{ fontSize: "17px", color: "red" }} />
                                        </IconButton>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <GiBookmark className='icons-modules'></GiBookmark>
                                        Approche Agile
                                    </span>
                                    <span>
                                        <IconButton aria-label="delete" onClick={showPopconfirm}>
                                            <DeleteIcon style={{ fontSize: "17px", color: "red" }} />
                                        </IconButton>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <GiBookmark className='icons-modules'></GiBookmark>
                                        Mathématiques
                                    </span>
                                    <span>
                                        <IconButton aria-label="delete" onClick={showPopconfirm}>
                                            <DeleteIcon style={{ fontSize: "17px", color: "red" }} />
                                        </IconButton>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <GiBookmark className='icons-modules'></GiBookmark>
                                        Français
                                    </span>
                                    <span>
                                        <IconButton aria-label="delete" onClick={showPopconfirm}>
                                            <DeleteIcon style={{ fontSize: "17px", color: "red" }} />
                                        </IconButton>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                        <GiBookmark className='icons-modules'></GiBookmark>
                                        Histoire Géo
                                    </span>
                                    <span>
                                        <IconButton aria-label="delete" onClick={showPopconfirm}>
                                            <DeleteIcon style={{ fontSize: "17px", color: "red" }} />
                                        </IconButton>
                                    </span>
                                </li>
                            </Popconfirm>
                        </ul>
                    </article>
                </div>
                <div className="nav-right-profile">
                    <h5>Nouveau Module</h5>
                    <ul className='moduldisponible'>
                        <li>JavaScript
                            <IconButton aria-label="delete">
                                <FaCirclePlus style={{ fontSize: "18px" }} color='rgb(0, 167, 111)' />
                            </IconButton>
                        </li>
                        <li>Approche Agile
                            <IconButton aria-label="delete">
                                <FaCirclePlus style={{ fontSize: "18px" }} color='rgb(0, 167, 111)' />
                            </IconButton>
                        </li>
                        <li>Mathématiques
                            <IconButton aria-label="delete">
                                <FaCirclePlus style={{ fontSize: "18px" }} color='rgb(0, 167, 111)' />
                            </IconButton>
                        </li>
                        <li>Français
                            <IconButton aria-label="delete">
                                <FaCirclePlus style={{ fontSize: "18px" }} color='rgb(0, 167, 111)' />
                            </IconButton>
                        </li>
                        <li>Histoire Géo
                            <IconButton aria-label="delete">
                                <FaCirclePlus style={{ fontSize: "18px" }} color='rgb(0, 167, 111)' />
                            </IconButton>
                        </li>
                        <li>Mathématiques
                            <IconButton aria-label="delete">
                                <FaCirclePlus style={{ fontSize: "18px" }} color='rgb(0, 167, 111)' />
                            </IconButton>
                        </li>
                        <li>Français</li>
                        <li>Histoire Géo</li>
                    </ul>
                </div>
            </article>
        </section>
    );
}
