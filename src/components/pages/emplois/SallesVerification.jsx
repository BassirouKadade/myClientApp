import React from 'react';
import { Table, Tag } from 'antd';
import { useQuery } from 'react-query';
import Skeleton from 'react-loading-skeleton';
import { allSallesDatabase } from '../../authservice/salle-request/salleRequest';
const columns = [
  {
    title: 'Nom',
    dataIndex: 'nom',
    key: 'nom',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Capacité',
    dataIndex: 'capacite',
    key: 'capacite',
  },
  {
    title: 'MH',
    dataIndex: 'MH',
    key: 'MH',
  },
  {
    title: 'MREST',
    key: 'MREST',
    dataIndex: 'MREST',
    render: (MREST) => (
      <Tag color={MREST > 5 ? 'geekblue' : 'green'} key={MREST}>
        {MREST}
      </Tag>
    ),
  },
];

const SallesVerification = () => {

  const { data, isLoading } = useQuery(['get-All-Sale-database'], async () => {
    try {
      const response = await allSallesDatabase();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  return (
    isLoading|| !data?   <div style={{padding:"13px", width:"600px"}}>
    {[1, 2, 3, 4,5,6,7,8,9].map((_, index) => (
      <Skeleton
        baseColor='#f7f7f7'
        highlightColor='#ebebeb'
        style={{ margin: "5px 0", width: "100%", height: "35px" }}
        key={index}
      />
    ))}
  </div> :<Table
      style={{width:"600px"}}
      className="custom-pagination" // Apply the custom CSS class
      columns={columns}
      dataSource={data}
      pagination={{
        position: ['bottomLeft'],
        pageSize: 5, // Limit to 3 elements per page
      }}
    />
  );
};

export default SallesVerification;
