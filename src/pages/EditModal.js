import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from '../components/header'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography
} from "@material-tailwind/react";

import { getModelById, handleUpdateModel } from '../utils/API';


export default function EditModel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeModel, setActiveModel] = useState("")
  const [scaleValue, setScaleValue] = useState(0);
  const [active, setActive] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      if (id && id !== undefined) {
        const response = await getModelById(id)
        setActiveModel(response?.data?.name)
        setScaleValue(response?.data?.scale)
        setActive(response?.data?.state)
      }
    };
    fetchData()
      .catch(console.error);
  }, [id])



  const handChangeScale = (e) => {
    setScaleValue(e.target.value)
  }

  const handleChangeActive = (e) => {
    if (e.target.checked) {
      setActive(1)
    } else {
      setActive(0);
    }
  }

  const handleUpdateClick = async () => {
    const bodyData = {
      scale: scaleValue,
      state: active ? 1 : 0
    }
    await handleUpdateModel(bodyData, id)
    navigate('/admin')
  }

  return (
    <>
      <Header />
      <Card className="w-50 p-4">
        <CardHeader color="blue" className="relative h-56">
          <Typography className="text-center mt-4">Edit Model</Typography>
        </CardHeader>
        <CardBody className="text-center">
          <Input label="Scale" success onChange={(e) => handChangeScale(e)} value={scaleValue} />
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Checkbox label="Active" onChange={(e) => handleChangeActive(e)} checked={active} />
          <Button onClick={() => handleUpdateClick()}>Update</Button>
        </CardFooter>
      </Card>
    </>
  )
}
