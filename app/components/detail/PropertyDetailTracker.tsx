"use client";

import { useEffect } from "react";

export default function PropertyDetailTracker({
  propertyId,
  userId,
}: {
  propertyId: string;
  userId?: string;
}) {

  const email = localStorage.getItem('email');

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000");

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
