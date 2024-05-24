import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacebookVideoEmbed({ url }) {
  const [embedCode, setEmbedCode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFacebookVideoEmbedCode = async () => {
      try {
        const response = await axios.get(`https://graph.facebook.com/v11.0/?id=${url}&fields=embed_html&access_token=EAcX0zA499bTCLlZAUva0ZCeqcYW1NwKNwGLXND`);
        setEmbedCode(response.data.embed_html);
        setError(null);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching Facebook video embed code:', error);
      }
    };

    fetchFacebookVideoEmbedCode();
  }, [url]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!embedCode) {
    return <div>Loading...</div>;
  }

  return <div style={{ width: '100%', maxHeight: '80vh', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: embedCode }} />;
}

export default FacebookVideoEmbed;
