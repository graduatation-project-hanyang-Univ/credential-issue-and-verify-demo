import React, { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';
import { getVeramoVPRequestJWT } from '../../apis/AxiosWithServer';

const VerifyVeramoVP = () => {
  const [qrCode, setQRCode] = useState(null);

  useEffect(async () => {
    const res = await getVeramoVPRequestJWT();
    console.log(res.data);
    setQRCode(res.data);
  }, []);

  return <div>{qrCode ? <QRCode value={qrCode} /> : ''}</div>;
};

export default VerifyVeramoVP;
