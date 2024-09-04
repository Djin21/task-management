import LoginForm from "../../components/auth/loginForm";

const LoginPage = () => {

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh]">
      <div className="flex flex-col items-center gap-5 max-w-[350px] p-4 border border-neutral-200 rounded-md">
        <div className="flex flex-col items-center w-full">
          <h4 className="mb-3 text-lg font-semibold">Connexion</h4>
          <hr className="w-2/3 border-t border-neutral-200" />
        </div>
        <LoginForm />
      </div>
      <div className="mt-3">
      <p className="text-neutral-700">Login parameters: email: <span className="font-semibold underline">visitor@gmail.com</span> | password: <span className="font-semibold underline">password</span></p>
      </div>
    </div>
  );
};

export default LoginPage;
