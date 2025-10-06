"use client";

import { useEffect } from "react";

export default function PropertyDetailTracker({
  propertyId,
  userId,
}: {
  propertyId: string;
  userId?: string;
}) {

  const email = typeof window !== 'undefined' ? localStorage.getItem('email') : null;

  useEffect(() => {
    const ws = new WebSocket(process.env.WEBSOCKET_URL || '');

    ws.onopen = () => {
      console.log("✅ WS connected");
      ws.send(JSON.stringify({ propertyId, userId : email }));
    };

    ws.onclose = () => {
      console.log("❌ WS disconnected");
    };

    return () => {
      ws.close();
    };
  }, [propertyId, userId]);

  return null;
}
