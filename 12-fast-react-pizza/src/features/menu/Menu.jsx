/* eslint-disable react-refresh/only-export-components */
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";

function Menu() {
    const menu = useLoaderData();
    console.log("🚀 ~ menu:", menu);
    return <h1>Menu</h1>;
}

export async function loader() {
    const menu = await getMenu();
    return menu;
}

export default Menu;
