import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu, Tag, notification } from 'antd';
import { IoIosHome } from "react-icons/io";
import { MdOutlineSocialDistance } from "react-icons/md";
import './Disponibilte.css';
import Skeleton from 'react-loading-skeleton';
import { allSallesDatabase } from '../../authservice/salle-request/salleRequest';
import { creerEmplois } from '../../authservice/create_emplois_request/createEmploisRequest';
import { useQueryClient, useMutation } from 'react-query';
import Progress from '../animation/Progess';

// Définition des éléments du menu
const items = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: 'Navigation One',
    children: [
      { key: '11', label: 'Option 1' },
      { key: '12', label: 'Option 2' },
      { key: '13', label: 'Option 3' },
      { key: '14', label: 'Option 4' },
    ],
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: 'Navigation Two',
    children: [
      { key: '21', label: 'Option 1' },
      { key: '22', label: 'Option 2' },
      {
        key: '23',
        label: 'Submenu',
        children: [
          { key: '231', label: 'Option 1' },
          { key: '232', label: 'Option 2' },
          { key: '233', label: 'Option 3' },
        ],
      },
      {
        key: '24',
        label: 'Submenu 2',
        children: [
          { key: '241', label: 'Option 1' },
          { key: '242', label: 'Option 2' },
          { key: '243', label: 'Option 3' },
        ],
      },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined />,
    label: 'Navigation Three',
    children: [
      { key: '31', label: 'Option 1' },
      { key: '32', label: 'Option 2' },
      { key: '33', label: 'Option 3' },
      { key: '34', label: 'Option 4' },
    ],
  },
  {
    key: '4',
    icon: <MailOutlined />,
    label: 'Navigation Four',
    children: [
      { key: '41', label: 'Option 1' },
      { key: '42', label: 'Option 2' },
      { key: '43', label: 'Option 3' },
      { key: '44', label: 'Option 4' },
    ],
  },
  {
    key: '5',
    icon: <AppstoreOutlined />,
    label: 'Navigation Five',
    children: [
      { key: '51', label: 'Option 1' },
      { key: '52', label: 'Option 2' },
      { key: '53', label: 'Option 3' },
      { key: '54', label: 'Option 4' },
    ],
  },
  {
    key: '6',
    icon: <SettingOutlined />,
    label: 'Navigation Six',
    children: [
      { key: '61', label: 'Option 1' },
      { key: '62', label: 'Option 2' },
      { key: '63', label: 'Option 3' },
      { key: '64', label: 'Option 4' },
    ],
  },
];

// Fonction pour obtenir les niveaux des clés du menu
const getLevelKeys = (items) => {
  const keys = {};
  const traverse = (items, level = 1) => {
    items.forEach((item) => {
      if (item.key) {
        keys[item.key] = level;
      }
      if (item.children) {
        traverse(item.children, level + 1);
      }
    });
  };
  traverse(items);
  return keys;
};

// Obtenir les niveaux des clés pour le menu
const levelKeys = getLevelKeys(items);

// Composant principal
export default function Disponibilite({nombreSeance, day, handleClose, top, isLoadingSalleGet, setStartFetching, width, start, end, salles, currentGroupeEmplois }) {
  const [salleSelect, setSalleSelect] = useState(null); // État pour la salle sélectionnée
  const [dataSendToServer, setDataSendToServer] = useState({
    startIndex: null,
    startEnd: null,
    idSalle: null,
    idGroupe: null,
    day: null,
    top: null,
  });

  const [salleMrest, setSalleMrest] = useState(0); // État pour la salle restante
  const [error, setError] = useState({ heureDisponible: false, groupe: false, salle: false }); // État pour les erreurs

  // Gestion de la sélection de la salle
  const onHandleSalle = (id, rest) => {
    setSalleMrest(rest);
    setDataSendToServer((prev) => ({ ...prev, idSalle: id }));
  };

  // Mise à jour des données à envoyer au serveur
  useEffect(() => {
    setDataSendToServer((prev) => ({
      ...prev,
      startEnd: end,
      startIndex: start,
      day: day,
      width: width,
      top: top,
      idGroupe: currentGroupeEmplois?.id,
    }));
  }, [currentGroupeEmplois?.id, day, top, start, end]);

  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']); // État pour les clés de menu ouvertes

  // Gestion de l'ouverture du menu
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
    if (currentOpenKey) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  const [errorServer, setErrorServer] = useState({}); // État pour les erreurs serveur
  const queryClient = useQueryClient(); // Client pour les requêtes React Query

  // Mutation pour créer les emplois du temps
  const { mutate, isLoading } = useMutation(async (data) => {
    try {
      await creerEmplois(data);
    } catch (error) {
      setErrorServer(error.response.data);
    }
  }, {
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries('get-totale-seance-groupe');
      queryClient.invalidateQueries('get-emplois-groupe');
    }
  });

  const [typeSeanceToSend, setTypeSeanceToSend] = useState(null); // État pour le type de séance à envoyer

  // Gestion de l'envoi des données au serveur
  const onHandleSendDataTOServer = (typeSeance) => {
    if (!dataSendToServer.idGroupe) {
      setError(prev => ({ ...prev, groupe: true }));
      return;
    }
    if (!dataSendToServer.idSalle) {
      setError(prev => ({ ...prev, salle: true }));
      return;
    }
    if (nombreSeance > salleMrest) {
      setError(prev => ({ ...prev, heureDisponible: true }));
      return;
    }
    dataSendToServer.typeSeance = typeSeance;
    mutate(dataSendToServer);
  };

  const [api, contextHolder] = notification.useNotification(); // Notification API

  // Fonction pour ouvrir une notification pour le groupe
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Notification Groupe',
      description: "Vous devez définir un groupe auquel l'emploi du temps sera créé.",
    });
  };

  // Fonction pour ouvrir une notification pour la salle
  const openNotificationWithIconSalle = (type) => {
    api[type]({
      message: 'Notification Salle',
      description: "Vous devez définir une salle à laquelle l'emploi du temps sera créé.",
    });
  };

  // Fonction pour ouvrir une notification pour la disponibilité de la salle
  const openNotificationWithIconDisponibiliteSalleMH = (type) => {
    api[type]({
      placement: "topLeft",
      message: 'Notification Salle',
      description: "La masse horaire de la salle sélectionnée n'est pas suffisante. Veuillez choisir une autre salle ou ajuster votre emploi du temps.",
    });
  };

  // Gestion des notifications d'erreur
  useEffect(() => {
    if (error.groupe) {
      openNotificationWithIcon('error');
    }
    if (error.salle) {
      openNotificationWithIconSalle('error');
    }
    if (error.heureDisponible) {
      openNotificationWithIconDisponibiliteSalleMH('error');
    }

    setTimeout(() => {
      setError({ groupe: false, salle: false });
    }, 1000);
  }, [error]);

  return (
    <div className='disponiblite-data'>
      {contextHolder}
      <article className="type-cours">
        <span onClick={() => { setTypeSeanceToSend("FP"); onHandleSendDataTOServer('FP') }} className='type type-PRE'>
          {
            isLoading && typeSeanceToSend === "FP" ? 
              <Progress w={"25px"} h={"25px"} color={'white'} /> : 
              <>
                <IoIosHome style={{ marginRight: "5px" }} /> 
                Présentiel
              </>
          }
        </span>
        <span onClick={() => { setTypeSeanceToSend('FAD'); onHandleSendDataTOServer('FAD') }} className='type type-FAD'>
          {
            isLoading && typeSeanceToSend === "FAD" ? 
              <Progress w={"25px"} h={"25px"} color={'white'} /> : 
              <>
                <MdOutlineSocialDistance style={{ marginRight: "5px" }} /> 
                FAD
              </>
          }
        </span>
      </article>
      <article className='disponiblite-formateur-salle'>
        <div className="disponiblite-formateur">
          <h6>Salles Disponibles</h6>
          <ul className='disponiblite-formateur-ul'>
            {
              isLoadingSalleGet ? [1, 2, 3, 4, 5, 6].map((_, index) => (
                <Skeleton
                  baseColor='#f7f7f7'
                  highlightColor='#ebebeb'
                  style={{ margin: "5px 0", width: "100%", height: "35px" }}
                  key={index}
                />
              )) : 
              salles?.map((salle, index) => (
                <li
                  onClick={() => {
                    setSalleSelect(index);
                    onHandleSalle(salle.id, salle.MREST);
                  }}
                  className={salleSelect === index ? "elementHoverBackgroundSalleSelect" : ""}
                  key={index}
                >
                  <span>{salle.nom}</span>
                  <Tag color={salle.MREST > 25 ? 'geekblue' : 'green'} key={index}>
                    {salle.MREST}
                  </Tag>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="disponiblite-salle">
          <h6>Formateurs Disponibles</h6>
          <Menu
            mode="inline"
            defaultSelectedKeys={['231']}
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            className='overflowYNav'
            style={{
              width: 256,
              overflowY: "scroll",
              height: "calc(100% - 20px)",
            }}
            items={items}
          />
        </div>
      </article>
    </div>
  );
}
