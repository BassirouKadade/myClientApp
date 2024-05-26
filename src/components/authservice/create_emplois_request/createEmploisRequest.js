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
export {
    getTotalMasseHoraireGroupe,
    getEmploisGroupe,
    creerEmplois,
    verificationSalleDisponible
};
