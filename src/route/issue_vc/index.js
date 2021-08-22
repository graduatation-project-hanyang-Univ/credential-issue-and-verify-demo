import React, { useEffect, useState } from 'react';
import { createInvitation } from '../../utils/AxiosWithAcapy';
import QRCode from 'react-qr-code';

const IssueVC = () => {
  const [invitationUrl, setInvitationUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvitationUrl = async () => {
      try {
        setError(null);
        setInvitationUrl(null);
        setLoading(true);
        const response = await createInvitation();
        setInvitationUrl(response.data.invitation_url);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    fetchInvitationUrl();
  }, []);

  return (
    <div>
      <p>VC 발급을 위해 아래의 QR Code를 어플리케이션에서 스캔해주세요.</p>
      {(() => {
        if (loading) return <div>로딩중..</div>;
        if (error) return <div>에러가 발생했습니다</div>;
        if (!invitationUrl) return null;
        return <QRCode value={invitationUrl} />;
      })()}
    </div>
  );
};

export default IssueVC;
