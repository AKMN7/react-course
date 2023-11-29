const initialFriends = [
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
];

export default function App() {
    return (
        <div className="app">
            <div className="sidebar">
                <List />
                <FriendForm />
                <Button>Add Friend</Button>
            </div>
            <BillForm />
        </div>
    );
}

function List() {
    const friends = initialFriends;
    return (
        <ul>
            {friends.map((friend) => (
                <Item info={friend} key={friend.id} />
            ))}
        </ul>
    );
}

function Item({ info }) {
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
            <Button>Select</Button>
        </li>
    );
}

function FriendForm() {
    return (
        <form className="form-add-friend">
            <label>🧑‍🤝‍🧑Name:</label>
            <input type="text" />

            <label>🌆 Image Url:</label>
            <input type="text" />

            <Button>Select</Button>
        </form>
    );
}

function BillForm() {
    return (
        <form className="form-split-bill">
            <h2>Split bill with X</h2>

            <label>💵 Bill Value:</label>
            <input type="text" />

            <label>🤝 Your Expense:</label>
            <input type="text" />

            <label>🧑‍🤝‍🧑 X's Name:</label>
            <input type="text" disabled />

            <label>🤑 Who is paying the bill</label>
            <select>
                <option value="user">You</option>
                <option value="friend">X</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}

function Button({ children }) {
    return <button className="button">{children}</button>;
}
