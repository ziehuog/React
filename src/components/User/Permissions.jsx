import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { dataContext } from "../Share/DataContext";

function Permissions() {
  const { dataUser } = useContext(dataContext);
  // const [listState, setListState] = useState({
  //   info: true,
  //   result: true,
  //   add: false,
  //   permission: false,
  //   checked: true,
  // })
  const [value, setValue] = useState('#fff')
// console.log(dataUser)

  const checkedValue = (e) => {

    console.log(e.target.value)
    // if( e.target.value === 'true'){
    //   setValue('#6366F1')
    // }
    // else{
    //   setValue('#fff')
    // }
   
    // (value === 'true')? setChecked('#6366F1') : setChecked('#000')
  }
  console.log(value)

  return (
    <div>
      <p>List User</p>
      {dataUser.map((user, index) => (
        <div key={index}>
          <div className="grid grid-cols-5 border-b-[1px] py-2">
            <div className="col-span-1 px-2 flex items-center">
              <div>{user.username}</div>
            </div>
            <div className="col-span-3 md:col-span-4 flex">
              {user.permission.map((permission, index) => (
                <div key={index} className="flex">
                  <input 
                  type ="button"
                  value={permission.value}
                  onChange={checkedValue}
                  className="border-2 border-indigo-500 rounded-lg py-1 px-2 mx-2"
                  style={{backgroundColor: `${value}`}}
                  />

                    {/* {permission.value} */}
                  {/* </input> */}
                </div>
              ))}
            </div>
            <div className="col-span-1 md:col-end-6 flex">
              <button>Update</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Permissions;
