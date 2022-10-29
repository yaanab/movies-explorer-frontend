import AuthForm from "../AuthForm/AuthForm";
import { useFormWithValidation } from '../../hooks/useForm';

function Register({
  onRegister,
  isLoading,
  isServerError,
  isServerErrorMessage,
  emailPattern,
  namePattern,
  inputValidationMessageDefault,
  inputValidationMessageName,
  inputValidationMessageEmail
}) {

  const { values, handleChange, setValues, errors, isValid, resetForm } = useFormWithValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values.name, values.email, values.password)
    console.log(values);
  }

  return (
    <main>
      <AuthForm
        title="Добро пожаловать!"
        onSubmit={handleSubmit}
        isServerError={isServerError}
        isValid={isValid}
        button="Зарегистрироваться"
        isLoading={isLoading}
        serverErrorMessage={isServerErrorMessage}
        text="Уже зарегистрированы?"
        link="/signin"
        linkText="Войти">
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="name">Имя</label>
          <input className="auth-form__input" onChange={handleChange} value={values.name || ""} type="text" pattern={namePattern} id="name" name="name" minLength="4" maxLength="30" required autoComplete="off" />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.name === inputValidationMessageDefault ? inputValidationMessageName : errors.name}</span>
        </div>
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="email">E-mail</label>
          <input className="auth-form__input" onChange={handleChange} value={values.email || ""} type="email" pattern={emailPattern} id="email" name="email" required autoComplete="off" />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.email === inputValidationMessageDefault ? inputValidationMessageEmail : errors.email}</span>
        </div>
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="password">Пароль</label>
          <input className="auth-form__input" onChange={handleChange} value={values.password || ""} type="password" id="password" name="password" minLength="6" required autoComplete="off" />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.password}</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Register;