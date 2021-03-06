import uuid from 'uuid';
import _ from 'lodash';
import localStorage from '../access/localStorage';

export interface ToDo {
  id: string,
  description: string,
  done: boolean,
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
    todoEntry.id = uuid();

    try {
      const response = await Promise.resolve().then(() => {
        let dailyToDos = localStorage.get('neko-todo');

        if (dailyToDos && dailyToDos.todos.length === 50) {
          return false;
        }

        if (dailyToDos) {
          (dailyToDos as DailyToDo).todos.push(todoEntry);
        } else {
          dailyToDos = {
            date: (new Date()).setHours(24),
            todos: [todoEntry],
          } as DailyToDo;
        }

        return localStorage.set('neko-todo', dailyToDos);
      });

      return response;
    } catch (err) {
      return false;
    }
  }

  static async update(id: string, done: boolean) {
    try {
      const response = await Promise.resolve().then(() => {
        const dailyToDos = localStorage.get('neko-todo');
        const index = _.findIndex(dailyToDos.todos, { id });
        dailyToDos.todos[index].done = done;
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
      const response = await Promise.resolve().then(() => localStorage.remove('neko-todo'));

      return response;
    } catch {
      return false;
    }
  }
}
