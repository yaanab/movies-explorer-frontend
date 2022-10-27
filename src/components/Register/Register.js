import AuthForm from "../AuthForm/AuthForm";
import { useFormWithValidation } from '../../hooks/useForm';

function Register() {

  const { values, handleChange, setValues, errors, isValid, resetForm } = useFormWithValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    // onSubmit(values.password, values.email);
    // setValues({});
    console.log(values)
  }

  return (
    <main>
      <AuthForm
        title="Добро пожаловать!"
        onSubmit={handleSubmit}
        isValid={isValid}
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
        link="/signin"
        linkText="Войти">
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="name">Имя</label>
          <input className="auth-form__input" onChange={handleChange} value={values.name || ""} type="text" id="name" name="name" minLength="4" maxLength="30" required />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.name}</span>
        </div>
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="email">E-mail</label>
          <input className="auth-form__input" onChange={handleChange} value={values.email || ""} type="email" id="email" name="email" required />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.email}</span>
        </div>
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="password">Пароль</label>
          <input className="auth-form__input" onChange={handleChange} value={values.password || ""} type="password" id="password" name="password" minLength="4" required />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.password}</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Register;