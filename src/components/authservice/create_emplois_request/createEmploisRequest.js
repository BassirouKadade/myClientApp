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

export {
    getEmploisGroupe,
    creerEmplois,
    verificationSalleDisponible
};
