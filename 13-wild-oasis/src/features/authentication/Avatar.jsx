import styled from "styled-components";
import { useUser } from "./useUser";

const StyledUserAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-grey-600);
`;

const AvatarImg = styled.img`
    display: block;
    width: 4rem;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    outline: 2px solid var(--color-grey-100);
`;

function Avatar() {
    const { user } = useUser();
    const { name, avatar } = user.user_metadata;
    return (
        <StyledUserAvatar>
            <AvatarImg src={avatar || "default-user.jpg"} alt={`Avatar of ${name}`} />
            <span>{name}</span>
        </StyledUserAvatar>
    );
}

export default Avatar;
