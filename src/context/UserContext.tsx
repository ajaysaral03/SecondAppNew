import React, {createContext, useContext, useState} from 'react';

type UserProfile = {
  name: string;
  mobile: string;
};

type UserContextType = {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserProfile>({name: '', mobile: ''});

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used inside UserProvider');
  }
  return context;
};
