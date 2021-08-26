import React, { useEffect, useState } from 'react';
import { createInvitation, getConnection, getCredentialVerificationRecords, sendProofRequest } from '../../apis/AxiosWithAcapy';
import { sleep } from '../../utils/utils';
import QRCode from 'react-qr-code';
const VerifyVP = () => {
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
          const { state, rfc23_state: rfc23State } = response.data;

          if (rfc23State === 'response-sent' && state === 'response') {
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
        await sendProofRequest(newInvitation.connection_id, makeProofRequest(process.env.REACT_APP_SCHEMA_ID));
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
      <p>VP 검증을 위해 아래의 QR Code를 어플리케이션에서 스캔해주세요.</p>
      {(() => {
        if (loading) return <div>로딩중..</div>;
        if (error) return <div>에러가 발생했습니다</div>;
        if (!invitation.invitation_url) return null;
        return <QRCode value={invitation.invitation_url} />;
      })()}
      <br />
      {JSON.stringify(invitation)}
      <br />
      {isConnected ? '연결되었습니다.' : '완전히 연결되지 않았습니다. 잠시 기다려주세요.'}
      <br />
      {isVPRequestSended ? 'VP Request가 전송되었습니다.' : '아직 VP Request가 전송되지 않았습니다.'}
      <br />
      {isVerified ? '전송한 VP Request에 대해 수신받은 VP가 검증되었습니다.' : 'VP 검증이 완료되지 않았습니다.'}
    </div>
  );
};

function makeProofRequest(schemaId) {
  return {
    name: 'test-proof-req',
    version: '1.0',
    requested_attributes: {
      attribute1_referent: {
        name: 'name',
        restrictions: [
          {
            schema_id: schemaId,
          },
        ],
      },
    },
    requested_predicates: {
      predicate1_referent: {
        name: 'age',
        p_type: '>=',
        p_value: 18,
        restrictions: [
          {
            schema_id: schemaId,
          },
        ],
      },
    },
  };
}

export default VerifyVP;
