import axios from 'axios';

const axiosWithAcapy = axios.create({
  baseURL: process.env.REACT_APP_ACAPY_ENDPOINT,
});

async function createInvitation() {
  const res = await axiosWithAcapy.post('/connections/create-invitation', {
    params: {
      auto_accept: true,
    },
  });

  return res;
}

async function getConnection(connId) {
  const res = await axiosWithAcapy.get(`/connections/${connId}`);

  return res;
}

async function getCredentialissuanceRecords(connId) {
  const res = await axiosWithAcapy.get('/issue-credential/records', {
    params: {
      connection_id: connId,
    },
  });
  return res;
}

export { createInvitation, getConnection, getCredentialissuanceRecords };
