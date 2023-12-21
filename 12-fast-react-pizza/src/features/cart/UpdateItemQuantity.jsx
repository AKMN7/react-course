import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decQuantity, incQuantity } from "./cartSlice";

function UpdateItemQuantity({ id, quantity }) {
    const dispatch = useDispatch();
    return (
        <div className="flex items-center gap-1 md:gap-3">
            <Button type="round" onClick={() => dispatch(decQuantity(id))}>
                -
            </Button>
            <p>{quantity}</p>
            <Button type="round" onClick={() => dispatch(incQuantity(id))}>
                +
            </Button>
        </div>
    );
}

export default UpdateItemQuantity;
