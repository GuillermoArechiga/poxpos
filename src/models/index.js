// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Store } = initSchema(schema);

export {
  Store
};