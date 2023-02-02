import { useState, useRef } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import GoogleSignIn from '../client/components/GoogleSignIn';

export default function Auth({ auth }) {

  const [currentPane, setCurrentPane] = useState("Login")
  const { user, logIn, logOut } = auth

  const tooglePane = () => {
    if (currentPane == "Login") setCurrentPane("Signup")
    else setCurrentPane("Login")
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
          }} >
            {user ? "Welcome" : currentPane}
          </h1>
          <div className="flex justify-center p-4 ">
            {
              user ?  <LoggedIn 
                        user={user} 
                        logOut={logOut}
                      />
              : currentPane == "Login" ?  <LogInForm 
                                            logIn={logIn} 
                                            tooglePane={tooglePane}
                                          />
              : <SignupForm 
                  logIn={logIn} 
                  tooglePane={tooglePane}
                />
            }
          </div>
        </div>
      </div>
    </>
  )
}

const LoggedIn = ({ user, logOut }) => {
  
  return (
    <div className='text-center w-64'>
      <p>Logged In as {user.name}</p><br />
      <Link href="/admin" className="bg-purple-800 text-yellow-100 p-2 mt-4 rounded">Go to Admin Page</Link><br />
      <button onClick={logOut} className="bg-purple-800 text-yellow-100 p-2 mt-4 rounded">Log out</button>
    </div>
  )
}

const LogInForm = ({ logIn, tooglePane }) => {
  const [form, setForm] = useState({ email: "", password: "" })

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

      let response = await res.json();

      if (res.status != 200) {
        alert(response.error);
        return;
      }

      logIn({
        name: response.name,
        authtoken: response.authtoken
      });

    }
    catch (err) {
      alert("Ooops Something went wrong \n(Kindly Share the screenshot or any photo if you are seeing this please) : \n", err.toString())
      console.log(err);
    }

    setForm({ email: "", password: "" })
  }

  return (
    <form onSubmit={login} className='text-center'>
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
      <GoogleSignIn className="h-12 my-2" />
      <span className='block my-4'>Don&apost Have a account ? <button type='none' className='font-bold text-purple-800' onClick={tooglePane}>Sign Up</button></span>
    </form>
  )
}

const SignupForm = ({ logIn, tooglePane }) => {
  const [form, setForm] = useState({})
  const imgRef = useRef()
  const imgInpRef = useRef()

  const handleChangePic = (e) => {
    imgRef.current.src = e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "/Assets/upload.webp"
  }

  const handleSubmit = async () => {

    const fileElement = imgInpRef.current
    let imgUrl = null

    // check if user had uploaded profile pic
    if (fileElement.files.length !== 0) {

      let file = fileElement.files[0]
      let formdata = new FormData();
      formdata.set("file", file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/assets/uploadProfilePic`, {
        method: "POST",
        body: formdata,
        headers: {
          "Accept": "*/*"
        }
      })

      imgUrl = await response.text()
      
      // setForm({...form, profilePic: await response.text()})
    }

    try {

      let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify({...form, profilePic: imgUrl}),
        headers : {
          "Accept": "*/*",
          "Content-Type": "application/json"
        }
      })

      let response = await res.json();

      if (res.status != 200) {
        alert(response.error);
        return;
      }

      logIn({
        name: response.name,
        authtoken: response.authtoken
      });

    }
    catch (err) {
      alert("Ooops Something went wrong \n(Kindly Share the screenshot or any photo if you are seeing this please) : \n" + err.toString())
      console.log(err);
    }
  }

  return (
    <div className='text-center'>
      <div className=''>
        <div className='px-2 my-2'>
          <label htmlFor="displayName" className='inline-block pr-2 w-48 text-2xl text-left' >User Name :</label>
          <input type="email" onChange={(e)=>setForm({...form, displayName : e.target.value })} name='displayName' id='displayName' className='px-2 py-1 outline-none rounded' placeholder='Enter a user name for your account...' />
        </div>
        <div className='px-2 my-2 text-right'>
          <label htmlFor="profilePic" className='inline-block px-2 w-48 text-2xl text-left' >Profile Picture :</label>
          <input type="file" name='profilePic' id='profilePic' ref={imgInpRef} onChange={handleChangePic} className='px-3 w-72' placeholder='add a cool photo for your profile(optional)...' />
          <div className='flex flex-row-reverse pr-4 my-2'>
            <img src="/Assets/upload.webp" alt="upload" ref={imgRef} className='block h-32' />
          </div>
        </div>
        <div className='px-2 my-2'>
          <label htmlFor="email" className='inline-block pr-2 w-48 text-2xl text-left' >Email :</label>
          <input type="email" onChange={(e)=>setForm({...form, email : e.target.value })} name='email' id='email' className='px-2 py-1 outline-none rounded' placeholder='Enter your email...' />
        </div>
        <div className='px-2 my-2'>
          <label htmlFor="password" className='inline-block pr-2 w-48 text-2xl text-left' >Password :</label>
          <input type="password" onChange={(e)=>setForm({...form, password : e.target.value })} name='password' id='password' className='px-2 py-1 outline-none rounded' placeholder='Enter a strong password...' />
        </div>
      </div>
      <button type="submit" className="bg-purple-800 text-yellow-100 p-2 mt-4 rounded" onClick={handleSubmit}>Submit</button>
      <GoogleSignIn className="h-12 my-2" />
      <span className='block my-4'>Already have a account ? <button type='none' className='font-bold text-purple-800' onClick={tooglePane}>Log In</button></span>
    </div>
  )
}
