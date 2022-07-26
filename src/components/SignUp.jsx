import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const onSubmit = async (data) => {
    let response = await fetch("https://api-management.sunoil.com.vn/management/accounts/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    let result = await response.json();
    console.log(result);
    localStorage.setIem("token", JSON.stringify(result.data.token));
  };

  

  return (
    <div className=" flex align-middle justify-center w-[100vw] h-[100vh] bg-gradient-to-r from-indigo-500">
      <div className="sm:m-w-[350px] m-auto w-[350px] h-[420px] bg-slate-200 rounded-3xl border-3 border-black">
        <p className="text-center text-[35px] font-bold py-5">Form Login</p>
        <form onSubmit={handleSubmit(onSubmit)} className="px-7 ">
          <div className="py-4 px-[35px]">
            <label htmlFor="username">Username</label>
            <div className="border-gray-700 border-b-[2px]">
              <input
                className="h-[30px] w-full bg-gray-100 outline-none bg-inherit"
                id="username"
                {...register("username", { required: true, maxLength: 30 })}
              />
            </div>
          </div>

          {errors.username && errors.username.type === "required" && (
            <span className="text-red-700">This is required</span>
          )}
          {errors.username && errors.username.type === "maxLength" && (
            <span className="text-red-700">Max length exceeded</span>
          )}

          <div className="py-4 px-[35px]">
            <label htmlFor="password">Password</label>
            <div className="border-gray-700 border-b-[2px] ">
              <input
                type="password"
                className="h-[30px] w-full bg-gray-100  outline-none bg-inherit "
                id="password"
                {...register("password", { required: true, maxLength: 16 , minLength: 6})}
              />
            </div>
          </div>
          {errors.password && errors.password.type === "required" && (
            <span className="text-red-700">This is required</span>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <span className="text-red-700">Max length exceeded</span>
          )}
          <div className="flex justify-center w-full">
            <input
              type="submit"
              className="border px-3 py-1 bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-200
               my-[20px] rounded-md hover:bg-sky-700  hover:text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );

  //   return (
  //     <div className="flex align-middle justify-center w-[100vw] h-[100vh]">
  //       <div className="m-auto border w-[400px] h-[500px] bg-slate-200 rounded-3xl">
  //         <p className="text-center text-[35px] font-bold font-mono pt-5">
  //           Form Login
  //         </p>
  //         <div className="p-3 ">
  //           <label htmlFor="">
  //             Username
  //             <input type="text" />
  //           </label>
  //         </div>
  //         <div className="p-3">
  //           <label htmlFor="">
  //             Password
  //             <input type="password" />
  //           </label>
  //         </div>
  //         <input className="bg-red-200" type="submit" />
  //         <p>Sign Up</p>
  //       </div>
  //     </div>
  //   );
};

export default SignUp;
