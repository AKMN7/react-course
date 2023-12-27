import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiSquare2Stack } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import styled from "styled-components";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-grey-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const { id, name, max_capacity, price, discount, image, description } = cabin;

    const { createMutate, isCreating } = useCreateCabin();
    const { deleteMutate, isDeleting } = useDeleteCabin();

    function handleDuplicate() {
        createMutate({ name: "Copy of " + name, max_capacity, price, discount, image, description });
    }

    return (
        <TableRow role="row">
            <Img src={image} alt={name} />
            <Cabin>{name} </Cabin>
            <div>Fits up to {max_capacity}</div>
            <Price>{formatCurrency(price)}</Price>
            <Discount>{discount ? formatCurrency(discount) : "--"}</Discount>
            <div>
                <button onClick={handleDuplicate} disabled={isCreating}>
                    <HiSquare2Stack />
                </button>
                <Modal>
                    <Modal.Open target="cabin-edit-form" text="Edit" />
                    <Modal.Content name="cabin-edit-form">
                        <CreateCabinForm cabingToEdit={cabin} />
                    </Modal.Content>

                    <Modal.Open target="cabin-delete" text="Delete" />
                    <Modal.Content name="cabin-delete">
                        <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteMutate(id)} />
                    </Modal.Content>
                </Modal>
            </div>
        </TableRow>
    );
}

export default CabinRow;
