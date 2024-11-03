import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
















  
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = state;

    // Check if password and confirmPassword match
    if (confirmPassword !== password) {
      return alert("Passwords do not match");
    }

    setIsProcessing(true);

    try {
      // Register user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User registered:", user);
      
      // Show success message using Toastify
      toast.success("Registered successfully!");

      // Clear form fields after successful registration
      setState({ email: "", password: "", confirmPassword: "" });

      // Navigate to the login page after registration
      navigate("/auth/login");

    } catch (error) {
      // Handle registration errors
      console.error("Error registering user:", error);
      toast.error(error.message); // Display error message with Toastify
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-5 auth" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", minHeight: "100vh" }}>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg border-0 p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "10px" }}>
              <h2 className="text-center mb-4 text-primary">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm your password"
                    name="confirmPassword"
                    value={state.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={inProcessing}
                  >
                    {inProcessing ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Register"
                    )}
                  </button>
                </div>
                <div className="text-center mt-3">
                  <p>Already have an account? <Link to="/auth/login" className="text-decoration-none text-primary">Log in</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>














//     const [state, setstate] = useState({
//       email: "",
//       password: "",
//       confirmPassword: "",
//     });
//     const [inProcessing, setIsprocessing] = useState(false);
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setstate({ ...state, [name]: value });
//     };
//     const handleSubmit = async (e) => {  
  
//       let { email, password, confirmPassword } = state;
//       console.log(state)
//       if (confirmPassword !== password) {
//         return alert("Password doesn't mach");
//       }
//       e.preventDefault(); 
  
//   console.log(email, password)
//       setIsprocessing(true);
  
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     // ...
//   })
//   // .catch((error) => {
//   //   const errorCode = error.code;
//   //   const errorMessage = error.message;
//   //   // ..
//   // });
  
//       setIsprocessing(false);
//     };
  
//     return (
//       <div className="py-5 auth" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", minHeight: "100vh" }}>
//   <div className="container">
//     <div className="row justify-content-center">
//       <div className="col-md-6">
//         <div className="card shadow-lg border-0 p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "10px" }}>
//           <h2 className="text-center mb-4 text-primary">Register</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group mb-3">
//               <label htmlFor="email" className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Enter your email"
//                 name="email"
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div className="form-group mb-3">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Enter your password"
//                 name="password"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group mb-4">
//               <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 placeholder="Confirm your password"
//                 name="confirmPassword"
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="d-grid">
//               <button
//                 type="submit"
//                 className="btn btn-primary btn-lg"
//                 disabled={inProcessing}
//               >
//                 {inProcessing ? (
//                   <span className="spinner-border spinner-border-sm"></span>
//                 ) : (
//                   "Register"
//                 )}
//               </button>
//             </div>
//             <div className="text-center mt-3">
//                   <p>New User? <Link to="/auth/login" className="text-decoration-none text-primary">login</Link></p>
//                 </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

      // <div className="py-5 auth">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col">
      //         <div className="card p-3 p-md-5">
      //           <h2 className="text-center">Register</h2>
      //           <form onSubmit={handleSubmit}>
      //             <div className="row">
      //               <div className="col-12 mb-3">
      //                 <input
      //                   type="email "
      //                   className="form-control"
      //                   placeholder="Email"
      //                   name="email"
      //                   onChange={handleChange}
      //                 />
      //               </div>
      //             </div>
      //             <div className="row">
      //               <div className="col-12 mb-3">
      //                 <input
      //                   type="password "
      //                   className="form-control"
      //                   placeholder="password "
      //                   name="password "
      //                   onChange={handleChange}
      //                 />
      //               </div>
      //             </div>
      //             <div className="row">
      //               <div className="col-12 mb-3">
      //                 <input
      //                   type="confimPassword "
      //                   className="form-control"
      //                   placeholder="confimPassword "
      //                   name="confimPassword"
      //                   onChange={handleChange}
      //                 />
      //               </div>
      //             </div>
      //             <div className="col-12">
      //               <button
      //                 className="btn btn-primary w-100"
      //                 disabled={inProcessing}
      //               >
      //                 {!inProcessing ? (
      //                   <span>Register</span>
      //                 ) : (
      //                   <div className="spinner spinner-grow spinner-grow-sm "></div>
                        
      //                 )}
      //               </button>
      //             </div>
      //           </form>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
  )
}
