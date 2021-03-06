import QRCode from 'react-qr-code';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { createInvitation, getConnection, getCredentialissuanceRecords, sendCredential } from '../../apis/AxiosWithAcapy';
import { sleep, convertUtcToTimestamp } from '../../utils/utils';

const IssueVeramoVC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [seat, setSeat] = useState('');
  const [date, setDate] = useState(0);
  const [qrCode, setQRCode] = useState('');
  const [invitation, setInvitation] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [isCredentialIssued, setIsCredentialIssued] = useState(false);

  const [isGenerated, setIsGenerated] = useState(false);

  const changeFunc = (res) => {
    const newValue = res.target.value;

    switch (res.target.name) {
      case 'name':
        setName(newValue);
        break;
      case 'company':
        setCompany(newValue);
        break;
      case 'seat':
        setSeat(newValue);
        break;
      case 'date':
        setDate(newValue);
    }
  };

  const entireIssuanceFlow = async () => {
    let newInvitation;
    const fetchInvitationUrl = async () => {
      try {
        setInvitation({});
        const response = await createInvitation();
        newInvitation = response.data;
        console.log(newInvitation);

        await setInvitation(newInvitation);
      } catch (e) {
        console.log(e);
      }
    };

    const stopUntilConnected = async () => {
      try {
        setIsConnected(false);
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const response = await getConnection(newInvitation.connection_id);
          console.log(response);
          const { state } = response.data;

          if (state === 'response' || state === 'active') {
            setIsConnected(true);
            await sendCredential(newInvitation.connection_id, {
              '@type': 'issue-credential/1.0/credential-preview',
              attributes: [
                {
                  name: 'name',
                  value: name,
                },
                {
                  name: 'company',
                  value: company,
                },
                {
                  name: 'seat',
                  value: seat,
                },
                {
                  name: 'date',
                  value: String(convertUtcToTimestamp(date)),
                },
              ],
            });
            return;
          }
          await sleep(5000);
        }
      } catch (e) {
        console.log(e);
      }
    };

    const stopUntilCredentialIssued = async () => {
      try {
        setIsCredentialIssued(false);
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const response = await getCredentialissuanceRecords(newInvitation.connection_id);

          const issuanceRecords = response.data.results;
          for (const record of issuanceRecords) {
            if (record.state === 'credential_acked') {
              setIsCredentialIssued(true);
              return;
            }
          }

          await sleep(5000);
        }
      } catch (e) {
        console.log(e);
      }
    };

    await fetchInvitationUrl();

    setQRCode(newInvitation.invitation_url);
    setIsGenerated(true);
    await stopUntilConnected();
    await stopUntilCredentialIssued();
    console.log('invi', invitation);
  };

  return (
    <div>
      <br />
      <Container>
        <Row>
          <Col>
            {isGenerated ? (
              <div>
                <QRCode value={qrCode} />
                <br />
                {isConnected ? '?????????????????????. ???????????????????????? VC ????????? ????????? ?????????' : ''}
                <br />
                {isCredentialIssued ? '???????????? Credential??? ?????????????????????.' : ''}
              </div>
            ) : (
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={changeFunc} name="name" placeholder="????????? ??????????????? ??????????????????." />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control onChange={changeFunc} name="company" placeholder="???????????? ???????????? ???????????? ??????????????????." />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Seat</Form.Label>
                    <Form.Control onChange={changeFunc} name="seat" placeholder="????????? ????????? ??????????????????." />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control onChange={changeFunc} name="date" placeholder="???????????? ???????????? ????????? ??????????????????. (yyyy-mm-dd hh:mm)" />
                  </Form.Group>
                </Form>
                <Button onClick={entireIssuanceFlow}>Generate</Button>
              </div>
            )}
          </Col>
          <Col>
            {isGenerated ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>????????????</th>
                    <th>?????? ??????</th>
                    <th>??????</th>
                    <th>??????</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{name}</td>
                    <td>{company}</td>
                    <td>{seat}</td>
                    <td>{date}</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default IssueVeramoVC;
