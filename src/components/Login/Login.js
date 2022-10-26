import AuthForm from "../AuthForm/AuthForm";

function Login() {
  return (
    <main>
      <AuthForm
        title="Рады видеть!"
        isNameHidden={true}
        button="Войти"
        text="Ещё не зарегистрированы?"
        link="/signup"
        linkText="Регистрация"
      />
    </main>
  );
}

export default Login;