import styled from "styled-components";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";
import { useSignUp } from "./useSignUp";

const Form = styled.form`
    padding: 2.4rem 4rem;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    width: 90rem;
    overflow: hidden;
    font-size: 1.4rem;
`;

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const {
        register,
        formState: { errors },
        getValues,
        handleSubmit,
        reset
    } = useForm();

    const { signUpMutate, isLoading } = useSignUp();

    function onSubmit(data) {
        console.log(data);
        signUpMutate(data, { onSettled: () => reset });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors?.name?.message}>
                <Input type="text" id="name" {...register("name", { required: "This field is required" })} disabled={isLoading} />
            </FormRow>

            <FormRow label="Email address" error={errors?.email?.message}>
                <Input type="email" id="email" {...register("email", { required: "This field is required", pattern: { value: /\S+@\S+\.\S+/, message: "Please provide a valid email." } })} disabled={isLoading} />
            </FormRow>

            <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
                <Input type="password" id="password" {...register("password", { required: "This field is required", minLength: { value: 8, message: "Password Must be at leaset 8 characters." } })} disabled={isLoading} />
            </FormRow>

            <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
                <Input type="password" id="passwordConfirm" {...register("passwordConfirm", { required: "This field is required", validate: (value) => value === getValues().password || "Password must be the same!" })} disabled={isLoading} />
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset" disabled={isLoading}>
                    Cancel
                </Button>
                <Button disabled={isLoading}>{isLoading ? <SpinnerMini /> : "Sign Up"}</Button>
            </FormRow>
        </Form>
    );
}

export default SignupForm;
