import React, { FormEvent } from "react";
import Button from "../button";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {

    const { signIn } = useAuth()

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        // Get form data
        const formData = new FormData(event.currentTarget);

        // Sign In
        signIn(formData)

        // Clear all fields
        event.currentTarget.reset();
      }

  return (
    <form onSubmit={handleSubmit} action="">
      <div className="">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full mb-3 p-3 rounded-md border border-neutral-300"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full mb-3 p-3 rounded-md border border-neutral-300"
          required
        />
      </div>
      <Button
        type="submit"
        bgColor="bg-orange-400 hover:bg-orange-500"
        textColor="text-white"
        className="w-full py-2"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
