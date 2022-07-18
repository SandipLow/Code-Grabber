import { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link';

export default function Login(props) {

  const [form, setForm] = useState({ email: "", password: "" })
  const [authState, setAuthState] = useState(null)

  useEffect(() => {
    let authtoken = localStorage.getItem("auth-token")

    if (authtoken != undefined) {
      setAuthState(authtoken);
    }
  }, [])

  const login = async (e) => {
    e.preventDefault();
    // console.log(form);

    try {
      let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json"
      }

      let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: headersList
      })

      if (res.status != 200) {
        let response = await res.json();
        alert(response.error);

        return;
      }

      let tokenstring = await res.text()

      let token = JSON.parse(tokenstring).authtoken;

      localStorage.setItem("auth-token", token)

      setAuthState(token);

      // console.log(localStorage.getItem("auth-token"));

    }
    catch (err) {
      alert("Ooops Something went wrong \n(Kindly Share the screenshot or any photo if you are seeing this please) : \n", err)
    }

    setForm({ email: "", password: "" })
  }

  const logout = () => {
    localStorage.removeItem("auth-token");
    setAuthState(null);
  }

  return (
    <>
      <Head>
        <title>Admin Log in | Code Grabber</title>
      </Head>
      <div className="flex justify-center">
        <div className="m-48 bg-purple-200 text-gray-600 rounded-2xl" style={{
          width: "fit-content"
        }}>
          <h1 className="bg-purple-800 text-yellow-100 text-3xl p-2 text-center" style={{
            borderTopRightRadius: "inherit",
            borderTopLeftRadius: "inherit"
          }} >Log In</h1>
          <div className="flex justify-center p-4 ">
            {authState ?
              <div className='text-center w-64'>
                <p>Logged In...</p><br />
                <Link href="/admin" passHref><a className="bg-purple-800 text-yellow-100 p-2 mt-4 rounded">Go to Admin Page</a></Link><br />
                <button onClick={logout} className="bg-purple-800 text-yellow-100 p-2 mt-4 rounded">Log out</button>
              </div>
              : <form onSubmit={login} className='text-center'>
                <div className="flex" >
                  <div className="min-w-max pr-4 text-3xl text-left">
                    <label htmlFor="email">Email :</label><br />
                    <label htmlFor="password">Password :</label>
                  </div>
                  <div>
                    <input type="email" name="email" value={form.email} onChange={(e) => setForm({ email: e.target.value, password: form.password })} id="email" className="m-2" required /><br />
                    <input type="password" name="password" value={form.password} onChange={(e) => setForm({ email: form.email, password: e.target.value })} id="password" className="m-2" required />
                  </div>
                </div>
                <button type="submit" className="bg-purple-800 text-yellow-100 p-2 mt-4 rounded">Submit</button>
              </form>}
          </div>
        </div>
      </div>
    </>
  )
}
