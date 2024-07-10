import { faker } from "@faker-js/faker";
import { factory, manyOf, oneOf, primaryKey } from "@mswjs/data";

const db = factory({
  category: {
    id: primaryKey(faker.number.int),
    name: faker.commerce.department,
    products: manyOf("product"),
  },

  product: {
    id: primaryKey(faker.number.int),
    name: faker.commerce.productName,
    price: () => faker.number.int({ min: 1, max: 1000 }),
    categoryId: faker.number.int,
    category: oneOf("category"),
  },
});

export default db;
