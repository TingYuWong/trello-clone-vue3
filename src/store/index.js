import { createStore } from "vuex";
import defaultData from '../defaultData'

const data = JSON.parse(localStorage.getItem('data')) || defaultData

//這邊記錄共用data：拖動的column/task index、trello data、正在拖動的是column還是task

export default createStore({
  state: {
    data,
    dragItemType: '',
    task_drag_index: {
      C: '',
      T: '',
    },
    column_drag_index: '',
  },
  mutations: {
    CHANGE_COLUMN_DRAG_INDEX(state, index){
      state.column_drag_index = index
    },
    CHANGE_TASK_DRAG_INDEX(state, { C, T }){
      state.task_drag_index = { C, T }
    },
    RECORD_DRAG_TYPE(state, type){
      state.dragItemType = type
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }){
      const fromColumn = state.data.splice(fromColumnIndex, 1)[0]
      state.data.splice(toColumnIndex, 0, fromColumn)

      localStorage.setItem('data', JSON.stringify(state.data))
    },
    MOVE_TASK(state, { fromColumnIndex, toColumnIndex, fromTaskIndex, toTaskIndex }){
      const fromTasks = state.data[fromColumnIndex].tasks
      const task = fromTasks.splice(fromTaskIndex, 1)[0]
      state.data[toColumnIndex].tasks.splice(toTaskIndex, 0, task)
      localStorage.setItem('data', JSON.stringify(state.data))
    },
    CREATE_TASK(state, task){
      state.data[0].tasks.push(task)
      localStorage.setItem('data', JSON.stringify(state.data))
    },
    REMOVE_TASK(state, { columnIndex, taskIndex }){
      state.data[columnIndex].tasks.splice(taskIndex, 1)
      localStorage.setItem('data', JSON.stringify(state.data))
    },
  },
  actions: {},
  modules: {},
});
