import axios from 'axios';

const axiosWithAcapy = axios.create({
  baseURL: process.env.REACT_APP_ACAPY_ENDPOINT,
});

async function createInvitation() {
  const res = await axiosWithAcapy.post('/connections/create-invitation', {
    my_label: 'blocketing demo',
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

async function getCredentialVerificationRecords(connId) {
  const res = await axiosWithAcapy.get('/present-proof/records', {
    params: {
      connection_id: connId,
    },
  });

  return res;
}

async function sendProofRequest(connId, proofRequest) {
  const res = await axiosWithAcapy.post(`/present-proof/send-request`, {
    connection_id: connId,
    proof_request: proofRequest,
  });

  return res;
}

async function sendCredential(connId, credentialProposal) {
  const res = await axiosWithAcapy.post('/issue-credential/send', {
    auto_remove: false,
    connection_id: connId,
    credential_proposal: credentialProposal,
  });

  return res;
}

export { createInvitation, getConnection, getCredentialissuanceRecords, sendProofRequest, getCredentialVerificationRecords, sendCredential };
