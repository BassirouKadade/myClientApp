import React from 'react'
import './modification.css'
export default function Modifcation() {
  return (
    <section  className="formateur-section" >
    <div className="formateur-header">
      <h3 id="formateur-heading">Formateur</h3>
    </div>
    <form action="" method="post" className="formateur-form">
      <article className="formateur-article">
        <div className="formateur-info">
          <label className="formateur-label" htmlFor="matricule">
            Matricule <span className="required-field">*</span>
          </label>
          <input
            type="text"
            id="matricule"
            name="matricule"
            placeholder="Matricule ..."
            className="formateur-input"
          />
        </div>

        <div className="formateur-info">
          <label className="formateur-label" htmlFor="metier">
            Métier <span className="required-field">*</span>
          </label>
          <input
            type="text"
            id="metier"
            name="metier"
            placeholder="Métier ..."
            className="formateur-input"
          />
        </div>
      </article>

      <article className="formateur-article">
        <div className="formateur-info formateur-info-email">
          <label className="formateur-label" htmlFor="email">
            Email <span className="required-field">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email ..."
            className="formateur-input"
          />
        </div>
      </article>

      <article className="formateur-article">
        <div className="formateur-info">
          <label className="formateur-label" htmlFor="nom">
            Nom <span className="required-field">*</span>
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            placeholder="Nom ..."
            className="formateur-input"
          />
        </div>
        <div className="formateur-info">
          <label className="formateur-label" htmlFor="prenom">
            Prénom <span className="required-field">*</span>
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            placeholder="Prénom ..."
            className="formateur-input"
          />
        </div>
      </article>

      <div className="formateur-action">
        <button type="buuton" className="formateur-button">
          Modifier
        </button>
      </div>
    </form>
  </section>

  )
}
