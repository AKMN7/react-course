import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSettings } from "./useSetting";
import { useEditSettings } from "./useEditSettings";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
    const { settings, isLoading } = useSettings();
    const { editMutate, isEditing } = useEditSettings();

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues: settings
    });

    function onSubmit(data) {
        // console.log("🚀 ~ data:", data);
        editMutate(data, { onSuccess: () => reset() });
    }

    if (isLoading) return;
    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Minimum nights/booking" error={errors?.min_booking_length?.message}>
                <Input type="number" id="min-nights" defaultValue={settings.min_booking_length} {...register("min_booking_length", { required: "This field is required", min: { value: 1, message: "The value here should be at least 1." } })} />
            </FormRow>
            <FormRow label="Maximum nights/booking" error={errors?.max_booking_length?.message}>
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={settings.max_booking_length}
                    {...register("max_booking_length", { required: "This field is required", min: { value: 1, message: "The value here should be at least 1." }, validate: (value) => Number(value) > Number(getValues().min_booking_length) || "Max Booking Length cannot be lesst than min booking length." })}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking" error={errors?.max_booking_guests?.message}>
                <Input type="number" id="max-guests" defaultValue={settings.max_booking_guests} {...register("max_booking_guests", { required: "This field is required", min: { value: 1, message: "The value here should be at least 1." } })} />
            </FormRow>
            <FormRow label="Breakfast price" error={errors?.breakfast_price?.message}>
                <Input type="number" id="breakfast-price" defaultValue={settings.breakfast_price} {...register("breakfast_price", { required: "This field is required", min: { value: 1, message: "The value here should be at least 1." } })} />
            </FormRow>
            <FormRow>
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isEditing}>Edit Settings</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
