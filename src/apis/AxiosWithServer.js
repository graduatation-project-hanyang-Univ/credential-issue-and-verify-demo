import axios from 'axios';

const axiosWithServer = axios.create({
  baseURL: process.env.REACT_APP_WEBHOOK_ENDPOINT,
});

async function getVeramoVCJWT() {
  const res = await axiosWithServer.post('/veramo/qr-code/issuance');

  return res;
}

async function getVeramoVPRequestJWT() {
  const res = await axiosWithServer.post('/veramo/qr-code/verification');

  return res;
}

export { getVeramoVCJWT, getVeramoVPRequestJWT };
