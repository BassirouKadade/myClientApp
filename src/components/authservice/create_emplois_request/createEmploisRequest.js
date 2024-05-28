import api from "../api";

async function verificationSalleDisponible(data) {
    const response = await api.post('/emplois/verification-disponibilite-emplois', data);
    return response;
}

async function creerEmplois(data) {
    const response = await api.post('/emplois/creer-emplois', data);
    return response;
}

async function getEmploisGroupe(data) {
    const response = await api.get(`/emplois/get-emplois/?idGroupe=${data}`);
    return response;
}

async function getTotalMasseHoraireGroupe(data) {
    const response = await api.get(`/emplois/get-Totale-Masse-Horaire/?idGroupe=${data}`);
    return response;
}

async function getEmploisSalle(id) {
    const response = await api.get(`/emplois/get-emplois-salle/?idSalle=${id}`);
    return response;
}

async function getEmploisFormateur(id) {
    const response = await api.get(`/emplois/get-emplois-formateur/?idFormateur=${id}`);
    return response;
}
export {
    getEmploisSalle,
    getEmploisFormateur,
    getTotalMasseHoraireGroupe,
    getEmploisGroupe,
    creerEmplois,
    verificationSalleDisponible
};
