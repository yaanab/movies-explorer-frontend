import AuthForm from "../AuthForm/AuthForm";

function Login() {
  return (
    <AuthForm 
      title="Рады видеть!"
      isNameHidden={true}
      button="Войти"
      text="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
    />
  );
}

export default Login;