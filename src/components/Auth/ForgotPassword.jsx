import React from 'react'

function ForgotPassword() {
  return (
    <div className=" flex align-middle justify-center  w-[100vw] h-[100vh] ">
      <div className="sm:m-w-[350px] border relative border-gray-400 m-auto w-[350px] h-[420px] bg-slate-200/50 rounded-3xl">
        <h1 className="text-center text-[35px] pt-7 font-bold pb-5">Forgot password</h1>

        <form className="px-[35px]">
          <label htmlFor="username">Username</label>
          <div className="flex mt-[15px]">
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              type="text"
              placeholder="username"
              name="username"
            />
          </div>

          <label className="" htmlFor="password">
            Password
          </label>
          <div className=" flex mt-[15px] bg-gray-100 rounded-md">
            <input
              className="h-[35px] w-full bg-gray-100 rounded-md px-[15px] outline-none placeholder:text-gray-500"
              name="password"
              placeholder="password"
            />
          </div>
              
          <div className="flex justify-center absolute bottom-[40px] left-[135px] pt-10">
            <input
              className="border transition duration-300 cursor-pointer px-3 py-1 
              bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white"
              type="submit"
            />
          </div>
          
        </form>
            <p
              className="cursor-pointer hover:text-indigo-600 absolute bottom-5 right-5"
              onClick={() => {
              }}
            >
              Register
            </p>
      </div>
    </div>
  )
}

export default ForgotPassword