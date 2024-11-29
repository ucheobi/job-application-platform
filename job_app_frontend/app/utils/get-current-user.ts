import { UserResponseType, UserSession } from "../types";
import { jwtDecode } from "jwt-decode"

export const getCurrentUser = () => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token")

      if (!token) {
        console.log("No valid token found")
        return null
      }

      const currentUser: UserResponseType = jwtDecode<UserResponseType>(token)

      const { first_name, last_name, id, email } = currentUser
      
      const userDetails: UserSession = {
        user: {
          name: first_name + " " + last_name,
          first_name,
          last_name,
          id: JSON.stringify(id),
          email,
          image: 'https://avatars.githubusercontent.com/u/19550456'
        }
      }
       
      return userDetails
    }
  
    return null
}

