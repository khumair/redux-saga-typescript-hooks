import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const doSomething = actionCreator<string>('SOMETHING_HAPPENED');