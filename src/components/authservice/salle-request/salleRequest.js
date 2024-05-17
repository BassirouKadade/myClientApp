import api from "../api";

async function ajouterSalle(data) {
    const response = await api.post('/salle/ajouter-salle', data);
    return response;
}

async function listeSalle(currentPage) {
    const response = await api.get(`/salle/liste-salle?page=${currentPage}`);
    return response;
}

async function supprimerSalle(data) {
    const response = await api.delete(`/salle/supprimer-salle/${data}`);
    return response;
}

async function updateSalle(data) {
    const response = await api.put('/salle/update-salle', data);
    return response;
}


async function searchSalleNext(page, data) {
    const response = await api.get(`/salle/search-next-page?search=${data}&page=${page}`);
    return response;
}



export {
    ajouterSalle,
    listeSalle,
    supprimerSalle,
    updateSalle,
    searchSalleNext,
};
