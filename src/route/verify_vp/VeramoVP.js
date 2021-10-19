import React, { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';
import { getVeramoVPRequestJWT } from '../../apis/AxiosWithServer';
import { Col, Container, Row } from 'react-bootstrap';

const VerifyVeramoVP = () => {
  const [qrCode, setQRCode] = useState(null);

  useEffect(async () => {
    const res = await getVeramoVPRequestJWT();
    console.log(res.data);
    setQRCode(res.data);
  }, []);

  return (
    <div>
      <br />
      <Container>
        <Row>
          <Col>
            <div>{qrCode ? <QRCode value={qrCode} /> : ''}</div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyVeramoVP;
