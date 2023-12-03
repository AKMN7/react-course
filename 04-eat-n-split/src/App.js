import { useState } from "react";

export default function App() {
    const [friends, setFriends] = useState([
        {
            id: 118836,
            name: "Clark",
            image: "https://i.pravatar.cc/48?u=118836",
            balance: -7
        },
        {
            id: 933372,
            name: "Sarah",
            image: "https://i.pravatar.cc/48?u=933372",
            balance: 20
        },
        {
            id: 499476,
            name: "Anthony",
            image: "https://i.pravatar.cc/48?u=499476",
            balance: 0
        }
    ]);

    const [selected, setSelected] = useState(null);

    function addNewFriend(info) {
        setFriends((curr) => [...curr, info]);
    }

    function updateFriend(info) {
        setFriends((curr) => curr.map((el) => (el.id === info.id ? info : el)));
        setSelected(null);
    }

    function updateSelected(info) {
        setSelected(info);
    }

    return (
        <div className="app">
            <div className="sidebar">
                <List friends={friends} onSelect={updateSelected} />
                <FriendForm onNewFriend={addNewFriend} />
            </div>
            <BillForm selected={selected} onBillSplit={updateFriend} key={selected?.id} />
        </div>
    );
}

function List({ friends, onSelect }) {
    return (
        <ul>
            {friends.map((friend) => (
                <Item info={friend} key={friend.id} onSelect={onSelect} />
            ))}
        </ul>
    );
}

function Item({ info, onSelect }) {
    return (
        <li>
            <img src={info.image} alt={info.name} />
            <h3>{info.name}</h3>
            {info.balance < 0 && (
                <p className="red">
                    You owe {info.name} {Math.abs(info.balance)}$
                </p>
            )}
            {info.balance > 0 && (
                <p className="green">
                    {info.name} owes you {info.balance}$
                </p>
            )}
            {info.balance === 0 && <p>You and {info.name} are even.</p>}
            <Button action={() => onSelect(info)}>Select</Button>
        </li>
    );
}

function FriendForm({ onNewFriend }) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!name) return;

        const randomID = Math.random() * (999999 - 100000) + 100000;
        const newFriend = {
            id: randomID,
            name: name,
            image: `https://i.pravatar.cc/48?u=${randomID}`,
            balance: 0
        };

        onNewFriend(newFriend);

        setShow(false);
        setName("");
    }

    return (
        <>
            {show && (
                <form className="form-add-friend" onSubmit={handleSubmit}>
                    <label>🧑‍🤝‍🧑Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                    <label>🌆 Image Url:</label>
                    <input type="text" />

                    <Button>Add Friend</Button>
                </form>
            )}

            <Button action={() => setShow((curr) => !curr)}>{!show ? "Add Friend" : "Close"}</Button>
        </>
    );
}

function BillForm({ selected, onBillSplit }) {
    const [bill, setBill] = useState(0);
    const [expense, setExpense] = useState(0);
    const [paying, setPaying] = useState("user");
    const friendExpense = bill - expense;

    function handleSubmit(e) {
        e.preventDefault();
        if (!bill) return;

        const updatedFriend = { ...selected, balance: paying === "user" ? selected.balance + friendExpense : selected.balance - expense };
        onBillSplit(updatedFriend);

        setBill(0);
        setExpense(0);
        setPaying("user");
    }
    return (
        selected && (
            <form className="form-split-bill" onSubmit={handleSubmit}>
                <h2>Split bill with {selected.name}</h2>

                <label>💵 Bill Value:</label>
                <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />

                <label>🤝 Your Expense:</label>
                <input type="text" value={expense} onChange={(e) => setExpense(Number(e.target.value))} />

                <label>🧑‍🤝‍🧑 {selected.name} Expense:</label>
                <input type="text" value={friendExpense} disabled />

                <label>🤑 Who is paying the bill</label>
                <select value={paying} onChange={(e) => setPaying(e.target.value)}>
                    <option value="user">You</option>
                    <option value="friend">{selected.name}</option>
                </select>

                <Button>Split Bill</Button>
            </form>
        )
    );
}

function Button({ action, children }) {
    return (
        <button className="button" onClick={action}>
            {children}
        </button>
    );
}
