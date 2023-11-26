import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false
    }
];

function App() {
    return (
        <div className="container">
            <Header />
            <Menu />
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className="header">
            <h1>Fast React Pizza Co.</h1>
        </header>
    );
}

function Menu() {
    return (
        <main className="menu">
            <h2>Our Menu</h2>

            {pizzaData.length > 0 ? (
                <React.Fragment>
                    <p>Authentic Itailian cuisine. 6 Creative dishes to choose from. All from our stone oven, organic and delicious.</p>
                    <ul className="pizzas">
                        {pizzaData.map((pizza) => (
                            <Pizza info={pizza} key={pizza.name} />
                        ))}
                    </ul>
                </React.Fragment>
            ) : (
                <p>We are still working on our menu. Please come back later!</p>
            )}
        </main>
    );
}

function Pizza({ info }) {
    return (
        <li className={`pizza ${info.soldOut ? "sold-out" : ""}`}>
            <img src={info.photoName} alt={info.name} />
            <div>
                <h3>{info.name}</h3>
                <p>{info.ingredients}</p>
                <span>{info.soldOut ? "SOLD OUT" : info.price}</span>
            </div>
        </li>
    );
}

function Footer() {
    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour;

    return (
        <footer className="footer">
            {isOpen ? (
                <Order closeHour={closeHour} />
            ) : (
                <p>
                    We're happy to welcome you between {openHour}:00 and {closeHour}:00.
                </p>
            )}
        </footer>
    );
}

function Order({ closeHour }) {
    return (
        <div className="order">
            <p>
                {new Date().toLocaleDateString()}. We're open until {closeHour}:00. Come visit us or order online.
            </p>
            <button className="btn">Order</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
