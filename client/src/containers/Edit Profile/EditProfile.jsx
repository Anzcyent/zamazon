import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { edit_profile } from '../../redux/actions/user'
import { useNavigate } from "react-router-dom"
import Dropzone from "react-dropzone"

const EditProfile = ({ user }) => {
  const [data, setData] = useState({
    full_name: user?.full_name,
    address: user?.address,
    phone_number: user?.phone_number,
    profile_image: user?.profile_image
  });

  const dispatch = useDispatch();
  const { access_token } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  }

  const handleImages = (files) => {
    const allowed_mimetypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    files.map(f => {
      if (!allowed_mimetypes.includes(f.type)) {
        return dispatch({ type: "ERROR", payload: "Only 'jpeg', 'jpg','png' or 'gif' accepted." });
      } else {
        encodeImageFileAsURL(f);
      }

      return f;
    });
  }

  const encodeImageFileAsURL = (file) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      const { result } = reader;

      setData({ ...data, profile_image: result });
    }
    reader.readAsDataURL(file);
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (data.full_name === "" || data.address === "" || data.phone_number === "") return;

    dispatch(edit_profile(data, access_token));

    navigate("/");

    window.location.reload();
  }


  return (
    <main className="w-3/5 mx-auto p-4 text-xs md:text-base">
      <form autoComplete="off" onSubmit={handleSubmit} className="flex flex-col">
        <div className="p-2 border my-2">
          <input type="text" name="full_name" required placeholder="What is your name? *" defaultValue={data.full_name} className="w-full p-2 outline-0" onChange={handleChange} />
        </div>
        <div className="p-2 border my-2">
          <textarea type="text" name="address" required placeholder="Describe your address. *" defaultValue={data.address} className="w-full p-2 outline-0" onChange={handleChange} />
        </div>
        <div className="p-2 border my-2">
          <input type="number" name="phone_number" required placeholder="What is your phone number? *" defaultValue={data.phone_number} className="w-full p-2 outline-0" onChange={handleChange} />
        </div>
        <div className="p-2 border my-2 flex flex-col">
          <label className="font-bold text-sm">Choose Image</label>
          <Dropzone onDrop={acceptedFile => handleImages(acceptedFile)} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="w-full">
                <input {...getInputProps()} />
                <p className="cursor-pointer p-2 w-full hover:opacity-80 active:scale-95 bg-indigo-500 text-white rounded outline-0 mt-2 text-center">Select Profile Image (Optional)</p>
              </div>
            )}
          </Dropzone>
          {data.profile_image !== "user.png" && <img src={data.profile_image} alt="pp" className="w-20 h-20 mt-2 rounded-full self-center" />}
        </div>

        <button type="submit" className="p-2 bg-indigo-500 hover:bg-indigo-400 duration-300 text-white active:scale-95 self-center my-2 text-xs md:text-base">Submit</button>
      </form>
    </main>
  )
}

export default EditProfile