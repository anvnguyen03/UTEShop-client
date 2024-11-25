import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onmessage = (event) => {
      setMessage(event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    setWs(socket);

    // Cleanup khi component unmount
    return () => {
      socket.close();
    };
  }, [url]);

  return { message, ws };
};

export default useWebSocket;
