import { createContext, useContext, useState, ReactNode } from "react";

export interface UserData {
    firstName: string;
    lastName: string;
}

const UserDataContext = createContext<[UserData | null, (userData: UserData | null) => void]>([
    null,
    () => {},
]);

export function useUserData() {
    return useContext(UserDataContext);
}

export function useSetUserData() {
    const [, setUserData] = useContext(UserDataContext);
    return setUserData;
}

export function UserDataProvider({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<UserData | null>(null);
    return (
        <UserDataContext.Provider value={[userData, setUserData]}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserDataContext;
