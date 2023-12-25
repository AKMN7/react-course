import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, getValues, formState } = useForm();
    const { errors } = formState;

    const { mutate, isLoading } = useMutation({
        mutationFn: createCabin,
        onSuccess: () => {
            toast.success("Cabin cerated successfully.");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
            reset();
        },
        onError: (err) => toast.error(err.message)
    });

    function onSubmit(data) {
        // console.log("🚀 ~ data:", data);
        mutate({ ...data, image: data.image[0] });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Cabin Name" error={errors?.name?.message}>
                <Input type="text" id="name" {...register("name", { required: "This field is required" })} />
            </FormRow>

            <FormRow label="Maximum Capacity" error={errors?.max_capacity?.message}>
                <Input type="number" id="max_capacity" {...register("max_capacity", { required: "This field is required", min: { value: 1, message: "The value here should be at least 1." } })} />
            </FormRow>

            <FormRow label="Regular Price" error={errors?.price?.message}>
                <Input type="number" id="price" {...register("price", { required: "This field is required", min: { value: 1, message: "The value here should be at least 1." } })} />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input type="number" id="discount" defaultValue={0} {...register("discount", { required: "This field is required", validate: (value) => Number(value) < Number(getValues().price) || "Discount cannot be greater than the cabin price." })} />
            </FormRow>

            <FormRow label="Description for webiste" error={errors?.description?.message}>
                <Textarea type="number" id="description" defaultValue="" {...register("description", { required: "This field is required" })} />
            </FormRow>

            <FormRow label="Cabin Photo">
                <FileInput id="image" accept="image/*" {...register("image", { required: "This field is required" })} />
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isLoading}>Add cabin</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
