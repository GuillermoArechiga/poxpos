import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem } from "@aws-amplify/datastore";





type EagerExpense = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Expense, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly cost_price?: number | null;
  readonly total_expense?: number | null;
  readonly payment?: string | null;
  readonly Supplier?: Supplier | null;
  readonly Item?: Item | null;
  readonly Category?: Category | null;
  readonly owner?: string | null;
  readonly Store?: Store | null;
  readonly Shift?: Shift | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly expenseSupplierId?: string | null;
  readonly expenseItemId?: string | null;
  readonly expenseCategoryId?: string | null;
  readonly expenseStoreId?: string | null;
  readonly expenseShiftId?: string | null;
}

type LazyExpense = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Expense, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity?: number | null;
  readonly cost_price?: number | null;
  readonly total_expense?: number | null;
  readonly payment?: string | null;
  readonly Supplier: AsyncItem<Supplier | undefined>;
  readonly Item: AsyncItem<Item | undefined>;
  readonly Category: AsyncItem<Category | undefined>;
  readonly owner?: string | null;
  readonly Store: AsyncItem<Store | undefined>;
  readonly Shift: AsyncItem<Shift | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly expenseSupplierId?: string | null;
  readonly expenseItemId?: string | null;
  readonly expenseCategoryId?: string | null;
  readonly expenseStoreId?: string | null;
  readonly expenseShiftId?: string | null;
}

export declare type Expense = LazyLoading extends LazyLoadingDisabled ? EagerExpense : LazyExpense

export declare const Expense: (new (init: ModelInit<Expense>) => Expense) & {
  copyOf(source: Expense, mutator: (draft: MutableModel<Expense>) => MutableModel<Expense> | void): Expense;
}

type EagerSale = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Sale, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly item?: string | null;
  readonly quantity?: number | null;
  readonly sale_price?: number | null;
  readonly cost_price?: number | null;
  readonly Order?: Order | null;
  readonly Shift?: Shift | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly saleOrderId?: string | null;
  readonly saleShiftId?: string | null;
}

type LazySale = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Sale, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly item?: string | null;
  readonly quantity?: number | null;
  readonly sale_price?: number | null;
  readonly cost_price?: number | null;
  readonly Order: AsyncItem<Order | undefined>;
  readonly Shift: AsyncItem<Shift | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly saleOrderId?: string | null;
  readonly saleShiftId?: string | null;
}

export declare type Sale = LazyLoading extends LazyLoadingDisabled ? EagerSale : LazySale

export declare const Sale: (new (init: ModelInit<Sale>) => Sale) & {
  copyOf(source: Sale, mutator: (draft: MutableModel<Sale>) => MutableModel<Sale> | void): Sale;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly payment?: string | null;
  readonly total_order?: number | null;
  readonly revenue?: number | null;
  readonly Store?: Store | null;
  readonly Shift?: Shift | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderStoreId?: string | null;
  readonly orderShiftId?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly payment?: string | null;
  readonly total_order?: number | null;
  readonly revenue?: number | null;
  readonly Store: AsyncItem<Store | undefined>;
  readonly Shift: AsyncItem<Shift | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderStoreId?: string | null;
  readonly orderShiftId?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerShift = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shift, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly start_time?: string | null;
  readonly end_time?: string | null;
  readonly start_cash?: number | null;
  readonly cash_sale?: number | null;
  readonly card_sale?: number | null;
  readonly total_sale?: number | null;
  readonly is_open?: string | null;
  readonly Store?: Store | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly shiftStoreId?: string | null;
}

type LazyShift = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shift, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly owner?: string | null;
  readonly start_time?: string | null;
  readonly end_time?: string | null;
  readonly start_cash?: number | null;
  readonly cash_sale?: number | null;
  readonly card_sale?: number | null;
  readonly total_sale?: number | null;
  readonly is_open?: string | null;
  readonly Store: AsyncItem<Store | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly shiftStoreId?: string | null;
}

export declare type Shift = LazyLoading extends LazyLoadingDisabled ? EagerShift : LazyShift

export declare const Shift: (new (init: ModelInit<Shift>) => Shift) & {
  copyOf(source: Shift, mutator: (draft: MutableModel<Shift>) => MutableModel<Shift> | void): Shift;
}

type EagerItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly cost_price?: number | null;
  readonly sale_price?: number | null;
  readonly start_stock?: number | null;
  readonly stock?: number | null;
  readonly bar_code?: string | null;
  readonly change_price?: string | null;
  readonly Category?: Category | null;
  readonly Store?: Store | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly itemCategoryId?: string | null;
  readonly itemStoreId?: string | null;
}

type LazyItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Item, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly cost_price?: number | null;
  readonly sale_price?: number | null;
  readonly start_stock?: number | null;
  readonly stock?: number | null;
  readonly bar_code?: string | null;
  readonly change_price?: string | null;
  readonly Category: AsyncItem<Category | undefined>;
  readonly Store: AsyncItem<Store | undefined>;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly itemCategoryId?: string | null;
  readonly itemStoreId?: string | null;
}

export declare type Item = LazyLoading extends LazyLoadingDisabled ? EagerItem : LazyItem

export declare const Item: (new (init: ModelInit<Item>) => Item) & {
  copyOf(source: Item, mutator: (draft: MutableModel<Item>) => MutableModel<Item> | void): Item;
}

type EagerSupplier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Supplier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly owner?: string | null;
  readonly phone?: string | null;
  readonly location?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySupplier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Supplier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly owner?: string | null;
  readonly phone?: string | null;
  readonly location?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Supplier = LazyLoading extends LazyLoadingDisabled ? EagerSupplier : LazySupplier

export declare const Supplier: (new (init: ModelInit<Supplier>) => Supplier) & {
  copyOf(source: Supplier, mutator: (draft: MutableModel<Supplier>) => MutableModel<Supplier> | void): Supplier;
}

type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerStore = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Store, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly owner: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStore = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Store, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly owner: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Store = LazyLoading extends LazyLoadingDisabled ? EagerStore : LazyStore

export declare const Store: (new (init: ModelInit<Store>) => Store) & {
  copyOf(source: Store, mutator: (draft: MutableModel<Store>) => MutableModel<Store> | void): Store;
}