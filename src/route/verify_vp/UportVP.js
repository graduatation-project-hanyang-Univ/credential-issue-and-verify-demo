import React, { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';
import { getUportVerificationQrCode } from '../../apis/AxiosWithServer';

const VerifyUportVP = () => {
  const [qrCode, setQRCode] = useState(null);

  useEffect(async () => {
    const res = await getUportVerificationQrCode();
    console.log(res.data);
    setQRCode(res.data);
  }, []);

  return <div>{qrCode ? <QRCode value={qrCode} /> : ''}</div>;
};

export default VerifyUportVP;
