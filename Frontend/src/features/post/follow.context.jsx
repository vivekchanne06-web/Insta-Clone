import { createContext, useState, useEffect  } from "react";

export const FollowContext = createContext();




export const FollowProvider = ({ children }) => {


const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [requests, setRequests] = useState([]);
    return (
        <FollowContext.Provider value={{followers,suggestions,requests, setRequests, setSuggestions ,setFollowers, following, setFollowing}} >
            {children}
        </FollowContext.Provider >
    )
}