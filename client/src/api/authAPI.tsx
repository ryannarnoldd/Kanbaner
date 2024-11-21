import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route

  try {
    // Fetch.
    const response = await fetch ('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    if (!response.ok) {
      // Returns Error message
      const errorMsg = await response.json();
      const errorMessage = `Error: ${errorMsg}`
      throw new Error(errorMessage);
    }

    const data = await response.json();

    return data;
  }
  catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
}

export { login };