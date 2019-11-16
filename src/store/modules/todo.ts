/* eslint no-shadow: ["error", { "allow": ["state"] }] */

import _ from 'lodash';
import ToDoApi, { ToDo, DailyToDo } from '../../api/todo';

export class ToDoState {
  expiryDate: number = 0;

  list: Array<ToDo> = [];

  loading: boolean = false;

  error: boolean = true;
}

const state = new ToDoState();

const getters = {
  getById(state: ToDoState, id: string) {
    return _.find(state.list, { id });
  },
};

const mutations = {
  setExpiryDate(state: ToDoState, data: DailyToDo) {
    state.expiryDate = data.date;
  },
  setToDoList(state: ToDoState, data: DailyToDo) {
    state.list = data.todos;
  },
  setLoading(state: ToDoState, value: boolean) {
    state.loading = value;
  },
  setErrorState(state: ToDoState, value: boolean) {
    state.error = value;
  },
};

const actions = {
  setError({ commit }: any, value: boolean) {
    commit('setErrorState', value);
  },
  async add({ dispatch, commit }: any, data: ToDo) {
    commit('setLoading', true);
    const success = await ToDoApi.add(data);

    if (success) {
      dispatch('fetch');
      return;
    }
    commit('setLoading', false);
    commit('setErrorState', !success);
  },
  async remove({ dispatch, commit }: any, id: string) {
    commit('setLoading', true);
    const success = await ToDoApi.remove(id);

    if (success) {
      dispatch('fetch');
      return;
    }
    commit('setLoading', false);
    commit('setErrorState', !success);
  },
  async fetch({ commit }: any) {
    commit('setLoading', true);
    const todos = await ToDoApi.get();

    if (todos === 'error') {
      commit('setErrorState', true);
    } else {
      commit('setToDoList', todos);
    }
    commit('setLoading', false);
  },
  async refreshStore({ commit, state }: any) {
    const date = new Date(state.expiryDate);
    const hasExpired = new Date() >= date;

    if (hasExpired) {
      return;
    }

    commit('setLoading', true);
    const success = await ToDoApi.removeAll();
    if (success) {
      commit('setToDoList', []);
    }
    commit('setLoading', false);
    commit('setErrorState', !success);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
