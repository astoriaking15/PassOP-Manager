import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords))
    }

  }, [])


  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src)
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "text"
    }

  }

  const savePassword = () => {
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3 ){
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      console.log([...passwordArray, form])
      setform({ site: "", username: "", password: "" })
      toast('🦄 Password saved successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",        
      });
    }
    else{
      toast('Error: Password not saved!');
    }
  }

  const deletePassword = (id) => {
    console.log("Deleting password with id ", id)
    let c = confirm("Are you sure you want to delete this password?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
      toast('🦄 Password deleted.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

  }

  const editPassword = (id) => {
    console.log("Editing password with id ", id)
    setform(passwordArray.filter(i => i.id === id)[0])
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })

  }

  const copyText = (text) => {
    toast('🦄 Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text)
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
      <div className="md:container mx-auto md:px-40 py-10">
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'> &lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter username' className='rounded-full border border-green-500 w-full px-4 py-1' type="text" name="username" id="username" />
            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter password' className='rounded-full border border-green-500 w-full px-4 py-1' type="password" name="password" id="password" />
              <span className='absolute right-0.5 top-1.5 cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' src="icons/eye.png" alt="eye" width={24} />
              </span>
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center bg-green-400 rounded-full w-fit px-6 py-2 gap-2 hover:bg-green-300 border border-green-900'>
            <span className="material-symbols-outlined">
              add_2
            </span>Save</button>
        </div>
        <div className="passwords px-2 md:px-0">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-6">
            <thead className='bg-green-800 text-white'>
              <tr>
                <th className='py-2'>Site</th>
                <th className='py-2'>Username</th>
                <th className='py-2'>Password</th>
                <th className='py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-green-100'>
              {passwordArray.map((item, index) => {
                return <tr key={index}>
                  <td className='py-2 border border-white text-center w-32'>
                    <a href={item.site} target='_blank'>{item.site}</a>
                    <i className="fa-regular fa-copy cursor-pointer px-2" onClick={() => { copyText(item.site) }}></i>
                  </td>
                  <td className='py-2 border border-white text-center w-32'>
                    <span>{item.username}</span>
                    <i className="fa-regular fa-copy cursor-pointer px-2" onClick={() => { copyText(item.username) }}></i>
                  </td>
                  <td className='py-2 border border-white text-center w-32'>
                    <span>{item.password}</span>
                    <i className="fa-regular fa-copy cursor-pointer px-2" onClick={() => { copyText(item.password) }}></i>
                  </td>
                  <td className='py-2 border border-white text-center w-32'>
                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/cbtlerlm.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#ffffff,secondary:#000000,tertiary:#000000,quaternary:#000000,quinary:#3a3347"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/sxhqklqh.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#ffffff,secondary:#000000,tertiary:#000000"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                  </td>
                </tr>
              })}

            </tbody>
          </table>}
        </div>
      </div>
    </>
  )
}

export default Manager
