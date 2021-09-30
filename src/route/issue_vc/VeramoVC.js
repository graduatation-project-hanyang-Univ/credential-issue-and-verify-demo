import React, { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';
import { getVeramoVCJWT } from '../../apis/AxiosWithServer';

const IssueVeramoVC = () => {
  const [qrCode, setQRCode] = useState(null);

  useEffect(async () => {
    const res = await getVeramoVCJWT();
    console.log(res.data);
    setQRCode(res.data);
  }, []);

  return <div>{qrCode ? <QRCode value={qrCode} /> : ''}</div>;
};

export default IssueVeramoVC;
