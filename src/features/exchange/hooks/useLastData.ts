import { useEffect, useState } from "react";

/**
 * Returns last data from socket connection at most once per second
 * @param symbolPair
 * @param defaultValue
 */
export const useLastData = <T>(symbolPair: string, defaultValue: T): number | T => {
  const [lastData, setLastData] = useState<number | T>(defaultValue);
  useEffect(() => {
    const subscribe = {
      userKey: process.env.NEXT_PUBLIC_SOCKET_API_KEY,
      symbol: symbolPair,
    };
    const ws = new WebSocket(process.env.NEXT_PUBLIC_SOCKET_URL || "");

    let lastReceivedData: number | null = null;
    const flush = () => {
      if (lastReceivedData !== null) {
        setLastData(lastReceivedData);
      } else {
        setLastData(defaultValue);
      }
    };
    let timer = setInterval(flush, 1000);

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };
    ws.onmessage = (event) => {
      if (event.data === "Connected") {
        return;
      }
      try {
        const data: SocketData = JSON.parse(event.data);
        lastReceivedData = data.mid;
      } catch (e) {
        console.error(e);
      }
    };
    ws.onerror = (event) => {
      console.error(event);
    };
    ws.onclose = () => {
      ws.close();
    };

    return () => {
      clearInterval(timer);
      ws.close();
      flush();
    };
  }, [symbolPair, defaultValue]);
  return lastData;
};
