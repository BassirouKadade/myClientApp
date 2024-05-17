import api from "../api";

async function ajouterFiliere(data) {
    const response = await api.post('/filiere/ajouter-filiere', data);
    return response;
}

async function listeFiliere(currentPage) {
    const response = await api.get(`/filiere/liste-filiere?page=${currentPage}`);
    return response;
}

async function supprimerFiliere(data) {
    const response = await api.delete(`/filiere/supprimer-filiere/${data}`);
    return response;
}

async function updateFiliere(data) {
    const response = await api.put('/filiere/update-filiere', data);
    return response;
}

async function filiereSearch(data) {
    const response = await api.get(`/filiere/search-filiere?search=${data}`);
    return response;
}

async function searchFiliereNext(page, data) {
    const response = await api.get(`/filiere/search-next-page?search=${data}&page=${page}`);
    return response;
}

async function getInfoFiliere(id) {
    const response = await api.get(`/filiere/getinfos-filiere/?id=${id}`);
    return response;
}

// Updated functions to replace "formateur" with "filiere"
async function listeTousModuleNonPagineFiliere(id) {
    const response = await api.get(`/filiere/all-modules/?filiere=${id}`);
    return response;
}

async function modulesFiliere(id) {
    const response = await api.get(`/filiere/modules-filiere/?id=${id}`);
    return response;
}

async function ajouterModuleFiliere(data) {
    const response = await api.post(`/filiere/ajouter-module-filiere/`, data);
    return response;
}

async function deleteModuleFiliere(data) {
    const response = await api.post(`/filiere/supprimer-module-filiere/`, data);
    return response;
}

async function listeFiliereAll() {
    const response = await api.get(`/filiere/liste-filiere-all`);
    return response;
}


export {
    getInfoFiliere,
    searchFiliereNext,
    ajouterFiliere,
    listeFiliereAll,
    filiereSearch,
    updateFiliere,
    supprimerFiliere,
    listeFiliere,
    listeTousModuleNonPagineFiliere,
    modulesFiliere,
    ajouterModuleFiliere,
    deleteModuleFiliere
};
