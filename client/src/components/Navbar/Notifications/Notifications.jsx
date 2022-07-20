import React, { useId, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { read_notifications } from "../../../redux/actions/user"
import { Notification } from "../../index";
import { TiTimes } from "react-icons/ti"

const Notifications = ({ setNotif, user }) => {
  const [notificationDetails, setNotificationDetails] = useState(false);
  const id = useId();

  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(read_notifications(access_token));
  }, [dispatch, access_token]);
  return (
    <div className="absolute flex flex-col md:right-40 top-20 w-60 h-60 bg-white rounded z-20 p-2 animate__animated animate__fadeInDown overflow-y-scroll shadow">
      <header className="flex items-center justify-between">
        <h1 className="font-bold">Notifications</h1>
        <TiTimes onClick={() => setNotif(false)} className="cursor-pointer hover:opacity-50 active:scale-95" />
      </header>

      {user?.notifications.length > 0 ? <main className="p-2 text-xs">

        {user?.notifications.map(n => (
          <div key={id} onClick={() => setNotificationDetails(true)} className="text-indigo-600 hover:bg-indigo-600 hover:text-white duration-300 p-1 cursor-pointer active:scale-95">
            <span className="mb-1">{n.msg}</span>
            <hr className="my-2" />
            {notificationDetails && <Notification id={n._id} token={access_token}/>}
          </div>
        ))}
      </main> : <main className="text-sm p-2">Empty notifications.</main>
      }


    </div >
  )
}

export default Notifications