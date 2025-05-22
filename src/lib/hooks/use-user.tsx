import { useContext } from "react";
import { Context } from "../../util-components/root/context";

export const useUser = () => {
  const { user } = useContext(Context);
  return { user };
};
