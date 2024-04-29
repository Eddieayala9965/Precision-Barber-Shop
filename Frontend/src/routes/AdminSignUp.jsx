import { Form, Link, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = { email, password };
  const url = `http://127.0.0.1:8000/register`;

  const userSignUp = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    data = await response.json();
    console.log(data);
    if (response.ok) {
      window.alert("User created successfully");
      return true;
    } else {
      window.alert("Unable to create user");
    }
  };
  // I have change the redirect to make sure the employee is redirected so update thier page
  // going to have to figure out the logic that.
  const signUp = await userSignUp(data);
  return signUp ? redirect("/admin/login") : redirect("/admin/signup");
};
const AdminSignUp = () => {
  return <></>;
};

export default AdminSignUp;
