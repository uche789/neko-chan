import ToDoApi, { ToDo, DailyToDo } from '@/api/todo';
import toDoStore, { ToDoState } from '@/store/modules/todo';

jest.mock('../../src/api/todo');

let state = {} as ToDoState;
const mockData = {
  date: 1573902829099,
  todos: [
    { id: 'key-1', description: 'description-1' } as ToDo,
    { id: 'key-2', description: 'description-2' } as ToDo,
    { id: 'key-3', description: 'description-3' } as ToDo,
  ],
} as DailyToDo;

beforeEach(() => {
  state = {
    expiryDate: mockData.date,
    list: mockData.todos,
  } as ToDoState;
});

describe('toDoStore', () => {
  // describe('actions', () => {
  //   it('fetch', async () => {
  //     const commit = jest.fn();
  //     (<jest.Mock>ToDoApi.get).mockResolvedValue(mockData);
  //     await toDoStore.actions.fetch({ commit });
  //     expect(ToDoApi.get as jest.Mock).toHaveBeenCalled();
  //     expect(commit).toHaveBeenCalledWith('setLoading', true);
  //     expect(commit).toHaveBeenCalledWith('setToDoList', mockData);
  //     expect(commit).toHaveBeenCalledWith('setLoading', false);
  //   });

  //   it('fetch:failed', async () => {
  //     const commit = jest.fn();
  //     (<jest.Mock>ToDoApi.get).mockResolvedValue('error');
  //     await toDoStore.actions.fetch({ commit });
  //     expect(ToDoApi.get as jest.Mock).toHaveBeenCalled();
  //     expect(commit).toHaveBeenCalledWith('setLoading', true);
  //     expect(commit).toHaveBeenCalledWith('setErrorState', true);
  //     expect(commit).toHaveBeenCalledWith('setLoading', false);
  //   });

  //   it('add', async () => {
  //     const data = {
  //       id: 'key-key-1',
  //       description: 'description-1-1',
  //     } as ToDo;
  //     const commit = jest.fn();
  //     const dispatch = jest.fn();
  //     (<jest.Mock>ToDoApi.add).mockResolvedValue(true);
  //     await toDoStore.actions.add({ dispatch, commit }, data);
  //     expect(ToDoApi.add as jest.Mock).toHaveBeenCalled();
  //     expect(commit).toHaveBeenCalledWith('setLoading', true);
  //     expect(dispatch).toHaveBeenCalledWith('fetch');
  //   });

  //   it('remove', async () => {
  //     const commit = jest.fn();
  //     const dispatch = jest.fn();
  //     (<jest.Mock>ToDoApi.remove).mockResolvedValue(true);
  //     await toDoStore.actions.remove({ dispatch, commit }, 'key');
  //     expect(ToDoApi.remove as jest.Mock).toHaveBeenCalled();
  //     expect(commit).toHaveBeenCalledWith('setLoading', true);
  //     expect(dispatch).toHaveBeenCalledWith('fetch');
  //   });

  //   it('update', async () => {
  //     const commit = jest.fn();
  //     const dispatch = jest.fn();
  //     (<jest.Mock>ToDoApi.update).mockResolvedValue(true);
  //     await toDoStore.actions.update({ dispatch, commit }, 'key-1', true);
  //     expect(ToDoApi.update as jest.Mock).toHaveBeenCalled();
  //     expect(commit).toHaveBeenCalledWith('setLoading', true);
  //     expect(dispatch).toHaveBeenCalledWith('fetch');
  //   });
  // });

  describe('getters', () => {
    it('getById', () => {
      const result = toDoStore.getters.getById(state, 'key-1');
      expect(result).toBe(mockData.todos[0]);
    });
  });
});
