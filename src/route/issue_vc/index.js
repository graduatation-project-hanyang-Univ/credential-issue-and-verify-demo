import React, { useEffect, useState } from 'react';
import { createInvitation, getConnection, getCredentialissuanceRecords } from '../../apis/AxiosWithAcapy';
import QRCode from 'react-qr-code';
import { sleep } from '../../utils/utils';

const IssueVC = () => {
  const [invitation, setInvitation] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const [isCredentialIssued, setIsCredentialIssued] = useState(false);
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
        setError(e);
      }
    };

    await fetchInvitationUrl();
    await stopUntilConnected();
    await stopUntilCredentialIssued();
  }, []);

  return (
    <div>
      <p>VC 발급을 위해 아래의 QR Code를 어플리케이션에서 스캔해주세요.</p>
      {(() => {
        if (loading) return <div>로딩중..</div>;
        if (error) return <div>에러가 발생했습니다</div>;
        if (!invitation.invitation_url) return null;
        return <QRCode value={invitation.invitation_url} />;
      })()}
      <br />
      {isConnected ? '연결되었습니다. 어플리케이션을 통해 Credential 발급 요청을 보내주세요.' : ''}
      <br />
      {isCredentialIssued ? '요청하신 Credential이 발급되었습니다.' : ''}
    </div>
  );
};

export default IssueVC;
