import { useForm } from "react-hook-form";

import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabingToEdit = {} }) {
    const { id: editId, ...editValues } = cabingToEdit;
    const isEdit = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: isEdit ? editValues : {}
    });

    const { createMutate, isCreating } = useCreateCabin();
    const { editMutate, isEditing } = useEditCabin();
    const isLoading = isCreating || isEditing;

    function onSubmit(data) {
        const image = typeof data.image === "string" ? data.image : data.image[0];
        if (isEdit) editMutate({ cabin: { ...data, image }, id: editId });
        else createMutate({ ...data, image }, { onSuccess: () => reset() });
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
                <FileInput id="image" accept="image/*" {...register("image", { required: isEdit ? false : "This field is required" })} />
            </FormRow>

            <FormRow>
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isLoading}>{isEdit ? "Edit Cabin" : "Create Cabin"}</Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
