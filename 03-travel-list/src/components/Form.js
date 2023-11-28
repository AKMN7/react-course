import { useState } from "react";

export default function Form({ onNewItem }) {
    const [desc, setDesc] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        if (!desc) return;

        const newItem = { description: desc, quantity: quantity, packed: false, id: Date.now() };
        onNewItem(newItem);

        setDesc("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
                    <option value={el} key={el}>
                        {el}
                    </option>
                ))}
            </select>
            <input type="text" placeholder="Item..." value={desc} onChange={(e) => setDesc(e.target.value)} />
            <button>Add</button>
        </form>
    );
}
