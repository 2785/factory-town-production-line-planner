import { gql } from "apollo-server";

export const typeDefs = gql`
    directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

    enum Role {
        ADMIN
        USER
        CONTRIBUTOR
    }

    schema {
        query: Query
        mutation: Mutation
    }

    type Query {
        hello: String!
        getProductionLine(requirement: EndProductSpec): ProductionLineResponse!
    }

    type ProductionLineResponse {
        productionSteps: [ProductionStep]!
    }

    type Mutation {
        addProduct(
            name: Product!
            facility: Facility!
            baseProduct: Boolean!
            productionCount: Float! = 1
            productionTime: Float!
            ingredients: [IngredientInput] = []
        ): Boolean! @auth(requires: ADMIN)
        addSpecialFacility(
            name: Facility!
            workerCap: Int = 5
            innateBooster: Float = 0
        ): Boolean
    }

    type ProductSpec {
        name: Product!
        facility: Facility!
        baseProduct: Boolean!
        productionCount: Float!
        productionTime: Float!
        ingredients: [Ingredient]
    }

    type FacilitySpec {
        name: Facility!
        workerCap: Int
        innateBooster: Float
    }

    input EndProductSpec {
        product: Product!
        count: Int = 0
    }

    type ProductionStep {
        facility: Facility!
        product: Product!
        facilityCount: Int!
        workerCount: [FacilityWorkerCount!]!
    }

    type FacilityWorkerCount {
        facilityNumber: Int
        workerCount: Int
    }

    input IngredientInput {
        product: Product!
        count: Float!
    }

    type Ingredient {
        product: Product!
        count: Float!
    }

    # names.graphql

    enum Product {
        NAILS
        FISH
        BEEF
        RAWCHICKEN
        EGG
        MILK
        FRUIT
        SUGAR
        GRAIN
        HERB
        TOMATO
        BERRIES
        CARROT
        COTTON
        POTATO
        WOOD
        PEAR
        APPLE
        COAL
        STONE
        IRONORE
        FLOUR
        ANIMALFEED
        PLANKS
        PAPER
        STONEBRICK
        IRONPLATE
        REMEDY
        FERTILIZER
        WOOL
        LEATHER
        WOODWHEEL
        HEALTHPOTION
        IRONWHEEL
        GEAR
        STEAMPIPE
        BREAD
        CLOTH
        BOOK
        CLOTHCONVEYORBELT
        BERRYCAKE
        COOKEDFISH
        COOKEDBEEF
        FISHOIL
        BUTTER
        COOKEDCHICKEN
        OINTMENT
        ANTIDOTE
        FRUITJUICE
        JAM
        CHEESE
        VEGGIESTEW
        FISHSTEW
        MEATSTEW
        SANDWICH
        APPLEPIE
        CAKE
        PROTEINSHAKE
        POLISHEDSTONE
        SHIRT
        CLOAT
        WARMCOAT
        REINFORCEDPLANKS
        SHOE
        WOODAXE
        PICKAXE
        BANDAGE
        POULTICE
        MEDICALWRAP
        RAILTILE
        METALCONVEYORBELT
        GOLDORE
        MANACRYSTAL
        EARTHCRYSTAL
        AIRCRYSTAL
        FIRECRYSTAL
        WATERCRYSTAL
        EARTHETHER
        FIREETHER
        WATERETHER
        AIRETHER
        OMNISTONE
        CROWN
        NECKLACE
        GOLDINGOT
        ENCHANTEDBOOK
        MAGICCLOAK
        MAGICROBE
        FIRERING
        WATERRING
        ELIXIR
        STRENGTHSPELLBOOK
        STAMINASPELLBOOK
        CURESPELLBOOK
        PROTECTIONSPELLBOOK
        EARTHSTONE
        AIRSTONE
        WATERSTONE
        FIRESTONE
        MANASHARD
        OMNIPIPE
        MANAPIPE
        MAGICRAIL
        MAGICCONVEYORBELT
    }

    enum Facility {
        WORKER
        WARD
        AIRTEMPLE
        APOTHECARY
        BARN
        CRATE
        EARTHSHRINE
        EARTHTEMPLE
        ELEMENTALREFINERY
        ENCHANTER
        FARM
        FIRESHRINE
        FIRETEMPLE
        FOODMARKET
        FORESTER
        FORGE
        GENERALSTORE
        GRAINMILL
        HOUSE
        KITCHEN
        LUMBERMILL
        MACHINESHOP
        MAGICFORGE
        MANAREACTOR
        MANARECEIVER
        MANATRANSMITTER
        MINE
        OMNITEMPLE
        PACKAGER
        PASTURE
        RECHARGER
        SCHOOL
        SILO
        SPECIALITYGOODS
        STEAMGENERATOR
        STONEMASON
        VOIDOBELISK
        WATERSHRINE
        WATERTEMPLE
        WELL
        WORKSHOP
    }
`;
