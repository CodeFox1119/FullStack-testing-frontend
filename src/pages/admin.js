import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Button } from "@material-tailwind/react";
import Header from '../components/header'

import { handleGetModels, handleDeleteModel } from '../utils/API';

export default function Admin() {

  const navigate = useNavigate();
  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Scale",
      selector: row => row.scale,
      sortable: true,
      right: true,
    },
    {
      key: "action",
      name: "Action",
      className: "action",
      sortable: false,
      cell: (record) => {
        return (
          <>
            <Button
              variant="filled"
              className="btn btn-primary btn-sm"
              onClick={() => {
                onHandleEditItem(record);
              }}
            >
              Edit
            </Button>
            <Button
              variant="filled"
              className="btn btn-primary btn-sm ml-4"
              onClick={() => {
                onHandleDeleteItem(record);
              }}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await handleGetModels();
      setData(response?.data)
    }
    if (data.length === 0) {
      fetchData();
    }
  }, [])

  const onHandleEditItem = (record) => {
    navigate(`/edit/${record.id}`);
  }
  const onHandleDeleteItem = async (record) => {
    const response = await handleDeleteModel(record?.id);
    const deletedItemIndex = data.findIndex(item => item.id === record.id)
    if (deletedItemIndex > -1) {
      const tempData = [...data];
      tempData.splice(deletedItemIndex, 1);
      setData(tempData)
    }
  }
  return (
    <>
      <Header />
      <div className='w-full flex flex-row-reverse mt-4 pr-4'>
        <Button onClick={() => navigate('/add')}>Add New Model</Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
        pagination
      />
    </>
  )
}
