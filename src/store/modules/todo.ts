/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import _ from 'lodash';
import ToDoApi, { ToDo, DailyToDo } from '../../api/todo';

export class ToDoState {
  expiryDate: number = 0;

  list: Array<ToDo> = [];

  loading: boolean = false;

  error: string = '';
}

const state = new ToDoState();

const getters = {
  getById(state: ToDoState, id: string) {
    return _.find(state.list, { id });
  },
};

const mutations = {
  setExpiryDate(state: ToDoState, date: number) {
    state.expiryDate = date;
  },
  setToDoList(state: ToDoState, todos: Array<ToDo>) {
    state.list = todos;
  },
  setLoading(state: ToDoState, value: boolean) {
    state.loading = value;
  },
  setErrorState(state: ToDoState, value: string) {
    state.error = value;
  },
};

const actions = {
  resetError({ commit }: any, value: boolean) {
    commit('setErrorState', '');
  },
  async add({ dispatch, commit }: any, data: ToDo) {
    commit('setLoading', true);
    const success = await ToDoApi.add(data);

    if (success) {
      await dispatch('fetch');
      return;
    }
    commit('setLoading', false);
    commit('setErrorState', !success ? 'add' : '');
  },
  async update({ dispatch, commit }: any, { id, done }: any) {
    commit('setLoading', true);
    const success = await ToDoApi.update(id, done);

    if (success) {
      await dispatch('fetch');
      return;
    }
    commit('setLoading', false);
    commit('setErrorState', !success ? 'update' : '');
  },
  async remove({ dispatch, commit }: any, ids: Array<string>) {
    commit('setLoading', true);

    const results = [] as Promise<boolean>[];
    ids.forEach((id) => {
      results.push(ToDoApi.remove(id));
    });

    const successes = await Promise.all(results);

    if (successes.indexOf(true) > -1) {
      await dispatch('fetch');
      return;
    }
    commit('setLoading', false);
    commit('setErrorState', successes.indexOf(false) > -1 ? 'remove' : '');
  },
  async fetch({ dispatch, commit }: any) {
    commit('setLoading', true);
    const dailyTodos = await ToDoApi.get();

    if (dailyTodos && dailyTodos !== 'error') {
      commit('setExpiryDate', dailyTodos.date);
      commit('setToDoList', dailyTodos.todos);
      dispatch('refresh');
      return;
    }

    if (dailyTodos === 'error') {
      commit('setErrorState', 'fetch');
    }

    commit('setLoading', false);
  },
  async refresh({ commit, state }: any) {
    const date = new Date(state.expiryDate);
    const hasExpired = new Date() >= date;

    if (!hasExpired) {
      commit('setLoading', false);
      return;
    }

    commit('setLoading', true);
    const success = await ToDoApi.removeAll();
    if (success) {
      commit('setToDoList', []);
    }
    commit('setLoading', false);
    commit('setErrorState', !success ? 'refresh' : '');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
