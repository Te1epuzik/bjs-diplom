"use strict";

const userForm = new UserForm();
userForm.loginFormCallback = data => {
	ApiConnector.login(data, response => {
		if (response.success) {
			location.reload();
		} else {
			userForm.setLoginErrorMessage(`Ошибка: ${response.error}`);
		}
	});
};

userForm.registerFormCallback = data => {
	ApiConnector.register(data, response => {
		if (response.success) {
			userForm.id = response.id;
			location.reload();
		} else {
			userForm.setRegisterErrorMessage(`Ошибка: ${response.error}`);
		}
	});
};