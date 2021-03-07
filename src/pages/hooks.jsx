import React, { useState, useEffect } from "react";
export default function Login() {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    console.log("phone changed");
  }, [phone]);

  useEffect(() => {
    console.log("didmount");
    return () => {
      console.log("unmont");
    };
  }, []);

  const saveInput = (e) => {
    setPhone(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        value={phone}
        onChange={saveInput}
      />
    </div>
  );
}
