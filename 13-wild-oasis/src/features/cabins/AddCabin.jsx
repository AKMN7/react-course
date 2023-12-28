import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open target="cabin-form">
                    <Button type="primary">Add New Cabin</Button>
                </Modal.Open>
                <Modal.Content name="cabin-form">
                    <CreateCabinForm />
                </Modal.Content>
            </Modal>
        </div>
    );
}

export default AddCabin;
