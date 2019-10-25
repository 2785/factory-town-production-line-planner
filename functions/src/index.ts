import { server } from "./apollo/server";

server.listen().then(({ url }) => {
    console.log(`ready at ${url}`);
});
