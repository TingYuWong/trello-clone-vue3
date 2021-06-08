import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

//這邊放task和column共用的function

function useDrop(context){
    const store = useStore()

    const dropfunc = reactive({
        data: computed(()=> store.state.data),
        dragItemType: computed(()=> store.state.dragItemType),
        task_drag_index: computed(()=> store.state.task_drag_index),
        column_drag_index: computed(()=> store.state.column_drag_index),
        taskDrop: () => {
            context.emit('changetaskcss', 'close', dropfunc.task_drag_index.C, dropfunc.task_drag_index.T)
        },
        columnDrop: () => {
            if(dropfunc.dragItemType == 'column'){
                context.emit('changecolcss', 'close', dropfunc.column_drag_index)
            }else{
                context.emit('changetaskcss', 'close', dropfunc.task_drag_index.C, dropfunc.task_drag_index.T)
            }   
        },
        columnOrTaskDrop: () => {
            if(dropfunc.dragItemType === 'column'){
                dropfunc.columnDrop()
            }else{
                dropfunc.taskDrop()
            }
        },
    })

    return { ...toRefs(dropfunc) }
}

export default useDrop

