import supabase from "./supabase";

export async function getCabins() {
    let { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Unable to delete cabin");
    }

    return data;
}

export async function createCabin(cabin) {
    const { data, error } = await supabase.from("cabins").insert([cabin]).select();

    if (error) {
        console.error(error);
        throw new Error("Unable to delete cabin");
    }

    return data;
}
