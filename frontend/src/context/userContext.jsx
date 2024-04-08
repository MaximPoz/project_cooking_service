// import axios from "axios";
// import { createContext, useState, useEffect } from "react";

// export const UserContext = createContext({});

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem("myToken")

//   useEffect(() => {
//     if (token) {
//       axios.get("http://localhost:5555/users/profile").then(({ data }) => {
//         setUser(data);
//       });
//     }

//   }, []);



//   return (
//     <UserContext.Provider value={{user, setUser}}>
//       {children}
//     </UserContext.Provider>
//   );
// }