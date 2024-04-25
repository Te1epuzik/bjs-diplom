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
		ProfileWidget.showProfile(response.data)
	}
});

const ratesBoard = new RatesBoard();
function ratesBoardUpdate() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      moneyManager.setMessage(response.success, "Ошибка");
    }
  });
}

ratesBoardUpdate();
let updateBoard = setInterval(ratesBoardUpdate, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
	ApiConnector.addMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Операция прошла успешно");
		} else {
			moneyManager.setMessage(response.success, "Ошибка");
		}
	});
};

moneyManager.conversionMoneyCallback = data => {
	ApiConnector.convertMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Операция прошла успешно");
		} else {
			moneyManager.setMessage(response.success, "Ошибка");
		}
	});
};

moneyManager.sendMoneyCallback = data => {
	ApiConnector.transferMoney(data, response => {
		if (response.success) {
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, "Операция прошла успешно");
		} else {
			moneyManager.setMessage(response.success, "Ошибка");
		}
	});
};

const favoritesWidget = new FavoritesWidget();
function workingFavorites() {
	ApiConnector.getFavorites(response => {
		if (response.success) {
			favoritesWidget.clearTable(response);
			favoritesWidget.fillTable();
			moneyManager.updateUsersList(response);
		}
	});

	favoritesWidget.addUserCallback = data => {
		ApiConnector.addUserToFavorites(data, response => {
			if (response.success) {
				favoritesWidget.clearTable(response);
				favoritesWidget.fillTable();
				moneyManager.updateUsersList(response);
			} else {
				favoritesWidget.setMessage(response.success, "Ошибка");
			}
		});
	};

	favoritesWidget.removeUserCallback = id => {
		ApiConnector.removeUserFromFavorites(id, response => {
			if (response.success) {
				favoritesWidget.clearTable(response);
				favoritesWidget.fillTable();
				moneyManager.updateUsersList(response);
			} else {
				favoritesWidget.setMessage(response.success, "Ошибка");
			}
		});
	};
}

workingFavorites();