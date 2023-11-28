import { useState } from "react";

import Form from "./components/Form";
import Header from "./components/Header";
import List from "./components/List";
import Footer from "./components/Footer";

export default function App() {
    const [items, setItems] = useState([]);

    function addItem(item) {
        setItems((curr) => [...curr, item]);
    }

    function deleteItem(itemID) {
        setItems((curr) => curr.filter((item) => item.id !== itemID));
    }

    function updateItem(itemID) {
        setItems((curr) => curr.map((item) => (item.id === itemID ? { ...item, packed: !item.packed } : item)));
    }

    function resetItems() {
        const confirmDeletion = window.confirm("Are you sure you want to reset your packing list?");
        if (confirmDeletion) setItems([]);
    }

    return (
        <div className="app">
            <Header />
            <Form onNewItem={addItem} />
            <List items={items} onDeleteItem={deleteItem} onUpdateItem={updateItem} onResetList={resetItems} />
            <Footer items={items} />
        </div>
    );
}
