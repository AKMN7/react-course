import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import { clear } from "../cart/cartSlice";

import { createOrder } from "../../services/apiRestaurant";

import Button from "../../ui/Button";
import EmptyCart from "../../features/cart/EmptyCart";
import { fetchAddress } from "../user/userSlice";

const isValidPhone = (str) => /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(str);

function CreateOrder() {
    const dispatch = useDispatch();
    const { username, status, position, address } = useSelector((store) => store.user);
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
    const isLoadingAddress = status === "loading";

    const formErrors = useActionData();

    const cart = useSelector((store) => store.cart.cart);
    if (!cart.length) return <EmptyCart />;

    return (
        <div className="px-4 py-6">
            <h2 className="mb-8 text-xl font-semibold">Ready to order? Lets go!</h2>
            <Form method="POST">
                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">First Name</label>
                    <input className="input grow" type="text" name="customer" defaultValue={username} required />
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Phone number</label>
                    <div className="grow">
                        <input className="input w-full" type="tel" name="phone" required />
                        {formErrors?.phone && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">{formErrors.phone}</p>}
                    </div>
                </div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <label className="sm:basis-40">Address</label>
                    <div className="grow">
                        <input className="input w-full" type="text" name="address" defaultValue={address} disabled={isLoadingAddress} required />
                        {status === "error" && <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">Unable To Fetch Address</p>}
                    </div>
                    {!position.latitude && !position.longitude && (
                        <Button
                            type="small"
                            disabled={isLoadingAddress}
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(fetchAddress());
                            }}
                        >
                            Current Address
                        </Button>
                    )}
                </div>

                <div className="mb-12 flex items-center gap-5">
                    <input className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2" type="checkbox" name="priority" id="priority" />
                    <label htmlFor="priority" className="font-medium">
                        Want to yo give your order priority?
                    </label>
                </div>

                <div>
                    <input type="hidden" name="cart" value={JSON.stringify(cart)} />
                    <Button disabled={isSubmitting || isLoadingAddress} type="primary">
                        {isSubmitting ? "Placing order...." : "Order now"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === "on"
    };

    const errors = {};
    if (!isValidPhone(order.phone)) errors.phone = "Please give us your correct phone number. We might need it to contact you.";

    if (Object.keys(errors).length > 0) return errors;

    const newOrder = await createOrder(order);

    store.dispatch(clear());

    return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
