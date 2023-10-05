// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Expense, Sale, Order, Shift, Item, Supplier, Category, Store } = initSchema(schema);

export {
  Expense,
  Sale,
  Order,
  Shift,
  Item,
  Supplier,
  Category,
  Store
};