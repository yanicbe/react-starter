import { useContext } from "react";
import { Context } from "../../page-components/root/context";

export const useUser = () => {
  const { user } = useContext(Context);
  return { user };
};
