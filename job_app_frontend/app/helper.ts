import { Session } from "@toolpad/core/AppProvider";
import { UserResponseType } from "./types";

export const getStoredUser = () => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user")
  
      if (!storedUser) return null;
      
      const customUser: UserResponseType = JSON.parse(storedUser)
  
      const { first_name, last_name, id, email } = customUser
      
      const userDetails: Session = {
        user: {
          name: first_name + " " + last_name,
          id: JSON.stringify(id),
          email,
          image: 'https://avatars.githubusercontent.com/u/19550456'
        }
      }
       
      return userDetails
    }
  
    return null
  }