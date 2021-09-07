import axios from 'axios';

const axiosWithServer = axios.create({
  baseURL: process.env.REACT_APP_WEBHOOK_ENDPOINT,
});

async function getUportIssuanceQrCode() {
  const res = await axiosWithServer.post('/uports/qr-code/issuance');

  return res;
}

async function getUportVerificationQrCode() {
  const res = await axiosWithServer.post('/uports/qr-code/verification');

  return res;
}

export { getUportIssuanceQrCode, getUportVerificationQrCode };
