import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";
import { styled } from "styled-components";

const Form = styled.form`
    padding: 4rem 2rem;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    overflow: hidden;
    font-size: 1.4rem;
    width: 90rem;
`;

function UpdatePasswordForm() {
    const { register, handleSubmit, formState, getValues, reset } = useForm();
    const { errors } = formState;

    const { updateMutate, isUpdating } = useUpdateUser();

    function onSubmit({ password }) {
        updateMutate({ password }, { onSuccess: () => reset });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={isUpdating}
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password needs a minimum of 8 characters"
                        }
                    })}
                />
            </FormRow>

            <FormRow label="Confirm password" error={errors?.passwordConfirm?.message}>
                <Input
                    type="password"
                    autoComplete="new-password"
                    id="passwordConfirm"
                    disabled={isUpdating}
                    {...register("passwordConfirm", {
                        required: "This field is required",
                        validate: (value) => getValues().password === value || "Passwords need to match"
                    })}
                />
            </FormRow>
            <FormRow>
                <Button onClick={reset} type="reset" variation="secondary">
                    Cancel
                </Button>
                <Button disabled={isUpdating}>Update password</Button>
            </FormRow>
        </Form>
    );
}

export default UpdatePasswordForm;
