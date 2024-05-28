import React, {useEffect } from 'react';
import { Table, Tag } from 'antd';
import Skeleton from 'react-loading-skeleton';
const ModulesVerification = ({data}) => {
 const {getModuleFiliereGroupe,isLoadingModuleFiliereGroupes}=data

//  console.log(getModuleFiliereGroupe)
  const columns = [
    {
      title: 'Code',
      dataIndex: 'codeModule',
      key: 'codeModule',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'capacite',
    },
    {
      title: "Etat d'avancement",
      key: 'MHD',
      dataIndex: 'MHD',
      render: (MREST) => (
        <Tag color={MREST > 5 ? 'geekblue' : 'green'} key={MREST}>
          {MREST} %
        </Tag>
      ),
    },
  ];


  return (
    isLoadingModuleFiliereGroupes|| !getModuleFiliereGroupe?   <div style={{padding:"13px", width:"600px"}}>
    {[1, 2, 3, 4,5,6].map((_, index) => (
      <Skeleton
        baseColor='#f7f7f7'
        highlightColor='#ebebeb'
        style={{ margin: "5px 0", width: "100%", height: "39px" }}
        key={index}
      />
    ))}
  </div> :<Table
      style={{width:"600px"}}
      className="custom-pagination" // Apply the custom CSS class
      columns={columns}
      dataSource={getModuleFiliereGroupe}
      pagination={{
        position: ['bottomLeft'],
        pageSize: 5, // Limit to 3 elements per page
      }}
    />
  );
};

export default ModulesVerification;

