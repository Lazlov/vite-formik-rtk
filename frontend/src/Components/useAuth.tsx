import jwtDecode, { JwtPayload } from "jwt-decode";
import { selectCurrentToken } from "../Services/Auth/authSlice";
import { useSelector } from "react-redux";
import { TokenResponse } from "../Services/Api/auth";

interface decodedToken {
  roles:string,
  _id:string
}

export const useAuth = () => {
  const token = useSelector(selectCurrentToken) as TokenResponse
  const isAdmin = false;
  const isUser = false;
  const roles = "guest";

  if (token) {
    const decodedToken: decodedToken = jwtDecode(token.toString()) //kostil
    let { _id, roles } = decodedToken;
    const isUser = roles.includes("user");
    const isAdmin = roles.includes("admin");
    if(isUser) roles= "user"
    if(isAdmin) roles="admin"
    return { _id, roles, isUser, isAdmin };
  }
  return { _id: "", roles:[], isUser, isAdmin };
};
