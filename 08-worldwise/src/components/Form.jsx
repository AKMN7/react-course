/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPoistion } from "../hooks/useUrlPosition";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    const result = String.fromCodePoint(...codePoints);
    console.log("🚀 ~ result:", result);
    return result;
}

function Form() {
    const { lat, lng } = useUrlPoistion();

    const [isLoading, setIsLoading] = useState(false);
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [emoji, setEmoji] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (!cityName || !date) return;
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {
                lat,
                lng
            }
        };
        console.log("🚀 ~ newCity:", newCity);
    }

    useEffect(() => {
        async function fetchCityData() {
            setIsLoading(true);

            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`);
            const data = await res.json();

            if (data.countryCode) {
                setCityName(data.city);
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode));
            }

            setIsLoading(false);
        }

        if (!lat || !lng) return;
        fetchCityData();
    }, [lat, lng]);

    if (!lat || !lng) return <Message message="Please Select A City!" />;
    if (isLoading) return <Spinner />;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
