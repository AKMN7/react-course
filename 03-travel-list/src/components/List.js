import { useState } from "react";
import Item from "./Item";

export default function List({ items, onDeleteItem, onUpdateItem, onResetList }) {
    const [sortBy, setSortBy] = useState("input");

    let sortedItems;
    if (sortBy === "input") sortedItems = items;
    if (sortBy === "desc") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem} />
                ))}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="input">Sort by Input Order</option>
                    <option value="desc">Sort by Description</option>
                    <option value="packed">Sort by Packed Status</option>
                </select>
                <button onClick={onResetList}>Clear List</button>
            </div>
        </div>
    );
}
