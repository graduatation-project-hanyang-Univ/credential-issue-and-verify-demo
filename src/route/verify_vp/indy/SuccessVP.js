import React, { useEffect, useState } from 'react';
import { createInvitation, getConnection, getCredentialVerificationRecords, sendProofRequest } from '../../../apis/AxiosWithAcapy';
import { sleep } from '../../../utils/utils';
import QRCode from 'react-qr-code';
import { Col, Container, Row } from 'react-bootstrap';

const SuccessIndyVP = () => {
  const [invitation, setInvitation] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [isVPRequestSended, setIsVPRequestSended] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    let newInvitation;
    const fetchInvitationUrl = async () => {
      try {
        setError(null);
        setLoading(true);
        setInvitation({});
        const response = await createInvitation();
        newInvitation = response.data;
        console.log(newInvitation);

        await setInvitation(newInvitation);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
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
            return;
          }
          await sleep(5000);
        }
      } catch (e) {
        setError(e);
      }
    };

    const sendVPRequest = async () => {
      try {
        setIsVPRequestSended(false);
        await sendProofRequest(newInvitation.connection_id, makeProofRequest(process.env.REACT_APP_INDY_DID));
        setIsVPRequestSended(true);
      } catch (e) {
        setError(e);
      }
    };

    const stopUntilCredentialVerified = async () => {
      try {
        setIsVerified(false);
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const response = await getCredentialVerificationRecords(newInvitation.connection_id);

          const verificationRecords = response.data.results;
          for (const record of verificationRecords) {
            if (record.state === 'verified') {
              setIsVerified(true);
              return;
            }
          }

          await sleep(5000);
        }
      } catch (e) {
        setError(e);
      }
    };

    await fetchInvitationUrl();
    await stopUntilConnected();
    await sendVPRequest();
    await stopUntilCredentialVerified();
  }, []);

  return (
    <div>
      <br />
      <Container>
        <Row>
          <Col>
            <div>
              {(() => {
                if (loading) return <div>로딩중..</div>;
                if (error) return <div>에러가 발생했습니다</div>;
                if (!invitation.invitation_url) return null;
                return <QRCode value={invitation.invitation_url} />;
              })()}
              <br />
              {isConnected ? '연결되었습니다.' : ''}
              <br />
              {isVPRequestSended ? 'VP Request가 전송되었습니다.' : ''}
              <br />
              {isVerified ? '전송한 VP Request에 대해 수신받은 VP가 검증되었습니다.' : ''}
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

function makeProofRequest(did) {
  return {
    name: 'test-proof-req',
    version: '1.0',
    requested_attributes: {
      attribute1_referent: {
        name: 'name',
        restrictions: [
          {
            issuer_did: did,
          },
        ],
      },
    },
    requested_predicates: {
      predicate1_referent: {
        name: 'date',
        p_type: '>=',
        p_value: 0,
        restrictions: [
          {
            issuer_did: did,
          },
        ],
      },
    },
  };
}

export default SuccessIndyVP;
