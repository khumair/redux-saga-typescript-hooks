import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const somethingAsync = actionCreator.async('SOMETHING_HAPPENED_ASYNC');