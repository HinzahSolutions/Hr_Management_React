import React, { useState } from "react";

const Signup = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="" >
      <div className={`auth-container ${isSignup ? "signup-mode" : ""}`}>
        <div className="form-container sign-in-container">
          <form className="d-flex flex-column" style={{ width: "300px", margin: "0 auto", gap: "10px" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "rgba(30, 70, 247, 0.94)" }}>Sign In</h2>

            <input
              type="email"
              placeholder="Email"
              style={{
                padding: "12px 15px",
                fontSize: "16px",
                border: "2px solid #ccc",
                borderRadius: "6px",
                transition: "all 0.3s ease-in-out",
                outline: "none",
                backgroundColor: "#fdfdfd",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.5)";
                e.target.style.transform = "scale(1.02)";
                e.target.style.backgroundColor = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "scale(1)";
                e.target.style.backgroundColor = "#fdfdfd";
              }}
            />

            <input
              type="password"
              placeholder="Password"
              style={{
                padding: "12px 15px",
                fontSize: "16px",
                border: "2px solid #ccc",
                borderRadius: "6px",
                transition: "all 0.3s ease-in-out",
                outline: "none",
                backgroundColor: "#fdfdfd",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.5)";
                e.target.style.transform = "scale(1.02)";
                e.target.style.backgroundColor = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "scale(1)";
                e.target.style.backgroundColor = "#fdfdfd";
              }}
            />

            <button
              type="submit"
              style={{
                padding: "12px",
                backgroundColor: "#007bff",
                border: "none",
                color: "white",
                fontWeight: "bold",
                borderRadius: "6px",
                marginTop: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Sign In
            </button>
          </form>

        </div>

        <div className="form-container sign-up-container">
          <form className=" d-flex flex-column" style={{ width: "300px", margin: "0 auto", gap: "10px" }}>
            <h2 style={{ color: "rgba(30, 70, 247, 0.94)" }}>Sign Up</h2>
            <input type="text" placeholder="Name" style={{
              padding: "12px 15px",
              fontSize: "16px",
              border: "2px solid #ccc",
              borderRadius: "6px",
              transition: "all 0.3s ease-in-out",
              outline: "none",
              backgroundColor: "#fdfdfd",
            }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.5)";
                e.target.style.transform = "scale(1.02)";
                e.target.style.backgroundColor = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "scale(1)";
                e.target.style.backgroundColor = "#fdfdfd";
              }} />
            <input type="email" placeholder="Email" style={{
              padding: "12px 15px",
              fontSize: "16px",
              border: "2px solid #ccc",
              borderRadius: "6px",
              transition: "all 0.3s ease-in-out",
              outline: "none",
              backgroundColor: "#fdfdfd",
            }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.5)";
                e.target.style.transform = "scale(1.02)";
                e.target.style.backgroundColor = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "scale(1)";
                e.target.style.backgroundColor = "#fdfdfd";
              }} />
            <input type="password" placeholder="Password" style={{
              padding: "12px 15px",
              fontSize: "16px",
              border: "2px solid #ccc",
              borderRadius: "6px",
              transition: "all 0.3s ease-in-out",
              outline: "none",
              backgroundColor: "#fdfdfd",
            }}
              onFocus={(e) => {
                e.target.style.borderColor = "#007bff";
                e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.5)";
                e.target.style.transform = "scale(1.02)";
                e.target.style.backgroundColor = "#fff";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#ccc";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "scale(1)";
                e.target.style.backgroundColor = "#fdfdfd";
              }} />
            <button type="submit"
              style={{
                padding: "12px",
                backgroundColor: "#007bff",
                border: "none",
                color: "white",
                fontWeight: "bold",
                borderRadius: "6px",
                marginTop: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
            >Sign Up</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay ">
            <div className="overlay-panel overlay-left">
              <h2>Welcome Back!</h2>
              <p>To keep connected, please login with your info</p>
              <button onClick={() => setIsSignup(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start your journey with us</p>
              <button onClick={() => setIsSignup(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
