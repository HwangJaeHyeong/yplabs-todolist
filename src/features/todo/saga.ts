import {
  createTodoItem,
  deleteTodoItem,
  getTodoList,
  GetTodoListResponseType,
} from 'api/fetch';
import { call, put, takeLatest } from 'redux-saga/effects';
import { todoAction } from './slice';

function* handleGetTodoListLoad() {
  const { refreshTodoListFail, refreshTodoListSuccess } = todoAction;
  try {
    const todoList: GetTodoListResponseType = yield call(getTodoList);
    yield put(refreshTodoListSuccess(todoList.data));
  } catch (err) {
    yield put(refreshTodoListFail());
  }
}

export function* watchGetTodoList() {
  const { refreshTodoListLoad } = todoAction;
  yield takeLatest(refreshTodoListLoad, handleGetTodoListLoad);
}

function* handleDeleteTodoListLoad(action: any) {
  const { deleteTodoItemFail, deleteTodoItemSuccess } = todoAction;
  try {
    yield call(() => deleteTodoItem({ id: action.payload.id }));
    yield put(deleteTodoItemSuccess());
    yield handleGetTodoListLoad();
  } catch (err) {
    yield put(deleteTodoItemFail());
  }
}

export function* watchDeleteTodoList() {
  const { deleteTodoItemLoad } = todoAction;
  yield takeLatest(deleteTodoItemLoad, handleDeleteTodoListLoad);
}

function* handleCreateTodoListLoad(action: any) {
  const { createTodoItemSuccess, createTodoItemFail } = todoAction;
  try {
    yield call(() => createTodoItem({ content: action.payload.content }));
    yield put(createTodoItemSuccess());
  } catch (err) {
    yield put(createTodoItemFail());
  }
}

export function* watchCreateTodoList() {
  const { createTodoItemLoad } = todoAction;
  yield takeLatest(createTodoItemLoad, handleCreateTodoListLoad);
}