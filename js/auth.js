class Auth {
	constructor() {
		const id = localStorage.getItem("id");
		const token = localStorage.getItem("accessToken");
		this.validateAuth(id, token);
	}

	validateAuth(id, accessToken) {
		if (id == undefined || accessToken == undefined) {
			window.location.replace("/");
		}
	}

	logOut() {
		localStorage.removeItem("id");
		localStorage.removeItem("accessToken");
		window.location.replace("/");
	}
}
