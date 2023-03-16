import React, { useState } from 'react'
import Header from '../components/header'
import { useNavigate } from 'react-router-dom';
import { handleCreateNewModel } from '../utils/API';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button
} from "@material-tailwind/react";

export default function NewModel() {
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const [scaleValue, setScaleValue] = useState(0);
  const [active, setActive] = useState(0);
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      return;
    }
    let sendData = new FormData();
    sendData.append('file', file)
    sendData.append('scale', scaleValue)
    sendData.append('state', active)
    await handleCreateNewModel(sendData)
    navigate('/admin')
  };

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

  return (
    <>
      <Header />
      <Card className="w-50 p-4">
        <CardHeader color="blue" className="relative h-56">
          <input type="file" onChange={handleFileChange} />
        </CardHeader>
        <CardBody className="text-center">
          {file && `${file.name} - ${file.type}`}
          <Input label="Scale" success onChange={(e) => handChangeScale(e)} />
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-3">
          <Checkbox defaultChecked label="Active" onChange={(e) => handleChangeActive(e)} />
          <Button onClick={handleUploadClick}>Upload</Button>
        </CardFooter>
      </Card>
    </>
  )
}
