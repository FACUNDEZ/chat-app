import { hash, genSalt } from "bcrypt";

export async function encriptarPassword(password) {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const passwordAEncriptar = await hash(password, salt);

    return passwordAEncriptar;
}