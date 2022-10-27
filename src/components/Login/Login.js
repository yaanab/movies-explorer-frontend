import AuthForm from "../AuthForm/AuthForm";
import { useFormWithValidation } from '../../hooks/useForm';

function Login() {

  const { values, handleChange, setValues, errors, isValid, resetForm } = useFormWithValidation({});

  const emailPattern = "([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})";
  const errorMessageDefault = "Введите данные в указанном формате.";
  const errorMessageEmail = "Введите данные в формате e-mail";

  function handleSubmit(e) {
    e.preventDefault();
    // onSubmit(values.password, values.email);
    // setValues({});
    // console.log(values)
    resetForm();
  }

  return (
    <main>
      <AuthForm
        title="Рады видеть!"
        onSubmit={handleSubmit}
        isValid={isValid}
        button="Войти"
        text="Ещё не зарегистрированы?"
        link="/signup"
        linkText="Регистрация">
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="email">E-mail</label>
          <input className="auth-form__input" onChange={handleChange} value={values.email || ""} type="email" pattern={emailPattern}  id="email" name="email" required autoComplete="on" />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.email === errorMessageDefault ? errorMessageEmail : errors.email}</span>
        </div>
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="password">Пароль</label>
          <input className="auth-form__input" onChange={handleChange} value={values.password || ""} type="password" id="password" name="password" required autoComplete="on" />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.password}</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Login;