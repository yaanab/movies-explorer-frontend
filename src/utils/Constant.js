const emailPattern = "([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})";
const namePattern = "^[A-Za-zА-Яа-яё -]+$";
const inputValidationMessageDefault = "Введите данные в указанном формате.";
const inputValidationMessageName = "Имя должно содержать только латиницу, кириллицу, пробел или дефис";
const inputValidationMessageEmail = "Введите данные в формате e-mail";
const serverConflictError = "Пользователь с таким email уже существует.";
const serverValidationError = "Переданы некорректные данные.";
const serverErrorMain = "На сервере произошла ошибка.";
const serverErrorToken = "При авторизации произошла ошибка.";
const serverErrorLogin = "Неправильные email или пароль.";
const serverErrorUpdateUser = "При обновлении профиля произошла ошибка.";

module.exports = {
  emailPattern,
  namePattern,
  inputValidationMessageDefault,
  inputValidationMessageName,
  inputValidationMessageEmail,
  serverConflictError,
  serverValidationError,
  serverErrorMain,
  serverErrorToken,
  serverErrorLogin,
  serverErrorUpdateUser,
};