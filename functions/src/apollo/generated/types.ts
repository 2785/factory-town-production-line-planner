import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type EndProductSpec = {
  product: Product,
  count?: Maybe<Scalars['Int']>,
};

export enum Facility {
  Worker = 'WORKER',
  Ward = 'WARD',
  Airtemple = 'AIRTEMPLE',
  Apothecary = 'APOTHECARY',
  Barn = 'BARN',
  Crate = 'CRATE',
  Earthshrine = 'EARTHSHRINE',
  Earthtemple = 'EARTHTEMPLE',
  Elementalrefinery = 'ELEMENTALREFINERY',
  Enchanter = 'ENCHANTER',
  Farm = 'FARM',
  Fireshrine = 'FIRESHRINE',
  Firetemple = 'FIRETEMPLE',
  Foodmarket = 'FOODMARKET',
  Forester = 'FORESTER',
  Forge = 'FORGE',
  Generalstore = 'GENERALSTORE',
  Grainmill = 'GRAINMILL',
  House = 'HOUSE',
  Kitchen = 'KITCHEN',
  Lumbermill = 'LUMBERMILL',
  Machineshop = 'MACHINESHOP',
  Magicforge = 'MAGICFORGE',
  Manareactor = 'MANAREACTOR',
  Manareceiver = 'MANARECEIVER',
  Manatransmitter = 'MANATRANSMITTER',
  Mine = 'MINE',
  Omnitemple = 'OMNITEMPLE',
  Packager = 'PACKAGER',
  Pasture = 'PASTURE',
  Recharger = 'RECHARGER',
  School = 'SCHOOL',
  Silo = 'SILO',
  Specialitygoods = 'SPECIALITYGOODS',
  Steamgenerator = 'STEAMGENERATOR',
  Stonemason = 'STONEMASON',
  Voidobelisk = 'VOIDOBELISK',
  Watershrine = 'WATERSHRINE',
  Watertemple = 'WATERTEMPLE',
  Well = 'WELL',
  Workshop = 'WORKSHOP'
}

export type FacilityWorkerCount = {
   __typename?: 'FacilityWorkerCount',
  facilityNumber?: Maybe<Scalars['Int']>,
  workerCount?: Maybe<Scalars['Int']>,
};

export type Ingredient = {
  product: Product,
  count: Scalars['Float'],
};

export type Mutation = {
   __typename?: 'Mutation',
  addProduct: Scalars['Boolean'],
  addSpecialFacility?: Maybe<Scalars['Boolean']>,
};


export type MutationAddProductArgs = {
  name: Product,
  baseProduct: Scalars['Boolean'],
  productionCount?: Scalars['Float'],
  productionTime: Scalars['Float'],
  ingredients?: Maybe<Array<Maybe<Ingredient>>>
};


export type MutationAddSpecialFacilityArgs = {
  name: Facility,
  workerCap?: Maybe<Scalars['Int']>,
  innateBooster?: Maybe<Scalars['Float']>
};

export enum Product {
  Nails = 'NAILS',
  Fish = 'FISH',
  Beef = 'BEEF',
  Rawchicken = 'RAWCHICKEN',
  Egg = 'EGG',
  Milk = 'MILK',
  Fruit = 'FRUIT',
  Sugar = 'SUGAR',
  Grain = 'GRAIN',
  Herb = 'HERB',
  Tomato = 'TOMATO',
  Berries = 'BERRIES',
  Carrot = 'CARROT',
  Cotton = 'COTTON',
  Potato = 'POTATO',
  Wood = 'WOOD',
  Pear = 'PEAR',
  Apple = 'APPLE',
  Coal = 'COAL',
  Stone = 'STONE',
  Ironore = 'IRONORE',
  Flour = 'FLOUR',
  Animalfeed = 'ANIMALFEED',
  Planks = 'PLANKS',
  Paper = 'PAPER',
  Stonebrick = 'STONEBRICK',
  Ironplate = 'IRONPLATE',
  Remedy = 'REMEDY',
  Fertilizer = 'FERTILIZER',
  Wool = 'WOOL',
  Leather = 'LEATHER',
  Woodwheel = 'WOODWHEEL',
  Healthpotion = 'HEALTHPOTION',
  Ironwheel = 'IRONWHEEL',
  Gear = 'GEAR',
  Steampipe = 'STEAMPIPE',
  Bread = 'BREAD',
  Cloth = 'CLOTH',
  Book = 'BOOK',
  Clothconveyorbelt = 'CLOTHCONVEYORBELT',
  Berrycake = 'BERRYCAKE',
  Cookedfish = 'COOKEDFISH',
  Cookedbeef = 'COOKEDBEEF',
  Fishoil = 'FISHOIL',
  Butter = 'BUTTER',
  Cookedchicken = 'COOKEDCHICKEN',
  Ointment = 'OINTMENT',
  Antidote = 'ANTIDOTE',
  Fruitjuice = 'FRUITJUICE',
  Jam = 'JAM',
  Cheese = 'CHEESE',
  Veggiestew = 'VEGGIESTEW',
  Fishstew = 'FISHSTEW',
  Meatstew = 'MEATSTEW',
  Sandwich = 'SANDWICH',
  Applepie = 'APPLEPIE',
  Cake = 'CAKE',
  Proteinshake = 'PROTEINSHAKE',
  Polishedstone = 'POLISHEDSTONE',
  Shirt = 'SHIRT',
  Cloat = 'CLOAT',
  Warmcoat = 'WARMCOAT',
  Reinforcedplanks = 'REINFORCEDPLANKS',
  Shoe = 'SHOE',
  Woodaxe = 'WOODAXE',
  Pickaxe = 'PICKAXE',
  Bandage = 'BANDAGE',
  Poultice = 'POULTICE',
  Medicalwrap = 'MEDICALWRAP',
  Railtile = 'RAILTILE',
  Metalconveyorbelt = 'METALCONVEYORBELT',
  Goldore = 'GOLDORE',
  Manacrystal = 'MANACRYSTAL',
  Earthcrystal = 'EARTHCRYSTAL',
  Aircrystal = 'AIRCRYSTAL',
  Firecrystal = 'FIRECRYSTAL',
  Watercrystal = 'WATERCRYSTAL',
  Earthether = 'EARTHETHER',
  Fireether = 'FIREETHER',
  Waterether = 'WATERETHER',
  Airether = 'AIRETHER',
  Omnistone = 'OMNISTONE',
  Crown = 'CROWN',
  Necklace = 'NECKLACE',
  Goldingot = 'GOLDINGOT',
  Enchantedbook = 'ENCHANTEDBOOK',
  Magiccloak = 'MAGICCLOAK',
  Magicrobe = 'MAGICROBE',
  Firering = 'FIRERING',
  Waterring = 'WATERRING',
  Elixir = 'ELIXIR',
  Strengthspellbook = 'STRENGTHSPELLBOOK',
  Staminaspellbook = 'STAMINASPELLBOOK',
  Curespellbook = 'CURESPELLBOOK',
  Protectionspellbook = 'PROTECTIONSPELLBOOK',
  Earthstone = 'EARTHSTONE',
  Airstone = 'AIRSTONE',
  Waterstone = 'WATERSTONE',
  Firestone = 'FIRESTONE',
  Manashard = 'MANASHARD',
  Omnipipe = 'OMNIPIPE',
  Manapipe = 'MANAPIPE',
  Magicrail = 'MAGICRAIL',
  Magicconveyorbelt = 'MAGICCONVEYORBELT'
}

export type ProductionLineResponse = {
   __typename?: 'ProductionLineResponse',
  productionSteps: Array<Maybe<ProductionStep>>,
};

export type ProductionStep = {
   __typename?: 'ProductionStep',
  facility: Facility,
  product: Product,
  facilityCount: Scalars['Int'],
  workerCount: Array<FacilityWorkerCount>,
};

export type Query = {
   __typename?: 'Query',
  getProductionLine: ProductionLineResponse,
};


export type QueryGetProductionLineArgs = {
  requirement?: Maybe<EndProductSpec>
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  EndProductSpec: EndProductSpec,
  Product: Product,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  ProductionLineResponse: ResolverTypeWrapper<ProductionLineResponse>,
  ProductionStep: ResolverTypeWrapper<ProductionStep>,
  Facility: Facility,
  FacilityWorkerCount: ResolverTypeWrapper<FacilityWorkerCount>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Ingredient: Ingredient,
  String: ResolverTypeWrapper<Scalars['String']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  EndProductSpec: EndProductSpec,
  Product: Product,
  Int: Scalars['Int'],
  ProductionLineResponse: ProductionLineResponse,
  ProductionStep: ProductionStep,
  Facility: Facility,
  FacilityWorkerCount: FacilityWorkerCount,
  Mutation: {},
  Boolean: Scalars['Boolean'],
  Float: Scalars['Float'],
  Ingredient: Ingredient,
  String: Scalars['String'],
};

export type FacilityWorkerCountResolvers<ContextType = any, ParentType extends ResolversParentTypes['FacilityWorkerCount'] = ResolversParentTypes['FacilityWorkerCount']> = {
  facilityNumber?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  workerCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addProduct?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationAddProductArgs, 'name' | 'baseProduct' | 'productionCount' | 'productionTime' | 'ingredients'>>,
  addSpecialFacility?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAddSpecialFacilityArgs, 'name' | 'workerCap' | 'innateBooster'>>,
};

export type ProductionLineResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductionLineResponse'] = ResolversParentTypes['ProductionLineResponse']> = {
  productionSteps?: Resolver<Array<Maybe<ResolversTypes['ProductionStep']>>, ParentType, ContextType>,
};

export type ProductionStepResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductionStep'] = ResolversParentTypes['ProductionStep']> = {
  facility?: Resolver<ResolversTypes['Facility'], ParentType, ContextType>,
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>,
  facilityCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  workerCount?: Resolver<Array<ResolversTypes['FacilityWorkerCount']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getProductionLine?: Resolver<ResolversTypes['ProductionLineResponse'], ParentType, ContextType, QueryGetProductionLineArgs>,
};

export type Resolvers<ContextType = any> = {
  FacilityWorkerCount?: FacilityWorkerCountResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  ProductionLineResponse?: ProductionLineResponseResolvers<ContextType>,
  ProductionStep?: ProductionStepResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
