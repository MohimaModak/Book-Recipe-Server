import React, { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { updateProfile } from "firebase/auth";
import { useLocation } from "react-router-dom";

const Signup = () => {
  const { creatUser } = useContext(AuthContext);

  const location = useLocation();
  console.log("You device locaion", location);
  const handleSignUpInfo = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const SignupInfo = { name, email, phone, password };
    console.log(SignupInfo);


    creatUser(email, password).then((result) => {
      console.log(result.user);
      updateProfile(result.user, {
        displayName: name,
      })
        .then(() => {
          e.target.reset();
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    });
    
  };

  return (
    <div>
      <form onSubmit={handleSignUpInfo}>
        <div>
          <label>Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Phone</label>
          <input type="phone" name="phone" />
        </div>
        <div>
          <label>Password</label>
          <input type="text" name="password" />
        </div>
        <div className="form-control mt-6">
          <button className=" p-1 bg-red-700 text-white">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
