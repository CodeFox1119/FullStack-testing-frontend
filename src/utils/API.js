import { API_URL } from "../constants";

export const handleCreateNewModel = async (sendData) => {
  try {
    const res = await fetch(`${API_URL}/api/models`, {
      method: 'POST',
      body: sendData,
    });
    return await res.json();
  } catch (err) {
    return console.error(err);
  }
}

export const handleUpdateModel = async (bodyData, id) => {
  try {
    const res = await fetch(`${API_URL}/api/models/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyData)
    });
    return await res.json();
  } catch (err) {
    return console.error(err);
  }
}

export const getModelById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/models/${id}`, {
      method: 'GET',
    });
    return await res.json();
  } catch (err) {
    return console.error(err);
  }
}

export const handleGetModels = async () => {
  try {
    const res = await fetch(`${API_URL}/api/models`, {
      method: 'GET',
    });
    return await res.json();
  } catch (err) {
    return console.error(err);
  }
}

export const handleDeleteModel = async (id) => {
  return fetch(`${API_URL}/api/models/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
}