import React, { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';
import { getVeramoVPRequestJWT } from '../../../apis/AxiosWithServer';
import { Col, Container, Row } from 'react-bootstrap';

const FailVeramoVP = () => {
  const [qrCode, setQRCode] = useState(null);

  useEffect(async () => {
    const res = await getVeramoVPRequestJWT(false);
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

export default FailVeramoVP;
