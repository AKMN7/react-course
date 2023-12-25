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
    const imageName = `${Math.random()}-${cabin.image.name}`.replace("/", "");
    const imagePath = `https://cbwthpnlibdoefohdvob.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

    const { data, error } = await supabase
        .from("cabins")
        .insert([{ ...cabin, image: imagePath }])
        .select();

    if (error) {
        console.error(error);
        throw new Error("Unable to delete cabin");
    }

    const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, cabin.image);

    if (storageError) {
        console.error(storageError);
        await supabase.from("cabins").delete().eq("id", data.id);
        throw new Error("Cabin could not be added dut to storage error.");
    }

    return data;
}
