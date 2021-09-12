import React, { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';
import { getUportIssuanceQrCode } from '../../apis/AxiosWithServer';

const IssueUportVC = () => {
  const [qrCode, setQRCode] = useState(null);

  useEffect(async () => {
    const res = await getUportIssuanceQrCode();
    console.log(res.data);
    setQRCode(res.data);
  }, []);

  return <div>{qrCode ? <QRCode value={qrCode} /> : ''}</div>;
};

export default IssueUportVC;
