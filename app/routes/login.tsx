import { Link } from "react-router-dom";
import { useState } from "react";
import validator from "validator";
import DashboardLayout from "~/layouts/Dashboardlayout";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      console.error(errors);
      return;
    }

    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      window.location.href = `/dashboard`;
    } else {
      console.error("Failed to log in");
    }
  };

  // Validation function
  function validateForm(data) {
    let errors = {};

    if (!validator.isEmail(data.email)) {
      errors.email = "Invalid email address";
    }

    if (validator.isEmpty(data.password)) {
      errors.password = "Password is required";
    }

    return errors;
  }

  return (
    <DashboardLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Sign In Form</h3>
        </div>
        <form method="post" noValidate onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required={true}
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="mb-2.5 block text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required={true}
                placeholder="Enter password"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="mt-5 mb-5.5 flex items-center justify-between">
              <Link to="/signup" className="text-sm text-primary">
                Don't have an account?
              </Link>
            </div>

            <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default Login;




// REMIX VERSION DOES NOT WOTRK AS EXPECTED COOKIE NOT BEING CREATED.


// import { Form, Link } from "@remix-run/react";
// import type { ActionFunction } from "@remix-run/node";
// import { redirect } from "@remix-run/node";
// import { formDataToObject } from "~/helpers/utilities";
// import validator from "validator";
// import DashboardLayout from "~/layouts/Dashboardlayout";

// interface FormData {
//   email: string;
//   password: string;
// }

// export let action: ActionFunction = async ({ request }) => {
//   let formData = await request.formData();
//   let data = formDataToObject(formData);

//   // Perform form validation
//   let errors = validateForm(data as FormData);

//   if (Object.keys(errors).length > 0) {
//     // Return the errors if any
//     return new Response(JSON.stringify(errors), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }

//   let response = await fetch("http://localhost:3000/api/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       cookie: request.headers.get("cookie") || "",
//     },
//     body: JSON.stringify(data),
//   });

//   if (response.ok) {
//     return redirect(`/dashboard`);
//   } else {
//     // Handle any errors
//     return new Response(null, { status: 500 });
//   }
// };

// // Validation function
// function validateForm(data: FormData) {
//   let errors: { [key: string]: string } = {};

//   if (!validator.isEmail(data.email)) {
//     errors.email = "Invalid email address";
//   }

//   if (validator.isEmpty(data.password)) {
//     errors.password = "Password is required";
//   }

//   return errors;
// }

// function Login() {
//   return (
//     <DashboardLayout>
//       {/* SIGN IN */}
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//           <h3 className="font-medium text-black dark:text-white">
//             Sign In Form
//           </h3>
//         </div>
//         <Form method="post" noValidate>
//           <div className="p-6.5">
//             <div className="mb-4.5">
//               <label className="mb-2.5 block text-black dark:text-white">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 required={true}
//                 placeholder="Enter your email address"
//                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//               />
//             </div>

//             <div>
//               <label className="mb-2.5 block text-black dark:text-white">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 required={true}
//                 placeholder="Enter password"
//                 className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//               />
//             </div>

//             <div className="mt-5 mb-5.5 flex items-center justify-between">
//               {/* <label htmlFor="formCheckbox" className="flex cursor-pointer">
//                     <div className="relative pt-0.5">
//                       <input
//                         type="checkbox"
//                         id="formCheckbox"
//                         className="taskCheckbox sr-only"
//                       />
//                       <div className="box mr-3 flex h-5 w-5 items-center justify-center rounded border border-stroke dark:border-strokedark">
//                         <span className="text-white opacity-0">
//                           <svg
//                             className="fill-current"
//                             width="10"
//                             height="7"
//                             viewBox="0 0 10 7"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               clipRule="evenodd"
//                               d="M9.70685 0.292804C9.89455 0.480344 10 0.734667 10 0.999847C10 1.26503 9.89455 1.51935 9.70685 1.70689L4.70059 6.7072C4.51283 6.89468 4.2582 7 3.9927 7C3.72721 7 3.47258 6.89468 3.28482 6.7072L0.281063 3.70701C0.0986771 3.5184 -0.00224342 3.26578 3.785e-05 3.00357C0.00231912 2.74136 0.10762 2.49053 0.29326 2.30511C0.4789 2.11969 0.730026 2.01451 0.992551 2.01224C1.25508 2.00996 1.50799 2.11076 1.69683 2.29293L3.9927 4.58607L8.29108 0.292804C8.47884 0.105322 8.73347 0 8.99896 0C9.26446 0 9.51908 0.105322 9.70685 0.292804Z"
//                               fill=""
//                             />
//                           </svg>
//                         </span>
//                       </div>
//                     </div>
//                     <p>Remember me</p>
//                   </label> */}

//               <Link to="/signup" className="text-sm text-primary">
//                 Don't have an account?
//               </Link>
//             </div>

//             <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
//               Sign In
//             </button>
//           </div>
//         </Form>
//       </div>

//       {/* SIGNIN */}
//     </DashboardLayout>
//   );
// }

// export default Login;
