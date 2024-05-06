import api from "../api";

async function ajouterFormateur(data) {
        const response = await api.post('/formateur/ajouter-formateur', data);
        return response;
}

async function listeFormateur(currentPage) {
        const response = await api.get(`/formateur/liste-formateur?page=${currentPage}`);
        return response;
}

async function supprimerformateur(data) {
        const response = await api.delete(`/formateur/supprimer-formateur/${data}`);
        return response;
}

export {ajouterFormateur,supprimerformateur,listeFormateur};
