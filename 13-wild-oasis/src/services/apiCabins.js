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

export async function createEditCabin(cabin, id) {
    const hasImagePath = cabin?.image?.startsWith?.("https://cbwthpnlibdoefohdvob.supabase.co");
    const imageName = `${Math.random()}-${cabin.image.name}`.replace("/", "");
    const imagePath = hasImagePath ? cabin.image : `https://cbwthpnlibdoefohdvob.supabase.co/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from("cabins");

    // Create Cabin
    if (!id) {
        console.log("Creating Cabin");
        query = query.insert([{ ...cabin, image: imagePath }]);
    }

    // Update Cabin
    if (id) {
        console.log("Editing Cabin");
        query = query.update({ ...cabin, image: imagePath }).eq("id", id);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error("Unable to perform action on cabin");
    }

    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage.from("cabin-images").upload(imageName, cabin.image);

    if (storageError) {
        console.error(storageError);
        await supabase.from("cabins").delete().eq("id", data.id);
        throw new Error("Cabin could not be added dut to storage error.");
    }

    return data;
}
