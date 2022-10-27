import AuthForm from "../AuthForm/AuthForm";
import { useFormWithValidation } from '../../hooks/useForm';

function Register() {

  const { values, handleChange, setValues, errors, isValid, resetForm } = useFormWithValidation({});

  const emailPattern = "([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})";
  const namePattern = "^[A-Za-zА-Яа-яё -]+$";
  const errorMessageDefault = "Введите данные в указанном формате.";
  const errorMessageName = "Имя должно содержать только латиницу, кириллицу, пробел или дефис";
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
        title="Добро пожаловать!"
        onSubmit={handleSubmit}
        isValid={isValid}
        button="Зарегистрироваться"
        text="Уже зарегистрированы?"
        link="/signin"
        linkText="Войти">
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="name">Имя</label>
          <input className="auth-form__input" onChange={handleChange} value={values.name || ""} type="text" pattern={namePattern} id="name" name="name" minLength="4" maxLength="30" required autoComplete="off" />
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.name === errorMessageDefault ? errorMessageName : errors.name}</span>
        </div>
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="email">E-mail</label>
          <input className="auth-form__input" onChange={handleChange} value={values.email || ""} type="email" pattern={emailPattern}  id="email" name="email" required autoComplete="off"/>
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.email === errorMessageDefault ? errorMessageEmail : errors.email}</span>
        </div>
        <div className="auth-form__input-group">
          <label className="auth-form__label" htmlFor="password">Пароль</label>
          <input className="auth-form__input" onChange={handleChange} value={values.password || ""} type="password" id="password" name="password" minLength="6" required autoComplete="off"/>
          <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.password}</span>
        </div>
      </AuthForm>
    </main>
  );
}

export default Register;