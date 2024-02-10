import React from "react";

const SignUp = () => {
  return (
    <div>
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="name"
            placeholder="name"
            className="input input-bordered"
            name="name"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">User name</span>
          </label>
          <input
            type="user"
            placeholder="user"
            className="input input-bordered"
            name="user"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            name="email"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered text-black"
            name="password"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button className=" p-1 bg-red-700">Register</button>
        </div>

        <div className="flex justify-center items-center">
          Sign in with{" "}
          <span
            onClick={handleGoogle}
            className="text-2xl cursor-pointer text-red-700"
          >
            <AiOutlineGoogle></AiOutlineGoogle>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
