import { jwtDecode } from "jwt-decode";

export default class AuthHelperMethods {
  // Initializing important variables
  // constructor(domain) {
  //   //THIS LINE IS ONLY USED WHEN YOU'RE IN PRODUCTION MODE!
  //   this.domain = domain || "http://localhost:3000"; // API server domain
  // }
  login = (formData) => {
    // Get a token from api server using the fetch api
    console.log("STEP 3: made it into login helper method");
    const entries = Object.fromEntries(formData.entries());
    const username = entries["username"];
    const password = entries["password"];

    console.log("username: ", username, "password: ", password);

    return this.fetch(`http://127.0.0.1:5000/api/log-in`, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
    });
    // .then((res) => {
    //   console.log("Result: ", res);
    //   this.setToken(res.token); // Setting the token in localStorage
    //   return Promise.resolve(res);
    // });
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
  };

  isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired.
        return true;
      } else return false;
    } catch (err) {
      console.log("expired check failed! Line 42: AuthService.js");
      return false;
    }
  };

  setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
  };

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  };

  logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
  };

  getConfirm = () => {
    // Using jwt-decode npm package to decode the token
    let answer = jwtDecode(this.getToken());
    console.log("Recieved answer!");
    return answer;
  };

  fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    console.log("STEP 4: Fetch method");
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      console.log("STEP 4.2");
      headers["Authorization"] = "Bearer " + this.getToken();
    }
    console.log("STEP 4.3");
    return fetch(url, {
      headers,
      ...options,
    })
      .then(console.log("STEP 4.4"), this._checkStatus)
      .then(console.log("STEP 4.5"), (response) => response.json());
  };

  _checkStatus = (response) => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      console.log("RESPONSE ISSUE");
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  };
}
