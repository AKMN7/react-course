import supabase from "./supabase";

export async function signup({ name, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                avatar: ""
            }
        }
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);

    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateUser({ password, name, avatar }) {
    let updateData;
    if (password) updateData = { password };
    if (name) updateData = { data: { name } };

    // Update User Name Or Password
    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw new Error(error.message);

    // Upload User Avatar (If Passed)
    if (!avatar) return data;
    const fileName = `avatar-${data.user.id}-${Math.random()}`;
    const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);
    if (storageError) throw new Error(error.message);

    // Update User Avatar
    const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({ data: { avatar: `https://cbwthpnlibdoefohdvob.supabase.co/storage/v1/object/public/avatars/${fileName}` } });
    if (error2) throw new Error(error2.message);

    return updatedUser;
}
