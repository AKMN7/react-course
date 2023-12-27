import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
    return (
        <Modal>
            <Modal.Open target="cabin-form" text="Add New Cabin" />
            <Modal.Content name="cabin-form">
                <CreateCabinForm />
            </Modal.Content>
        </Modal>
    );
}

export default AddCabin;
