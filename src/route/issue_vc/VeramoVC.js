import QRCode from 'react-qr-code';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { getVeramoVCJWT } from '../../apis/AxiosWithServer';
import { convertUtcToTimestamp } from '../../utils/utils';

const IssueVeramoVC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [seat, setSeat] = useState('');
  const [date, setDate] = useState(0);
  const [qrCode, setQRCode] = useState('');

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

  const generateVC = async () => {
    console.log(name, company, seat, date);

    const res = await getVeramoVCJWT({
      name,
      company,
      seat,
      date: convertUtcToTimestamp(date),
    });
    console.log(res.data);
    setQRCode(res.data);
    setIsGenerated(true);
  };

  return (
    <div>
      <br />
      <Container>
        <Row>
          <Col>
            {isGenerated ? (
              <QRCode value={qrCode} />
            ) : (
              <div>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={changeFunc} name="name" placeholder="진행될 콘서트명을 입력해주세요." />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control onChange={changeFunc} name="company" placeholder="콘서트를 주최하는 회사명을 입력해주세요." />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Seat</Form.Label>
                    <Form.Control onChange={changeFunc} name="seat" placeholder="발급할 좌석을 입력해주세요." />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control onChange={changeFunc} name="date" placeholder="콘서트가 진행되는 날짜를 입력해주세요. (yyyy-mm-dd hh:mm)" />
                  </Form.Group>
                </Form>
                <Button onClick={generateVC}>Generate</Button>
              </div>
            )}
          </Col>
          <Col>
            {isGenerated ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>콘서트명</th>
                    <th>주최 회사</th>
                    <th>좌석</th>
                    <th>날짜</th>
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
