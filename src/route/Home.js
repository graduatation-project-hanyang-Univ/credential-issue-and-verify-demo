import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { createInvitation } from "../utils/AxiosWithAcapy";

const Home = () => {
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
      <h1>홈</h1>
      <p>이곳은 홈이에요. 가장 먼저 보여지는 페이지죠.</p>
      {(() => {
        if (loading) return <div>로딩중..</div>;
        if (error) return <div>에러가 발생했습니다</div>;
        if (!invitationUrl) return null;
        return <QRCode value={invitationUrl} />;
      })()}
    </div>
  );
};

export default Home;
