"use strict"

class UserForm {
	constructor(data, callback) {
		this.loginFormCallback = (data, callback) => {
			ApiConnector.login(data, callback)
		};

		this.registerFormCallback = () => {

		};
	}

}

class ApiConnector {
	static login({login, password}, callback) {

	}

	static register({login, password}, callback) {

	}
}