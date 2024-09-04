import LoginForm from "../../components/auth/loginForm";

const LoginPage = () => {

  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div className="flex flex-col items-center gap-5 max-w-[350px] p-4 border border-neutral-200 rounded-md">
        <div className="flex flex-col items-center w-full">
          <h4 className="mb-3 text-lg font-semibold">Connexion</h4>
          <hr className="w-2/3 border-t border-neutral-200" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
