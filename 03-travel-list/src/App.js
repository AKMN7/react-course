import { useState } from "react";

const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: true }
];

export default function App() {
    return (
        <div className="app">
            <Header />
            <Form />
            <List />
            <Stats />
        </div>
    );
}

function Header() {
    return <h1>🌴 Far Away 👜</h1>;
}

function Form() {
    const [desc, setDesc] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();

        if (!desc) return;

        const newItem = { description: desc, quantity: quantity, packed: false, id: Date.now() };
        console.log("🚀 ~ newItem:", newItem);

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

function List() {
    return (
        <div className="list">
            <ul>
                {initialItems.map((item) => (
                    <Item item={item} key={item.id} />
                ))}
            </ul>
        </div>
    );
}

function Item({ item }) {
    return (
        <li>
            <span className={item.packed ? "packed" : undefined}>
                {item.quantity} {item.description}
            </span>
            <button>❌</button>
        </li>
    );
}

function Stats() {
    return <footer className="stats">You have X items on your list, you already packed X (X%).</footer>;
}
