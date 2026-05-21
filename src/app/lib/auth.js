import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI missing");
}

const client = new MongoClient(uri);

await client.connect();

const db = client.db("ideavault");

export const auth = betterAuth({
    database: mongodbAdapter(db),

    emailAndPassword: {
        enabled: true,
    },

    secret: process.env.BETTER_AUTH_SECRET,

    baseURL:
        process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
        "http://localhost:3000",
});