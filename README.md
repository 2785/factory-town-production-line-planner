# Factory Town Production Line Planner

This project is a tool for the game Factory Town. It is designed to take a desired product and generated a production line specification with number of each facilities, as well as the number of workers in each facility.

## Technology Stack

1. [Google Firebase](https://firebase.google.com/)
    - [Firebase Functions](https://firebase.google.com/docs/functions)
    - [Firebase Firestore](https://firebase.google.com/docs/firestore)
    - [Firebase Storage](https://firebase.google.com/docs/storage)
1. [GraphQL](https://graphql.org/)
1. [Apollo GraphQL](https://www.apollographql.com/)
    - [Apollo GraphQL Server](https://www.apollographql.com/docs/apollo-server/)
    - [GraphiQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/)
1. [TypeScript](https://www.typescriptlang.org/)
1. [Node.js](https://nodejs.org/en/)
1. [GraphQL Code Generator](https://graphql-code-generator.com/)

## Quick Start

### To Use the Tool

If you are just interested to use the tool to plan your own production line, head to this [url](https://us-central1-factory-town-prod-line-planner.cloudfunctions.net/apolloServer) hosted on firebase functions. A user interface similar to the following will show up.

![GraphQL Playground Demo UI](imgs\graphqlPlaygroundDemo.png)

Make sure the address bar says `....cloudfunctions.net/apolloServer`. You may have to add the `/apolloServer` part yourself. The following is a sample query you can make to the server.

```gql
query {
    getProductionLine(requirement: { product: BEEF, count: 1 }) {
        productionSteps {
            product
            facility
            facilityCount
            workerCount {
                facilityNumber
                workerCount
            }
        }
    }
}
```

Hit `ctrl + space` for autocompletion hints. The sample query will generate a result that looks like this:

```gql
{
  "data": {
    "getProductionLine": {
      "productionSteps": [
        {
          "product": "BEEF",
          "facility": "PASTURE",
          "facilityCount": 1,
          "workerCount": [
            {
              "facilityNumber": 1,
              "workerCount": 1
            }
          ]
        },
        {
          "product": "ANIMALFEED",
          "facility": "GRAINMILL",
          "facilityCount": 1,
          "workerCount": [
            {
              "facilityNumber": 1,
              "workerCount": 1
            }
          ]
        },
        {
          "product": "GRAIN",
          "facility": "FARM",
          "facilityCount": 2,
          "workerCount": [
            {
              "facilityNumber": 1,
              "workerCount": 5
            },
            {
              "facilityNumber": 2,
              "workerCount": 1
            }
          ]
        }
      ]
    }
  }
}
```

You can customize your world's happiness level and your facility upgrade level by first setting up a profile like so:

```gql
mutation {
    createUser(id: "example-id") {
        id
        worldHappiness
        facilityBoosters {
            facility
            booster
        }
    }
}
```

You can omit the part on `worldHappiness` and `facilityBoosters`. When first creating user profile, it will return the default happiness of 1.0 and no facility boosters.

After this step, you can include your user ID by putting it in the `HTTP HEADERS` segment at the bottom left corner of the UI:

```json
{
    "authtoken": "example-id"
}
```

This will allow access to the following mutations.

Set the world happiness with the following mutation (for example, for a happiness of 30~39, 30% production speed bonus, input 1.3):

```gql
mutation {
    setWorldHappinessBooster(booster: 1.3) {
        id
        worldHappiness
        facilityBoosters {
            facility
            booster
        }
    }
}
```

Set the facility boosters that get added once you upgrade certain facilities with the following mutation (for example, if you upgrade pastures three times and it displays a 150% bonus speed, input 1.5):

```gql
mutation {
    addFacilityBooster(facility: PASTURE, booster: 1.5) {
        id
        worldHappiness
        facilityBoosters {
            facility
            booster
        }
    }
}
```

The happiness booster and facility boosters configured here will be taken into consideration when computing your production lines. Simply invoke the `getProductionLine` query with the HTTP header with your user ID and the query result will be optimized for your world.

## Design Considerations

### Why GraphQL

Primary reason for using GraphQL is to exploit its ability to expose schema to the client. Included in the schema is two enum types that include all available names in game, for products and facilities. User input for product and facility would be restricted to these two enum types, that makes it possible to avoid string input parsing and frustration caused by unavoidable typos if it was a REST Api.

It also provides an interface, GraphQLPlayground, that people could interact with. It is not extremely intuitive to use for the general public but it's better than nothing (Imagine using postman). I do not intend to create a UI for this project in the near future as css scares me :)

### Why Firebase

Firebase provides easy-to-use integrated function triggers and databases, as well as a very generous free tier for usage.

### GraphQL Code Generator

The GraphQL code generator is a great tool to avoid the pain of having to write the types in schema and code twice and trying to make them match.

## Project Structure

### `./functions`

The `functions` folder holds the code that gets deployed to Firebase Functions:

-   `./src/apollo`: Holds GraphQL schema, resolvers, and directive implementations. Has apollo server in the root directory [`server.ts`](./functions/src/apollo/server.ts). Types generated by code-gen tool is in [`generated/types.ts`](./functions/src/apollo/generated/types.ts)

-   `./src/dataSources`: Holds classes and interfaces that concern about getting and setting data. For now it has a very basic implementation to use Firebase Firestore as backend database that does not yet support batch read and write or other fancy features.

-   `./src/utilities`: Holds some utility code as the folder name may suggest.

-   `./src/index.ts`: Exposes api endpoints to Firebase Functions. Could support deploying to a standalone express server without Firebase Functions as well.
