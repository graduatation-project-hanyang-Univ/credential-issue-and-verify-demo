import axios from 'axios';

const axiosWithServer = axios.create({
  baseURL: process.env.REACT_APP_WEBHOOK_ENDPOINT,
});

async function getVeramoVCJWT(infos) {
  const { name, company, seat, date } = infos;

  const res = await axiosWithServer.post('/veramo/qr-code/issuance', {
    name,
    company,
    seat,
    date,
  });

  return res;
}

async function getVeramoVPRequestJWT(success) {
  const res = await axiosWithServer.post('/veramo/qr-code/verification', {
    success,
  });

  return res;
}

export { getVeramoVCJWT, getVeramoVPRequestJWT };
