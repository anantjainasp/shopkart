import React, { useState } from "react";
import Button from "path-to-your-button-component";

const Login = () => {
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    // Replace this with your actual validation logic
    if (username !== "correctUsername" || password !== "correctPassword") {
      setError("Incorrect username or password");
    } else {
      setError("");
      // Proceed with login
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            {/* Your input fields for username and password */}
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
