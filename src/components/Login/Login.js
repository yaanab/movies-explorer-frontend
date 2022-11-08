import AuthForm from "../AuthForm/AuthForm";
import { useFormWithValidation } from '../../hooks/useForm';

function Login({
  onLogin,
  isSendingUserDataToServer,
  isServerErrorLogin,
  isServerErrorMessage
}) {
  const { values, handleChange, errors, isValid } = useFormWithValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <main>
      <AuthForm
        title="Рады видеть!"
        onSubmit={handleSubmit}
        isValid={isValid}
        buttonDefault="Войти"
        buttonConnectionToServer="Выполняется вход..."
        isSendingUserDataToServer={isSendingUserDataToServer}
        isServerError={isServerErrorLogin}
        serverErrorMessage={isServerErrorMessage}
        text="Ещё не зарегистрированы?"
        link="/signup"
        linkText="Регистрация">
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="email">E-mail</label>
          <input className="auth-form__input" onChange={handleChange} value={values.email || ""} type="email" id="email" name="email" required autoComplete="on" disabled={isSendingUserDataToServer} />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.email}</span>
        </div>
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="password">Пароль</label>
          <input className="auth-form__input" onChange={handleChange} value={values.password || ""} type="password" id="password" name="password" required autoComplete="on" disabled={isSendingUserDataToServer} />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.password}</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Login;