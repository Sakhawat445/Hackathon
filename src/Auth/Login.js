import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  
  const [inProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    const { email, password } = state;

    setIsProcessing(true);
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);

      // Show success message
      toast.success("Logged in successfully!");
      
      // Clear the form fields
      setState({ email: "", password: "" });

      // Navigate to the home page
      navigate("/");

    } catch (error) {
      console.error("Error signing in:", error);
      
      // Check error code for specific feedback
      if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please check your email.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else {
        toast.error(error.message); // For other errors
      }
      
      setError(error.message);
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
              <h2 className="text-center mb-4 text-primary">Login</h2>
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
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
                </div>
                
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
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
                </div>

                <div className="d-grid mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={inProcessing}
                  >
                    {inProcessing ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>

                <div className="text-center mt-3">
                  <p>New User? <Link to="/auth/register" className="text-decoration-none text-primary">Register here</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  //   const [state, setstate] = useState({
  //     email: "",
  //     password: "",
  //   });
  //   const [inProcessing, setIsprocessing] = useState(false);
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setstate({ ...state, [name]: value });
  //   };
  //   const handleSubmit = async (e) => {  
  
  //     let { email, password } = state;
  //     console.log(state)
      
  //     e.preventDefault(); 
  
  // console.log(email, password)
  //     setIsprocessing(true);
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((userCredential) => {
  //         // Signed in 
  //         const user = userCredential.user;
  //         // ...
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //       });
      
  
  //     setIsprocessing(false);
  //   };
  
  //   return (
  //     <div className="py-5 auth" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", minHeight: "100vh" }}>
  //     <div className="container">
  //       <div className="row justify-content-center">
  //         <div className="col-md-6">
  //           <div className="card shadow-lg border-0 p-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderRadius: "10px" }}>
  //             <h2 className="text-center mb-4 text-primary">Login</h2>
  //             <form onSubmit={handleSubmit}>
  //               <div className="form-group mb-3">
  //                 <label htmlFor="email" className="form-label">Email</label>
  //                 <div className="input-group">
  //                   <span className="input-group-text">
  //                     <i className="bi bi-envelope"></i>
  //                   </span>
  //                   <input
  //                     type="email"
  //                     className="form-control"
  //                     placeholder="Enter your email"
  //                     name="email"
  //                     onChange={handleChange}
  //                   />
  //                 </div>
  //               </div>
                
  //               <div className="form-group mb-4">
  //                 <label htmlFor="password" className="form-label">Password</label>
  //                 <div className="input-group">
  //                   <span className="input-group-text">
  //                     <i className="bi bi-lock"></i>
  //                   </span>
  //                   <input
  //                     type="password"
  //                     className="form-control"
  //                     placeholder="Enter your password"
  //                     name="password"
  //                     onChange={handleChange}
  //                   />
  //                 </div>
  //               </div>
    
  //               <div className="d-grid mb-3">
  //                 <button
  //                   type="submit"
  //                   className="btn btn-primary btn-lg"
  //                   disabled={inProcessing}
  //                 >
  //                   {inProcessing ? (
  //                     <span className="spinner-border spinner-border-sm"></span>
  //                   ) : (
  //                     "Login"
  //                   )}
  //                 </button>
  //               </div>
    
  //               <div className="text-center mt-3">
  //                 <p>New User? <Link to="/auth/register" className="text-decoration-none text-primary">Register here</Link></p>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
    


      // <div className="py-5 auth">
      //   <div className="container">
      //     <div className="row">
      //       <div className="col">
      //         <div className="card p-3 p-md-5">
      //           <h2 className="text-center">Login</h2>
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
                  
      //             <div className="col-12">
      //               <button
      //                 className="btn btn-success w-100"
      //                 disabled={inProcessing}
      //               >
      //                 {!inProcessing ? (
      //                   <span>Login</span>
      //                 ) : (
      //                   <div className="spinner spinner-grow spinner-grow-sm "></div>
      //                 //  <div> <p>New User?</p></div>
      //                 )}
      //               </button>
      //             </div>
      //             <div className="row">
      //               <div className="d-flex text-center">
      //                 <p> New User?<Link to="/auth/register" className="btn btn-primary">Register</Link></p>
      //               </div>
      //             </div>
      //           </form>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
  //  <Link to="/auth/register" className="btn btn-primary">Register</Link>
// {/* <Link to="/auth/register" className="btn btn-primary">Register</Link>
// <Link to="/auth/forgetpassword" className="btn btn-warnning ">Forgetpassword</Link>
// <Link to="/auth/resetpassword" className="btn btn-danger">Resetpassword</Link>
//   </div> */}
    

  )
}
