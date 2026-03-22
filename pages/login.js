import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");

  async function login() {
    await supabase.auth.signInWithOtp({ email });
    alert("Check your email");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <input onChange={e => setEmail(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
