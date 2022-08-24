import React, { Fragment, useContext } from "react";
import { useState } from "react";
import { Auth } from "../Share/Context/Auth";
import { dataContext } from "../Share/Context/DataContext";
import ModalChangePassword from "../Share/Modals/ModalChangePassword";

function Information() {
  const { authUsername } = useContext(Auth);
  const { dataUser } = useContext(dataContext);
  const [showModal, setShowModal] = useState(false);

  const user = dataUser.filter(
    (user) => user.data.username === JSON.parse(authUsername)
  );

  return (
    <Fragment>
      {/* {user.map((user, index) => (
        <div key={index}> */}
          <div>
            username:<span className="px-2">{user[0]?.data.username}</span>
          </div>
          <div>
            password:
            <input
              className="px-2 outline-none"
              type="password"
              value={user[0]?.data.password}
              readOnly
            />
            <button onClick={() => setShowModal(true)}>Change password</button>
          </div>
        {/* </div>
      ))} */}
      <ModalChangePassword
      user = {user[0]}
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </Fragment>
  );
}

export default Information;
