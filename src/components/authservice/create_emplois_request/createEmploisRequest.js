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

async function deleteSeanceReservation(id) {
    const response = await api.delete(`/emplois/delete-reservation-seance/?idReservation=${id}`);
    return response;
}

async function getTotalGroupeSalleFormateurEmplois(){
    const response = await api.get(`/emplois/get-total-groupe-salle-formateur`);
    return response;
}

async function getEmploisDay(day){
    const response = await api.get(`/emplois/get-emplois-day?day=${day}`);
    return response;
}
export {
    getEmploisSalle,
    getEmploisDay,
    getTotalGroupeSalleFormateurEmplois,
    deleteSeanceReservation,
    getEmploisFormateur,
    getTotalMasseHoraireGroupe,
    getEmploisGroupe,
    creerEmplois,
    verificationSalleDisponible
};
