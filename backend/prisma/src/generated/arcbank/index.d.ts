
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
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model AdminFace
 * 
 */
export type AdminFace = $Result.DefaultSelection<Prisma.$AdminFacePayload>
/**
 * Model PendingRequest
 * 
 */
export type PendingRequest = $Result.DefaultSelection<Prisma.$PendingRequestPayload>
/**
 * Model Vote
 * 
 */
export type Vote = $Result.DefaultSelection<Prisma.$VotePayload>
/**
 * Model HederaProof
 * 
 */
export type HederaProof = $Result.DefaultSelection<Prisma.$HederaProofPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
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
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
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
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs>;

  /**
   * `prisma.adminFace`: Exposes CRUD operations for the **AdminFace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminFaces
    * const adminFaces = await prisma.adminFace.findMany()
    * ```
    */
  get adminFace(): Prisma.AdminFaceDelegate<ExtArgs>;

  /**
   * `prisma.pendingRequest`: Exposes CRUD operations for the **PendingRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PendingRequests
    * const pendingRequests = await prisma.pendingRequest.findMany()
    * ```
    */
  get pendingRequest(): Prisma.PendingRequestDelegate<ExtArgs>;

  /**
   * `prisma.vote`: Exposes CRUD operations for the **Vote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Votes
    * const votes = await prisma.vote.findMany()
    * ```
    */
  get vote(): Prisma.VoteDelegate<ExtArgs>;

  /**
   * `prisma.hederaProof`: Exposes CRUD operations for the **HederaProof** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HederaProofs
    * const hederaProofs = await prisma.hederaProof.findMany()
    * ```
    */
  get hederaProof(): Prisma.HederaProofDelegate<ExtArgs>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;
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
    Admin: 'Admin',
    AdminFace: 'AdminFace',
    PendingRequest: 'PendingRequest',
    Vote: 'Vote',
    HederaProof: 'HederaProof',
    AuditLog: 'AuditLog',
    User: 'User',
    Session: 'Session'
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
      modelProps: "admin" | "adminFace" | "pendingRequest" | "vote" | "hederaProof" | "auditLog" | "user" | "session"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      AdminFace: {
        payload: Prisma.$AdminFacePayload<ExtArgs>
        fields: Prisma.AdminFaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload>
          }
          findFirst: {
            args: Prisma.AdminFaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload>
          }
          findMany: {
            args: Prisma.AdminFaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload>[]
          }
          create: {
            args: Prisma.AdminFaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload>
          }
          createMany: {
            args: Prisma.AdminFaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminFaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload>[]
          }
          delete: {
            args: Prisma.AdminFaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload>
          }
          update: {
            args: Prisma.AdminFaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload>
          }
          deleteMany: {
            args: Prisma.AdminFaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminFaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AdminFaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminFacePayload>
          }
          aggregate: {
            args: Prisma.AdminFaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminFace>
          }
          groupBy: {
            args: Prisma.AdminFaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminFaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminFaceCountArgs<ExtArgs>
            result: $Utils.Optional<AdminFaceCountAggregateOutputType> | number
          }
        }
      }
      PendingRequest: {
        payload: Prisma.$PendingRequestPayload<ExtArgs>
        fields: Prisma.PendingRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PendingRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PendingRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload>
          }
          findFirst: {
            args: Prisma.PendingRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PendingRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload>
          }
          findMany: {
            args: Prisma.PendingRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload>[]
          }
          create: {
            args: Prisma.PendingRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload>
          }
          createMany: {
            args: Prisma.PendingRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PendingRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload>[]
          }
          delete: {
            args: Prisma.PendingRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload>
          }
          update: {
            args: Prisma.PendingRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload>
          }
          deleteMany: {
            args: Prisma.PendingRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PendingRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PendingRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PendingRequestPayload>
          }
          aggregate: {
            args: Prisma.PendingRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePendingRequest>
          }
          groupBy: {
            args: Prisma.PendingRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<PendingRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.PendingRequestCountArgs<ExtArgs>
            result: $Utils.Optional<PendingRequestCountAggregateOutputType> | number
          }
        }
      }
      Vote: {
        payload: Prisma.$VotePayload<ExtArgs>
        fields: Prisma.VoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findFirst: {
            args: Prisma.VoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          findMany: {
            args: Prisma.VoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          create: {
            args: Prisma.VoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          createMany: {
            args: Prisma.VoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>[]
          }
          delete: {
            args: Prisma.VoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          update: {
            args: Prisma.VoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          deleteMany: {
            args: Prisma.VoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.VoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VotePayload>
          }
          aggregate: {
            args: Prisma.VoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVote>
          }
          groupBy: {
            args: Prisma.VoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<VoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.VoteCountArgs<ExtArgs>
            result: $Utils.Optional<VoteCountAggregateOutputType> | number
          }
        }
      }
      HederaProof: {
        payload: Prisma.$HederaProofPayload<ExtArgs>
        fields: Prisma.HederaProofFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HederaProofFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HederaProofFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload>
          }
          findFirst: {
            args: Prisma.HederaProofFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HederaProofFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload>
          }
          findMany: {
            args: Prisma.HederaProofFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload>[]
          }
          create: {
            args: Prisma.HederaProofCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload>
          }
          createMany: {
            args: Prisma.HederaProofCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HederaProofCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload>[]
          }
          delete: {
            args: Prisma.HederaProofDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload>
          }
          update: {
            args: Prisma.HederaProofUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload>
          }
          deleteMany: {
            args: Prisma.HederaProofDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HederaProofUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HederaProofUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HederaProofPayload>
          }
          aggregate: {
            args: Prisma.HederaProofAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHederaProof>
          }
          groupBy: {
            args: Prisma.HederaProofGroupByArgs<ExtArgs>
            result: $Utils.Optional<HederaProofGroupByOutputType>[]
          }
          count: {
            args: Prisma.HederaProofCountArgs<ExtArgs>
            result: $Utils.Optional<HederaProofCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
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
   * Count Type AdminCountOutputType
   */

  export type AdminCountOutputType = {
    admin_faces: number
    votes: number
    sessions: number
  }

  export type AdminCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin_faces?: boolean | AdminCountOutputTypeCountAdmin_facesArgs
    votes?: boolean | AdminCountOutputTypeCountVotesArgs
    sessions?: boolean | AdminCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminCountOutputType
     */
    select?: AdminCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountAdmin_facesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminFaceWhereInput
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }

  /**
   * AdminCountOutputType without action
   */
  export type AdminCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type PendingRequestCountOutputType
   */

  export type PendingRequestCountOutputType = {
    votes: number
    hedera_proofs: number
  }

  export type PendingRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | PendingRequestCountOutputTypeCountVotesArgs
    hedera_proofs?: boolean | PendingRequestCountOutputTypeCountHedera_proofsArgs
  }

  // Custom InputTypes
  /**
   * PendingRequestCountOutputType without action
   */
  export type PendingRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequestCountOutputType
     */
    select?: PendingRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PendingRequestCountOutputType without action
   */
  export type PendingRequestCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
  }

  /**
   * PendingRequestCountOutputType without action
   */
  export type PendingRequestCountOutputTypeCountHedera_proofsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HederaProofWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    username: string | null
    password_hash: string | null
    bank_id: string | null
    face_enrolled: boolean | null
    last_login: Date | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    deleted_by: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    username: string | null
    password_hash: string | null
    bank_id: string | null
    face_enrolled: boolean | null
    last_login: Date | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    deleted_by: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    username: number
    password_hash: number
    bank_id: number
    face_enrolled: number
    last_login: number
    created_at: number
    updated_at: number
    deleted_at: number
    deleted_by: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    bank_id?: true
    face_enrolled?: true
    last_login?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    deleted_by?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    bank_id?: true
    face_enrolled?: true
    last_login?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    deleted_by?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    username?: true
    password_hash?: true
    bank_id?: true
    face_enrolled?: true
    last_login?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    deleted_by?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled: boolean
    last_login: Date | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    deleted_by: string | null
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password_hash?: boolean
    bank_id?: boolean
    face_enrolled?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    admin_faces?: boolean | Admin$admin_facesArgs<ExtArgs>
    votes?: boolean | Admin$votesArgs<ExtArgs>
    sessions?: boolean | Admin$sessionsArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    password_hash?: boolean
    bank_id?: boolean
    face_enrolled?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    username?: boolean
    password_hash?: boolean
    bank_id?: boolean
    face_enrolled?: boolean
    last_login?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
  }

  export type AdminInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin_faces?: boolean | Admin$admin_facesArgs<ExtArgs>
    votes?: boolean | Admin$votesArgs<ExtArgs>
    sessions?: boolean | Admin$sessionsArgs<ExtArgs>
    _count?: boolean | AdminCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AdminIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {
      admin_faces: Prisma.$AdminFacePayload<ExtArgs>[]
      votes: Prisma.$VotePayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      password_hash: string
      bank_id: string
      face_enrolled: boolean
      last_login: Date | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      deleted_by: string | null
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
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
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin_faces<T extends Admin$admin_facesArgs<ExtArgs> = {}>(args?: Subset<T, Admin$admin_facesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "findMany"> | Null>
    votes<T extends Admin$votesArgs<ExtArgs> = {}>(args?: Subset<T, Admin$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany"> | Null>
    sessions<T extends Admin$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Admin$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Admin model
   */ 
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly username: FieldRef<"Admin", 'String'>
    readonly password_hash: FieldRef<"Admin", 'String'>
    readonly bank_id: FieldRef<"Admin", 'String'>
    readonly face_enrolled: FieldRef<"Admin", 'Boolean'>
    readonly last_login: FieldRef<"Admin", 'DateTime'>
    readonly created_at: FieldRef<"Admin", 'DateTime'>
    readonly updated_at: FieldRef<"Admin", 'DateTime'>
    readonly deleted_at: FieldRef<"Admin", 'DateTime'>
    readonly deleted_by: FieldRef<"Admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
  }

  /**
   * Admin.admin_faces
   */
  export type Admin$admin_facesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    where?: AdminFaceWhereInput
    orderBy?: AdminFaceOrderByWithRelationInput | AdminFaceOrderByWithRelationInput[]
    cursor?: AdminFaceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminFaceScalarFieldEnum | AdminFaceScalarFieldEnum[]
  }

  /**
   * Admin.votes
   */
  export type Admin$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Admin.sessions
   */
  export type Admin$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminInclude<ExtArgs> | null
  }


  /**
   * Model AdminFace
   */

  export type AggregateAdminFace = {
    _count: AdminFaceCountAggregateOutputType | null
    _avg: AdminFaceAvgAggregateOutputType | null
    _sum: AdminFaceSumAggregateOutputType | null
    _min: AdminFaceMinAggregateOutputType | null
    _max: AdminFaceMaxAggregateOutputType | null
  }

  export type AdminFaceAvgAggregateOutputType = {
    dims: number | null
  }

  export type AdminFaceSumAggregateOutputType = {
    dims: number | null
  }

  export type AdminFaceMinAggregateOutputType = {
    id: string | null
    admin_id: string | null
    enc_embedding: string | null
    iv: string | null
    tag: string | null
    dims: number | null
    embedding_hash: string | null
    enrolled_at: Date | null
  }

  export type AdminFaceMaxAggregateOutputType = {
    id: string | null
    admin_id: string | null
    enc_embedding: string | null
    iv: string | null
    tag: string | null
    dims: number | null
    embedding_hash: string | null
    enrolled_at: Date | null
  }

  export type AdminFaceCountAggregateOutputType = {
    id: number
    admin_id: number
    enc_embedding: number
    iv: number
    tag: number
    dims: number
    embedding_hash: number
    enrolled_at: number
    _all: number
  }


  export type AdminFaceAvgAggregateInputType = {
    dims?: true
  }

  export type AdminFaceSumAggregateInputType = {
    dims?: true
  }

  export type AdminFaceMinAggregateInputType = {
    id?: true
    admin_id?: true
    enc_embedding?: true
    iv?: true
    tag?: true
    dims?: true
    embedding_hash?: true
    enrolled_at?: true
  }

  export type AdminFaceMaxAggregateInputType = {
    id?: true
    admin_id?: true
    enc_embedding?: true
    iv?: true
    tag?: true
    dims?: true
    embedding_hash?: true
    enrolled_at?: true
  }

  export type AdminFaceCountAggregateInputType = {
    id?: true
    admin_id?: true
    enc_embedding?: true
    iv?: true
    tag?: true
    dims?: true
    embedding_hash?: true
    enrolled_at?: true
    _all?: true
  }

  export type AdminFaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminFace to aggregate.
     */
    where?: AdminFaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminFaces to fetch.
     */
    orderBy?: AdminFaceOrderByWithRelationInput | AdminFaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminFaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminFaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminFaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminFaces
    **/
    _count?: true | AdminFaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminFaceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminFaceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminFaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminFaceMaxAggregateInputType
  }

  export type GetAdminFaceAggregateType<T extends AdminFaceAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminFace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminFace[P]>
      : GetScalarType<T[P], AggregateAdminFace[P]>
  }




  export type AdminFaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminFaceWhereInput
    orderBy?: AdminFaceOrderByWithAggregationInput | AdminFaceOrderByWithAggregationInput[]
    by: AdminFaceScalarFieldEnum[] | AdminFaceScalarFieldEnum
    having?: AdminFaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminFaceCountAggregateInputType | true
    _avg?: AdminFaceAvgAggregateInputType
    _sum?: AdminFaceSumAggregateInputType
    _min?: AdminFaceMinAggregateInputType
    _max?: AdminFaceMaxAggregateInputType
  }

  export type AdminFaceGroupByOutputType = {
    id: string
    admin_id: string
    enc_embedding: string
    iv: string
    tag: string
    dims: number
    embedding_hash: string | null
    enrolled_at: Date
    _count: AdminFaceCountAggregateOutputType | null
    _avg: AdminFaceAvgAggregateOutputType | null
    _sum: AdminFaceSumAggregateOutputType | null
    _min: AdminFaceMinAggregateOutputType | null
    _max: AdminFaceMaxAggregateOutputType | null
  }

  type GetAdminFaceGroupByPayload<T extends AdminFaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminFaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminFaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminFaceGroupByOutputType[P]>
            : GetScalarType<T[P], AdminFaceGroupByOutputType[P]>
        }
      >
    >


  export type AdminFaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    enc_embedding?: boolean
    iv?: boolean
    tag?: boolean
    dims?: boolean
    embedding_hash?: boolean
    enrolled_at?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminFace"]>

  export type AdminFaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    enc_embedding?: boolean
    iv?: boolean
    tag?: boolean
    dims?: boolean
    embedding_hash?: boolean
    enrolled_at?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["adminFace"]>

  export type AdminFaceSelectScalar = {
    id?: boolean
    admin_id?: boolean
    enc_embedding?: boolean
    iv?: boolean
    tag?: boolean
    dims?: boolean
    embedding_hash?: boolean
    enrolled_at?: boolean
  }

  export type AdminFaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }
  export type AdminFaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }

  export type $AdminFacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminFace"
    objects: {
      admin: Prisma.$AdminPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      admin_id: string
      enc_embedding: string
      iv: string
      tag: string
      dims: number
      embedding_hash: string | null
      enrolled_at: Date
    }, ExtArgs["result"]["adminFace"]>
    composites: {}
  }

  type AdminFaceGetPayload<S extends boolean | null | undefined | AdminFaceDefaultArgs> = $Result.GetResult<Prisma.$AdminFacePayload, S>

  type AdminFaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AdminFaceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AdminFaceCountAggregateInputType | true
    }

  export interface AdminFaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminFace'], meta: { name: 'AdminFace' } }
    /**
     * Find zero or one AdminFace that matches the filter.
     * @param {AdminFaceFindUniqueArgs} args - Arguments to find a AdminFace
     * @example
     * // Get one AdminFace
     * const adminFace = await prisma.adminFace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFaceFindUniqueArgs>(args: SelectSubset<T, AdminFaceFindUniqueArgs<ExtArgs>>): Prisma__AdminFaceClient<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AdminFace that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AdminFaceFindUniqueOrThrowArgs} args - Arguments to find a AdminFace
     * @example
     * // Get one AdminFace
     * const adminFace = await prisma.adminFace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFaceFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminFaceClient<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AdminFace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFaceFindFirstArgs} args - Arguments to find a AdminFace
     * @example
     * // Get one AdminFace
     * const adminFace = await prisma.adminFace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFaceFindFirstArgs>(args?: SelectSubset<T, AdminFaceFindFirstArgs<ExtArgs>>): Prisma__AdminFaceClient<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AdminFace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFaceFindFirstOrThrowArgs} args - Arguments to find a AdminFace
     * @example
     * // Get one AdminFace
     * const adminFace = await prisma.adminFace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFaceFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminFaceClient<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AdminFaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminFaces
     * const adminFaces = await prisma.adminFace.findMany()
     * 
     * // Get first 10 AdminFaces
     * const adminFaces = await prisma.adminFace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminFaceWithIdOnly = await prisma.adminFace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFaceFindManyArgs>(args?: SelectSubset<T, AdminFaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AdminFace.
     * @param {AdminFaceCreateArgs} args - Arguments to create a AdminFace.
     * @example
     * // Create one AdminFace
     * const AdminFace = await prisma.adminFace.create({
     *   data: {
     *     // ... data to create a AdminFace
     *   }
     * })
     * 
     */
    create<T extends AdminFaceCreateArgs>(args: SelectSubset<T, AdminFaceCreateArgs<ExtArgs>>): Prisma__AdminFaceClient<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AdminFaces.
     * @param {AdminFaceCreateManyArgs} args - Arguments to create many AdminFaces.
     * @example
     * // Create many AdminFaces
     * const adminFace = await prisma.adminFace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminFaceCreateManyArgs>(args?: SelectSubset<T, AdminFaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminFaces and returns the data saved in the database.
     * @param {AdminFaceCreateManyAndReturnArgs} args - Arguments to create many AdminFaces.
     * @example
     * // Create many AdminFaces
     * const adminFace = await prisma.adminFace.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminFaces and only return the `id`
     * const adminFaceWithIdOnly = await prisma.adminFace.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminFaceCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminFaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AdminFace.
     * @param {AdminFaceDeleteArgs} args - Arguments to delete one AdminFace.
     * @example
     * // Delete one AdminFace
     * const AdminFace = await prisma.adminFace.delete({
     *   where: {
     *     // ... filter to delete one AdminFace
     *   }
     * })
     * 
     */
    delete<T extends AdminFaceDeleteArgs>(args: SelectSubset<T, AdminFaceDeleteArgs<ExtArgs>>): Prisma__AdminFaceClient<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AdminFace.
     * @param {AdminFaceUpdateArgs} args - Arguments to update one AdminFace.
     * @example
     * // Update one AdminFace
     * const adminFace = await prisma.adminFace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminFaceUpdateArgs>(args: SelectSubset<T, AdminFaceUpdateArgs<ExtArgs>>): Prisma__AdminFaceClient<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AdminFaces.
     * @param {AdminFaceDeleteManyArgs} args - Arguments to filter AdminFaces to delete.
     * @example
     * // Delete a few AdminFaces
     * const { count } = await prisma.adminFace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminFaceDeleteManyArgs>(args?: SelectSubset<T, AdminFaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminFaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminFaces
     * const adminFace = await prisma.adminFace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminFaceUpdateManyArgs>(args: SelectSubset<T, AdminFaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AdminFace.
     * @param {AdminFaceUpsertArgs} args - Arguments to update or create a AdminFace.
     * @example
     * // Update or create a AdminFace
     * const adminFace = await prisma.adminFace.upsert({
     *   create: {
     *     // ... data to create a AdminFace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminFace we want to update
     *   }
     * })
     */
    upsert<T extends AdminFaceUpsertArgs>(args: SelectSubset<T, AdminFaceUpsertArgs<ExtArgs>>): Prisma__AdminFaceClient<$Result.GetResult<Prisma.$AdminFacePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AdminFaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFaceCountArgs} args - Arguments to filter AdminFaces to count.
     * @example
     * // Count the number of AdminFaces
     * const count = await prisma.adminFace.count({
     *   where: {
     *     // ... the filter for the AdminFaces we want to count
     *   }
     * })
    **/
    count<T extends AdminFaceCountArgs>(
      args?: Subset<T, AdminFaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminFaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminFace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminFaceAggregateArgs>(args: Subset<T, AdminFaceAggregateArgs>): Prisma.PrismaPromise<GetAdminFaceAggregateType<T>>

    /**
     * Group by AdminFace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFaceGroupByArgs} args - Group by arguments.
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
      T extends AdminFaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminFaceGroupByArgs['orderBy'] }
        : { orderBy?: AdminFaceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminFaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminFaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminFace model
   */
  readonly fields: AdminFaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminFace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminFaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends AdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminDefaultArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the AdminFace model
   */ 
  interface AdminFaceFieldRefs {
    readonly id: FieldRef<"AdminFace", 'String'>
    readonly admin_id: FieldRef<"AdminFace", 'String'>
    readonly enc_embedding: FieldRef<"AdminFace", 'String'>
    readonly iv: FieldRef<"AdminFace", 'String'>
    readonly tag: FieldRef<"AdminFace", 'String'>
    readonly dims: FieldRef<"AdminFace", 'Int'>
    readonly embedding_hash: FieldRef<"AdminFace", 'String'>
    readonly enrolled_at: FieldRef<"AdminFace", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminFace findUnique
   */
  export type AdminFaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    /**
     * Filter, which AdminFace to fetch.
     */
    where: AdminFaceWhereUniqueInput
  }

  /**
   * AdminFace findUniqueOrThrow
   */
  export type AdminFaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    /**
     * Filter, which AdminFace to fetch.
     */
    where: AdminFaceWhereUniqueInput
  }

  /**
   * AdminFace findFirst
   */
  export type AdminFaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    /**
     * Filter, which AdminFace to fetch.
     */
    where?: AdminFaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminFaces to fetch.
     */
    orderBy?: AdminFaceOrderByWithRelationInput | AdminFaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminFaces.
     */
    cursor?: AdminFaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminFaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminFaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminFaces.
     */
    distinct?: AdminFaceScalarFieldEnum | AdminFaceScalarFieldEnum[]
  }

  /**
   * AdminFace findFirstOrThrow
   */
  export type AdminFaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    /**
     * Filter, which AdminFace to fetch.
     */
    where?: AdminFaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminFaces to fetch.
     */
    orderBy?: AdminFaceOrderByWithRelationInput | AdminFaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminFaces.
     */
    cursor?: AdminFaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminFaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminFaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminFaces.
     */
    distinct?: AdminFaceScalarFieldEnum | AdminFaceScalarFieldEnum[]
  }

  /**
   * AdminFace findMany
   */
  export type AdminFaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    /**
     * Filter, which AdminFaces to fetch.
     */
    where?: AdminFaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminFaces to fetch.
     */
    orderBy?: AdminFaceOrderByWithRelationInput | AdminFaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminFaces.
     */
    cursor?: AdminFaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminFaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminFaces.
     */
    skip?: number
    distinct?: AdminFaceScalarFieldEnum | AdminFaceScalarFieldEnum[]
  }

  /**
   * AdminFace create
   */
  export type AdminFaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminFace.
     */
    data: XOR<AdminFaceCreateInput, AdminFaceUncheckedCreateInput>
  }

  /**
   * AdminFace createMany
   */
  export type AdminFaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminFaces.
     */
    data: AdminFaceCreateManyInput | AdminFaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminFace createManyAndReturn
   */
  export type AdminFaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AdminFaces.
     */
    data: AdminFaceCreateManyInput | AdminFaceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminFace update
   */
  export type AdminFaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminFace.
     */
    data: XOR<AdminFaceUpdateInput, AdminFaceUncheckedUpdateInput>
    /**
     * Choose, which AdminFace to update.
     */
    where: AdminFaceWhereUniqueInput
  }

  /**
   * AdminFace updateMany
   */
  export type AdminFaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminFaces.
     */
    data: XOR<AdminFaceUpdateManyMutationInput, AdminFaceUncheckedUpdateManyInput>
    /**
     * Filter which AdminFaces to update
     */
    where?: AdminFaceWhereInput
  }

  /**
   * AdminFace upsert
   */
  export type AdminFaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminFace to update in case it exists.
     */
    where: AdminFaceWhereUniqueInput
    /**
     * In case the AdminFace found by the `where` argument doesn't exist, create a new AdminFace with this data.
     */
    create: XOR<AdminFaceCreateInput, AdminFaceUncheckedCreateInput>
    /**
     * In case the AdminFace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminFaceUpdateInput, AdminFaceUncheckedUpdateInput>
  }

  /**
   * AdminFace delete
   */
  export type AdminFaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
    /**
     * Filter which AdminFace to delete.
     */
    where: AdminFaceWhereUniqueInput
  }

  /**
   * AdminFace deleteMany
   */
  export type AdminFaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminFaces to delete
     */
    where?: AdminFaceWhereInput
  }

  /**
   * AdminFace without action
   */
  export type AdminFaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminFace
     */
    select?: AdminFaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminFaceInclude<ExtArgs> | null
  }


  /**
   * Model PendingRequest
   */

  export type AggregatePendingRequest = {
    _count: PendingRequestCountAggregateOutputType | null
    _min: PendingRequestMinAggregateOutputType | null
    _max: PendingRequestMaxAggregateOutputType | null
  }

  export type PendingRequestMinAggregateOutputType = {
    id: string | null
    citizen_nni_hash: string | null
    masked_nni: string | null
    status: string | null
    summary_hash: string | null
    salt_ref: string | null
    voting_deadline: Date | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    deleted_by: string | null
  }

  export type PendingRequestMaxAggregateOutputType = {
    id: string | null
    citizen_nni_hash: string | null
    masked_nni: string | null
    status: string | null
    summary_hash: string | null
    salt_ref: string | null
    voting_deadline: Date | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
    deleted_by: string | null
  }

  export type PendingRequestCountAggregateOutputType = {
    id: number
    citizen_nni_hash: number
    masked_nni: number
    payload_summary: number
    status: number
    summary_hash: number
    salt_ref: number
    voting_deadline: number
    image_urls: number
    created_at: number
    updated_at: number
    deleted_at: number
    deleted_by: number
    _all: number
  }


  export type PendingRequestMinAggregateInputType = {
    id?: true
    citizen_nni_hash?: true
    masked_nni?: true
    status?: true
    summary_hash?: true
    salt_ref?: true
    voting_deadline?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    deleted_by?: true
  }

  export type PendingRequestMaxAggregateInputType = {
    id?: true
    citizen_nni_hash?: true
    masked_nni?: true
    status?: true
    summary_hash?: true
    salt_ref?: true
    voting_deadline?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    deleted_by?: true
  }

  export type PendingRequestCountAggregateInputType = {
    id?: true
    citizen_nni_hash?: true
    masked_nni?: true
    payload_summary?: true
    status?: true
    summary_hash?: true
    salt_ref?: true
    voting_deadline?: true
    image_urls?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    deleted_by?: true
    _all?: true
  }

  export type PendingRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingRequest to aggregate.
     */
    where?: PendingRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingRequests to fetch.
     */
    orderBy?: PendingRequestOrderByWithRelationInput | PendingRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PendingRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PendingRequests
    **/
    _count?: true | PendingRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PendingRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PendingRequestMaxAggregateInputType
  }

  export type GetPendingRequestAggregateType<T extends PendingRequestAggregateArgs> = {
        [P in keyof T & keyof AggregatePendingRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePendingRequest[P]>
      : GetScalarType<T[P], AggregatePendingRequest[P]>
  }




  export type PendingRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PendingRequestWhereInput
    orderBy?: PendingRequestOrderByWithAggregationInput | PendingRequestOrderByWithAggregationInput[]
    by: PendingRequestScalarFieldEnum[] | PendingRequestScalarFieldEnum
    having?: PendingRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PendingRequestCountAggregateInputType | true
    _min?: PendingRequestMinAggregateInputType
    _max?: PendingRequestMaxAggregateInputType
  }

  export type PendingRequestGroupByOutputType = {
    id: string
    citizen_nni_hash: string
    masked_nni: string
    payload_summary: JsonValue
    status: string
    summary_hash: string | null
    salt_ref: string | null
    voting_deadline: Date
    image_urls: JsonValue | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
    deleted_by: string | null
    _count: PendingRequestCountAggregateOutputType | null
    _min: PendingRequestMinAggregateOutputType | null
    _max: PendingRequestMaxAggregateOutputType | null
  }

  type GetPendingRequestGroupByPayload<T extends PendingRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PendingRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PendingRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PendingRequestGroupByOutputType[P]>
            : GetScalarType<T[P], PendingRequestGroupByOutputType[P]>
        }
      >
    >


  export type PendingRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    citizen_nni_hash?: boolean
    masked_nni?: boolean
    payload_summary?: boolean
    status?: boolean
    summary_hash?: boolean
    salt_ref?: boolean
    voting_deadline?: boolean
    image_urls?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
    votes?: boolean | PendingRequest$votesArgs<ExtArgs>
    hedera_proofs?: boolean | PendingRequest$hedera_proofsArgs<ExtArgs>
    _count?: boolean | PendingRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pendingRequest"]>

  export type PendingRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    citizen_nni_hash?: boolean
    masked_nni?: boolean
    payload_summary?: boolean
    status?: boolean
    summary_hash?: boolean
    salt_ref?: boolean
    voting_deadline?: boolean
    image_urls?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
  }, ExtArgs["result"]["pendingRequest"]>

  export type PendingRequestSelectScalar = {
    id?: boolean
    citizen_nni_hash?: boolean
    masked_nni?: boolean
    payload_summary?: boolean
    status?: boolean
    summary_hash?: boolean
    salt_ref?: boolean
    voting_deadline?: boolean
    image_urls?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    deleted_by?: boolean
  }

  export type PendingRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | PendingRequest$votesArgs<ExtArgs>
    hedera_proofs?: boolean | PendingRequest$hedera_proofsArgs<ExtArgs>
    _count?: boolean | PendingRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PendingRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PendingRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PendingRequest"
    objects: {
      votes: Prisma.$VotePayload<ExtArgs>[]
      hedera_proofs: Prisma.$HederaProofPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      citizen_nni_hash: string
      masked_nni: string
      payload_summary: Prisma.JsonValue
      status: string
      summary_hash: string | null
      salt_ref: string | null
      voting_deadline: Date
      image_urls: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
      deleted_at: Date | null
      deleted_by: string | null
    }, ExtArgs["result"]["pendingRequest"]>
    composites: {}
  }

  type PendingRequestGetPayload<S extends boolean | null | undefined | PendingRequestDefaultArgs> = $Result.GetResult<Prisma.$PendingRequestPayload, S>

  type PendingRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PendingRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PendingRequestCountAggregateInputType | true
    }

  export interface PendingRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PendingRequest'], meta: { name: 'PendingRequest' } }
    /**
     * Find zero or one PendingRequest that matches the filter.
     * @param {PendingRequestFindUniqueArgs} args - Arguments to find a PendingRequest
     * @example
     * // Get one PendingRequest
     * const pendingRequest = await prisma.pendingRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PendingRequestFindUniqueArgs>(args: SelectSubset<T, PendingRequestFindUniqueArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PendingRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PendingRequestFindUniqueOrThrowArgs} args - Arguments to find a PendingRequest
     * @example
     * // Get one PendingRequest
     * const pendingRequest = await prisma.pendingRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PendingRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, PendingRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PendingRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRequestFindFirstArgs} args - Arguments to find a PendingRequest
     * @example
     * // Get one PendingRequest
     * const pendingRequest = await prisma.pendingRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PendingRequestFindFirstArgs>(args?: SelectSubset<T, PendingRequestFindFirstArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PendingRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRequestFindFirstOrThrowArgs} args - Arguments to find a PendingRequest
     * @example
     * // Get one PendingRequest
     * const pendingRequest = await prisma.pendingRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PendingRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, PendingRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PendingRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PendingRequests
     * const pendingRequests = await prisma.pendingRequest.findMany()
     * 
     * // Get first 10 PendingRequests
     * const pendingRequests = await prisma.pendingRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pendingRequestWithIdOnly = await prisma.pendingRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PendingRequestFindManyArgs>(args?: SelectSubset<T, PendingRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PendingRequest.
     * @param {PendingRequestCreateArgs} args - Arguments to create a PendingRequest.
     * @example
     * // Create one PendingRequest
     * const PendingRequest = await prisma.pendingRequest.create({
     *   data: {
     *     // ... data to create a PendingRequest
     *   }
     * })
     * 
     */
    create<T extends PendingRequestCreateArgs>(args: SelectSubset<T, PendingRequestCreateArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PendingRequests.
     * @param {PendingRequestCreateManyArgs} args - Arguments to create many PendingRequests.
     * @example
     * // Create many PendingRequests
     * const pendingRequest = await prisma.pendingRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PendingRequestCreateManyArgs>(args?: SelectSubset<T, PendingRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PendingRequests and returns the data saved in the database.
     * @param {PendingRequestCreateManyAndReturnArgs} args - Arguments to create many PendingRequests.
     * @example
     * // Create many PendingRequests
     * const pendingRequest = await prisma.pendingRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PendingRequests and only return the `id`
     * const pendingRequestWithIdOnly = await prisma.pendingRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PendingRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, PendingRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PendingRequest.
     * @param {PendingRequestDeleteArgs} args - Arguments to delete one PendingRequest.
     * @example
     * // Delete one PendingRequest
     * const PendingRequest = await prisma.pendingRequest.delete({
     *   where: {
     *     // ... filter to delete one PendingRequest
     *   }
     * })
     * 
     */
    delete<T extends PendingRequestDeleteArgs>(args: SelectSubset<T, PendingRequestDeleteArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PendingRequest.
     * @param {PendingRequestUpdateArgs} args - Arguments to update one PendingRequest.
     * @example
     * // Update one PendingRequest
     * const pendingRequest = await prisma.pendingRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PendingRequestUpdateArgs>(args: SelectSubset<T, PendingRequestUpdateArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PendingRequests.
     * @param {PendingRequestDeleteManyArgs} args - Arguments to filter PendingRequests to delete.
     * @example
     * // Delete a few PendingRequests
     * const { count } = await prisma.pendingRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PendingRequestDeleteManyArgs>(args?: SelectSubset<T, PendingRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PendingRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PendingRequests
     * const pendingRequest = await prisma.pendingRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PendingRequestUpdateManyArgs>(args: SelectSubset<T, PendingRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PendingRequest.
     * @param {PendingRequestUpsertArgs} args - Arguments to update or create a PendingRequest.
     * @example
     * // Update or create a PendingRequest
     * const pendingRequest = await prisma.pendingRequest.upsert({
     *   create: {
     *     // ... data to create a PendingRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PendingRequest we want to update
     *   }
     * })
     */
    upsert<T extends PendingRequestUpsertArgs>(args: SelectSubset<T, PendingRequestUpsertArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PendingRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRequestCountArgs} args - Arguments to filter PendingRequests to count.
     * @example
     * // Count the number of PendingRequests
     * const count = await prisma.pendingRequest.count({
     *   where: {
     *     // ... the filter for the PendingRequests we want to count
     *   }
     * })
    **/
    count<T extends PendingRequestCountArgs>(
      args?: Subset<T, PendingRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PendingRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PendingRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PendingRequestAggregateArgs>(args: Subset<T, PendingRequestAggregateArgs>): Prisma.PrismaPromise<GetPendingRequestAggregateType<T>>

    /**
     * Group by PendingRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PendingRequestGroupByArgs} args - Group by arguments.
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
      T extends PendingRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PendingRequestGroupByArgs['orderBy'] }
        : { orderBy?: PendingRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PendingRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPendingRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PendingRequest model
   */
  readonly fields: PendingRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PendingRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PendingRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    votes<T extends PendingRequest$votesArgs<ExtArgs> = {}>(args?: Subset<T, PendingRequest$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany"> | Null>
    hedera_proofs<T extends PendingRequest$hedera_proofsArgs<ExtArgs> = {}>(args?: Subset<T, PendingRequest$hedera_proofsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the PendingRequest model
   */ 
  interface PendingRequestFieldRefs {
    readonly id: FieldRef<"PendingRequest", 'String'>
    readonly citizen_nni_hash: FieldRef<"PendingRequest", 'String'>
    readonly masked_nni: FieldRef<"PendingRequest", 'String'>
    readonly payload_summary: FieldRef<"PendingRequest", 'Json'>
    readonly status: FieldRef<"PendingRequest", 'String'>
    readonly summary_hash: FieldRef<"PendingRequest", 'String'>
    readonly salt_ref: FieldRef<"PendingRequest", 'String'>
    readonly voting_deadline: FieldRef<"PendingRequest", 'DateTime'>
    readonly image_urls: FieldRef<"PendingRequest", 'Json'>
    readonly created_at: FieldRef<"PendingRequest", 'DateTime'>
    readonly updated_at: FieldRef<"PendingRequest", 'DateTime'>
    readonly deleted_at: FieldRef<"PendingRequest", 'DateTime'>
    readonly deleted_by: FieldRef<"PendingRequest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PendingRequest findUnique
   */
  export type PendingRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
    /**
     * Filter, which PendingRequest to fetch.
     */
    where: PendingRequestWhereUniqueInput
  }

  /**
   * PendingRequest findUniqueOrThrow
   */
  export type PendingRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
    /**
     * Filter, which PendingRequest to fetch.
     */
    where: PendingRequestWhereUniqueInput
  }

  /**
   * PendingRequest findFirst
   */
  export type PendingRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
    /**
     * Filter, which PendingRequest to fetch.
     */
    where?: PendingRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingRequests to fetch.
     */
    orderBy?: PendingRequestOrderByWithRelationInput | PendingRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingRequests.
     */
    cursor?: PendingRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingRequests.
     */
    distinct?: PendingRequestScalarFieldEnum | PendingRequestScalarFieldEnum[]
  }

  /**
   * PendingRequest findFirstOrThrow
   */
  export type PendingRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
    /**
     * Filter, which PendingRequest to fetch.
     */
    where?: PendingRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingRequests to fetch.
     */
    orderBy?: PendingRequestOrderByWithRelationInput | PendingRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PendingRequests.
     */
    cursor?: PendingRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PendingRequests.
     */
    distinct?: PendingRequestScalarFieldEnum | PendingRequestScalarFieldEnum[]
  }

  /**
   * PendingRequest findMany
   */
  export type PendingRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
    /**
     * Filter, which PendingRequests to fetch.
     */
    where?: PendingRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PendingRequests to fetch.
     */
    orderBy?: PendingRequestOrderByWithRelationInput | PendingRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PendingRequests.
     */
    cursor?: PendingRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PendingRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PendingRequests.
     */
    skip?: number
    distinct?: PendingRequestScalarFieldEnum | PendingRequestScalarFieldEnum[]
  }

  /**
   * PendingRequest create
   */
  export type PendingRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a PendingRequest.
     */
    data: XOR<PendingRequestCreateInput, PendingRequestUncheckedCreateInput>
  }

  /**
   * PendingRequest createMany
   */
  export type PendingRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PendingRequests.
     */
    data: PendingRequestCreateManyInput | PendingRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PendingRequest createManyAndReturn
   */
  export type PendingRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PendingRequests.
     */
    data: PendingRequestCreateManyInput | PendingRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PendingRequest update
   */
  export type PendingRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a PendingRequest.
     */
    data: XOR<PendingRequestUpdateInput, PendingRequestUncheckedUpdateInput>
    /**
     * Choose, which PendingRequest to update.
     */
    where: PendingRequestWhereUniqueInput
  }

  /**
   * PendingRequest updateMany
   */
  export type PendingRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PendingRequests.
     */
    data: XOR<PendingRequestUpdateManyMutationInput, PendingRequestUncheckedUpdateManyInput>
    /**
     * Filter which PendingRequests to update
     */
    where?: PendingRequestWhereInput
  }

  /**
   * PendingRequest upsert
   */
  export type PendingRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the PendingRequest to update in case it exists.
     */
    where: PendingRequestWhereUniqueInput
    /**
     * In case the PendingRequest found by the `where` argument doesn't exist, create a new PendingRequest with this data.
     */
    create: XOR<PendingRequestCreateInput, PendingRequestUncheckedCreateInput>
    /**
     * In case the PendingRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PendingRequestUpdateInput, PendingRequestUncheckedUpdateInput>
  }

  /**
   * PendingRequest delete
   */
  export type PendingRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
    /**
     * Filter which PendingRequest to delete.
     */
    where: PendingRequestWhereUniqueInput
  }

  /**
   * PendingRequest deleteMany
   */
  export type PendingRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PendingRequests to delete
     */
    where?: PendingRequestWhereInput
  }

  /**
   * PendingRequest.votes
   */
  export type PendingRequest$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    cursor?: VoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * PendingRequest.hedera_proofs
   */
  export type PendingRequest$hedera_proofsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    where?: HederaProofWhereInput
    orderBy?: HederaProofOrderByWithRelationInput | HederaProofOrderByWithRelationInput[]
    cursor?: HederaProofWhereUniqueInput
    take?: number
    skip?: number
    distinct?: HederaProofScalarFieldEnum | HederaProofScalarFieldEnum[]
  }

  /**
   * PendingRequest without action
   */
  export type PendingRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PendingRequest
     */
    select?: PendingRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PendingRequestInclude<ExtArgs> | null
  }


  /**
   * Model Vote
   */

  export type AggregateVote = {
    _count: VoteCountAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  export type VoteMinAggregateOutputType = {
    id: string | null
    request_id: string | null
    bank_id: string | null
    admin_id: string | null
    vote: string | null
    reason: string | null
    created_at: Date | null
  }

  export type VoteMaxAggregateOutputType = {
    id: string | null
    request_id: string | null
    bank_id: string | null
    admin_id: string | null
    vote: string | null
    reason: string | null
    created_at: Date | null
  }

  export type VoteCountAggregateOutputType = {
    id: number
    request_id: number
    bank_id: number
    admin_id: number
    vote: number
    reason: number
    created_at: number
    _all: number
  }


  export type VoteMinAggregateInputType = {
    id?: true
    request_id?: true
    bank_id?: true
    admin_id?: true
    vote?: true
    reason?: true
    created_at?: true
  }

  export type VoteMaxAggregateInputType = {
    id?: true
    request_id?: true
    bank_id?: true
    admin_id?: true
    vote?: true
    reason?: true
    created_at?: true
  }

  export type VoteCountAggregateInputType = {
    id?: true
    request_id?: true
    bank_id?: true
    admin_id?: true
    vote?: true
    reason?: true
    created_at?: true
    _all?: true
  }

  export type VoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vote to aggregate.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Votes
    **/
    _count?: true | VoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VoteMaxAggregateInputType
  }

  export type GetVoteAggregateType<T extends VoteAggregateArgs> = {
        [P in keyof T & keyof AggregateVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVote[P]>
      : GetScalarType<T[P], AggregateVote[P]>
  }




  export type VoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VoteWhereInput
    orderBy?: VoteOrderByWithAggregationInput | VoteOrderByWithAggregationInput[]
    by: VoteScalarFieldEnum[] | VoteScalarFieldEnum
    having?: VoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VoteCountAggregateInputType | true
    _min?: VoteMinAggregateInputType
    _max?: VoteMaxAggregateInputType
  }

  export type VoteGroupByOutputType = {
    id: string
    request_id: string
    bank_id: string
    admin_id: string
    vote: string
    reason: string | null
    created_at: Date
    _count: VoteCountAggregateOutputType | null
    _min: VoteMinAggregateOutputType | null
    _max: VoteMaxAggregateOutputType | null
  }

  type GetVoteGroupByPayload<T extends VoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VoteGroupByOutputType[P]>
            : GetScalarType<T[P], VoteGroupByOutputType[P]>
        }
      >
    >


  export type VoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    bank_id?: boolean
    admin_id?: boolean
    vote?: boolean
    reason?: boolean
    created_at?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    pending_request?: boolean | PendingRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    bank_id?: boolean
    admin_id?: boolean
    vote?: boolean
    reason?: boolean
    created_at?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    pending_request?: boolean | PendingRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vote"]>

  export type VoteSelectScalar = {
    id?: boolean
    request_id?: boolean
    bank_id?: boolean
    admin_id?: boolean
    vote?: boolean
    reason?: boolean
    created_at?: boolean
  }

  export type VoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    pending_request?: boolean | PendingRequestDefaultArgs<ExtArgs>
  }
  export type VoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
    pending_request?: boolean | PendingRequestDefaultArgs<ExtArgs>
  }

  export type $VotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vote"
    objects: {
      admin: Prisma.$AdminPayload<ExtArgs>
      pending_request: Prisma.$PendingRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      request_id: string
      bank_id: string
      admin_id: string
      vote: string
      reason: string | null
      created_at: Date
    }, ExtArgs["result"]["vote"]>
    composites: {}
  }

  type VoteGetPayload<S extends boolean | null | undefined | VoteDefaultArgs> = $Result.GetResult<Prisma.$VotePayload, S>

  type VoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<VoteFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: VoteCountAggregateInputType | true
    }

  export interface VoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vote'], meta: { name: 'Vote' } }
    /**
     * Find zero or one Vote that matches the filter.
     * @param {VoteFindUniqueArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VoteFindUniqueArgs>(args: SelectSubset<T, VoteFindUniqueArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Vote that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {VoteFindUniqueOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VoteFindUniqueOrThrowArgs>(args: SelectSubset<T, VoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Vote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VoteFindFirstArgs>(args?: SelectSubset<T, VoteFindFirstArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Vote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindFirstOrThrowArgs} args - Arguments to find a Vote
     * @example
     * // Get one Vote
     * const vote = await prisma.vote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VoteFindFirstOrThrowArgs>(args?: SelectSubset<T, VoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Votes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Votes
     * const votes = await prisma.vote.findMany()
     * 
     * // Get first 10 Votes
     * const votes = await prisma.vote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const voteWithIdOnly = await prisma.vote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VoteFindManyArgs>(args?: SelectSubset<T, VoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Vote.
     * @param {VoteCreateArgs} args - Arguments to create a Vote.
     * @example
     * // Create one Vote
     * const Vote = await prisma.vote.create({
     *   data: {
     *     // ... data to create a Vote
     *   }
     * })
     * 
     */
    create<T extends VoteCreateArgs>(args: SelectSubset<T, VoteCreateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Votes.
     * @param {VoteCreateManyArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VoteCreateManyArgs>(args?: SelectSubset<T, VoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Votes and returns the data saved in the database.
     * @param {VoteCreateManyAndReturnArgs} args - Arguments to create many Votes.
     * @example
     * // Create many Votes
     * const vote = await prisma.vote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Votes and only return the `id`
     * const voteWithIdOnly = await prisma.vote.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VoteCreateManyAndReturnArgs>(args?: SelectSubset<T, VoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Vote.
     * @param {VoteDeleteArgs} args - Arguments to delete one Vote.
     * @example
     * // Delete one Vote
     * const Vote = await prisma.vote.delete({
     *   where: {
     *     // ... filter to delete one Vote
     *   }
     * })
     * 
     */
    delete<T extends VoteDeleteArgs>(args: SelectSubset<T, VoteDeleteArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Vote.
     * @param {VoteUpdateArgs} args - Arguments to update one Vote.
     * @example
     * // Update one Vote
     * const vote = await prisma.vote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VoteUpdateArgs>(args: SelectSubset<T, VoteUpdateArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Votes.
     * @param {VoteDeleteManyArgs} args - Arguments to filter Votes to delete.
     * @example
     * // Delete a few Votes
     * const { count } = await prisma.vote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VoteDeleteManyArgs>(args?: SelectSubset<T, VoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Votes
     * const vote = await prisma.vote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VoteUpdateManyArgs>(args: SelectSubset<T, VoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Vote.
     * @param {VoteUpsertArgs} args - Arguments to update or create a Vote.
     * @example
     * // Update or create a Vote
     * const vote = await prisma.vote.upsert({
     *   create: {
     *     // ... data to create a Vote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vote we want to update
     *   }
     * })
     */
    upsert<T extends VoteUpsertArgs>(args: SelectSubset<T, VoteUpsertArgs<ExtArgs>>): Prisma__VoteClient<$Result.GetResult<Prisma.$VotePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Votes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteCountArgs} args - Arguments to filter Votes to count.
     * @example
     * // Count the number of Votes
     * const count = await prisma.vote.count({
     *   where: {
     *     // ... the filter for the Votes we want to count
     *   }
     * })
    **/
    count<T extends VoteCountArgs>(
      args?: Subset<T, VoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VoteAggregateArgs>(args: Subset<T, VoteAggregateArgs>): Prisma.PrismaPromise<GetVoteAggregateType<T>>

    /**
     * Group by Vote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VoteGroupByArgs} args - Group by arguments.
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
      T extends VoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VoteGroupByArgs['orderBy'] }
        : { orderBy?: VoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, VoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vote model
   */
  readonly fields: VoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends AdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminDefaultArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    pending_request<T extends PendingRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PendingRequestDefaultArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Vote model
   */ 
  interface VoteFieldRefs {
    readonly id: FieldRef<"Vote", 'String'>
    readonly request_id: FieldRef<"Vote", 'String'>
    readonly bank_id: FieldRef<"Vote", 'String'>
    readonly admin_id: FieldRef<"Vote", 'String'>
    readonly vote: FieldRef<"Vote", 'String'>
    readonly reason: FieldRef<"Vote", 'String'>
    readonly created_at: FieldRef<"Vote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vote findUnique
   */
  export type VoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findUniqueOrThrow
   */
  export type VoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote findFirst
   */
  export type VoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findFirstOrThrow
   */
  export type VoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Vote to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Votes.
     */
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote findMany
   */
  export type VoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter, which Votes to fetch.
     */
    where?: VoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Votes to fetch.
     */
    orderBy?: VoteOrderByWithRelationInput | VoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Votes.
     */
    cursor?: VoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Votes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Votes.
     */
    skip?: number
    distinct?: VoteScalarFieldEnum | VoteScalarFieldEnum[]
  }

  /**
   * Vote create
   */
  export type VoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to create a Vote.
     */
    data: XOR<VoteCreateInput, VoteUncheckedCreateInput>
  }

  /**
   * Vote createMany
   */
  export type VoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vote createManyAndReturn
   */
  export type VoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Votes.
     */
    data: VoteCreateManyInput | VoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vote update
   */
  export type VoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The data needed to update a Vote.
     */
    data: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
    /**
     * Choose, which Vote to update.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote updateMany
   */
  export type VoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Votes.
     */
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyInput>
    /**
     * Filter which Votes to update
     */
    where?: VoteWhereInput
  }

  /**
   * Vote upsert
   */
  export type VoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * The filter to search for the Vote to update in case it exists.
     */
    where: VoteWhereUniqueInput
    /**
     * In case the Vote found by the `where` argument doesn't exist, create a new Vote with this data.
     */
    create: XOR<VoteCreateInput, VoteUncheckedCreateInput>
    /**
     * In case the Vote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VoteUpdateInput, VoteUncheckedUpdateInput>
  }

  /**
   * Vote delete
   */
  export type VoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
    /**
     * Filter which Vote to delete.
     */
    where: VoteWhereUniqueInput
  }

  /**
   * Vote deleteMany
   */
  export type VoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Votes to delete
     */
    where?: VoteWhereInput
  }

  /**
   * Vote without action
   */
  export type VoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vote
     */
    select?: VoteSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VoteInclude<ExtArgs> | null
  }


  /**
   * Model HederaProof
   */

  export type AggregateHederaProof = {
    _count: HederaProofCountAggregateOutputType | null
    _min: HederaProofMinAggregateOutputType | null
    _max: HederaProofMaxAggregateOutputType | null
  }

  export type HederaProofMinAggregateOutputType = {
    id: string | null
    request_id: string | null
    summary_hash: string | null
    topic_message_id: string | null
    created_at: Date | null
  }

  export type HederaProofMaxAggregateOutputType = {
    id: string | null
    request_id: string | null
    summary_hash: string | null
    topic_message_id: string | null
    created_at: Date | null
  }

  export type HederaProofCountAggregateOutputType = {
    id: number
    request_id: number
    summary_hash: number
    topic_message_id: number
    created_at: number
    _all: number
  }


  export type HederaProofMinAggregateInputType = {
    id?: true
    request_id?: true
    summary_hash?: true
    topic_message_id?: true
    created_at?: true
  }

  export type HederaProofMaxAggregateInputType = {
    id?: true
    request_id?: true
    summary_hash?: true
    topic_message_id?: true
    created_at?: true
  }

  export type HederaProofCountAggregateInputType = {
    id?: true
    request_id?: true
    summary_hash?: true
    topic_message_id?: true
    created_at?: true
    _all?: true
  }

  export type HederaProofAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HederaProof to aggregate.
     */
    where?: HederaProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HederaProofs to fetch.
     */
    orderBy?: HederaProofOrderByWithRelationInput | HederaProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HederaProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HederaProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HederaProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HederaProofs
    **/
    _count?: true | HederaProofCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HederaProofMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HederaProofMaxAggregateInputType
  }

  export type GetHederaProofAggregateType<T extends HederaProofAggregateArgs> = {
        [P in keyof T & keyof AggregateHederaProof]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHederaProof[P]>
      : GetScalarType<T[P], AggregateHederaProof[P]>
  }




  export type HederaProofGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HederaProofWhereInput
    orderBy?: HederaProofOrderByWithAggregationInput | HederaProofOrderByWithAggregationInput[]
    by: HederaProofScalarFieldEnum[] | HederaProofScalarFieldEnum
    having?: HederaProofScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HederaProofCountAggregateInputType | true
    _min?: HederaProofMinAggregateInputType
    _max?: HederaProofMaxAggregateInputType
  }

  export type HederaProofGroupByOutputType = {
    id: string
    request_id: string
    summary_hash: string
    topic_message_id: string
    created_at: Date
    _count: HederaProofCountAggregateOutputType | null
    _min: HederaProofMinAggregateOutputType | null
    _max: HederaProofMaxAggregateOutputType | null
  }

  type GetHederaProofGroupByPayload<T extends HederaProofGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HederaProofGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HederaProofGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HederaProofGroupByOutputType[P]>
            : GetScalarType<T[P], HederaProofGroupByOutputType[P]>
        }
      >
    >


  export type HederaProofSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    summary_hash?: boolean
    topic_message_id?: boolean
    created_at?: boolean
    pending_request?: boolean | PendingRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hederaProof"]>

  export type HederaProofSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    request_id?: boolean
    summary_hash?: boolean
    topic_message_id?: boolean
    created_at?: boolean
    pending_request?: boolean | PendingRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hederaProof"]>

  export type HederaProofSelectScalar = {
    id?: boolean
    request_id?: boolean
    summary_hash?: boolean
    topic_message_id?: boolean
    created_at?: boolean
  }

  export type HederaProofInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pending_request?: boolean | PendingRequestDefaultArgs<ExtArgs>
  }
  export type HederaProofIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    pending_request?: boolean | PendingRequestDefaultArgs<ExtArgs>
  }

  export type $HederaProofPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HederaProof"
    objects: {
      pending_request: Prisma.$PendingRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      request_id: string
      summary_hash: string
      topic_message_id: string
      created_at: Date
    }, ExtArgs["result"]["hederaProof"]>
    composites: {}
  }

  type HederaProofGetPayload<S extends boolean | null | undefined | HederaProofDefaultArgs> = $Result.GetResult<Prisma.$HederaProofPayload, S>

  type HederaProofCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HederaProofFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HederaProofCountAggregateInputType | true
    }

  export interface HederaProofDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HederaProof'], meta: { name: 'HederaProof' } }
    /**
     * Find zero or one HederaProof that matches the filter.
     * @param {HederaProofFindUniqueArgs} args - Arguments to find a HederaProof
     * @example
     * // Get one HederaProof
     * const hederaProof = await prisma.hederaProof.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HederaProofFindUniqueArgs>(args: SelectSubset<T, HederaProofFindUniqueArgs<ExtArgs>>): Prisma__HederaProofClient<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HederaProof that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HederaProofFindUniqueOrThrowArgs} args - Arguments to find a HederaProof
     * @example
     * // Get one HederaProof
     * const hederaProof = await prisma.hederaProof.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HederaProofFindUniqueOrThrowArgs>(args: SelectSubset<T, HederaProofFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HederaProofClient<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HederaProof that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HederaProofFindFirstArgs} args - Arguments to find a HederaProof
     * @example
     * // Get one HederaProof
     * const hederaProof = await prisma.hederaProof.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HederaProofFindFirstArgs>(args?: SelectSubset<T, HederaProofFindFirstArgs<ExtArgs>>): Prisma__HederaProofClient<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HederaProof that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HederaProofFindFirstOrThrowArgs} args - Arguments to find a HederaProof
     * @example
     * // Get one HederaProof
     * const hederaProof = await prisma.hederaProof.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HederaProofFindFirstOrThrowArgs>(args?: SelectSubset<T, HederaProofFindFirstOrThrowArgs<ExtArgs>>): Prisma__HederaProofClient<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HederaProofs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HederaProofFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HederaProofs
     * const hederaProofs = await prisma.hederaProof.findMany()
     * 
     * // Get first 10 HederaProofs
     * const hederaProofs = await prisma.hederaProof.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hederaProofWithIdOnly = await prisma.hederaProof.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HederaProofFindManyArgs>(args?: SelectSubset<T, HederaProofFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HederaProof.
     * @param {HederaProofCreateArgs} args - Arguments to create a HederaProof.
     * @example
     * // Create one HederaProof
     * const HederaProof = await prisma.hederaProof.create({
     *   data: {
     *     // ... data to create a HederaProof
     *   }
     * })
     * 
     */
    create<T extends HederaProofCreateArgs>(args: SelectSubset<T, HederaProofCreateArgs<ExtArgs>>): Prisma__HederaProofClient<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HederaProofs.
     * @param {HederaProofCreateManyArgs} args - Arguments to create many HederaProofs.
     * @example
     * // Create many HederaProofs
     * const hederaProof = await prisma.hederaProof.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HederaProofCreateManyArgs>(args?: SelectSubset<T, HederaProofCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HederaProofs and returns the data saved in the database.
     * @param {HederaProofCreateManyAndReturnArgs} args - Arguments to create many HederaProofs.
     * @example
     * // Create many HederaProofs
     * const hederaProof = await prisma.hederaProof.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HederaProofs and only return the `id`
     * const hederaProofWithIdOnly = await prisma.hederaProof.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HederaProofCreateManyAndReturnArgs>(args?: SelectSubset<T, HederaProofCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a HederaProof.
     * @param {HederaProofDeleteArgs} args - Arguments to delete one HederaProof.
     * @example
     * // Delete one HederaProof
     * const HederaProof = await prisma.hederaProof.delete({
     *   where: {
     *     // ... filter to delete one HederaProof
     *   }
     * })
     * 
     */
    delete<T extends HederaProofDeleteArgs>(args: SelectSubset<T, HederaProofDeleteArgs<ExtArgs>>): Prisma__HederaProofClient<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HederaProof.
     * @param {HederaProofUpdateArgs} args - Arguments to update one HederaProof.
     * @example
     * // Update one HederaProof
     * const hederaProof = await prisma.hederaProof.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HederaProofUpdateArgs>(args: SelectSubset<T, HederaProofUpdateArgs<ExtArgs>>): Prisma__HederaProofClient<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HederaProofs.
     * @param {HederaProofDeleteManyArgs} args - Arguments to filter HederaProofs to delete.
     * @example
     * // Delete a few HederaProofs
     * const { count } = await prisma.hederaProof.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HederaProofDeleteManyArgs>(args?: SelectSubset<T, HederaProofDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HederaProofs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HederaProofUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HederaProofs
     * const hederaProof = await prisma.hederaProof.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HederaProofUpdateManyArgs>(args: SelectSubset<T, HederaProofUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HederaProof.
     * @param {HederaProofUpsertArgs} args - Arguments to update or create a HederaProof.
     * @example
     * // Update or create a HederaProof
     * const hederaProof = await prisma.hederaProof.upsert({
     *   create: {
     *     // ... data to create a HederaProof
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HederaProof we want to update
     *   }
     * })
     */
    upsert<T extends HederaProofUpsertArgs>(args: SelectSubset<T, HederaProofUpsertArgs<ExtArgs>>): Prisma__HederaProofClient<$Result.GetResult<Prisma.$HederaProofPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HederaProofs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HederaProofCountArgs} args - Arguments to filter HederaProofs to count.
     * @example
     * // Count the number of HederaProofs
     * const count = await prisma.hederaProof.count({
     *   where: {
     *     // ... the filter for the HederaProofs we want to count
     *   }
     * })
    **/
    count<T extends HederaProofCountArgs>(
      args?: Subset<T, HederaProofCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HederaProofCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HederaProof.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HederaProofAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends HederaProofAggregateArgs>(args: Subset<T, HederaProofAggregateArgs>): Prisma.PrismaPromise<GetHederaProofAggregateType<T>>

    /**
     * Group by HederaProof.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HederaProofGroupByArgs} args - Group by arguments.
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
      T extends HederaProofGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HederaProofGroupByArgs['orderBy'] }
        : { orderBy?: HederaProofGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, HederaProofGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHederaProofGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HederaProof model
   */
  readonly fields: HederaProofFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HederaProof.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HederaProofClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    pending_request<T extends PendingRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PendingRequestDefaultArgs<ExtArgs>>): Prisma__PendingRequestClient<$Result.GetResult<Prisma.$PendingRequestPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the HederaProof model
   */ 
  interface HederaProofFieldRefs {
    readonly id: FieldRef<"HederaProof", 'String'>
    readonly request_id: FieldRef<"HederaProof", 'String'>
    readonly summary_hash: FieldRef<"HederaProof", 'String'>
    readonly topic_message_id: FieldRef<"HederaProof", 'String'>
    readonly created_at: FieldRef<"HederaProof", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HederaProof findUnique
   */
  export type HederaProofFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    /**
     * Filter, which HederaProof to fetch.
     */
    where: HederaProofWhereUniqueInput
  }

  /**
   * HederaProof findUniqueOrThrow
   */
  export type HederaProofFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    /**
     * Filter, which HederaProof to fetch.
     */
    where: HederaProofWhereUniqueInput
  }

  /**
   * HederaProof findFirst
   */
  export type HederaProofFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    /**
     * Filter, which HederaProof to fetch.
     */
    where?: HederaProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HederaProofs to fetch.
     */
    orderBy?: HederaProofOrderByWithRelationInput | HederaProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HederaProofs.
     */
    cursor?: HederaProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HederaProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HederaProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HederaProofs.
     */
    distinct?: HederaProofScalarFieldEnum | HederaProofScalarFieldEnum[]
  }

  /**
   * HederaProof findFirstOrThrow
   */
  export type HederaProofFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    /**
     * Filter, which HederaProof to fetch.
     */
    where?: HederaProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HederaProofs to fetch.
     */
    orderBy?: HederaProofOrderByWithRelationInput | HederaProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HederaProofs.
     */
    cursor?: HederaProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HederaProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HederaProofs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HederaProofs.
     */
    distinct?: HederaProofScalarFieldEnum | HederaProofScalarFieldEnum[]
  }

  /**
   * HederaProof findMany
   */
  export type HederaProofFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    /**
     * Filter, which HederaProofs to fetch.
     */
    where?: HederaProofWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HederaProofs to fetch.
     */
    orderBy?: HederaProofOrderByWithRelationInput | HederaProofOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HederaProofs.
     */
    cursor?: HederaProofWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HederaProofs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HederaProofs.
     */
    skip?: number
    distinct?: HederaProofScalarFieldEnum | HederaProofScalarFieldEnum[]
  }

  /**
   * HederaProof create
   */
  export type HederaProofCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    /**
     * The data needed to create a HederaProof.
     */
    data: XOR<HederaProofCreateInput, HederaProofUncheckedCreateInput>
  }

  /**
   * HederaProof createMany
   */
  export type HederaProofCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HederaProofs.
     */
    data: HederaProofCreateManyInput | HederaProofCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HederaProof createManyAndReturn
   */
  export type HederaProofCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many HederaProofs.
     */
    data: HederaProofCreateManyInput | HederaProofCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HederaProof update
   */
  export type HederaProofUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    /**
     * The data needed to update a HederaProof.
     */
    data: XOR<HederaProofUpdateInput, HederaProofUncheckedUpdateInput>
    /**
     * Choose, which HederaProof to update.
     */
    where: HederaProofWhereUniqueInput
  }

  /**
   * HederaProof updateMany
   */
  export type HederaProofUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HederaProofs.
     */
    data: XOR<HederaProofUpdateManyMutationInput, HederaProofUncheckedUpdateManyInput>
    /**
     * Filter which HederaProofs to update
     */
    where?: HederaProofWhereInput
  }

  /**
   * HederaProof upsert
   */
  export type HederaProofUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    /**
     * The filter to search for the HederaProof to update in case it exists.
     */
    where: HederaProofWhereUniqueInput
    /**
     * In case the HederaProof found by the `where` argument doesn't exist, create a new HederaProof with this data.
     */
    create: XOR<HederaProofCreateInput, HederaProofUncheckedCreateInput>
    /**
     * In case the HederaProof was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HederaProofUpdateInput, HederaProofUncheckedUpdateInput>
  }

  /**
   * HederaProof delete
   */
  export type HederaProofDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
    /**
     * Filter which HederaProof to delete.
     */
    where: HederaProofWhereUniqueInput
  }

  /**
   * HederaProof deleteMany
   */
  export type HederaProofDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HederaProofs to delete
     */
    where?: HederaProofWhereInput
  }

  /**
   * HederaProof without action
   */
  export type HederaProofDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HederaProof
     */
    select?: HederaProofSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HederaProofInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    event_type: string | null
    meta_hash: string | null
    created_at: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    event_type: string | null
    meta_hash: string | null
    created_at: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    event_type: number
    meta_hash: number
    details: number
    created_at: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    event_type?: true
    meta_hash?: true
    created_at?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    event_type?: true
    meta_hash?: true
    created_at?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    event_type?: true
    meta_hash?: true
    details?: true
    created_at?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    event_type: string
    meta_hash: string
    details: JsonValue | null
    created_at: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_type?: boolean
    meta_hash?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    event_type?: boolean
    meta_hash?: boolean
    details?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    event_type?: boolean
    meta_hash?: boolean
    details?: boolean
    created_at?: boolean
  }


  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      event_type: string
      meta_hash: string
      details: Prisma.JsonValue | null
      created_at: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the AuditLog model
   */ 
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly event_type: FieldRef<"AuditLog", 'String'>
    readonly meta_hash: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'Json'>
    readonly created_at: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    citizen_ref: string | null
    bank_id: string | null
    activated_at: Date | null
    created_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    citizen_ref: string | null
    bank_id: string | null
    activated_at: Date | null
    created_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    citizen_ref: number
    bank_id: number
    activated_at: number
    metadata: number
    created_at: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    citizen_ref?: true
    bank_id?: true
    activated_at?: true
    created_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    citizen_ref?: true
    bank_id?: true
    activated_at?: true
    created_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    citizen_ref?: true
    bank_id?: true
    activated_at?: true
    metadata?: true
    created_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    citizen_ref: string | null
    bank_id: string
    activated_at: Date | null
    metadata: JsonValue | null
    created_at: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    citizen_ref?: boolean
    bank_id?: boolean
    activated_at?: boolean
    metadata?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    citizen_ref?: boolean
    bank_id?: boolean
    activated_at?: boolean
    metadata?: boolean
    created_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    citizen_ref?: boolean
    bank_id?: boolean
    activated_at?: boolean
    metadata?: boolean
    created_at?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      citizen_ref: string | null
      bank_id: string
      activated_at: Date | null
      metadata: Prisma.JsonValue | null
      created_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly citizen_ref: FieldRef<"User", 'String'>
    readonly bank_id: FieldRef<"User", 'String'>
    readonly activated_at: FieldRef<"User", 'DateTime'>
    readonly metadata: FieldRef<"User", 'Json'>
    readonly created_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    admin_id: string | null
    bank_id: string | null
    refresh_token: string | null
    is_active: boolean | null
    user_agent: string | null
    ip_address: string | null
    last_activity: Date | null
    created_at: Date | null
    ended_at: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    admin_id: string | null
    bank_id: string | null
    refresh_token: string | null
    is_active: boolean | null
    user_agent: string | null
    ip_address: string | null
    last_activity: Date | null
    created_at: Date | null
    ended_at: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    admin_id: number
    bank_id: number
    refresh_token: number
    is_active: number
    user_agent: number
    ip_address: number
    last_activity: number
    created_at: number
    ended_at: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    admin_id?: true
    bank_id?: true
    refresh_token?: true
    is_active?: true
    user_agent?: true
    ip_address?: true
    last_activity?: true
    created_at?: true
    ended_at?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    admin_id?: true
    bank_id?: true
    refresh_token?: true
    is_active?: true
    user_agent?: true
    ip_address?: true
    last_activity?: true
    created_at?: true
    ended_at?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    admin_id?: true
    bank_id?: true
    refresh_token?: true
    is_active?: true
    user_agent?: true
    ip_address?: true
    last_activity?: true
    created_at?: true
    ended_at?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    admin_id: string
    bank_id: string
    refresh_token: string | null
    is_active: boolean
    user_agent: string | null
    ip_address: string | null
    last_activity: Date
    created_at: Date
    ended_at: Date | null
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    bank_id?: boolean
    refresh_token?: boolean
    is_active?: boolean
    user_agent?: boolean
    ip_address?: boolean
    last_activity?: boolean
    created_at?: boolean
    ended_at?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    admin_id?: boolean
    bank_id?: boolean
    refresh_token?: boolean
    is_active?: boolean
    user_agent?: boolean
    ip_address?: boolean
    last_activity?: boolean
    created_at?: boolean
    ended_at?: boolean
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    admin_id?: boolean
    bank_id?: boolean
    refresh_token?: boolean
    is_active?: boolean
    user_agent?: boolean
    ip_address?: boolean
    last_activity?: boolean
    created_at?: boolean
    ended_at?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    admin?: boolean | AdminDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      admin: Prisma.$AdminPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      admin_id: string
      bank_id: string
      refresh_token: string | null
      is_active: boolean
      user_agent: string | null
      ip_address: string | null
      last_activity: Date
      created_at: Date
      ended_at: Date | null
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    admin<T extends AdminDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AdminDefaultArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly admin_id: FieldRef<"Session", 'String'>
    readonly bank_id: FieldRef<"Session", 'String'>
    readonly refresh_token: FieldRef<"Session", 'String'>
    readonly is_active: FieldRef<"Session", 'Boolean'>
    readonly user_agent: FieldRef<"Session", 'String'>
    readonly ip_address: FieldRef<"Session", 'String'>
    readonly last_activity: FieldRef<"Session", 'DateTime'>
    readonly created_at: FieldRef<"Session", 'DateTime'>
    readonly ended_at: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
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


  export const AdminScalarFieldEnum: {
    id: 'id',
    username: 'username',
    password_hash: 'password_hash',
    bank_id: 'bank_id',
    face_enrolled: 'face_enrolled',
    last_login: 'last_login',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    deleted_by: 'deleted_by'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const AdminFaceScalarFieldEnum: {
    id: 'id',
    admin_id: 'admin_id',
    enc_embedding: 'enc_embedding',
    iv: 'iv',
    tag: 'tag',
    dims: 'dims',
    embedding_hash: 'embedding_hash',
    enrolled_at: 'enrolled_at'
  };

  export type AdminFaceScalarFieldEnum = (typeof AdminFaceScalarFieldEnum)[keyof typeof AdminFaceScalarFieldEnum]


  export const PendingRequestScalarFieldEnum: {
    id: 'id',
    citizen_nni_hash: 'citizen_nni_hash',
    masked_nni: 'masked_nni',
    payload_summary: 'payload_summary',
    status: 'status',
    summary_hash: 'summary_hash',
    salt_ref: 'salt_ref',
    voting_deadline: 'voting_deadline',
    image_urls: 'image_urls',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at',
    deleted_by: 'deleted_by'
  };

  export type PendingRequestScalarFieldEnum = (typeof PendingRequestScalarFieldEnum)[keyof typeof PendingRequestScalarFieldEnum]


  export const VoteScalarFieldEnum: {
    id: 'id',
    request_id: 'request_id',
    bank_id: 'bank_id',
    admin_id: 'admin_id',
    vote: 'vote',
    reason: 'reason',
    created_at: 'created_at'
  };

  export type VoteScalarFieldEnum = (typeof VoteScalarFieldEnum)[keyof typeof VoteScalarFieldEnum]


  export const HederaProofScalarFieldEnum: {
    id: 'id',
    request_id: 'request_id',
    summary_hash: 'summary_hash',
    topic_message_id: 'topic_message_id',
    created_at: 'created_at'
  };

  export type HederaProofScalarFieldEnum = (typeof HederaProofScalarFieldEnum)[keyof typeof HederaProofScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    event_type: 'event_type',
    meta_hash: 'meta_hash',
    details: 'details',
    created_at: 'created_at'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    citizen_ref: 'citizen_ref',
    bank_id: 'bank_id',
    activated_at: 'activated_at',
    metadata: 'metadata',
    created_at: 'created_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    admin_id: 'admin_id',
    bank_id: 'bank_id',
    refresh_token: 'refresh_token',
    is_active: 'is_active',
    user_agent: 'user_agent',
    ip_address: 'ip_address',
    last_activity: 'last_activity',
    created_at: 'created_at',
    ended_at: 'ended_at'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    username?: StringFilter<"Admin"> | string
    password_hash?: StringFilter<"Admin"> | string
    bank_id?: StringFilter<"Admin"> | string
    face_enrolled?: BoolFilter<"Admin"> | boolean
    last_login?: DateTimeNullableFilter<"Admin"> | Date | string | null
    created_at?: DateTimeFilter<"Admin"> | Date | string
    updated_at?: DateTimeFilter<"Admin"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Admin"> | Date | string | null
    deleted_by?: StringNullableFilter<"Admin"> | string | null
    admin_faces?: AdminFaceListRelationFilter
    votes?: VoteListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    bank_id?: SortOrder
    face_enrolled?: SortOrder
    last_login?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    admin_faces?: AdminFaceOrderByRelationAggregateInput
    votes?: VoteOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    password_hash?: StringFilter<"Admin"> | string
    bank_id?: StringFilter<"Admin"> | string
    face_enrolled?: BoolFilter<"Admin"> | boolean
    last_login?: DateTimeNullableFilter<"Admin"> | Date | string | null
    created_at?: DateTimeFilter<"Admin"> | Date | string
    updated_at?: DateTimeFilter<"Admin"> | Date | string
    deleted_at?: DateTimeNullableFilter<"Admin"> | Date | string | null
    deleted_by?: StringNullableFilter<"Admin"> | string | null
    admin_faces?: AdminFaceListRelationFilter
    votes?: VoteListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "username">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    bank_id?: SortOrder
    face_enrolled?: SortOrder
    last_login?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    username?: StringWithAggregatesFilter<"Admin"> | string
    password_hash?: StringWithAggregatesFilter<"Admin"> | string
    bank_id?: StringWithAggregatesFilter<"Admin"> | string
    face_enrolled?: BoolWithAggregatesFilter<"Admin"> | boolean
    last_login?: DateTimeNullableWithAggregatesFilter<"Admin"> | Date | string | null
    created_at?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"Admin"> | Date | string | null
    deleted_by?: StringNullableWithAggregatesFilter<"Admin"> | string | null
  }

  export type AdminFaceWhereInput = {
    AND?: AdminFaceWhereInput | AdminFaceWhereInput[]
    OR?: AdminFaceWhereInput[]
    NOT?: AdminFaceWhereInput | AdminFaceWhereInput[]
    id?: StringFilter<"AdminFace"> | string
    admin_id?: StringFilter<"AdminFace"> | string
    enc_embedding?: StringFilter<"AdminFace"> | string
    iv?: StringFilter<"AdminFace"> | string
    tag?: StringFilter<"AdminFace"> | string
    dims?: IntFilter<"AdminFace"> | number
    embedding_hash?: StringNullableFilter<"AdminFace"> | string | null
    enrolled_at?: DateTimeFilter<"AdminFace"> | Date | string
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
  }

  export type AdminFaceOrderByWithRelationInput = {
    id?: SortOrder
    admin_id?: SortOrder
    enc_embedding?: SortOrder
    iv?: SortOrder
    tag?: SortOrder
    dims?: SortOrder
    embedding_hash?: SortOrderInput | SortOrder
    enrolled_at?: SortOrder
    admin?: AdminOrderByWithRelationInput
  }

  export type AdminFaceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AdminFaceWhereInput | AdminFaceWhereInput[]
    OR?: AdminFaceWhereInput[]
    NOT?: AdminFaceWhereInput | AdminFaceWhereInput[]
    admin_id?: StringFilter<"AdminFace"> | string
    enc_embedding?: StringFilter<"AdminFace"> | string
    iv?: StringFilter<"AdminFace"> | string
    tag?: StringFilter<"AdminFace"> | string
    dims?: IntFilter<"AdminFace"> | number
    embedding_hash?: StringNullableFilter<"AdminFace"> | string | null
    enrolled_at?: DateTimeFilter<"AdminFace"> | Date | string
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
  }, "id">

  export type AdminFaceOrderByWithAggregationInput = {
    id?: SortOrder
    admin_id?: SortOrder
    enc_embedding?: SortOrder
    iv?: SortOrder
    tag?: SortOrder
    dims?: SortOrder
    embedding_hash?: SortOrderInput | SortOrder
    enrolled_at?: SortOrder
    _count?: AdminFaceCountOrderByAggregateInput
    _avg?: AdminFaceAvgOrderByAggregateInput
    _max?: AdminFaceMaxOrderByAggregateInput
    _min?: AdminFaceMinOrderByAggregateInput
    _sum?: AdminFaceSumOrderByAggregateInput
  }

  export type AdminFaceScalarWhereWithAggregatesInput = {
    AND?: AdminFaceScalarWhereWithAggregatesInput | AdminFaceScalarWhereWithAggregatesInput[]
    OR?: AdminFaceScalarWhereWithAggregatesInput[]
    NOT?: AdminFaceScalarWhereWithAggregatesInput | AdminFaceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminFace"> | string
    admin_id?: StringWithAggregatesFilter<"AdminFace"> | string
    enc_embedding?: StringWithAggregatesFilter<"AdminFace"> | string
    iv?: StringWithAggregatesFilter<"AdminFace"> | string
    tag?: StringWithAggregatesFilter<"AdminFace"> | string
    dims?: IntWithAggregatesFilter<"AdminFace"> | number
    embedding_hash?: StringNullableWithAggregatesFilter<"AdminFace"> | string | null
    enrolled_at?: DateTimeWithAggregatesFilter<"AdminFace"> | Date | string
  }

  export type PendingRequestWhereInput = {
    AND?: PendingRequestWhereInput | PendingRequestWhereInput[]
    OR?: PendingRequestWhereInput[]
    NOT?: PendingRequestWhereInput | PendingRequestWhereInput[]
    id?: StringFilter<"PendingRequest"> | string
    citizen_nni_hash?: StringFilter<"PendingRequest"> | string
    masked_nni?: StringFilter<"PendingRequest"> | string
    payload_summary?: JsonFilter<"PendingRequest">
    status?: StringFilter<"PendingRequest"> | string
    summary_hash?: StringNullableFilter<"PendingRequest"> | string | null
    salt_ref?: StringNullableFilter<"PendingRequest"> | string | null
    voting_deadline?: DateTimeFilter<"PendingRequest"> | Date | string
    image_urls?: JsonNullableFilter<"PendingRequest">
    created_at?: DateTimeFilter<"PendingRequest"> | Date | string
    updated_at?: DateTimeFilter<"PendingRequest"> | Date | string
    deleted_at?: DateTimeNullableFilter<"PendingRequest"> | Date | string | null
    deleted_by?: StringNullableFilter<"PendingRequest"> | string | null
    votes?: VoteListRelationFilter
    hedera_proofs?: HederaProofListRelationFilter
  }

  export type PendingRequestOrderByWithRelationInput = {
    id?: SortOrder
    citizen_nni_hash?: SortOrder
    masked_nni?: SortOrder
    payload_summary?: SortOrder
    status?: SortOrder
    summary_hash?: SortOrderInput | SortOrder
    salt_ref?: SortOrderInput | SortOrder
    voting_deadline?: SortOrder
    image_urls?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    votes?: VoteOrderByRelationAggregateInput
    hedera_proofs?: HederaProofOrderByRelationAggregateInput
  }

  export type PendingRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PendingRequestWhereInput | PendingRequestWhereInput[]
    OR?: PendingRequestWhereInput[]
    NOT?: PendingRequestWhereInput | PendingRequestWhereInput[]
    citizen_nni_hash?: StringFilter<"PendingRequest"> | string
    masked_nni?: StringFilter<"PendingRequest"> | string
    payload_summary?: JsonFilter<"PendingRequest">
    status?: StringFilter<"PendingRequest"> | string
    summary_hash?: StringNullableFilter<"PendingRequest"> | string | null
    salt_ref?: StringNullableFilter<"PendingRequest"> | string | null
    voting_deadline?: DateTimeFilter<"PendingRequest"> | Date | string
    image_urls?: JsonNullableFilter<"PendingRequest">
    created_at?: DateTimeFilter<"PendingRequest"> | Date | string
    updated_at?: DateTimeFilter<"PendingRequest"> | Date | string
    deleted_at?: DateTimeNullableFilter<"PendingRequest"> | Date | string | null
    deleted_by?: StringNullableFilter<"PendingRequest"> | string | null
    votes?: VoteListRelationFilter
    hedera_proofs?: HederaProofListRelationFilter
  }, "id">

  export type PendingRequestOrderByWithAggregationInput = {
    id?: SortOrder
    citizen_nni_hash?: SortOrder
    masked_nni?: SortOrder
    payload_summary?: SortOrder
    status?: SortOrder
    summary_hash?: SortOrderInput | SortOrder
    salt_ref?: SortOrderInput | SortOrder
    voting_deadline?: SortOrder
    image_urls?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrderInput | SortOrder
    deleted_by?: SortOrderInput | SortOrder
    _count?: PendingRequestCountOrderByAggregateInput
    _max?: PendingRequestMaxOrderByAggregateInput
    _min?: PendingRequestMinOrderByAggregateInput
  }

  export type PendingRequestScalarWhereWithAggregatesInput = {
    AND?: PendingRequestScalarWhereWithAggregatesInput | PendingRequestScalarWhereWithAggregatesInput[]
    OR?: PendingRequestScalarWhereWithAggregatesInput[]
    NOT?: PendingRequestScalarWhereWithAggregatesInput | PendingRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PendingRequest"> | string
    citizen_nni_hash?: StringWithAggregatesFilter<"PendingRequest"> | string
    masked_nni?: StringWithAggregatesFilter<"PendingRequest"> | string
    payload_summary?: JsonWithAggregatesFilter<"PendingRequest">
    status?: StringWithAggregatesFilter<"PendingRequest"> | string
    summary_hash?: StringNullableWithAggregatesFilter<"PendingRequest"> | string | null
    salt_ref?: StringNullableWithAggregatesFilter<"PendingRequest"> | string | null
    voting_deadline?: DateTimeWithAggregatesFilter<"PendingRequest"> | Date | string
    image_urls?: JsonNullableWithAggregatesFilter<"PendingRequest">
    created_at?: DateTimeWithAggregatesFilter<"PendingRequest"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"PendingRequest"> | Date | string
    deleted_at?: DateTimeNullableWithAggregatesFilter<"PendingRequest"> | Date | string | null
    deleted_by?: StringNullableWithAggregatesFilter<"PendingRequest"> | string | null
  }

  export type VoteWhereInput = {
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    id?: StringFilter<"Vote"> | string
    request_id?: StringFilter<"Vote"> | string
    bank_id?: StringFilter<"Vote"> | string
    admin_id?: StringFilter<"Vote"> | string
    vote?: StringFilter<"Vote"> | string
    reason?: StringNullableFilter<"Vote"> | string | null
    created_at?: DateTimeFilter<"Vote"> | Date | string
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
    pending_request?: XOR<PendingRequestRelationFilter, PendingRequestWhereInput>
  }

  export type VoteOrderByWithRelationInput = {
    id?: SortOrder
    request_id?: SortOrder
    bank_id?: SortOrder
    admin_id?: SortOrder
    vote?: SortOrder
    reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    admin?: AdminOrderByWithRelationInput
    pending_request?: PendingRequestOrderByWithRelationInput
  }

  export type VoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    request_id_bank_id_admin_id?: VoteRequest_idBank_idAdmin_idCompoundUniqueInput
    AND?: VoteWhereInput | VoteWhereInput[]
    OR?: VoteWhereInput[]
    NOT?: VoteWhereInput | VoteWhereInput[]
    request_id?: StringFilter<"Vote"> | string
    bank_id?: StringFilter<"Vote"> | string
    admin_id?: StringFilter<"Vote"> | string
    vote?: StringFilter<"Vote"> | string
    reason?: StringNullableFilter<"Vote"> | string | null
    created_at?: DateTimeFilter<"Vote"> | Date | string
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
    pending_request?: XOR<PendingRequestRelationFilter, PendingRequestWhereInput>
  }, "id" | "request_id_bank_id_admin_id">

  export type VoteOrderByWithAggregationInput = {
    id?: SortOrder
    request_id?: SortOrder
    bank_id?: SortOrder
    admin_id?: SortOrder
    vote?: SortOrder
    reason?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: VoteCountOrderByAggregateInput
    _max?: VoteMaxOrderByAggregateInput
    _min?: VoteMinOrderByAggregateInput
  }

  export type VoteScalarWhereWithAggregatesInput = {
    AND?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    OR?: VoteScalarWhereWithAggregatesInput[]
    NOT?: VoteScalarWhereWithAggregatesInput | VoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vote"> | string
    request_id?: StringWithAggregatesFilter<"Vote"> | string
    bank_id?: StringWithAggregatesFilter<"Vote"> | string
    admin_id?: StringWithAggregatesFilter<"Vote"> | string
    vote?: StringWithAggregatesFilter<"Vote"> | string
    reason?: StringNullableWithAggregatesFilter<"Vote"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"Vote"> | Date | string
  }

  export type HederaProofWhereInput = {
    AND?: HederaProofWhereInput | HederaProofWhereInput[]
    OR?: HederaProofWhereInput[]
    NOT?: HederaProofWhereInput | HederaProofWhereInput[]
    id?: StringFilter<"HederaProof"> | string
    request_id?: StringFilter<"HederaProof"> | string
    summary_hash?: StringFilter<"HederaProof"> | string
    topic_message_id?: StringFilter<"HederaProof"> | string
    created_at?: DateTimeFilter<"HederaProof"> | Date | string
    pending_request?: XOR<PendingRequestRelationFilter, PendingRequestWhereInput>
  }

  export type HederaProofOrderByWithRelationInput = {
    id?: SortOrder
    request_id?: SortOrder
    summary_hash?: SortOrder
    topic_message_id?: SortOrder
    created_at?: SortOrder
    pending_request?: PendingRequestOrderByWithRelationInput
  }

  export type HederaProofWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    request_id?: string
    AND?: HederaProofWhereInput | HederaProofWhereInput[]
    OR?: HederaProofWhereInput[]
    NOT?: HederaProofWhereInput | HederaProofWhereInput[]
    summary_hash?: StringFilter<"HederaProof"> | string
    topic_message_id?: StringFilter<"HederaProof"> | string
    created_at?: DateTimeFilter<"HederaProof"> | Date | string
    pending_request?: XOR<PendingRequestRelationFilter, PendingRequestWhereInput>
  }, "id" | "request_id">

  export type HederaProofOrderByWithAggregationInput = {
    id?: SortOrder
    request_id?: SortOrder
    summary_hash?: SortOrder
    topic_message_id?: SortOrder
    created_at?: SortOrder
    _count?: HederaProofCountOrderByAggregateInput
    _max?: HederaProofMaxOrderByAggregateInput
    _min?: HederaProofMinOrderByAggregateInput
  }

  export type HederaProofScalarWhereWithAggregatesInput = {
    AND?: HederaProofScalarWhereWithAggregatesInput | HederaProofScalarWhereWithAggregatesInput[]
    OR?: HederaProofScalarWhereWithAggregatesInput[]
    NOT?: HederaProofScalarWhereWithAggregatesInput | HederaProofScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HederaProof"> | string
    request_id?: StringWithAggregatesFilter<"HederaProof"> | string
    summary_hash?: StringWithAggregatesFilter<"HederaProof"> | string
    topic_message_id?: StringWithAggregatesFilter<"HederaProof"> | string
    created_at?: DateTimeWithAggregatesFilter<"HederaProof"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    event_type?: StringFilter<"AuditLog"> | string
    meta_hash?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    event_type?: SortOrder
    meta_hash?: SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    event_type?: StringFilter<"AuditLog"> | string
    meta_hash?: StringFilter<"AuditLog"> | string
    details?: JsonNullableFilter<"AuditLog">
    created_at?: DateTimeFilter<"AuditLog"> | Date | string
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    event_type?: SortOrder
    meta_hash?: SortOrder
    details?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    event_type?: StringWithAggregatesFilter<"AuditLog"> | string
    meta_hash?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: JsonNullableWithAggregatesFilter<"AuditLog">
    created_at?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    citizen_ref?: StringNullableFilter<"User"> | string | null
    bank_id?: StringFilter<"User"> | string
    activated_at?: DateTimeNullableFilter<"User"> | Date | string | null
    metadata?: JsonNullableFilter<"User">
    created_at?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    citizen_ref?: SortOrderInput | SortOrder
    bank_id?: SortOrder
    activated_at?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    citizen_ref?: StringNullableFilter<"User"> | string | null
    bank_id?: StringFilter<"User"> | string
    activated_at?: DateTimeNullableFilter<"User"> | Date | string | null
    metadata?: JsonNullableFilter<"User">
    created_at?: DateTimeFilter<"User"> | Date | string
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    citizen_ref?: SortOrderInput | SortOrder
    bank_id?: SortOrder
    activated_at?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    citizen_ref?: StringNullableWithAggregatesFilter<"User"> | string | null
    bank_id?: StringWithAggregatesFilter<"User"> | string
    activated_at?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    metadata?: JsonNullableWithAggregatesFilter<"User">
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    admin_id?: StringFilter<"Session"> | string
    bank_id?: StringFilter<"Session"> | string
    refresh_token?: StringNullableFilter<"Session"> | string | null
    is_active?: BoolFilter<"Session"> | boolean
    user_agent?: StringNullableFilter<"Session"> | string | null
    ip_address?: StringNullableFilter<"Session"> | string | null
    last_activity?: DateTimeFilter<"Session"> | Date | string
    created_at?: DateTimeFilter<"Session"> | Date | string
    ended_at?: DateTimeNullableFilter<"Session"> | Date | string | null
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    admin_id?: SortOrder
    bank_id?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    is_active?: SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    last_activity?: SortOrder
    created_at?: SortOrder
    ended_at?: SortOrderInput | SortOrder
    admin?: AdminOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    admin_id?: StringFilter<"Session"> | string
    bank_id?: StringFilter<"Session"> | string
    refresh_token?: StringNullableFilter<"Session"> | string | null
    is_active?: BoolFilter<"Session"> | boolean
    user_agent?: StringNullableFilter<"Session"> | string | null
    ip_address?: StringNullableFilter<"Session"> | string | null
    last_activity?: DateTimeFilter<"Session"> | Date | string
    created_at?: DateTimeFilter<"Session"> | Date | string
    ended_at?: DateTimeNullableFilter<"Session"> | Date | string | null
    admin?: XOR<AdminRelationFilter, AdminWhereInput>
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    admin_id?: SortOrder
    bank_id?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    is_active?: SortOrder
    user_agent?: SortOrderInput | SortOrder
    ip_address?: SortOrderInput | SortOrder
    last_activity?: SortOrder
    created_at?: SortOrder
    ended_at?: SortOrderInput | SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    admin_id?: StringWithAggregatesFilter<"Session"> | string
    bank_id?: StringWithAggregatesFilter<"Session"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Session"> | string | null
    is_active?: BoolWithAggregatesFilter<"Session"> | boolean
    user_agent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    ip_address?: StringNullableWithAggregatesFilter<"Session"> | string | null
    last_activity?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ended_at?: DateTimeNullableWithAggregatesFilter<"Session"> | Date | string | null
  }

  export type AdminCreateInput = {
    id?: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    admin_faces?: AdminFaceCreateNestedManyWithoutAdminInput
    votes?: VoteCreateNestedManyWithoutAdminInput
    sessions?: SessionCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    admin_faces?: AdminFaceUncheckedCreateNestedManyWithoutAdminInput
    votes?: VoteUncheckedCreateNestedManyWithoutAdminInput
    sessions?: SessionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    admin_faces?: AdminFaceUpdateManyWithoutAdminNestedInput
    votes?: VoteUpdateManyWithoutAdminNestedInput
    sessions?: SessionUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    admin_faces?: AdminFaceUncheckedUpdateManyWithoutAdminNestedInput
    votes?: VoteUncheckedUpdateManyWithoutAdminNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type AdminCreateManyInput = {
    id?: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AdminFaceCreateInput = {
    id?: string
    enc_embedding: string
    iv: string
    tag: string
    dims: number
    embedding_hash?: string | null
    enrolled_at?: Date | string
    admin: AdminCreateNestedOneWithoutAdmin_facesInput
  }

  export type AdminFaceUncheckedCreateInput = {
    id?: string
    admin_id: string
    enc_embedding: string
    iv: string
    tag: string
    dims: number
    embedding_hash?: string | null
    enrolled_at?: Date | string
  }

  export type AdminFaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    enc_embedding?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    dims?: IntFieldUpdateOperationsInput | number
    embedding_hash?: NullableStringFieldUpdateOperationsInput | string | null
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUpdateOneRequiredWithoutAdmin_facesNestedInput
  }

  export type AdminFaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    enc_embedding?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    dims?: IntFieldUpdateOperationsInput | number
    embedding_hash?: NullableStringFieldUpdateOperationsInput | string | null
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminFaceCreateManyInput = {
    id?: string
    admin_id: string
    enc_embedding: string
    iv: string
    tag: string
    dims: number
    embedding_hash?: string | null
    enrolled_at?: Date | string
  }

  export type AdminFaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    enc_embedding?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    dims?: IntFieldUpdateOperationsInput | number
    embedding_hash?: NullableStringFieldUpdateOperationsInput | string | null
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminFaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    enc_embedding?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    dims?: IntFieldUpdateOperationsInput | number
    embedding_hash?: NullableStringFieldUpdateOperationsInput | string | null
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PendingRequestCreateInput = {
    id?: string
    citizen_nni_hash: string
    masked_nni: string
    payload_summary: JsonNullValueInput | InputJsonValue
    status?: string
    summary_hash?: string | null
    salt_ref?: string | null
    voting_deadline: Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    votes?: VoteCreateNestedManyWithoutPending_requestInput
    hedera_proofs?: HederaProofCreateNestedManyWithoutPending_requestInput
  }

  export type PendingRequestUncheckedCreateInput = {
    id?: string
    citizen_nni_hash: string
    masked_nni: string
    payload_summary: JsonNullValueInput | InputJsonValue
    status?: string
    summary_hash?: string | null
    salt_ref?: string | null
    voting_deadline: Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    votes?: VoteUncheckedCreateNestedManyWithoutPending_requestInput
    hedera_proofs?: HederaProofUncheckedCreateNestedManyWithoutPending_requestInput
  }

  export type PendingRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_nni_hash?: StringFieldUpdateOperationsInput | string
    masked_nni?: StringFieldUpdateOperationsInput | string
    payload_summary?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    summary_hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt_ref?: NullableStringFieldUpdateOperationsInput | string | null
    voting_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    votes?: VoteUpdateManyWithoutPending_requestNestedInput
    hedera_proofs?: HederaProofUpdateManyWithoutPending_requestNestedInput
  }

  export type PendingRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_nni_hash?: StringFieldUpdateOperationsInput | string
    masked_nni?: StringFieldUpdateOperationsInput | string
    payload_summary?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    summary_hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt_ref?: NullableStringFieldUpdateOperationsInput | string | null
    voting_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    votes?: VoteUncheckedUpdateManyWithoutPending_requestNestedInput
    hedera_proofs?: HederaProofUncheckedUpdateManyWithoutPending_requestNestedInput
  }

  export type PendingRequestCreateManyInput = {
    id?: string
    citizen_nni_hash: string
    masked_nni: string
    payload_summary: JsonNullValueInput | InputJsonValue
    status?: string
    summary_hash?: string | null
    salt_ref?: string | null
    voting_deadline: Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
  }

  export type PendingRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_nni_hash?: StringFieldUpdateOperationsInput | string
    masked_nni?: StringFieldUpdateOperationsInput | string
    payload_summary?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    summary_hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt_ref?: NullableStringFieldUpdateOperationsInput | string | null
    voting_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PendingRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_nni_hash?: StringFieldUpdateOperationsInput | string
    masked_nni?: StringFieldUpdateOperationsInput | string
    payload_summary?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    summary_hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt_ref?: NullableStringFieldUpdateOperationsInput | string | null
    voting_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VoteCreateInput = {
    id?: string
    bank_id: string
    vote: string
    reason?: string | null
    created_at?: Date | string
    admin: AdminCreateNestedOneWithoutVotesInput
    pending_request: PendingRequestCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateInput = {
    id?: string
    request_id: string
    bank_id: string
    admin_id: string
    vote: string
    reason?: string | null
    created_at?: Date | string
  }

  export type VoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUpdateOneRequiredWithoutVotesNestedInput
    pending_request?: PendingRequestUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteCreateManyInput = {
    id?: string
    request_id: string
    bank_id: string
    admin_id: string
    vote: string
    reason?: string | null
    created_at?: Date | string
  }

  export type VoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HederaProofCreateInput = {
    id?: string
    summary_hash: string
    topic_message_id: string
    created_at?: Date | string
    pending_request: PendingRequestCreateNestedOneWithoutHedera_proofsInput
  }

  export type HederaProofUncheckedCreateInput = {
    id?: string
    request_id: string
    summary_hash: string
    topic_message_id: string
    created_at?: Date | string
  }

  export type HederaProofUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary_hash?: StringFieldUpdateOperationsInput | string
    topic_message_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    pending_request?: PendingRequestUpdateOneRequiredWithoutHedera_proofsNestedInput
  }

  export type HederaProofUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: StringFieldUpdateOperationsInput | string
    summary_hash?: StringFieldUpdateOperationsInput | string
    topic_message_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HederaProofCreateManyInput = {
    id?: string
    request_id: string
    summary_hash: string
    topic_message_id: string
    created_at?: Date | string
  }

  export type HederaProofUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary_hash?: StringFieldUpdateOperationsInput | string
    topic_message_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HederaProofUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: StringFieldUpdateOperationsInput | string
    summary_hash?: StringFieldUpdateOperationsInput | string
    topic_message_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    event_type: string
    meta_hash: string
    details?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    event_type: string
    meta_hash: string
    details?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    meta_hash?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    meta_hash?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    event_type: string
    meta_hash: string
    details?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    meta_hash?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    meta_hash?: StringFieldUpdateOperationsInput | string
    details?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    citizen_ref?: string | null
    bank_id: string
    activated_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    citizen_ref?: string | null
    bank_id: string
    activated_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_ref?: NullableStringFieldUpdateOperationsInput | string | null
    bank_id?: StringFieldUpdateOperationsInput | string
    activated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_ref?: NullableStringFieldUpdateOperationsInput | string | null
    bank_id?: StringFieldUpdateOperationsInput | string
    activated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    citizen_ref?: string | null
    bank_id: string
    activated_at?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_ref?: NullableStringFieldUpdateOperationsInput | string | null
    bank_id?: StringFieldUpdateOperationsInput | string
    activated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_ref?: NullableStringFieldUpdateOperationsInput | string | null
    bank_id?: StringFieldUpdateOperationsInput | string
    activated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    bank_id: string
    refresh_token?: string | null
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    last_activity?: Date | string
    created_at?: Date | string
    ended_at?: Date | string | null
    admin: AdminCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    admin_id: string
    bank_id: string
    refresh_token?: string | null
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    last_activity?: Date | string
    created_at?: Date | string
    ended_at?: Date | string | null
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    admin?: AdminUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionCreateManyInput = {
    id?: string
    admin_id: string
    bank_id: string
    refresh_token?: string | null
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    last_activity?: Date | string
    created_at?: Date | string
    ended_at?: Date | string | null
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type AdminFaceListRelationFilter = {
    every?: AdminFaceWhereInput
    some?: AdminFaceWhereInput
    none?: AdminFaceWhereInput
  }

  export type VoteListRelationFilter = {
    every?: VoteWhereInput
    some?: VoteWhereInput
    none?: VoteWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AdminFaceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    bank_id?: SortOrder
    face_enrolled?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    bank_id?: SortOrder
    face_enrolled?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    password_hash?: SortOrder
    bank_id?: SortOrder
    face_enrolled?: SortOrder
    last_login?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type AdminRelationFilter = {
    is?: AdminWhereInput
    isNot?: AdminWhereInput
  }

  export type AdminFaceCountOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    enc_embedding?: SortOrder
    iv?: SortOrder
    tag?: SortOrder
    dims?: SortOrder
    embedding_hash?: SortOrder
    enrolled_at?: SortOrder
  }

  export type AdminFaceAvgOrderByAggregateInput = {
    dims?: SortOrder
  }

  export type AdminFaceMaxOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    enc_embedding?: SortOrder
    iv?: SortOrder
    tag?: SortOrder
    dims?: SortOrder
    embedding_hash?: SortOrder
    enrolled_at?: SortOrder
  }

  export type AdminFaceMinOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    enc_embedding?: SortOrder
    iv?: SortOrder
    tag?: SortOrder
    dims?: SortOrder
    embedding_hash?: SortOrder
    enrolled_at?: SortOrder
  }

  export type AdminFaceSumOrderByAggregateInput = {
    dims?: SortOrder
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
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
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

  export type HederaProofListRelationFilter = {
    every?: HederaProofWhereInput
    some?: HederaProofWhereInput
    none?: HederaProofWhereInput
  }

  export type HederaProofOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PendingRequestCountOrderByAggregateInput = {
    id?: SortOrder
    citizen_nni_hash?: SortOrder
    masked_nni?: SortOrder
    payload_summary?: SortOrder
    status?: SortOrder
    summary_hash?: SortOrder
    salt_ref?: SortOrder
    voting_deadline?: SortOrder
    image_urls?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
  }

  export type PendingRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    citizen_nni_hash?: SortOrder
    masked_nni?: SortOrder
    status?: SortOrder
    summary_hash?: SortOrder
    salt_ref?: SortOrder
    voting_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
  }

  export type PendingRequestMinOrderByAggregateInput = {
    id?: SortOrder
    citizen_nni_hash?: SortOrder
    masked_nni?: SortOrder
    status?: SortOrder
    summary_hash?: SortOrder
    salt_ref?: SortOrder
    voting_deadline?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    deleted_by?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
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
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
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

  export type PendingRequestRelationFilter = {
    is?: PendingRequestWhereInput
    isNot?: PendingRequestWhereInput
  }

  export type VoteRequest_idBank_idAdmin_idCompoundUniqueInput = {
    request_id: string
    bank_id: string
    admin_id: string
  }

  export type VoteCountOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    bank_id?: SortOrder
    admin_id?: SortOrder
    vote?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
  }

  export type VoteMaxOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    bank_id?: SortOrder
    admin_id?: SortOrder
    vote?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
  }

  export type VoteMinOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    bank_id?: SortOrder
    admin_id?: SortOrder
    vote?: SortOrder
    reason?: SortOrder
    created_at?: SortOrder
  }

  export type HederaProofCountOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    summary_hash?: SortOrder
    topic_message_id?: SortOrder
    created_at?: SortOrder
  }

  export type HederaProofMaxOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    summary_hash?: SortOrder
    topic_message_id?: SortOrder
    created_at?: SortOrder
  }

  export type HederaProofMinOrderByAggregateInput = {
    id?: SortOrder
    request_id?: SortOrder
    summary_hash?: SortOrder
    topic_message_id?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    event_type?: SortOrder
    meta_hash?: SortOrder
    details?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    event_type?: SortOrder
    meta_hash?: SortOrder
    created_at?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    event_type?: SortOrder
    meta_hash?: SortOrder
    created_at?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    citizen_ref?: SortOrder
    bank_id?: SortOrder
    activated_at?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    citizen_ref?: SortOrder
    bank_id?: SortOrder
    activated_at?: SortOrder
    created_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    citizen_ref?: SortOrder
    bank_id?: SortOrder
    activated_at?: SortOrder
    created_at?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    bank_id?: SortOrder
    refresh_token?: SortOrder
    is_active?: SortOrder
    user_agent?: SortOrder
    ip_address?: SortOrder
    last_activity?: SortOrder
    created_at?: SortOrder
    ended_at?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    bank_id?: SortOrder
    refresh_token?: SortOrder
    is_active?: SortOrder
    user_agent?: SortOrder
    ip_address?: SortOrder
    last_activity?: SortOrder
    created_at?: SortOrder
    ended_at?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    admin_id?: SortOrder
    bank_id?: SortOrder
    refresh_token?: SortOrder
    is_active?: SortOrder
    user_agent?: SortOrder
    ip_address?: SortOrder
    last_activity?: SortOrder
    created_at?: SortOrder
    ended_at?: SortOrder
  }

  export type AdminFaceCreateNestedManyWithoutAdminInput = {
    create?: XOR<AdminFaceCreateWithoutAdminInput, AdminFaceUncheckedCreateWithoutAdminInput> | AdminFaceCreateWithoutAdminInput[] | AdminFaceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AdminFaceCreateOrConnectWithoutAdminInput | AdminFaceCreateOrConnectWithoutAdminInput[]
    createMany?: AdminFaceCreateManyAdminInputEnvelope
    connect?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
  }

  export type VoteCreateNestedManyWithoutAdminInput = {
    create?: XOR<VoteCreateWithoutAdminInput, VoteUncheckedCreateWithoutAdminInput> | VoteCreateWithoutAdminInput[] | VoteUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutAdminInput | VoteCreateOrConnectWithoutAdminInput[]
    createMany?: VoteCreateManyAdminInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutAdminInput = {
    create?: XOR<SessionCreateWithoutAdminInput, SessionUncheckedCreateWithoutAdminInput> | SessionCreateWithoutAdminInput[] | SessionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutAdminInput | SessionCreateOrConnectWithoutAdminInput[]
    createMany?: SessionCreateManyAdminInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AdminFaceUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<AdminFaceCreateWithoutAdminInput, AdminFaceUncheckedCreateWithoutAdminInput> | AdminFaceCreateWithoutAdminInput[] | AdminFaceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AdminFaceCreateOrConnectWithoutAdminInput | AdminFaceCreateOrConnectWithoutAdminInput[]
    createMany?: AdminFaceCreateManyAdminInputEnvelope
    connect?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<VoteCreateWithoutAdminInput, VoteUncheckedCreateWithoutAdminInput> | VoteCreateWithoutAdminInput[] | VoteUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutAdminInput | VoteCreateOrConnectWithoutAdminInput[]
    createMany?: VoteCreateManyAdminInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<SessionCreateWithoutAdminInput, SessionUncheckedCreateWithoutAdminInput> | SessionCreateWithoutAdminInput[] | SessionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutAdminInput | SessionCreateOrConnectWithoutAdminInput[]
    createMany?: SessionCreateManyAdminInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AdminFaceUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AdminFaceCreateWithoutAdminInput, AdminFaceUncheckedCreateWithoutAdminInput> | AdminFaceCreateWithoutAdminInput[] | AdminFaceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AdminFaceCreateOrConnectWithoutAdminInput | AdminFaceCreateOrConnectWithoutAdminInput[]
    upsert?: AdminFaceUpsertWithWhereUniqueWithoutAdminInput | AdminFaceUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AdminFaceCreateManyAdminInputEnvelope
    set?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
    disconnect?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
    delete?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
    connect?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
    update?: AdminFaceUpdateWithWhereUniqueWithoutAdminInput | AdminFaceUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AdminFaceUpdateManyWithWhereWithoutAdminInput | AdminFaceUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AdminFaceScalarWhereInput | AdminFaceScalarWhereInput[]
  }

  export type VoteUpdateManyWithoutAdminNestedInput = {
    create?: XOR<VoteCreateWithoutAdminInput, VoteUncheckedCreateWithoutAdminInput> | VoteCreateWithoutAdminInput[] | VoteUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutAdminInput | VoteCreateOrConnectWithoutAdminInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutAdminInput | VoteUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: VoteCreateManyAdminInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutAdminInput | VoteUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutAdminInput | VoteUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutAdminNestedInput = {
    create?: XOR<SessionCreateWithoutAdminInput, SessionUncheckedCreateWithoutAdminInput> | SessionCreateWithoutAdminInput[] | SessionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutAdminInput | SessionCreateOrConnectWithoutAdminInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutAdminInput | SessionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: SessionCreateManyAdminInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutAdminInput | SessionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutAdminInput | SessionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AdminFaceUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<AdminFaceCreateWithoutAdminInput, AdminFaceUncheckedCreateWithoutAdminInput> | AdminFaceCreateWithoutAdminInput[] | AdminFaceUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: AdminFaceCreateOrConnectWithoutAdminInput | AdminFaceCreateOrConnectWithoutAdminInput[]
    upsert?: AdminFaceUpsertWithWhereUniqueWithoutAdminInput | AdminFaceUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: AdminFaceCreateManyAdminInputEnvelope
    set?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
    disconnect?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
    delete?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
    connect?: AdminFaceWhereUniqueInput | AdminFaceWhereUniqueInput[]
    update?: AdminFaceUpdateWithWhereUniqueWithoutAdminInput | AdminFaceUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: AdminFaceUpdateManyWithWhereWithoutAdminInput | AdminFaceUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: AdminFaceScalarWhereInput | AdminFaceScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<VoteCreateWithoutAdminInput, VoteUncheckedCreateWithoutAdminInput> | VoteCreateWithoutAdminInput[] | VoteUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutAdminInput | VoteCreateOrConnectWithoutAdminInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutAdminInput | VoteUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: VoteCreateManyAdminInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutAdminInput | VoteUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutAdminInput | VoteUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<SessionCreateWithoutAdminInput, SessionUncheckedCreateWithoutAdminInput> | SessionCreateWithoutAdminInput[] | SessionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutAdminInput | SessionCreateOrConnectWithoutAdminInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutAdminInput | SessionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: SessionCreateManyAdminInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutAdminInput | SessionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutAdminInput | SessionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AdminCreateNestedOneWithoutAdmin_facesInput = {
    create?: XOR<AdminCreateWithoutAdmin_facesInput, AdminUncheckedCreateWithoutAdmin_facesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutAdmin_facesInput
    connect?: AdminWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AdminUpdateOneRequiredWithoutAdmin_facesNestedInput = {
    create?: XOR<AdminCreateWithoutAdmin_facesInput, AdminUncheckedCreateWithoutAdmin_facesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutAdmin_facesInput
    upsert?: AdminUpsertWithoutAdmin_facesInput
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutAdmin_facesInput, AdminUpdateWithoutAdmin_facesInput>, AdminUncheckedUpdateWithoutAdmin_facesInput>
  }

  export type VoteCreateNestedManyWithoutPending_requestInput = {
    create?: XOR<VoteCreateWithoutPending_requestInput, VoteUncheckedCreateWithoutPending_requestInput> | VoteCreateWithoutPending_requestInput[] | VoteUncheckedCreateWithoutPending_requestInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutPending_requestInput | VoteCreateOrConnectWithoutPending_requestInput[]
    createMany?: VoteCreateManyPending_requestInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type HederaProofCreateNestedManyWithoutPending_requestInput = {
    create?: XOR<HederaProofCreateWithoutPending_requestInput, HederaProofUncheckedCreateWithoutPending_requestInput> | HederaProofCreateWithoutPending_requestInput[] | HederaProofUncheckedCreateWithoutPending_requestInput[]
    connectOrCreate?: HederaProofCreateOrConnectWithoutPending_requestInput | HederaProofCreateOrConnectWithoutPending_requestInput[]
    createMany?: HederaProofCreateManyPending_requestInputEnvelope
    connect?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
  }

  export type VoteUncheckedCreateNestedManyWithoutPending_requestInput = {
    create?: XOR<VoteCreateWithoutPending_requestInput, VoteUncheckedCreateWithoutPending_requestInput> | VoteCreateWithoutPending_requestInput[] | VoteUncheckedCreateWithoutPending_requestInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutPending_requestInput | VoteCreateOrConnectWithoutPending_requestInput[]
    createMany?: VoteCreateManyPending_requestInputEnvelope
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
  }

  export type HederaProofUncheckedCreateNestedManyWithoutPending_requestInput = {
    create?: XOR<HederaProofCreateWithoutPending_requestInput, HederaProofUncheckedCreateWithoutPending_requestInput> | HederaProofCreateWithoutPending_requestInput[] | HederaProofUncheckedCreateWithoutPending_requestInput[]
    connectOrCreate?: HederaProofCreateOrConnectWithoutPending_requestInput | HederaProofCreateOrConnectWithoutPending_requestInput[]
    createMany?: HederaProofCreateManyPending_requestInputEnvelope
    connect?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
  }

  export type VoteUpdateManyWithoutPending_requestNestedInput = {
    create?: XOR<VoteCreateWithoutPending_requestInput, VoteUncheckedCreateWithoutPending_requestInput> | VoteCreateWithoutPending_requestInput[] | VoteUncheckedCreateWithoutPending_requestInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutPending_requestInput | VoteCreateOrConnectWithoutPending_requestInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutPending_requestInput | VoteUpsertWithWhereUniqueWithoutPending_requestInput[]
    createMany?: VoteCreateManyPending_requestInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutPending_requestInput | VoteUpdateWithWhereUniqueWithoutPending_requestInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutPending_requestInput | VoteUpdateManyWithWhereWithoutPending_requestInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type HederaProofUpdateManyWithoutPending_requestNestedInput = {
    create?: XOR<HederaProofCreateWithoutPending_requestInput, HederaProofUncheckedCreateWithoutPending_requestInput> | HederaProofCreateWithoutPending_requestInput[] | HederaProofUncheckedCreateWithoutPending_requestInput[]
    connectOrCreate?: HederaProofCreateOrConnectWithoutPending_requestInput | HederaProofCreateOrConnectWithoutPending_requestInput[]
    upsert?: HederaProofUpsertWithWhereUniqueWithoutPending_requestInput | HederaProofUpsertWithWhereUniqueWithoutPending_requestInput[]
    createMany?: HederaProofCreateManyPending_requestInputEnvelope
    set?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
    disconnect?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
    delete?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
    connect?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
    update?: HederaProofUpdateWithWhereUniqueWithoutPending_requestInput | HederaProofUpdateWithWhereUniqueWithoutPending_requestInput[]
    updateMany?: HederaProofUpdateManyWithWhereWithoutPending_requestInput | HederaProofUpdateManyWithWhereWithoutPending_requestInput[]
    deleteMany?: HederaProofScalarWhereInput | HederaProofScalarWhereInput[]
  }

  export type VoteUncheckedUpdateManyWithoutPending_requestNestedInput = {
    create?: XOR<VoteCreateWithoutPending_requestInput, VoteUncheckedCreateWithoutPending_requestInput> | VoteCreateWithoutPending_requestInput[] | VoteUncheckedCreateWithoutPending_requestInput[]
    connectOrCreate?: VoteCreateOrConnectWithoutPending_requestInput | VoteCreateOrConnectWithoutPending_requestInput[]
    upsert?: VoteUpsertWithWhereUniqueWithoutPending_requestInput | VoteUpsertWithWhereUniqueWithoutPending_requestInput[]
    createMany?: VoteCreateManyPending_requestInputEnvelope
    set?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    disconnect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    delete?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    connect?: VoteWhereUniqueInput | VoteWhereUniqueInput[]
    update?: VoteUpdateWithWhereUniqueWithoutPending_requestInput | VoteUpdateWithWhereUniqueWithoutPending_requestInput[]
    updateMany?: VoteUpdateManyWithWhereWithoutPending_requestInput | VoteUpdateManyWithWhereWithoutPending_requestInput[]
    deleteMany?: VoteScalarWhereInput | VoteScalarWhereInput[]
  }

  export type HederaProofUncheckedUpdateManyWithoutPending_requestNestedInput = {
    create?: XOR<HederaProofCreateWithoutPending_requestInput, HederaProofUncheckedCreateWithoutPending_requestInput> | HederaProofCreateWithoutPending_requestInput[] | HederaProofUncheckedCreateWithoutPending_requestInput[]
    connectOrCreate?: HederaProofCreateOrConnectWithoutPending_requestInput | HederaProofCreateOrConnectWithoutPending_requestInput[]
    upsert?: HederaProofUpsertWithWhereUniqueWithoutPending_requestInput | HederaProofUpsertWithWhereUniqueWithoutPending_requestInput[]
    createMany?: HederaProofCreateManyPending_requestInputEnvelope
    set?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
    disconnect?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
    delete?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
    connect?: HederaProofWhereUniqueInput | HederaProofWhereUniqueInput[]
    update?: HederaProofUpdateWithWhereUniqueWithoutPending_requestInput | HederaProofUpdateWithWhereUniqueWithoutPending_requestInput[]
    updateMany?: HederaProofUpdateManyWithWhereWithoutPending_requestInput | HederaProofUpdateManyWithWhereWithoutPending_requestInput[]
    deleteMany?: HederaProofScalarWhereInput | HederaProofScalarWhereInput[]
  }

  export type AdminCreateNestedOneWithoutVotesInput = {
    create?: XOR<AdminCreateWithoutVotesInput, AdminUncheckedCreateWithoutVotesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutVotesInput
    connect?: AdminWhereUniqueInput
  }

  export type PendingRequestCreateNestedOneWithoutVotesInput = {
    create?: XOR<PendingRequestCreateWithoutVotesInput, PendingRequestUncheckedCreateWithoutVotesInput>
    connectOrCreate?: PendingRequestCreateOrConnectWithoutVotesInput
    connect?: PendingRequestWhereUniqueInput
  }

  export type AdminUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<AdminCreateWithoutVotesInput, AdminUncheckedCreateWithoutVotesInput>
    connectOrCreate?: AdminCreateOrConnectWithoutVotesInput
    upsert?: AdminUpsertWithoutVotesInput
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutVotesInput, AdminUpdateWithoutVotesInput>, AdminUncheckedUpdateWithoutVotesInput>
  }

  export type PendingRequestUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<PendingRequestCreateWithoutVotesInput, PendingRequestUncheckedCreateWithoutVotesInput>
    connectOrCreate?: PendingRequestCreateOrConnectWithoutVotesInput
    upsert?: PendingRequestUpsertWithoutVotesInput
    connect?: PendingRequestWhereUniqueInput
    update?: XOR<XOR<PendingRequestUpdateToOneWithWhereWithoutVotesInput, PendingRequestUpdateWithoutVotesInput>, PendingRequestUncheckedUpdateWithoutVotesInput>
  }

  export type PendingRequestCreateNestedOneWithoutHedera_proofsInput = {
    create?: XOR<PendingRequestCreateWithoutHedera_proofsInput, PendingRequestUncheckedCreateWithoutHedera_proofsInput>
    connectOrCreate?: PendingRequestCreateOrConnectWithoutHedera_proofsInput
    connect?: PendingRequestWhereUniqueInput
  }

  export type PendingRequestUpdateOneRequiredWithoutHedera_proofsNestedInput = {
    create?: XOR<PendingRequestCreateWithoutHedera_proofsInput, PendingRequestUncheckedCreateWithoutHedera_proofsInput>
    connectOrCreate?: PendingRequestCreateOrConnectWithoutHedera_proofsInput
    upsert?: PendingRequestUpsertWithoutHedera_proofsInput
    connect?: PendingRequestWhereUniqueInput
    update?: XOR<XOR<PendingRequestUpdateToOneWithWhereWithoutHedera_proofsInput, PendingRequestUpdateWithoutHedera_proofsInput>, PendingRequestUncheckedUpdateWithoutHedera_proofsInput>
  }

  export type AdminCreateNestedOneWithoutSessionsInput = {
    create?: XOR<AdminCreateWithoutSessionsInput, AdminUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: AdminCreateOrConnectWithoutSessionsInput
    connect?: AdminWhereUniqueInput
  }

  export type AdminUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<AdminCreateWithoutSessionsInput, AdminUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: AdminCreateOrConnectWithoutSessionsInput
    upsert?: AdminUpsertWithoutSessionsInput
    connect?: AdminWhereUniqueInput
    update?: XOR<XOR<AdminUpdateToOneWithWhereWithoutSessionsInput, AdminUpdateWithoutSessionsInput>, AdminUncheckedUpdateWithoutSessionsInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
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

  export type AdminFaceCreateWithoutAdminInput = {
    id?: string
    enc_embedding: string
    iv: string
    tag: string
    dims: number
    embedding_hash?: string | null
    enrolled_at?: Date | string
  }

  export type AdminFaceUncheckedCreateWithoutAdminInput = {
    id?: string
    enc_embedding: string
    iv: string
    tag: string
    dims: number
    embedding_hash?: string | null
    enrolled_at?: Date | string
  }

  export type AdminFaceCreateOrConnectWithoutAdminInput = {
    where: AdminFaceWhereUniqueInput
    create: XOR<AdminFaceCreateWithoutAdminInput, AdminFaceUncheckedCreateWithoutAdminInput>
  }

  export type AdminFaceCreateManyAdminInputEnvelope = {
    data: AdminFaceCreateManyAdminInput | AdminFaceCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type VoteCreateWithoutAdminInput = {
    id?: string
    bank_id: string
    vote: string
    reason?: string | null
    created_at?: Date | string
    pending_request: PendingRequestCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateWithoutAdminInput = {
    id?: string
    request_id: string
    bank_id: string
    vote: string
    reason?: string | null
    created_at?: Date | string
  }

  export type VoteCreateOrConnectWithoutAdminInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutAdminInput, VoteUncheckedCreateWithoutAdminInput>
  }

  export type VoteCreateManyAdminInputEnvelope = {
    data: VoteCreateManyAdminInput | VoteCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutAdminInput = {
    id?: string
    bank_id: string
    refresh_token?: string | null
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    last_activity?: Date | string
    created_at?: Date | string
    ended_at?: Date | string | null
  }

  export type SessionUncheckedCreateWithoutAdminInput = {
    id?: string
    bank_id: string
    refresh_token?: string | null
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    last_activity?: Date | string
    created_at?: Date | string
    ended_at?: Date | string | null
  }

  export type SessionCreateOrConnectWithoutAdminInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutAdminInput, SessionUncheckedCreateWithoutAdminInput>
  }

  export type SessionCreateManyAdminInputEnvelope = {
    data: SessionCreateManyAdminInput | SessionCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type AdminFaceUpsertWithWhereUniqueWithoutAdminInput = {
    where: AdminFaceWhereUniqueInput
    update: XOR<AdminFaceUpdateWithoutAdminInput, AdminFaceUncheckedUpdateWithoutAdminInput>
    create: XOR<AdminFaceCreateWithoutAdminInput, AdminFaceUncheckedCreateWithoutAdminInput>
  }

  export type AdminFaceUpdateWithWhereUniqueWithoutAdminInput = {
    where: AdminFaceWhereUniqueInput
    data: XOR<AdminFaceUpdateWithoutAdminInput, AdminFaceUncheckedUpdateWithoutAdminInput>
  }

  export type AdminFaceUpdateManyWithWhereWithoutAdminInput = {
    where: AdminFaceScalarWhereInput
    data: XOR<AdminFaceUpdateManyMutationInput, AdminFaceUncheckedUpdateManyWithoutAdminInput>
  }

  export type AdminFaceScalarWhereInput = {
    AND?: AdminFaceScalarWhereInput | AdminFaceScalarWhereInput[]
    OR?: AdminFaceScalarWhereInput[]
    NOT?: AdminFaceScalarWhereInput | AdminFaceScalarWhereInput[]
    id?: StringFilter<"AdminFace"> | string
    admin_id?: StringFilter<"AdminFace"> | string
    enc_embedding?: StringFilter<"AdminFace"> | string
    iv?: StringFilter<"AdminFace"> | string
    tag?: StringFilter<"AdminFace"> | string
    dims?: IntFilter<"AdminFace"> | number
    embedding_hash?: StringNullableFilter<"AdminFace"> | string | null
    enrolled_at?: DateTimeFilter<"AdminFace"> | Date | string
  }

  export type VoteUpsertWithWhereUniqueWithoutAdminInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutAdminInput, VoteUncheckedUpdateWithoutAdminInput>
    create: XOR<VoteCreateWithoutAdminInput, VoteUncheckedCreateWithoutAdminInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutAdminInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutAdminInput, VoteUncheckedUpdateWithoutAdminInput>
  }

  export type VoteUpdateManyWithWhereWithoutAdminInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutAdminInput>
  }

  export type VoteScalarWhereInput = {
    AND?: VoteScalarWhereInput | VoteScalarWhereInput[]
    OR?: VoteScalarWhereInput[]
    NOT?: VoteScalarWhereInput | VoteScalarWhereInput[]
    id?: StringFilter<"Vote"> | string
    request_id?: StringFilter<"Vote"> | string
    bank_id?: StringFilter<"Vote"> | string
    admin_id?: StringFilter<"Vote"> | string
    vote?: StringFilter<"Vote"> | string
    reason?: StringNullableFilter<"Vote"> | string | null
    created_at?: DateTimeFilter<"Vote"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutAdminInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutAdminInput, SessionUncheckedUpdateWithoutAdminInput>
    create: XOR<SessionCreateWithoutAdminInput, SessionUncheckedCreateWithoutAdminInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutAdminInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutAdminInput, SessionUncheckedUpdateWithoutAdminInput>
  }

  export type SessionUpdateManyWithWhereWithoutAdminInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutAdminInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    admin_id?: StringFilter<"Session"> | string
    bank_id?: StringFilter<"Session"> | string
    refresh_token?: StringNullableFilter<"Session"> | string | null
    is_active?: BoolFilter<"Session"> | boolean
    user_agent?: StringNullableFilter<"Session"> | string | null
    ip_address?: StringNullableFilter<"Session"> | string | null
    last_activity?: DateTimeFilter<"Session"> | Date | string
    created_at?: DateTimeFilter<"Session"> | Date | string
    ended_at?: DateTimeNullableFilter<"Session"> | Date | string | null
  }

  export type AdminCreateWithoutAdmin_facesInput = {
    id?: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    votes?: VoteCreateNestedManyWithoutAdminInput
    sessions?: SessionCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateWithoutAdmin_facesInput = {
    id?: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    votes?: VoteUncheckedCreateNestedManyWithoutAdminInput
    sessions?: SessionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminCreateOrConnectWithoutAdmin_facesInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutAdmin_facesInput, AdminUncheckedCreateWithoutAdmin_facesInput>
  }

  export type AdminUpsertWithoutAdmin_facesInput = {
    update: XOR<AdminUpdateWithoutAdmin_facesInput, AdminUncheckedUpdateWithoutAdmin_facesInput>
    create: XOR<AdminCreateWithoutAdmin_facesInput, AdminUncheckedCreateWithoutAdmin_facesInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutAdmin_facesInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutAdmin_facesInput, AdminUncheckedUpdateWithoutAdmin_facesInput>
  }

  export type AdminUpdateWithoutAdmin_facesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    votes?: VoteUpdateManyWithoutAdminNestedInput
    sessions?: SessionUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateWithoutAdmin_facesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    votes?: VoteUncheckedUpdateManyWithoutAdminNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type VoteCreateWithoutPending_requestInput = {
    id?: string
    bank_id: string
    vote: string
    reason?: string | null
    created_at?: Date | string
    admin: AdminCreateNestedOneWithoutVotesInput
  }

  export type VoteUncheckedCreateWithoutPending_requestInput = {
    id?: string
    bank_id: string
    admin_id: string
    vote: string
    reason?: string | null
    created_at?: Date | string
  }

  export type VoteCreateOrConnectWithoutPending_requestInput = {
    where: VoteWhereUniqueInput
    create: XOR<VoteCreateWithoutPending_requestInput, VoteUncheckedCreateWithoutPending_requestInput>
  }

  export type VoteCreateManyPending_requestInputEnvelope = {
    data: VoteCreateManyPending_requestInput | VoteCreateManyPending_requestInput[]
    skipDuplicates?: boolean
  }

  export type HederaProofCreateWithoutPending_requestInput = {
    id?: string
    summary_hash: string
    topic_message_id: string
    created_at?: Date | string
  }

  export type HederaProofUncheckedCreateWithoutPending_requestInput = {
    id?: string
    summary_hash: string
    topic_message_id: string
    created_at?: Date | string
  }

  export type HederaProofCreateOrConnectWithoutPending_requestInput = {
    where: HederaProofWhereUniqueInput
    create: XOR<HederaProofCreateWithoutPending_requestInput, HederaProofUncheckedCreateWithoutPending_requestInput>
  }

  export type HederaProofCreateManyPending_requestInputEnvelope = {
    data: HederaProofCreateManyPending_requestInput | HederaProofCreateManyPending_requestInput[]
    skipDuplicates?: boolean
  }

  export type VoteUpsertWithWhereUniqueWithoutPending_requestInput = {
    where: VoteWhereUniqueInput
    update: XOR<VoteUpdateWithoutPending_requestInput, VoteUncheckedUpdateWithoutPending_requestInput>
    create: XOR<VoteCreateWithoutPending_requestInput, VoteUncheckedCreateWithoutPending_requestInput>
  }

  export type VoteUpdateWithWhereUniqueWithoutPending_requestInput = {
    where: VoteWhereUniqueInput
    data: XOR<VoteUpdateWithoutPending_requestInput, VoteUncheckedUpdateWithoutPending_requestInput>
  }

  export type VoteUpdateManyWithWhereWithoutPending_requestInput = {
    where: VoteScalarWhereInput
    data: XOR<VoteUpdateManyMutationInput, VoteUncheckedUpdateManyWithoutPending_requestInput>
  }

  export type HederaProofUpsertWithWhereUniqueWithoutPending_requestInput = {
    where: HederaProofWhereUniqueInput
    update: XOR<HederaProofUpdateWithoutPending_requestInput, HederaProofUncheckedUpdateWithoutPending_requestInput>
    create: XOR<HederaProofCreateWithoutPending_requestInput, HederaProofUncheckedCreateWithoutPending_requestInput>
  }

  export type HederaProofUpdateWithWhereUniqueWithoutPending_requestInput = {
    where: HederaProofWhereUniqueInput
    data: XOR<HederaProofUpdateWithoutPending_requestInput, HederaProofUncheckedUpdateWithoutPending_requestInput>
  }

  export type HederaProofUpdateManyWithWhereWithoutPending_requestInput = {
    where: HederaProofScalarWhereInput
    data: XOR<HederaProofUpdateManyMutationInput, HederaProofUncheckedUpdateManyWithoutPending_requestInput>
  }

  export type HederaProofScalarWhereInput = {
    AND?: HederaProofScalarWhereInput | HederaProofScalarWhereInput[]
    OR?: HederaProofScalarWhereInput[]
    NOT?: HederaProofScalarWhereInput | HederaProofScalarWhereInput[]
    id?: StringFilter<"HederaProof"> | string
    request_id?: StringFilter<"HederaProof"> | string
    summary_hash?: StringFilter<"HederaProof"> | string
    topic_message_id?: StringFilter<"HederaProof"> | string
    created_at?: DateTimeFilter<"HederaProof"> | Date | string
  }

  export type AdminCreateWithoutVotesInput = {
    id?: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    admin_faces?: AdminFaceCreateNestedManyWithoutAdminInput
    sessions?: SessionCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateWithoutVotesInput = {
    id?: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    admin_faces?: AdminFaceUncheckedCreateNestedManyWithoutAdminInput
    sessions?: SessionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminCreateOrConnectWithoutVotesInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutVotesInput, AdminUncheckedCreateWithoutVotesInput>
  }

  export type PendingRequestCreateWithoutVotesInput = {
    id?: string
    citizen_nni_hash: string
    masked_nni: string
    payload_summary: JsonNullValueInput | InputJsonValue
    status?: string
    summary_hash?: string | null
    salt_ref?: string | null
    voting_deadline: Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    hedera_proofs?: HederaProofCreateNestedManyWithoutPending_requestInput
  }

  export type PendingRequestUncheckedCreateWithoutVotesInput = {
    id?: string
    citizen_nni_hash: string
    masked_nni: string
    payload_summary: JsonNullValueInput | InputJsonValue
    status?: string
    summary_hash?: string | null
    salt_ref?: string | null
    voting_deadline: Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    hedera_proofs?: HederaProofUncheckedCreateNestedManyWithoutPending_requestInput
  }

  export type PendingRequestCreateOrConnectWithoutVotesInput = {
    where: PendingRequestWhereUniqueInput
    create: XOR<PendingRequestCreateWithoutVotesInput, PendingRequestUncheckedCreateWithoutVotesInput>
  }

  export type AdminUpsertWithoutVotesInput = {
    update: XOR<AdminUpdateWithoutVotesInput, AdminUncheckedUpdateWithoutVotesInput>
    create: XOR<AdminCreateWithoutVotesInput, AdminUncheckedCreateWithoutVotesInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutVotesInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutVotesInput, AdminUncheckedUpdateWithoutVotesInput>
  }

  export type AdminUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    admin_faces?: AdminFaceUpdateManyWithoutAdminNestedInput
    sessions?: SessionUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    admin_faces?: AdminFaceUncheckedUpdateManyWithoutAdminNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type PendingRequestUpsertWithoutVotesInput = {
    update: XOR<PendingRequestUpdateWithoutVotesInput, PendingRequestUncheckedUpdateWithoutVotesInput>
    create: XOR<PendingRequestCreateWithoutVotesInput, PendingRequestUncheckedCreateWithoutVotesInput>
    where?: PendingRequestWhereInput
  }

  export type PendingRequestUpdateToOneWithWhereWithoutVotesInput = {
    where?: PendingRequestWhereInput
    data: XOR<PendingRequestUpdateWithoutVotesInput, PendingRequestUncheckedUpdateWithoutVotesInput>
  }

  export type PendingRequestUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_nni_hash?: StringFieldUpdateOperationsInput | string
    masked_nni?: StringFieldUpdateOperationsInput | string
    payload_summary?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    summary_hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt_ref?: NullableStringFieldUpdateOperationsInput | string | null
    voting_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    hedera_proofs?: HederaProofUpdateManyWithoutPending_requestNestedInput
  }

  export type PendingRequestUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_nni_hash?: StringFieldUpdateOperationsInput | string
    masked_nni?: StringFieldUpdateOperationsInput | string
    payload_summary?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    summary_hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt_ref?: NullableStringFieldUpdateOperationsInput | string | null
    voting_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    hedera_proofs?: HederaProofUncheckedUpdateManyWithoutPending_requestNestedInput
  }

  export type PendingRequestCreateWithoutHedera_proofsInput = {
    id?: string
    citizen_nni_hash: string
    masked_nni: string
    payload_summary: JsonNullValueInput | InputJsonValue
    status?: string
    summary_hash?: string | null
    salt_ref?: string | null
    voting_deadline: Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    votes?: VoteCreateNestedManyWithoutPending_requestInput
  }

  export type PendingRequestUncheckedCreateWithoutHedera_proofsInput = {
    id?: string
    citizen_nni_hash: string
    masked_nni: string
    payload_summary: JsonNullValueInput | InputJsonValue
    status?: string
    summary_hash?: string | null
    salt_ref?: string | null
    voting_deadline: Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    votes?: VoteUncheckedCreateNestedManyWithoutPending_requestInput
  }

  export type PendingRequestCreateOrConnectWithoutHedera_proofsInput = {
    where: PendingRequestWhereUniqueInput
    create: XOR<PendingRequestCreateWithoutHedera_proofsInput, PendingRequestUncheckedCreateWithoutHedera_proofsInput>
  }

  export type PendingRequestUpsertWithoutHedera_proofsInput = {
    update: XOR<PendingRequestUpdateWithoutHedera_proofsInput, PendingRequestUncheckedUpdateWithoutHedera_proofsInput>
    create: XOR<PendingRequestCreateWithoutHedera_proofsInput, PendingRequestUncheckedCreateWithoutHedera_proofsInput>
    where?: PendingRequestWhereInput
  }

  export type PendingRequestUpdateToOneWithWhereWithoutHedera_proofsInput = {
    where?: PendingRequestWhereInput
    data: XOR<PendingRequestUpdateWithoutHedera_proofsInput, PendingRequestUncheckedUpdateWithoutHedera_proofsInput>
  }

  export type PendingRequestUpdateWithoutHedera_proofsInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_nni_hash?: StringFieldUpdateOperationsInput | string
    masked_nni?: StringFieldUpdateOperationsInput | string
    payload_summary?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    summary_hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt_ref?: NullableStringFieldUpdateOperationsInput | string | null
    voting_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    votes?: VoteUpdateManyWithoutPending_requestNestedInput
  }

  export type PendingRequestUncheckedUpdateWithoutHedera_proofsInput = {
    id?: StringFieldUpdateOperationsInput | string
    citizen_nni_hash?: StringFieldUpdateOperationsInput | string
    masked_nni?: StringFieldUpdateOperationsInput | string
    payload_summary?: JsonNullValueInput | InputJsonValue
    status?: StringFieldUpdateOperationsInput | string
    summary_hash?: NullableStringFieldUpdateOperationsInput | string | null
    salt_ref?: NullableStringFieldUpdateOperationsInput | string | null
    voting_deadline?: DateTimeFieldUpdateOperationsInput | Date | string
    image_urls?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    votes?: VoteUncheckedUpdateManyWithoutPending_requestNestedInput
  }

  export type AdminCreateWithoutSessionsInput = {
    id?: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    admin_faces?: AdminFaceCreateNestedManyWithoutAdminInput
    votes?: VoteCreateNestedManyWithoutAdminInput
  }

  export type AdminUncheckedCreateWithoutSessionsInput = {
    id?: string
    username: string
    password_hash: string
    bank_id: string
    face_enrolled?: boolean
    last_login?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string
    deleted_at?: Date | string | null
    deleted_by?: string | null
    admin_faces?: AdminFaceUncheckedCreateNestedManyWithoutAdminInput
    votes?: VoteUncheckedCreateNestedManyWithoutAdminInput
  }

  export type AdminCreateOrConnectWithoutSessionsInput = {
    where: AdminWhereUniqueInput
    create: XOR<AdminCreateWithoutSessionsInput, AdminUncheckedCreateWithoutSessionsInput>
  }

  export type AdminUpsertWithoutSessionsInput = {
    update: XOR<AdminUpdateWithoutSessionsInput, AdminUncheckedUpdateWithoutSessionsInput>
    create: XOR<AdminCreateWithoutSessionsInput, AdminUncheckedCreateWithoutSessionsInput>
    where?: AdminWhereInput
  }

  export type AdminUpdateToOneWithWhereWithoutSessionsInput = {
    where?: AdminWhereInput
    data: XOR<AdminUpdateWithoutSessionsInput, AdminUncheckedUpdateWithoutSessionsInput>
  }

  export type AdminUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    admin_faces?: AdminFaceUpdateManyWithoutAdminNestedInput
    votes?: VoteUpdateManyWithoutAdminNestedInput
  }

  export type AdminUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password_hash?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    face_enrolled?: BoolFieldUpdateOperationsInput | boolean
    last_login?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_by?: NullableStringFieldUpdateOperationsInput | string | null
    admin_faces?: AdminFaceUncheckedUpdateManyWithoutAdminNestedInput
    votes?: VoteUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type AdminFaceCreateManyAdminInput = {
    id?: string
    enc_embedding: string
    iv: string
    tag: string
    dims: number
    embedding_hash?: string | null
    enrolled_at?: Date | string
  }

  export type VoteCreateManyAdminInput = {
    id?: string
    request_id: string
    bank_id: string
    vote: string
    reason?: string | null
    created_at?: Date | string
  }

  export type SessionCreateManyAdminInput = {
    id?: string
    bank_id: string
    refresh_token?: string | null
    is_active?: boolean
    user_agent?: string | null
    ip_address?: string | null
    last_activity?: Date | string
    created_at?: Date | string
    ended_at?: Date | string | null
  }

  export type AdminFaceUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    enc_embedding?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    dims?: IntFieldUpdateOperationsInput | number
    embedding_hash?: NullableStringFieldUpdateOperationsInput | string | null
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminFaceUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    enc_embedding?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    dims?: IntFieldUpdateOperationsInput | number
    embedding_hash?: NullableStringFieldUpdateOperationsInput | string | null
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminFaceUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    enc_embedding?: StringFieldUpdateOperationsInput | string
    iv?: StringFieldUpdateOperationsInput | string
    tag?: StringFieldUpdateOperationsInput | string
    dims?: IntFieldUpdateOperationsInput | number
    embedding_hash?: NullableStringFieldUpdateOperationsInput | string | null
    enrolled_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    pending_request?: PendingRequestUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    request_id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SessionUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    user_agent?: NullableStringFieldUpdateOperationsInput | string | null
    ip_address?: NullableStringFieldUpdateOperationsInput | string | null
    last_activity?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ended_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type VoteCreateManyPending_requestInput = {
    id?: string
    bank_id: string
    admin_id: string
    vote: string
    reason?: string | null
    created_at?: Date | string
  }

  export type HederaProofCreateManyPending_requestInput = {
    id?: string
    summary_hash: string
    topic_message_id: string
    created_at?: Date | string
  }

  export type VoteUpdateWithoutPending_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: AdminUpdateOneRequiredWithoutVotesNestedInput
  }

  export type VoteUncheckedUpdateWithoutPending_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VoteUncheckedUpdateManyWithoutPending_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    bank_id?: StringFieldUpdateOperationsInput | string
    admin_id?: StringFieldUpdateOperationsInput | string
    vote?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HederaProofUpdateWithoutPending_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary_hash?: StringFieldUpdateOperationsInput | string
    topic_message_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HederaProofUncheckedUpdateWithoutPending_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary_hash?: StringFieldUpdateOperationsInput | string
    topic_message_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HederaProofUncheckedUpdateManyWithoutPending_requestInput = {
    id?: StringFieldUpdateOperationsInput | string
    summary_hash?: StringFieldUpdateOperationsInput | string
    topic_message_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use AdminCountOutputTypeDefaultArgs instead
     */
    export type AdminCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PendingRequestCountOutputTypeDefaultArgs instead
     */
    export type PendingRequestCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PendingRequestCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminDefaultArgs instead
     */
    export type AdminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AdminFaceDefaultArgs instead
     */
    export type AdminFaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AdminFaceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PendingRequestDefaultArgs instead
     */
    export type PendingRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PendingRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use VoteDefaultArgs instead
     */
    export type VoteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = VoteDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HederaProofDefaultArgs instead
     */
    export type HederaProofArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HederaProofDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AuditLogDefaultArgs instead
     */
    export type AuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>

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