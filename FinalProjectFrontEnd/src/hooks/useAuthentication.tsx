// 1. Custom hooks must start with "use" in their name (e.g., useAuth).
//    This is a convention that allows React to identify them as hooks.
// 2. Custom hooks can only be used inside functional components or other custom hooks.
//    They should not be called in regular JavaScript functions or class components.
// 3. Custom hooks can encapsulate reusable logic by combining existing hooks.
//    They follow the same rules of hooks, such as not being used conditionally or in loops.
// 4. Always ensure that custom hooks are used in the proper context.
//    For example, this custom hook (useAuth) must be used within an AuthenticationProvider.

import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";


// this custom hook will expand the regular context hook but with error messages in log!
const useAuthentication = () => {
  const authenticationContext = useContext(AuthenticationContext);

  if (!authenticationContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authenticationContext;
};

export default useAuthentication;