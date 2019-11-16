import uuid from 'uuid';
import _ from 'lodash';
import localStorage from '../access/localStorage';

export interface ToDo {
  id: string,
  description: string,
}

export interface DailyToDo {
  date: number,
  todos: Array<ToDo>,
}

export default class ToDoApi {
  static async get() {
    try {
      const response = await Promise.resolve().then(() => localStorage.get('neko-todo'));
      return response;
    } catch {
      return 'error';
    }
  }

  static async add(todo: ToDo) {
    const todoEntry = { ...todo };
    try {
      const response = await Promise.resolve().then(() => {
        let dailyToDos = localStorage.get('neko-todo');

        if (dailyToDos) {
          (dailyToDos as DailyToDo).todos.push(todoEntry);
        } else {
          todoEntry.id = uuid();
          dailyToDos = {
            date: (new Date()).setHours(24),
            todos: [todoEntry],
          } as DailyToDo;
        }

        return localStorage.set('neko-todo', dailyToDos);
      });

      return response;
    } catch {
      return false;
    }
  }


  static async remove(id: string) {
    try {
      const response = await Promise.resolve().then(() => {
        const dailyToDos = localStorage.get('neko-todo');
        _.remove(dailyToDos.todos, { id });
        return localStorage.set('neko-todo', dailyToDos);
      });

      return response;
    } catch {
      return false;
    }
  }

  static async removeAll() {
    try {
      const response = await Promise.resolve().then(() => {
        const dailyToDos = localStorage.remove('neko-todo');
        return localStorage.set('neko-todo', dailyToDos);
      });

      return response;
    } catch {
      return false;
    }
  }
}
