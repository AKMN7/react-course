import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";

import CreateCabinForm from "./CreateCabinForm";
import styled from "styled-components";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
// import Button from "../../ui/Button";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

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

const Actions = styled.div`
    display: flex;
    gap: 8px;
`;

function CabinRow({ cabin }) {
    const { id, name, max_capacity, price, discount, image, description } = cabin;

    const { createMutate } = useCreateCabin();
    const { deleteMutate, isDeleting } = useDeleteCabin();

    function handleDuplicate() {
        createMutate({ name: "Copy of " + name, max_capacity, price, discount, image, description });
    }

    return (
        <Table.Row role="row">
            <Img src={image} alt={name} />
            <Cabin>{name} </Cabin>
            <div>Fits up to {max_capacity}</div>
            <Price>{formatCurrency(price)}</Price>
            <Discount>{discount ? formatCurrency(discount) : "--"}</Discount>
            <Actions>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={id} />
                        <Menus.List id={id}>
                            <Menus.Button icon={<HiSquare2Stack />} onClick={handleDuplicate}>
                                Duplicate
                            </Menus.Button>
                            <Modal.Open target="cabin-delete">
                                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                            </Modal.Open>

                            <Modal.Open target="cabin-edit-form">
                                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                            </Modal.Open>
                        </Menus.List>
                    </Menus.Menu>
                    <Modal.Content name="cabin-edit-form">
                        <CreateCabinForm cabingToEdit={cabin} />
                    </Modal.Content>
                    <Modal.Content name="cabin-delete">
                        <ConfirmDelete resourceName="cabins" disabled={isDeleting} onConfirm={() => deleteMutate(id)} />
                    </Modal.Content>
                </Modal>
            </Actions>
        </Table.Row>
    );
}

export default CabinRow;
