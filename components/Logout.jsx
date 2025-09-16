"use client";

import { useRouter } from "next/navigation";

function Logout() {
  async function handleLogout() {
    await fetch("/api/remove-cookie");
  }
  let navigate = useRouter();
  return (
    <button
      className="btn btn-red"
      onClick={() => {
        handleLogout();
        navigate.push("/");
      }}
    >
      logout
    </button>
  );
}

export default Logout;
