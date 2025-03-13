import { faker } from '@faker-js/faker';

const documentItems = [];
for (let index = 0; index < 10; index++) {
  documentItems.push({
    DocumentId: faker.string.uuid(),
    DocumentURI: faker.internet.url(),
    DocumentTitle: {
      Text: faker.lorem.sentence(),
      Highlights: [],
    },
    DocumentExcerpt: {
      Text: faker.lorem.paragraph(),
      Highlights: [],
    },
  });
}

export const documents = {
  Page: 1,
  PageSize: 10,
  TotalNumberOfResults: 10,
  ResultItems: documentItems,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const suggestions = [...Array(5).keys()].map((_i) => {
  return faker.lorem.lines();
});
