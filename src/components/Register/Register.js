import AuthForm from "../AuthForm/AuthForm";

function Register() {
  return (
    <main>
      <AuthForm
        title="Добро пожаловать!"
        isNameHidden={false}
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
        link="/signin"
        linkText="Войти"
      />
    </main>
  );
}

export default Register;