import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';

import SuccessIndyVP from './SuccessVP';
import FailIndyVP from './FailVP';
const VerifyIndyVP = () => {
  return (
    <div>
      <br />
      <Container>
        <Row>
          <Col>
            <SuccessIndyVP />
          </Col>
          <Col>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>제공 정보</th>
                  <th>콘서트명</th>
                  <th>주최회사</th>
                  <th>좌석</th>
                  <th>날짜</th>
                  <th>VP 검증 성공 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#</td>
                  <td>O</td>
                  <td>X</td>
                  <td>X</td>
                  <td>O</td>
                  <td>O</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <FailIndyVP />
          </Col>
          <Col>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>제공 정보</th>
                  <th>콘서트명</th>
                  <th>주최회사</th>
                  <th>좌석</th>
                  <th>날짜</th>
                  <th>VP 검증 성공 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#</td>
                  <td>O</td>
                  <td>X</td>
                  <td>X</td>
                  <td>O</td>
                  <td>X</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyIndyVP;
