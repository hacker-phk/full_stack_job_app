import React, { createContext, useState, useContext } from 'react';

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext in components
export const useUser = () => useContext(UserContext);
export const useEditUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to update the user
    const editUser = (updatedUser) => {
        setUser(updatedUser);
    };

    return (
        <UserContext.Provider value={{ user, editUser }}>
            {children}
        </UserContext.Provider>
    );
};
