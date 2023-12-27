import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <div>
            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
                </Modal>
            )}
            <Button onClick={() => setIsOpenModal((curr) => !curr)}>Add New Cabin</Button>
        </div>
    );
}

export default AddCabin;
