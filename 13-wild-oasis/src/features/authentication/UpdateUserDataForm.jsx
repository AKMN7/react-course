import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import styled from "styled-components";

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

    const [name, setName] = useState(currentName);
    const [avatar, setAvatar] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRow label="Email address">
                <Input value={email} disabled />
            </FormRow>
            <FormRow label="Full name">
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} id="fullName" />
            </FormRow>
            <FormRow label="Avatar image">
                <FileInput id="avatar" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
            </FormRow>
            <FormRow>
                <Button type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button>Update account</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateUserDataForm;
