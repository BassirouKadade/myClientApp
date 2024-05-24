import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineReload } from 'react-icons/ai';
import LinearProgress from '@mui/material/LinearProgress';
import { BiAlarmAdd } from 'react-icons/bi';
import { GiBookmark } from 'react-icons/gi';
import { Empty } from 'antd';
import Skeleton from 'react-loading-skeleton';

export default function DataSearch({ data }) {
  const {
    setFormDataSearch,
    refreshModuleList,
    loadingDataSearch,
    isLoadingGetGroupes,
    groupesFilter,
    isLoadingModuleFiliereGroupes,
    getModuleFiliereGroupe,
    handleSearch,
    formDataSearch,
    setCurrentGroupeEmplois,
  } = data;

  return (
    <section className="groupe-module-section-emplois">
      <div className="div-groupe-ul" style={{ height: "45%" }}>
        <div className="chargement chargement-module">
          <div className="filter-item-one" style={{ width: "100%" }}>
            <CiSearch className="filter-search" />
            <input
              type="text"
              className="filter-input"
              placeholder="Rechercher un groupe ..."
              style={{ fontSize: "15px" }}
              value={formDataSearch}
              onChange={(e) => setFormDataSearch(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <AiOutlineReload onClick={refreshModuleList} className="filter-button" />
          </div>
          {loadingDataSearch && (
            <LinearProgress
              style={{ height: "0.14rem", borderRadius: "10px", width: "97%" }}
              color="success"
            />
          )}
        </div>
        <ul className="groupedisponible-emplois" style={{ height: "200px" }}>
          {isLoadingGetGroupes ? (
            <div className="container" style={{ padding: 0 }}>
              {[1, 2, 3, 4].map((_, index) => (
                <Skeleton
                  key={index}
                  baseColor="#f7f7f7"
                  highlightColor="#ebebeb"
                  style={{ margin: "5px 0", width: "100%", height: "35px" }}
                />
              ))}
            </div>
          ) : groupesFilter?.length === 0 ? (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60, marginTop: "30px" }}
              description={<span>Aucun résultat trouvé</span>}
            />
          ) : (
            groupesFilter.map((groupe, index) => (
              <li
                key={index}
                onClick={() => setCurrentGroupeEmplois({ code: groupe.code, id: groupe.id })}
              >
                <span>{groupe.code}</span>
                <BiAlarmAdd className="color-icons-add-emplois" />
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="div-groupe-ul" style={{ height: "55%" }}>
        <div className="module-groupe-text">Modules de Groupe</div>
        <ul className="groupedisponible-emplois" style={{ height: "210px" }}>
          {isLoadingModuleFiliereGroupes ? (
            <div className="container" style={{ padding: 0 }}>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Skeleton
                  key={index}
                  baseColor="#f7f7f7"
                  highlightColor="#ebebeb"
                  style={{ margin: "5px 0", width: "100%", height: "35px" }}
                />
              ))}
            </div>
          ) : !getModuleFiliereGroupe || getModuleFiliereGroupe.length === 0 ? (
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{ height: 60, marginTop: "30px" }}
              description={<span>Aucun module trouvé</span>}
            />
          ) : (
            getModuleFiliereGroupe.map((module, index) => (
              <li key={index}>
                <span>
                  <GiBookmark className="color-icons-add-emplois icons-modules" />
                  {module?.description}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
