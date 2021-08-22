import axios from "axios";

const axiosWithAcapy = axios.create({
  baseURL: process.env.REACT_APP_ACAPY_ENDPOINT,
});

async function createInvitation() {
  const res = await axiosWithAcapy.post("/connections/create-invitation", {
    params: {
      auto_accept: true,
    },
  });

  return res;
}

export { createInvitation };
