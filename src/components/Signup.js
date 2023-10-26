import React from "react";
import { useState } from "react";
//useHistory hook has been deprecated; e use useNaviagte hook now
//we use useHistory hook to redirect to our homepae after successful login
import { useNavigate } from "react-router-dom";

const Signup = () => {
  //creating a new state called credentials to store our login fields
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  //using navigate hook
  let navigate = useNavigate();

  //function fired when SUBMIT button clicked
  const handleSubmit = async (e) => {
    //preventing the page from reloading
    e.preventDefault();

    //destructing the 'credentials' object
    const {name, email, password} = credentials;

    //calling the login API endpoint; Use POST request!
    const url = `http://localhost:5000/api/auth/createuser`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //giving in the fields entered by user to fetch request
      body: JSON.stringify({
        name,
        email,
        password
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
    <div className="container row justify-content-center">
      <div className="col-md-3">
        {/* we add the handleSubmit function to the form itself */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              aria-describedby=""
              name="name"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              aria-describedby=""
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              required
              minLength={5}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="cpassword"
              className="form-control"
              id="cpassword"
              name="cpassword"
              required
              minLength={5}
              onChange={onChange}
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

export default Signup;
