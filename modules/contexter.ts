/** This files is used to store all the used custom context in the overall code */

import { createContext } from "react";

/**
 * Create a default custom context value for the context provider
 */
export const UserContext = createContext({
  user: null,
  username: null,
  userData: null,
  modalData: null,
  modal: null,
});
