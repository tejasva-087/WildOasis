import { HiArrowRightOnRectangle } from "react-icons/hi2";

import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "../../services/useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function LogOut() {
  const { logOut, isLoading } = useLogout();

  return (
    <ButtonIcon onClick={logOut} disabled={isLoading}>
      {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default LogOut;
