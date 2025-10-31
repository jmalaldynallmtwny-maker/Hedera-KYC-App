
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Citizen
 * 
 */
export type Citizen = $Result.DefaultSelection<Prisma.$CitizenPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Citizens
 * const citizens = await prisma.citizen.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Citizens
   * const citizens = await prisma.citizen.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.citizen`: Exposes CRUD operations for the **Citizen** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Citizens
    * const citizens = await prisma.citizen.findMany()
    * ```
    */
  get citizen(): Prisma.CitizenDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Citizen: 'Citizen'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "citizen"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Citizen: {
        payload: Prisma.$CitizenPayload<ExtArgs>
        fields: Prisma.CitizenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CitizenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CitizenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload>
          }
          findFirst: {
            args: Prisma.CitizenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CitizenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload>
          }
          findMany: {
            args: Prisma.CitizenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload>[]
          }
          create: {
            args: Prisma.CitizenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload>
          }
          createMany: {
            args: Prisma.CitizenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CitizenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload>[]
          }
          delete: {
            args: Prisma.CitizenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload>
          }
          update: {
            args: Prisma.CitizenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload>
          }
          deleteMany: {
            args: Prisma.CitizenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CitizenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CitizenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CitizenPayload>
          }
          aggregate: {
            args: Prisma.CitizenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCitizen>
          }
          groupBy: {
            args: Prisma.CitizenGroupByArgs<ExtArgs>
            result: $Utils.Optional<CitizenGroupByOutputType>[]
          }
          count: {
            args: Prisma.CitizenCountArgs<ExtArgs>
            result: $Utils.Optional<CitizenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Citizen
   */

  export type AggregateCitizen = {
    _count: CitizenCountAggregateOutputType | null
    _avg: CitizenAvgAggregateOutputType | null
    _sum: CitizenSumAggregateOutputType | null
    _min: CitizenMinAggregateOutputType | null
    _max: CitizenMaxAggregateOutputType | null
  }

  export type CitizenAvgAggregateOutputType = {
    verification_attempts: number | null
  }

  export type CitizenSumAggregateOutputType = {
    verification_attempts: number | null
  }

  export type CitizenMinAggregateOutputType = {
    id: string | null
    nni_index: string | null
    nni_masked: string | null
    given_name: string | null
    family_name: string | null
    full_name: string | null
    gender: string | null
    birthdate: Date | null
    place_of_birth: string | null
    phone_number: string | null
    biometric_hash: string | null
    face_data_encrypted: string | null
    face_iv: string | null
    face_tag: string | null
    consent_given: boolean | null
    consent_date: Date | null
    consent_version: string | null
    data_retention_until: Date | null
    kyc_status: string | null
    verification_attempts: number | null
    last_verification: Date | null
    verified_by: string | null
    verification_notes: string | null
    created_at: Date | null
    updated_at: Date | null
    created_by: string | null
    updated_by: string | null
    deleted_at: Date | null
    deleted_by: string | null
  }

  export type CitizenMaxAggregateOutputType = {
    id: string | null
    nni_index: string | null
    nni_masked: string | null
    given_name: string | null
    family_name: string | null
    full_name: string | null
    gender: string | null
    birthdate: Date | null
    place_of_birth: string | null
    phone_number: string | null
    biometric_hash: string | null
    face_data_encrypted: string | null
    face_iv: string | null
    face_tag: string | null
    consent_given: boolean | null
    consent_date: Date | null
    consent_version: string | null
    data_retention_until: Date | null
    kyc_status: string | null
    verification_attempts: number | null
    last_verification: Date | null
    verified_by: string | null
    verification_notes: string | null
    created_at: Date | null
    updated_at: Date | null
    created_by: string | null
    updated_by: string | null
    deleted_at: Date | null
    deleted_by: string | null
  }

  export type CitizenCountAggregateOutputType = {
    id: number
    nni_index: number
    nni_masked: number
    given_name: number
    family_name: number
    full_name: number
    gender: number
    birthdate: number
    place_of_birth: number
    phone_number: number
    biometric_hash: number
    face_data_encrypted: number
    face_iv: number
    face_tag: number
    consent_given: number
    consent_date: number
    consent_version: number
    data_retention_until: number
    kyc_status: number
    verification_attempts: number
    last_verification: number
    verified_by: number
    verification_notes: number
    metadata: number
    created_at: number
    updated_at: number
    created_by: number
    updated_by: number
    deleted_at: number
    deleted_by: number
    _all: number
  }


  export type CitizenAvgAggregateInputType = {
    verification_attempts?: true
  }

  export type CitizenSumAggregateInputType = {
    verification_attempts?: true
  }

  export type CitizenMinAggregateInputType = {
    id?: true
    nni_index?: true
    nni_masked?: true
    given_name?: true
    family_name?: true
    full_name?: true
    gender?: true
    birthdate?: true
    place_of_birth?: true
    phone_number?: true
    biometric_hash?: true
    face_data_encrypted?: true
    face_iv?: true
    face_tag?: true
    consent_given?: true
    consent_date?: true
    consent_version?: true
    data_retention_until?: true
    kyc_status?: true
    verification_attempts?: true
    last_verification?: true
    verified_by?: true
    verification_notes?: true
    created_at?: true
    updated_at?: true
    created_by?: true
    updated_by?: true
    deleted_at?: true
    deleted_by?: true
  }

  export type CitizenMaxAggregateInputType = {
    id?: true
    nni_index?: true
    nni_masked?: true
    given_name?: true
    family_name?: true
    full_name?: true
    gender?: true
    birthdate?: true
    place_of_birth?: true
    phone_number?: true
    biometric_hash?: true
    face_data_encrypted?: true
    face_iv?: true
    face_tag?: true
    consent_given?: true
    consent_date?: true
    consent_version?: true
    data_retention_until?: true
    kyc_status?: true
    verification_attempts?: true
    last_verification?: true
    verified_by?: true
    verification_notes?: true
    created_at?: true
    updated_at?: true
    created_by?: true
    updated_by?: true
    deleted_at?: true
    deleted_by?: true
  }

  export type CitizenCountAggregateInputType = {
    id?: true
    nni_index?: true
    nni_masked?: true
    given_name?: true
    family_name?: true
    full_name?: true
    gender?: true
    birthdate?: true
    place_of_birth?: true
    phone_number?: true
    biometric_hash?: true
    face_data_encrypted?: true
    face_iv?: true
    face_tag?: true
    consent_given?: true
    consent_date?: true
    consent_version?: true
    data_retention_until?: true
    kyc_status?: true
    verification_attempts?: true
    last_verification?: true
    verified_by?: true
    verification_notes?: true
    metadata?: true
    created_at?: true
    updated_at?: true
    created_by?: true
    updated_by?: true
    deleted_at?: true
    deleted_by?: true
    _all?: true
  }

  export type CitizenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Citizen to aggregate.
     */
    where?: CitizenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Citizens to fetch.
     */
    orderBy?: CitizenOrderByWithRelationInput | CitizenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CitizenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Citizens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Citizens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Citizens
    **/
    _count?: true | CitizenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CitizenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CitizenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CitizenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CitizenMaxAggregateInputType
  }

  export type GetCitizenAggregateType<T extends CitizenAggregateArgs> = {
        [P in keyof T & keyof AggregateCitizen]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCitizen[P]>
      : GetScalarType<T[P], AggregateCitizen[P]>
  }




  export type CitizenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CitizenWhereInput
    orderBy?: CitizenOrderByWithAggregationInput | CitizenOrderByWithAggregationInput[]
    by: CitizenScalarFieldEnum[] | CitizenScalarFieldEnum
    having?: CitizenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CitizenCountAggregateInputType | true
    _avg?: CitizenAvgAggregateInputType
    _sum?: CitizenSumAggregateInputType
    _min?: CitizenMinAggregateInputType
    _max?: CitizenMaxAggregateInputType
  }

  export type CitizenGroupByOutputType = {
    id: string
    nni_index: string
    nni_masked: string | null
    given_name: string | null
    family_name: string | null
    full_name: string | null
    gender: string | null
    birthdate: Date | null
    place_of_birth: string | null
    phone_number: string | null
    biometric_hash: string | null
    face_data_encrypted: string | null
    face_iv: string | null
    face_tag: string | null
    consent_given: boolean
    consent_date: Date | null
    consent_version: string | null
    data_retention_until: Date | null
    kyc_status: string
    verification_attempts: number
    last_verification: Date | null
    verified_by: string | null
    verification_notes: string | null
    metadata: JsonValue | null
    created_at: Date
    updated_at: Date
    created_by: string | null
    updated_by: string | null
    deleted_at: Date | null
    deleted_by: string | null
    _count: CitizenCountAggregateOutputType | null
    _avg: CitizenAvgAggregateOutputType | null
    _sum: CitizenSumAggregateOutputType | null
    _min: CitizenMinAggregateOutputType | null
    _max: CitizenMaxAggregateOutputType | null
  }

  type GetCitizenGroupByPayload<T extends CitizenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CitizenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CitizenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CitizenGroupByOutputType[P]>
            : GetScalarType<T[P], CitizenGroupByOutputType[P]>
        }
      >
    >


  export type CitizenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nni_index?: boolean
    nni_masked?: boolean
    given_name?: boolean
    family_name?: boolean
    full_name?: boolean
    gender?: boolean
    birthdate?: boolean
    place_of_birth?: boolean
    phone_number?: boolean
    biometric_hash?: boolean
    face_data_encrypted?: boolean
    face_iv?: boolean
    face_tag?: boolean
    consent_given?: boolean
    consent_date?: boolean
    consent_version?: boolean
    data_retention_until?: boolean
    kyc_status?: boolean
    verification_attempts?: boolean
    last_verification?: boolean
    verified_by?: boolean
    verification_notes?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
  }, ExtArgs["result"]["citizen"]>

  export type CitizenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nni_index?: boolean
    nni_masked?: boolean
    given_name?: boolean
    family_name?: boolean
    full_name?: boolean
    gender?: boolean
    birthdate?: boolean
    place_of_birth?: boolean
    phone_number?: boolean
    biometric_hash?: boolean
    face_data_encrypted?: boolean
    face_iv?: boolean
    face_tag?: boolean
    consent_given?: boolean
    consent_date?: boolean
    consent_version?: boolean
    data_retention_until?: boolean
    kyc_status?: boolean
    verification_attempts?: boolean
    last_verification?: boolean
    verified_by?: boolean
    verification_notes?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
  }, ExtArgs["result"]["citizen"]>

  export type CitizenSelectScalar = {
    id?: boolean
    nni_index?: boolean
    nni_masked?: boolean
    given_name?: boolean
    family_name?: boolean
    full_name?: boolean
    gender?: boolean
    birthdate?: boolean
    place_of_birth?: boolean
    phone_number?: boolean
    biometric_hash?: boolean
    face_data_encrypted?: boolean
    face_iv?: boolean
    face_tag?: boolean
    consent_given?: boolean
    consent_date?: boolean
    consent_version?: boolean
    data_retention_until?: boolean
    kyc_status?: boolean
    verification_attempts?: boolean
    last_verification?: boolean
    verified_by?: boolean
    verification_notes?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    created_by?: boolean
    updated_by?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
  }


  export type $CitizenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Citizen"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nni_index: string
      nni_masked: string | null
      given_name: string | null
      family_name: string | null
      full_name: string | null
      gender: string | null
      birthdate: Date | null
      place_of_birth: string | null
      phone_number: string | null
      biometric_hash: string | null
      face_data_encrypted: string | null
      face_iv: string | null
      face_tag: string | null
      consent_given: boolean
      consent_date: Date | null
      consent_version: string | null
      data_retention_until: Date | null
      kyc_status: string
      verification_attempts: number
      last_verification: Date | null
      verified_by: string | null
      verification_notes: string | null
      metadata: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
      created_by: string | null
      updated_by: string | null
      deleted_at: Date | null
      deleted_by: string | null
    }, ExtArgs["result"]["citizen"]>
    composites: {}
  }

  type CitizenGetPayload<S extends boolean | null | undefined | CitizenDefaultArgs> = $Result.GetResult<Prisma.$CitizenPayload, S>

  type CitizenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CitizenFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CitizenCountAggregateInputType | true
    }

  export interface CitizenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Citizen'], meta: { name: 'Citizen' } }
    /**
     * Find zero or one Citizen that matches the filter.
     * @param {CitizenFindUniqueArgs} args - Arguments to find a Citizen
     * @example
     * // Get one Citizen
     * const citizen = await prisma.citizen.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CitizenFindUniqueArgs>(args: SelectSubset<T, CitizenFindUniqueArgs<ExtArgs>>): Prisma__CitizenClient<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Citizen that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CitizenFindUniqueOrThrowArgs} args - Arguments to find a Citizen
     * @example
     * // Get one Citizen
     * const citizen = await prisma.citizen.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CitizenFindUniqueOrThrowArgs>(args: SelectSubset<T, CitizenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CitizenClient<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Citizen that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CitizenFindFirstArgs} args - Arguments to find a Citizen
     * @example
     * // Get one Citizen
     * const citizen = await prisma.citizen.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CitizenFindFirstArgs>(args?: SelectSubset<T, CitizenFindFirstArgs<ExtArgs>>): Prisma__CitizenClient<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Citizen that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CitizenFindFirstOrThrowArgs} args - Arguments to find a Citizen
     * @example
     * // Get one Citizen
     * const citizen = await prisma.citizen.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CitizenFindFirstOrThrowArgs>(args?: SelectSubset<T, CitizenFindFirstOrThrowArgs<ExtArgs>>): Prisma__CitizenClient<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Citizens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CitizenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Citizens
     * const citizens = await prisma.citizen.findMany()
     * 
     * // Get first 10 Citizens
     * const citizens = await prisma.citizen.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const citizenWithIdOnly = await prisma.citizen.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CitizenFindManyArgs>(args?: SelectSubset<T, CitizenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Citizen.
     * @param {CitizenCreateArgs} args - Arguments to create a Citizen.
     * @example
     * // Create one Citizen
     * const Citizen = await prisma.citizen.create({
     *   data: {
     *     // ... data to create a Citizen
     *   }
     * })
     * 
     */
    create<T extends CitizenCreateArgs>(args: SelectSubset<T, CitizenCreateArgs<ExtArgs>>): Prisma__CitizenClient<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Citizens.
     * @param {CitizenCreateManyArgs} args - Arguments to create many Citizens.
     * @example
     * // Create many Citizens
     * const citizen = await prisma.citizen.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CitizenCreateManyArgs>(args?: SelectSubset<T, CitizenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Citizens and returns the data saved in the database.
     * @param {CitizenCreateManyAndReturnArgs} args - Arguments to create many Citizens.
     * @example
     * // Create many Citizens
     * const citizen = await prisma.citizen.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Citizens and only return the `id`
     * const citizenWithIdOnly = await prisma.citizen.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CitizenCreateManyAndReturnArgs>(args?: SelectSubset<T, CitizenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Citizen.
     * @param {CitizenDeleteArgs} args - Arguments to delete one Citizen.
     * @example
     * // Delete one Citizen
     * const Citizen = await prisma.citizen.delete({
     *   where: {
     *     // ... filter to delete one Citizen
     *   }
     * })
     * 
     */
    delete<T extends CitizenDeleteArgs>(args: SelectSubset<T, CitizenDeleteArgs<ExtArgs>>): Prisma__CitizenClient<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Citizen.
     * @param {CitizenUpdateArgs} args - Arguments to update one Citizen.
     * @example
     * // Update one Citizen
     * const citizen = await prisma.citizen.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CitizenUpdateArgs>(args: SelectSubset<T, CitizenUpdateArgs<ExtArgs>>): Prisma__CitizenClient<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Citizens.
     * @param {CitizenDeleteManyArgs} args - Arguments to filter Citizens to delete.
     * @example
     * // Delete a few Citizens
     * const { count } = await prisma.citizen.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CitizenDeleteManyArgs>(args?: SelectSubset<T, CitizenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Citizens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CitizenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Citizens
     * const citizen = await prisma.citizen.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CitizenUpdateManyArgs>(args: SelectSubset<T, CitizenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Citizen.
     * @param {CitizenUpsertArgs} args - Arguments to update or create a Citizen.
     * @example
     * // Update or create a Citizen
     * const citizen = await prisma.citizen.upsert({
     *   create: {
     *     // ... data to create a Citizen
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Citizen we want to update
     *   }
     * })
     */
    upsert<T extends CitizenUpsertArgs>(args: SelectSubset<T, CitizenUpsertArgs<ExtArgs>>): Prisma__CitizenClient<$Result.GetResult<Prisma.$CitizenPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Citizens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CitizenCountArgs} args - Arguments to filter Citizens to count.
     * @example
     * // Count the number of Citizens
     * const count = await prisma.citizen.count({
     *   where: {
     *     // ... the filter for the Citizens we want to count
     *   }
     * })
    **/
    count<T extends CitizenCountArgs>(
      args?: Subset<T, CitizenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CitizenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Citizen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CitizenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CitizenAggregateArgs>(args: Subset<T, CitizenAggregateArgs>): Prisma.PrismaPromise<GetCitizenAggregateType<T>>

    /**
     * Group by Citizen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CitizenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CitizenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CitizenGroupByArgs['orderBy'] }
        : { orderBy?: CitizenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CitizenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCitizenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Citizen model
   */
  readonly fields: CitizenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Citizen.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CitizenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Citizen model
   */ 
  interface CitizenFieldRefs {
    readonly id: FieldRef<"Citizen", 'String'>
    readonly nni_index: FieldRef<"Citizen", 'String'>
    readonly nni_masked: FieldRef<"Citizen", 'String'>
    readonly given_name: FieldRef<"Citizen", 'String'>
    readonly family_name: FieldRef<"Citizen", 'String'>
    readonly full_name: FieldRef<"Citizen", 'String'>
    readonly gender: FieldRef<"Citizen", 'String'>
    readonly birthdate: FieldRef<"Citizen", 'DateTime'>
    readonly place_of_birth: FieldRef<"Citizen", 'String'>
    readonly phone_number: FieldRef<"Citizen", 'String'>
    readonly biometric_hash: FieldRef<"Citizen", 'String'>
    readonly face_data_encrypted: FieldRef<"Citizen", 'String'>
    readonly face_iv: FieldRef<"Citizen", 'String'>
    readonly face_tag: FieldRef<"Citizen", 'String'>
    readonly consent_given: FieldRef<"Citizen", 'Boolean'>
    readonly consent_date: FieldRef<"Citizen", 'DateTime'>
    readonly consent_version: FieldRef<"Citizen", 'String'>
    readonly data_retention_until: FieldRef<"Citizen", 'DateTime'>
    readonly kyc_status: FieldRef<"Citizen", 'String'>
    readonly verification_attempts: FieldRef<"Citizen", 'Int'>
    readonly last_verification: FieldRef<"Citizen", 'DateTime'>
    readonly verified_by: FieldRef<"Citizen", 'String'>
    readonly verification_notes: FieldRef<"Citizen", 'String'>
    readonly metadata: FieldRef<"Citizen", 'Json'>
    readonly created_at: FieldRef<"Citizen", 'DateTime'>
    readonly updated_at: FieldRef<"Citizen", 'DateTime'>
    readonly created_by: FieldRef<"Citizen", 'String'>
    readonly updated_by: FieldRef<"Citizen", 'String'>
    readonly deleted_at: FieldRef<"Citizen", 'DateTime'>
    readonly deleted_by: FieldRef<"Citizen", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Citizen findUnique
   */
  export type CitizenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
    /**
     * Filter, which Citizen to fetch.
     */
    where: CitizenWhereUniqueInput
  }

  /**
   * Citizen findUniqueOrThrow
   */
  export type CitizenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
    /**
     * Filter, which Citizen to fetch.
     */
    where: CitizenWhereUniqueInput
  }

  /**
   * Citizen findFirst
   */
  export type CitizenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
    /**
     * Filter, which Citizen to fetch.
     */
    where?: CitizenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Citizens to fetch.
     */
    orderBy?: CitizenOrderByWithRelationInput | CitizenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Citizens.
     */
    cursor?: CitizenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Citizens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Citizens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Citizens.
     */
    distinct?: CitizenScalarFieldEnum | CitizenScalarFieldEnum[]
  }

  /**
   * Citizen findFirstOrThrow
   */
  export type CitizenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
    /**
     * Filter, which Citizen to fetch.
     */
    where?: CitizenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Citizens to fetch.
     */
    orderBy?: CitizenOrderByWithRelationInput | CitizenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Citizens.
     */
    cursor?: CitizenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Citizens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Citizens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Citizens.
     */
    distinct?: CitizenScalarFieldEnum | CitizenScalarFieldEnum[]
  }

  /**
   * Citizen findMany
   */
  export type CitizenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
    /**
     * Filter, which Citizens to fetch.
     */
    where?: CitizenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Citizens to fetch.
     */
    orderBy?: CitizenOrderByWithRelationInput | CitizenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Citizens.
     */
    cursor?: CitizenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Citizens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Citizens.
     */
    skip?: number
    distinct?: CitizenScalarFieldEnum | CitizenScalarFieldEnum[]
  }

  /**
   * Citizen create
   */
  export type CitizenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
    /**
     * The data needed to create a Citizen.
     */
    data: XOR<CitizenCreateInput, CitizenUncheckedCreateInput>
  }

  /**
   * Citizen createMany
   */
  export type CitizenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Citizens.
     */
    data: CitizenCreateManyInput | CitizenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Citizen createManyAndReturn
   */
  export type CitizenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Citizens.
     */
    data: CitizenCreateManyInput | CitizenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Citizen update
   */
  export type CitizenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
    /**
     * The data needed to update a Citizen.
     */
    data: XOR<CitizenUpdateInput, CitizenUncheckedUpdateInput>
    /**
     * Choose, which Citizen to update.
     */
    where: CitizenWhereUniqueInput
  }

  /**
   * Citizen updateMany
   */
  export type CitizenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Citizens.
     */
    data: XOR<CitizenUpdateManyMutationInput, CitizenUncheckedUpdateManyInput>
    /**
     * Filter which Citizens to update
     */
    where?: CitizenWhereInput
  }

  /**
   * Citizen upsert
   */
  export type CitizenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
    /**
     * The filter to search for the Citizen to update in case it exists.
     */
    where: CitizenWhereUniqueInput
    /**
     * In case the Citizen found by the `where` argument doesn't exist, create a new Citizen with this data.
     */
    create: XOR<CitizenCreateInput, CitizenUncheckedCreateInput>
    /**
     * In case the Citizen was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CitizenUpdateInput, CitizenUncheckedUpdateInput>
  }

  /**
   * Citizen delete
   */
  export type CitizenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
    /**
     * Filter which Citizen to delete.
     */
    where: CitizenWhereUniqueInput
  }

  /**
   * Citizen deleteMany
   */
  export type CitizenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Citizens to delete
     */
    where?: CitizenWhereInput
  }

  /**
   * Citizen without action
   */
  export type CitizenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Citizen
     */
    select?: CitizenSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CitizenScalarFieldEnum: {
    id: 'id',
    nni_index: 'nni_index',
    nni_masked: 'nni_masked',
    given_name: 'given_name',
    family_name: 'family_name',
    full_name: 'full_name',
    gender: 'gender',
    birthdate: 'birthdate',
    place_of_birth: 'place_of_birth',
    phone_number: 'phone_number',
    biometric_hash: 'biometric_hash',
    face_data_encrypted: 'face_data_encrypted',
    face_iv: 'face_iv',
    face_tag: 'face_tag',
    consent_given: 'consent_given',
    consent_date: 'consent_date',
    consent_version: 'consent_version',
    data_retention_until: 'data_retention_until',
    kyc_status: 'kyc_status',
    verification_attempts: 'verification_attempts',
    last_verification: 'last_verification',
    verified_by: 'verified_by',
    verification_notes: 'verification_notes',
    metadata: 'metadata',
    created_at: 'created_at',
    updated_at: 'updated_at',
    created_by: 'created_by',
    updated_by: 'updated_by',
    deleted_at: 'deleted_at',
    deleted_by: 'deleted_by'
  };

  export type CitizenScalarFieldEnum = (typeof CitizenScalarFieldEnum)[keyof typeof CitizenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CitizenWhereInput = {
    AND?: CitizenWhereInput | CitizenWhereInput[]
    OR?: CitizenWhereInput[]
    NOT?: CitizenWhereInput | CitizenWhereInput[]
    id?: StringFilter<"Citizen"> | string
    nni_index?: StringFilter<"Citizen"> | string
    nni_masked?: StringNullableFilter<"Citizen"> | string | null
    given_name?: StringNullableFilter<"Citizen"> | string | null
    family_name?: StringNullableFilter<"Citizen"> | string | null
    full_name?: StringNullableFilter<"Citizen"> | string | null
    gender?: StringNullableFilter<"Citizen"> | string | null
    birthdate?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    place_of_birth?: StringNullableFilter<"Citizen"> | string | null
    phone_number?: StringNullableFilter<"Citizen"> | string | null
    biometric_hash?: StringNullableFilter<"Citizen"> | string | null
    face_data_encrypted?: StringNullableFilter<"Citizen"> | string | null
    face_iv?: StringNullableFilter<"Citizen"> | string | null
    face_tag?: StringNullableFilter<"Citizen"> | string | null
    consent_given?: BoolFilter<"Citizen"> | boolean
    consent_date?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    consent_version?: StringNullableFilter<"Citizen"> | string | null
    data_retention_until?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    kyc_status?: StringFilter<"Citizen"> | string
    verification_attempts?: IntFilter<"Citizen"> | number
    last_verification?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    verified_by?: StringNullableFilter<"Citizen"> | string | null
    verification_notes?: StringNullableFilter<"Citizen"> | string | null
    metadata?: JsonNullableFilter<"Citizen">
    created_at?: DateTimeFilter<"Citizen"> | Date | string
    updated_at?: DateTimeFilter<"Citizen"> | Date | string
    created_by?: StringNullableFilter<"Citizen"> | string | null
    updated_by?: StringNullableFilter<"Citizen"> | string | null
    deleted_at?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    deleted_by?: StringNullableFilter<"Citizen"> | string | null
  }

  export type CitizenOrderByWithRelationInput = {
    id?: SortOrder
    nni_index?: SortOrder
    nni_masked?: SortOrderInput | SortOrder
    given_name?: SortOrderInput | SortOrder
    family_name?: SortOrderInput | SortOrder
    full_name?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    place_of_birth?: SortOrderInput | SortOrder
    phone_number?: SortOrderInput | SortOrder
    biometric_hash?: SortOrderInput | SortOrder
    face_data_encrypted?: SortOrderInput | SortOrder
    face_iv?: SortOrderInput | SortOrder
    face_tag?: SortOrderInput | SortOrder
    consent_given?: SortOrder
    consent_date?: SortOrderInput | SortOrder
    consent_version?: SortOrderInput | SortOrder
    data_retention_until?: SortOrderInput | SortOrder
    kyc_status?: SortOrder
    verification_attempts?: SortOrder
    last_verification?: SortOrderInput | SortOrder
    verified_by?: SortOrderInput | SortOrder
    verification_notes?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
  }

  export type CitizenWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nni_index?: string
    AND?: CitizenWhereInput | CitizenWhereInput[]
    OR?: CitizenWhereInput[]
    NOT?: CitizenWhereInput | CitizenWhereInput[]
    nni_masked?: StringNullableFilter<"Citizen"> | string | null
    given_name?: StringNullableFilter<"Citizen"> | string | null
    family_name?: StringNullableFilter<"Citizen"> | string | null
    full_name?: StringNullableFilter<"Citizen"> | string | null
    gender?: StringNullableFilter<"Citizen"> | string | null
    birthdate?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    place_of_birth?: StringNullableFilter<"Citizen"> | string | null
    phone_number?: StringNullableFilter<"Citizen"> | string | null
    biometric_hash?: StringNullableFilter<"Citizen"> | string | null
    face_data_encrypted?: StringNullableFilter<"Citizen"> | string | null
    face_iv?: StringNullableFilter<"Citizen"> | string | null
    face_tag?: StringNullableFilter<"Citizen"> | string | null
    consent_given?: BoolFilter<"Citizen"> | boolean
    consent_date?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    consent_version?: StringNullableFilter<"Citizen"> | string | null
    data_retention_until?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    kyc_status?: StringFilter<"Citizen"> | string
    verification_attempts?: IntFilter<"Citizen"> | number
    last_verification?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    verified_by?: StringNullableFilter<"Citizen"> | string | null
    verification_notes?: StringNullableFilter<"Citizen"> | string | null
    metadata?: JsonNullableFilter<"Citizen">
    created_at?: DateTimeFilter<"Citizen"> | Date | string
    updated_at?: DateTimeFilter<"Citizen"> | Date | string
    created_by?: StringNullableFilter<"Citizen"> | string | null
    updated_by?: StringNullableFilter<"Citizen"> | string | null
    deleted_at?: DateTimeNullableFilter<"Citizen"> | Date | string | null
    deleted_by?: StringNullableFilter<"Citizen"> | string | null
  }, "id" | "nni_index">

  export type CitizenOrderByWithAggregationInput = {
    id?: SortOrder
    nni_index?: SortOrder
    nni_masked?: SortOrderInput | SortOrder
    given_name?: SortOrderInput | SortOrder
    family_name?: SortOrderInput | SortOrder
    full_name?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    birthdate?: SortOrderInput | SortOrder
    place_of_birth?: SortOrderInput | SortOrder
    phone_number?: SortOrderInput | SortOrder
    biometric_hash?: SortOrderInput | SortOrder
    face_data_encrypted?: SortOrderInput | SortOrder
    face_iv?: SortOrderInput | SortOrder
    face_tag?: SortOrderInput | SortOrder
    consent_given?: SortOrder
    consent_date?: SortOrderInput | SortOrder
    consent_version?: SortOrderInput | SortOrder
    data_retention_until?: SortOrderInput | SortOrder
    kyc_status?: SortOrder
    verification_attempts?: SortOrder
    last_verification?: SortOrderInput | SortOrder
    verified_by?: SortOrderInput | SortOrder
    verification_notes?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrderInput | SortOrder
    updated_by?: SortOrderInput | SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    _count?: CitizenCountOrderByAggregateInput
    _avg?: CitizenAvgOrderByAggregateInput
    _max?: CitizenMaxOrderByAggregateInput
    _min?: CitizenMinOrderByAggregateInput
    _sum?: CitizenSumOrderByAggregateInput
  }

  export type CitizenScalarWhereWithAggregatesInput = {
    AND?: CitizenScalarWhereWithAggregatesInput | CitizenScalarWhereWithAggregatesInput[]
    OR?: CitizenScalarWhereWithAggregatesInput[]
    NOT?: CitizenScalarWhereWithAggregatesInput | CitizenScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Citizen"> | string
    nni_index?: StringWithAggregatesFilter<"Citizen"> | string
    nni_masked?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    given_name?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    family_name?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    full_name?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    gender?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    birthdate?: DateTimeNullableWithAggregatesFilter<"Citizen"> | Date | string | null
    place_of_birth?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    phone_number?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    biometric_hash?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    face_data_encrypted?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    face_iv?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    face_tag?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    consent_given?: BoolWithAggregatesFilter<"Citizen"> | boolean
    consent_date?: DateTimeNullableWithAggregatesFilter<"Citizen"> | Date | string | null
    consent_version?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    data_retention_until?: DateTimeNullableWithAggregatesFilter<"Citizen"> | Date | string | null
    kyc_status?: StringWithAggregatesFilter<"Citizen"> | string
    verification_attempts?: IntWithAggregatesFilter<"Citizen"> | number
    last_verification?: DateTimeNullableWithAggregatesFilter<"Citizen"> | Date | string | null
    verified_by?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    verification_notes?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    metadata?: JsonNullableWithAggregatesFilter<"Citizen">
    created_at?: DateTimeWithAggregatesFilter<"Citizen"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Citizen"> | Date | string
    created_by?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    updated_by?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Citizen"> | Date | string | null
    deleted_by?: StringNullableWithAggregatesFilter<"Citizen"> | string | null
  }

  export type CitizenCreateInput = {
    id?: string
    nni_index: string
    nni_masked?: string | null
    given_name?: string | null
    family_name?: string | null
    full_name?: string | null
    gender?: string | null
    birthdate?: Date | string | null
    place_of_birth?: string | null
    phone_number?: string | null
    biometric_hash?: string | null
    face_data_encrypted?: string | null
    face_iv?: string | null
    face_tag?: string | null
    consent_given?: boolean
    consent_date?: Date | string | null
    consent_version?: string | null
    data_retention_until?: Date | string | null
    kyc_status?: string
    verification_attempts?: number
    last_verification?: Date | string | null
    verified_by?: string | null
    verification_notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    created_by?: string | null
    updated_by?: string | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
  }

  export type CitizenUncheckedCreateInput = {
    id?: string
    nni_index: string
    nni_masked?: string | null
    given_name?: string | null
    family_name?: string | null
    full_name?: string | null
    gender?: string | null
    birthdate?: Date | string | null
    place_of_birth?: string | null
    phone_number?: string | null
    biometric_hash?: string | null
    face_data_encrypted?: string | null
    face_iv?: string | null
    face_tag?: string | null
    consent_given?: boolean
    consent_date?: Date | string | null
    consent_version?: string | null
    data_retention_until?: Date | string | null
    kyc_status?: string
    verification_attempts?: number
    last_verification?: Date | string | null
    verified_by?: string | null
    verification_notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    created_by?: string | null
    updated_by?: string | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
  }

  export type CitizenUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nni_index?: StringFieldUpdateOperationsInput | string
    nni_masked?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    place_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    biometric_hash?: NullableStringFieldUpdateOperationsInput | string | null
    face_data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    face_iv?: NullableStringFieldUpdateOperationsInput | string | null
    face_tag?: NullableStringFieldUpdateOperationsInput | string | null
    consent_given?: BoolFieldUpdateOperationsInput | boolean
    consent_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consent_version?: NullableStringFieldUpdateOperationsInput | string | null
    data_retention_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kyc_status?: StringFieldUpdateOperationsInput | string
    verification_attempts?: IntFieldUpdateOperationsInput | number
    last_verification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CitizenUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nni_index?: StringFieldUpdateOperationsInput | string
    nni_masked?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    place_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    biometric_hash?: NullableStringFieldUpdateOperationsInput | string | null
    face_data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    face_iv?: NullableStringFieldUpdateOperationsInput | string | null
    face_tag?: NullableStringFieldUpdateOperationsInput | string | null
    consent_given?: BoolFieldUpdateOperationsInput | boolean
    consent_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consent_version?: NullableStringFieldUpdateOperationsInput | string | null
    data_retention_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kyc_status?: StringFieldUpdateOperationsInput | string
    verification_attempts?: IntFieldUpdateOperationsInput | number
    last_verification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CitizenCreateManyInput = {
    id?: string
    nni_index: string
    nni_masked?: string | null
    given_name?: string | null
    family_name?: string | null
    full_name?: string | null
    gender?: string | null
    birthdate?: Date | string | null
    place_of_birth?: string | null
    phone_number?: string | null
    biometric_hash?: string | null
    face_data_encrypted?: string | null
    face_iv?: string | null
    face_tag?: string | null
    consent_given?: boolean
    consent_date?: Date | string | null
    consent_version?: string | null
    data_retention_until?: Date | string | null
    kyc_status?: string
    verification_attempts?: number
    last_verification?: Date | string | null
    verified_by?: string | null
    verification_notes?: string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    created_by?: string | null
    updated_by?: string | null
    deleted_at?: Date | string | null
    deleted_by?: string | null
  }

  export type CitizenUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nni_index?: StringFieldUpdateOperationsInput | string
    nni_masked?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    place_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    biometric_hash?: NullableStringFieldUpdateOperationsInput | string | null
    face_data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    face_iv?: NullableStringFieldUpdateOperationsInput | string | null
    face_tag?: NullableStringFieldUpdateOperationsInput | string | null
    consent_given?: BoolFieldUpdateOperationsInput | boolean
    consent_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consent_version?: NullableStringFieldUpdateOperationsInput | string | null
    data_retention_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kyc_status?: StringFieldUpdateOperationsInput | string
    verification_attempts?: IntFieldUpdateOperationsInput | number
    last_verification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CitizenUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nni_index?: StringFieldUpdateOperationsInput | string
    nni_masked?: NullableStringFieldUpdateOperationsInput | string | null
    given_name?: NullableStringFieldUpdateOperationsInput | string | null
    family_name?: NullableStringFieldUpdateOperationsInput | string | null
    full_name?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    birthdate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    place_of_birth?: NullableStringFieldUpdateOperationsInput | string | null
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    biometric_hash?: NullableStringFieldUpdateOperationsInput | string | null
    face_data_encrypted?: NullableStringFieldUpdateOperationsInput | string | null
    face_iv?: NullableStringFieldUpdateOperationsInput | string | null
    face_tag?: NullableStringFieldUpdateOperationsInput | string | null
    consent_given?: BoolFieldUpdateOperationsInput | boolean
    consent_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consent_version?: NullableStringFieldUpdateOperationsInput | string | null
    data_retention_until?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kyc_status?: StringFieldUpdateOperationsInput | string
    verification_attempts?: IntFieldUpdateOperationsInput | number
    last_verification?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    verified_by?: NullableStringFieldUpdateOperationsInput | string | null
    verification_notes?: NullableStringFieldUpdateOperationsInput | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_by?: NullableStringFieldUpdateOperationsInput | string | null
    updated_by?: NullableStringFieldUpdateOperationsInput | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CitizenCountOrderByAggregateInput = {
    id?: SortOrder
    nni_index?: SortOrder
    nni_masked?: SortOrder
    given_name?: SortOrder
    family_name?: SortOrder
    full_name?: SortOrder
    gender?: SortOrder
    birthdate?: SortOrder
    place_of_birth?: SortOrder
    phone_number?: SortOrder
    biometric_hash?: SortOrder
    face_data_encrypted?: SortOrder
    face_iv?: SortOrder
    face_tag?: SortOrder
    consent_given?: SortOrder
    consent_date?: SortOrder
    consent_version?: SortOrder
    data_retention_until?: SortOrder
    kyc_status?: SortOrder
    verification_attempts?: SortOrder
    last_verification?: SortOrder
    verified_by?: SortOrder
    verification_notes?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
  }

  export type CitizenAvgOrderByAggregateInput = {
    verification_attempts?: SortOrder
  }

  export type CitizenMaxOrderByAggregateInput = {
    id?: SortOrder
    nni_index?: SortOrder
    nni_masked?: SortOrder
    given_name?: SortOrder
    family_name?: SortOrder
    full_name?: SortOrder
    gender?: SortOrder
    birthdate?: SortOrder
    place_of_birth?: SortOrder
    phone_number?: SortOrder
    biometric_hash?: SortOrder
    face_data_encrypted?: SortOrder
    face_iv?: SortOrder
    face_tag?: SortOrder
    consent_given?: SortOrder
    consent_date?: SortOrder
    consent_version?: SortOrder
    data_retention_until?: SortOrder
    kyc_status?: SortOrder
    verification_attempts?: SortOrder
    last_verification?: SortOrder
    verified_by?: SortOrder
    verification_notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
  }

  export type CitizenMinOrderByAggregateInput = {
    id?: SortOrder
    nni_index?: SortOrder
    nni_masked?: SortOrder
    given_name?: SortOrder
    family_name?: SortOrder
    full_name?: SortOrder
    gender?: SortOrder
    birthdate?: SortOrder
    place_of_birth?: SortOrder
    phone_number?: SortOrder
    biometric_hash?: SortOrder
    face_data_encrypted?: SortOrder
    face_iv?: SortOrder
    face_tag?: SortOrder
    consent_given?: SortOrder
    consent_date?: SortOrder
    consent_version?: SortOrder
    data_retention_until?: SortOrder
    kyc_status?: SortOrder
    verification_attempts?: SortOrder
    last_verification?: SortOrder
    verified_by?: SortOrder
    verification_notes?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    created_by?: SortOrder
    updated_by?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
  }

  export type CitizenSumOrderByAggregateInput = {
    verification_attempts?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use CitizenDefaultArgs instead
     */
    export type CitizenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CitizenDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}