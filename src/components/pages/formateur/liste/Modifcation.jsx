import  { useState } from 'react';
import Button from '@mui/material/Button';
import { REGEX_REST, REGEX_EMAIL } from '../../../authservice/regex';
import './modification.css';
import { useMutation, useQueryClient } from 'react-query';
import AnimComponent from '../../animation/AnimComponent';

import { updateformateur } from '../../../authservice/formateur-request/formateurRquest';
export default function Modification({ openNotification,handleClose, currentPage, formateur}) {
  const [errors, setErrors] = useState({
    matricule: false,
    nom: false,
    prenom: false,
    metier: false,
    email: false,
  });

  
  const [errorServer, setErrorServer] = useState({});
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(formateur)

  const { mutate, isLoading } = useMutation(async (data) => {
    try {
      await updateformateur(data);
      clearFormData();
      handleClose()
      openNotification()
    } catch (error) {
      console.log("ero",error)
      setErrorServer(error.response.data);
    }
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['liste-formateur',currentPage]);
    },
  });

  console.log("serveur error",errorServer)
  // existeEMail

  function regexError(data) {
    let hasError = false;

    if (!REGEX_REST.test(data.matricule)) {
      setErrors(prev => ({ ...prev, matricule: true }));
      hasError = true;
    } else {
      setErrors(prev => ({ ...prev, matricule: false }));
    }

    if (!REGEX_REST.test(data.metier)) {
      setErrors(prev => ({ ...prev, metier: true }));
      hasError = true;
    } else {
      setErrors(prev => ({ ...prev, metier: false }));
    }

    if (!REGEX_EMAIL.test(data.email)) {
      setErrors(prev => ({ ...prev, email: true }));
      hasError = true;
    } else {
      setErrors(prev => ({ ...prev, email: false }));
    }

    if (!REGEX_REST.test(data.nom)) {
      setErrors(prev => ({ ...prev, nom: true }));
      hasError = true;
    } else {
      setErrors(prev => ({ ...prev, nom: false }));
    }

    if (!REGEX_REST.test(data.prenom)) {
      setErrors(prev => ({ ...prev, prenom: true }));
      hasError = true;
    } else {
      setErrors(prev => ({ ...prev, prenom: false }));
    }

    return !hasError;
  }

  const handleSubmit = async e => {
    e.preventDefault();
   
    if (!regexError(formData)) {
      return;
    }
    mutate(formData);
  };

  const clearFormData = () => {
    setFormData({
      matricule: '',
      nom: '',
      prenom: '',
      metier: '',
      email: '',
    });
    setErrorServer({})
  };


  console.log(errorServer)


  return (
    
    <section className="formateur-section">
      <div className="formateur">
        <h3 id="Text">Formateur</h3>
      </div>
      <form onSubmit={handleSubmit} className="formateur">
        <article className="formaterChild">
          <div className="info">
            <label className="label" htmlFor="matricule">
              <span>Matricule <span className="champsO">*</span></span>
            </label>
            <input
              type="text"
              id="matricule"
              name="matricule"
              readOnly
              placeholder="Matricule ..."
              className={`inputClass ${errors.matricule || errorServer.existMat ? 'is-invalid-error' : errors.matricule === false ? 'is-valid-confirm' : ''}`}
              value={formData.matricule}
              onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
            />
          </div>

          <div className="info">
            <label className="label" htmlFor="metier">
              <span>Métier <span className="champsO">*</span></span>
            </label>
            <input
              type="text"
              id="metier"
              name="metier"
              placeholder="Métier ..."
              className={`inputClass ${errors.metier ? 'is-invalid-error' : errors.metier === false ? 'is-valid-confirm' : ''}`}
              value={formData.metier}
              onChange={(e) => setFormData({ ...formData, metier: e.target.value })}
            />
          </div>
        </article>

        <article className="formaterChild">
          <div className="info infoEmail">
            <label className="label" htmlFor="email">
              <span>Email <span className="champsO">*</span></span>
              {errorServer.existeEMail && <span className='existData'>{errorServer.existeEMail}</span>}
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email ..."
              className={`inputClass ${errors.email || errorServer.existeEMail ? 'is-invalid-error' : errors.email === false ? 'is-valid-confirm' : ''}`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </article>

        <article className="formaterChild">
          <div className="info">
            <label className="label" htmlFor="nom">
              <span>Nom <span className="champsO">*</span></span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              placeholder="Nom ..."
              className={`inputClass ${errors.nom ? 'is-invalid-error' : errors.nom === false ? 'is-valid-confirm' : ''}`}
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            />
          </div>
          <div className="info">
            <label className="label" htmlFor="prenom">
              <span>Prénom <span className="champsO">*</span></span>
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Prénom ..."
              className={`inputClass ${errors.prenom ? 'is-invalid-error' : errors.prenom === false ? 'is-valid-confirm' : ''}`}
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            />
          </div>
        </article>

        <div className="formaterChild buttonF">
          <Button type="submit" className="buttonMbut articleButton" disabled={isLoading}>
            {isLoading ? <AnimComponent borderColor={'white'} bord={2} padChild={4} padParent={11} /> : 'Ajouter'}
          </Button>
        </div>
      </form>
    </section>
  );
}

