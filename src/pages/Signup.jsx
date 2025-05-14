
// import React, { useState } from "react";

// const Signup = () => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [step, setStep] = useState("login"); // 'login' or 'otp'
//   const [employeeId, setEmployeeId] = useState("");
//   const [password, setPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [generatedOtp, setGeneratedOtp] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (employeeId === "emp123" && password === "password123") {
//       const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
//       setGeneratedOtp(newOtp);
//       alert(`Your OTP is: ${newOtp}`); // In real case, send via email/SMS
//       setStep("otp");
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   const handleOtpVerify = (e) => {
//     e.preventDefault();
//     if (otp === generatedOtp) {
//       alert("Login successful!");
//     } else {
//       alert("Invalid OTP");
//     }
//   };


//   const containerStyle = {
//     maxWidth: "400px",
//     margin: "80px auto",
//     padding: "30px",
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//     boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//     background: "#fff",
//     fontFamily: "Arial, sans-serif",
//   };

//   const inputStyle = {
//     width: "100%",
//     padding: "12px",
//     marginBottom: "15px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     fontSize: "16px",
//   };

//   const buttonStyle = {
//     width: "100%",
//     padding: "12px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     fontWeight: "bold",
//     border: "none",
//     borderRadius: "6px",
//     fontSize: "16px",
//     cursor: "pointer",
//   };

//   const titleStyle = {
//     textAlign: "center",
//     marginBottom: "25px",
//   };  

  
//   return (
//     <div style={containerStyle}>
//       {step === "login" ? (
//         <form onSubmit={handleLogin}>
//           <h2 style={titleStyle}>Employee Login</h2>
//           <input
//             type="text"
//             placeholder="Employee ID"
//             value={employeeId}
//             onChange={(e) => setEmployeeId(e.target.value)}
//             required
//             style={inputStyle}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={inputStyle}
//           />
//           <button type="submit" style={buttonStyle}>
//             Login
//           </button>
//         </form>
//       ) : (
//         <form onSubmit={handleOtpVerify}>
//           <h2 style={titleStyle}>OTP Verification</h2>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//             style={inputStyle}
//           />
//           <button type="submit" style={buttonStyle}>
//             Verify OTP
//           </button>
//         </form>
//       )}
//     </div>
//   );

// };

// export default Signup;
// src/pages/Signup.js
import React, { useState } from "react";

const Signup = () => {
  const [step, setStep] = useState("login"); // 'login' or 'otp'
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (employeeId === "emp123" && password === "password123") {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      alert(`Your OTP is: ${newOtp}`);
      setStep("otp");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleOtpVerify = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      alert("Login successful!");
      localStorage.setItem("isAuthenticated", "true");
      window.location.href = "/";
    } else {
      alert("Invalid OTP");
    }
  };

  const styles = {
    container: {
      maxWidth: "400px",
      margin: "12% auto",
      padding: "30px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      background: "#fff",
      fontFamily: "Arial, sans-serif",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "#fff",
      fontWeight: "bold",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
    },
    title: {
      textAlign: "center",
      marginBottom: "25px",
    },
  };

  return (
    <div style={styles.container}>
      {step === "login" ? (
        <form onSubmit={handleLogin}>
          <h2 style={styles.title}> Login</h2>
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      ) : (
        <form onSubmit={handleOtpVerify}>
          <h2 style={styles.title}>OTP Verification</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default Signup;
