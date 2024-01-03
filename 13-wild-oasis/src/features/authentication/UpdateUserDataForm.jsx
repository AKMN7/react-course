import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

import { useUser } from "./useUser";
import styled from "styled-components";
import { useUpdateUser } from "./useUpdateUser";

const Form = styled.form`
    padding: 4rem 2rem;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    overflow: hidden;
    font-size: 1.4rem;
    width: 90rem;
`;

function UpdateUserDataForm() {
    const {
        user: {
            email,
            user_metadata: { name: currentName }
        }
    } = useUser();

    const { updateMutate, isUpdating } = useUpdateUser();

    const [name, setName] = useState(currentName);
    const [avatar, setAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        updateMutate(
            { name, avatar },
            {
                onSettled: () => {
                    setAvatar(null);
                    e.target.reset();
                }
            }
        );
    }

    function handleCancel() {
        setName(currentName);
        setAvatar(null);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name">
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} id="fullName" disabled={isUpdating} />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput id="avatar" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} disabled={isUpdating} />
            </FormRow>
            <FormRow>
                <Button type="reset" variation="secondary" onClick={handleCancel} disabled={isUpdating}>
                    Cancel
                </Button>
                <Button disabled={isUpdating}>{isUpdating ? <SpinnerMini /> : "Update account"}</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
