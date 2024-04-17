import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TUser = {
  name: string;
  role: string;
};

type TUserStore = {
  user: TUser | null;
};

type TUserAction = {
  setUser: (user: TUser) => void;
  removeUser: () => void;
};

export const useUserStore = create<TUserStore & TUserAction>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    { name: "user-storage", storage: createJSONStorage<TUser>(() => localStorage)}
  )
);
