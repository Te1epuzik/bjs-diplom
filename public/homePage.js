"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => {
		ApiConnector.logout(response => {
			if (response.success) {
				location.reload();
			}
		});
};

const profileWidget = new ProfileWidget();
ApiConnector.current(response => {
	if (response.success) {
		ProfileWidget.showProfile(response)
	}
});

const ratesBoard = new RatesBoard();
