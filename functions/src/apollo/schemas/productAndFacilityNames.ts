import { gql } from "apollo-server";

export const productAndFacilityNames = gql`
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
