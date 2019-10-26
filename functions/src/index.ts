import { generateApolloServer } from "./apollo/server";
import * as functions from "firebase-functions";
import { Request, Response } from "express";

const server = generateApolloServer();
// server.listen().then(({ url }) => {
//     console.log(`ready at ${url}`);
// });

export const apolloServer = functions.https.onRequest(async (req, res) => {
    const app = await generateApolloServer();
    return app(req, res);
});
