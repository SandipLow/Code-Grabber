import { useState, useRef } from 'react';
import Head from 'next/head'
import Link from 'next/link';
import GoogleSignIn from '../client/components/GoogleSignIn';
import { BannerPost } from '../client/components/Banner'
import FaLoading from '../client/components/Loader';
import { ButtonCustom } from '../client/components/Buttons';
import { useRouter } from 'next/router';

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
      <BannerPost title={"Here is the Start of Journey"} />
      <div className="p-4 ">
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
    </>
  )
}

const LoggedIn = ({ user, logOut }) => {
  const router = useRouter();
  
  return (
    <div className='text-center'>
      <div className='inline-block m-2 p-2 border rounded-lg'>
        <span className='font-bebas-neue text-3xl'>Logged In</span>
        <p className='my-4'>Logged In as <b className='text-cdek-blue'>{user.name}</b></p>
        <div className='my-4'>
          <ButtonCustom
            color="cdek-blue"
            onClick={e=> router.replace("/admin")}
          >
            Go to Admin Page
          </ButtonCustom>
        </div>
        <div className='my-4'>
          <ButtonCustom
            color="cdek-blue"
            onClick={logOut}
          >
            Log out
          </ButtonCustom>
        </div>
      </div>
    </div>
  )
}

const LogInForm = ({ logIn, tooglePane }) => {
  const [form, setForm] = useState({ email: "", password: "" })
  const [clicked, setClicked] = useState(false)

  const login = async () => {
    
    const form_vals = Object.values(form)
    
    for (let i=0; i<form_vals.length; i++) {
      if (form_vals[i] === "") return
    }
    
    setClicked(true)
    
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

      if (res.status != 200)
        alert(response.error);

      else logIn({
        name: response.name,
        authtoken: response.authtoken
      });

    }
    catch (err) {
      alert("Ooops Something went wrong \n(Kindly Share the screenshot or any photo if you are seeing this please) : \n", err.toString())
      console.log(err);
    }

    setForm({ email: "", password: "" })
    setClicked(false)
  }

  return (
    <div className='text-center'>
      <div className='inline-block m-2 p-2 border rounded-lg'>
        <span className='font-bebas-neue text-3xl'>Log In to Continue</span>
        <input 
          className='px-4 py-3 bg-slate-200 outline-none block my-2' 
          type="email" 
          placeholder='Enter User Id' 
          value={form.email} 
          onChange={(e)=>setForm({...form, email: e.target.value})} 
        />
        <input 
          className='px-4 py-3 bg-slate-200 outline-none block my-2' 
          type="password" 
          placeholder='Enter Password' 
          value={form.password} 
          onChange={(e)=>setForm({...form, password: e.target.value})} 
        />
        <div className='my-4'>
          <ButtonCustom
            color="cdek-blue"
            disabled={clicked}
            onClick={login}
          >
            {clicked ? <FaLoading/> : "Log In"}
          </ButtonCustom>
        </div>
        <div className='my-4'>
          <GoogleSignIn />
        </div>
        <p className='mt-8'>Don't have a account..? <b className='cursor-pointer text-cdek-blue' onClick={tooglePane}>Sign Up</b></p>
      </div>
    </div>
  )
}

const SignupForm = ({ logIn, tooglePane }) => {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    profilePic: null
  })
  const [clicked, setClicked] = useState(false)
  const imgRef = useRef()
  const imgInpRef = useRef()

  const handleChangePic = (e) => {
    imgRef.current.src = e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : "/Assets/upload.webp"
  }

  const handleSubmit = async () => {

    const form_vals = Object.values(form)
    
    for (let i=0; i<form_vals.length; i++) {
      if (form_vals[i] === "") return
    }
    
    setClicked(true)

    const fileElement = imgInpRef.current
    let imgUrl = null

    // check if user had uploaded profile pic
    if (fileElement.files.length !== 0) {

      let file = fileElement.files[0]
      let formdata = new FormData();
      formdata.set("file", file);

      const response = await fetch(`/api/assets/uploadProfilePic`, {
        method: "POST",
        body: formdata,
        headers: {
          "Accept": "*/*"
        }
      })

      if (response.status === 200)
        imgUrl = await response.text()
      else {
        alert("Some thing went wrong when uploading the profile picture")
        if (!confirm("would you like to create profile without uploading picture..?"))
          return
      }
      
      // setForm({...form, profilePic: await response.text()})
    }

    try {

      let res = await fetch(`/api/auth/signup`, {
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
      }

      else logIn({
        name: response.name,
        authtoken: response.authtoken
      });

    }
    catch (err) {
      alert("Ooops Something went wrong \n(Kindly Share the screenshot or any photo if you are seeing this please) : \n" + err.toString())
      console.log(err);
    }

    setClicked(false)
  }

  return (
    <div className='text-center'>
      <div className='inline-block m-2 p-2 border rounded-lg'>
        <span className='font-bebas-neue text-3xl'>Create Your Account</span>
        <input 
          className='px-4 py-3 bg-slate-200 outline-none block my-2 w-full' 
          type="text" 
          placeholder='Enter a Display Name' 
          value={form.displayName} 
          onChange={(e)=>setForm({...form, displayName: e.target.value})} 
        />
        <input 
          className='px-4 py-3 bg-slate-200 outline-none block my-2 w-full' 
          type="email" 
          placeholder='Enter User Id' 
          value={form.email} 
          onChange={(e)=>setForm({...form, email: e.target.value})} 
        />
        <input 
          className='px-4 py-3 bg-slate-200 outline-none block my-2 w-full' 
          type="password" 
          placeholder='Enter Password' 
          value={form.password} 
          onChange={(e)=>setForm({...form, password: e.target.value})} 
        />
        <input 
          className='px-4 py-3 bg-slate-200 outline-none block my-2 w-full' 
          type="file" 
          ref={imgInpRef}
          onChange={handleChangePic} 
        />
        <img 
          className='w-32 h-32 rounded-full mx-auto my-4 object-cover'
          ref={imgRef}
          src="/Assets/upload.webp"
        />
        <div className='my-4'>
          <ButtonCustom
            color="cdek-blue"
            disabled={clicked}
            onClick={handleSubmit}
          >
            {clicked ? <FaLoading/> : "Sign Up"}
          </ButtonCustom>
        </div>
        <div className='my-4'>
          <GoogleSignIn />
        </div>
        <p className='mt-8'>Already have a account..? <b className='cursor-pointer text-cdek-blue' onClick={tooglePane}>Login</b></p>
      </div>
    </div>
  )
}
