import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/home");
    }, 1000);
  }, []);

  return (
    <div className="loading">
      <span>Loading</span>
    </div>
  );
}
