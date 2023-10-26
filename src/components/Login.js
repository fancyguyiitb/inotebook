import React from "react";
import { useState } from "react";

//useHistory hook has been deprecated; e use useNaviagte hook now
//we use useHistory hook to redirect to our homepae after successful login
import { useNavigate } from "react-router-dom";

const Login = () => {
  //creating a new state called credentials to store our login fields
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  //using navigate hook
  let navigate = useNavigate();

  //function fired when SUBMIT button clicked
  const handleSubmit = async (e) => {
    //preventing the page from reloading
    e.preventDefault();

    //calling the login API endpoint; Use POST request!
    const url = `http://localhost:5000/api/auth/login`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //giving in the fields entered by user to fetch request
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    // console.log(json);

    //if success===true, redirect to home page
    if (json.success) {
      // Save authtoken and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
    } else {
      alert("Please enter correct credentials!");
    }
  };

  //making the onChange function
  const onChange = (e) => {
    //whatever changes made into the text box, should
    //be assigned to note...
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-3">
        {/* always add onSubmit fucntion to the FORM itself! */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              id="email"
              name="email"
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              id="password"
              name="password"
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
