import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";

function Logout() {
    const { logoutMutate, isLoading } = useLogout();
    return (
        <ButtonIcon onClick={logoutMutate} disabled={isLoading}>
            <HiArrowRightOnRectangle />
        </ButtonIcon>
    );
}

export default Logout;
