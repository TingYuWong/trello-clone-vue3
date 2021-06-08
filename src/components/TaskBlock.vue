<template>
    <div 
    class="task"
    :class="{'shadow': changeTaskCss}"
    draggable="true"
    @dragstart.stop="taskDrag($event, columnIndex, taskIndex)"
    @drop.stop="columnOrTaskDrop($event, columnIndex, taskIndex)"
    @dragenter.prevent="taskDragEnter($event, columnIndex, taskIndex)"
    @dragover.prevent
    @click="goToTask(columnIndex, task.id)"
    >
        <div
         :style="taskStyle(columnName)"
         style="display: flex; justify-content: space-between; align-items: center;">
            <div>{{ task.name }}</div>
            <img @click.stop="removeTask(columnIndex, taskIndex)" src="@/assets/remove.svg" style="width: 15px; cursor: pointer;"/>
        </div>
        <div style="font-size: 15px;">{{ task.description }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import useDrop from '../use/drop'

export default {
    props: ['columnName', 'columnIndex', 'taskIndex', 'task'],
    setup(props, context){
        const { data, taskDrop, columnDrop, columnOrTaskDrop } = useDrop(context)

        return {
            data,
            taskDrop,
            columnDrop,
            columnOrTaskDrop
        }
    },
    data(){
        return {
            changeTaskCss: false,
        }
    },
    computed: {
        ...mapState(['dragItemType', 'task_drag_index', 'column_drag_index'])
    },
    methods: {
        taskDragEnter(e, toColumnIndex, toTaskIndex){
            //column和task如果進入task 就不會觸發column dragenter
            //但column和task都還是會各自觸發task和column dragenter
            e.stopPropagation();
            if(this.dragItemType == 'task'){

                this.$store.commit('MOVE_TASK', {
                    fromColumnIndex: this.task_drag_index.C,
                    toColumnIndex,
                    fromTaskIndex: this.task_drag_index.T,
                    toTaskIndex
                })
                
                // this.$emit('changetaskcss', 'close', this.task_drag_index.C, this.task_drag_index.T)

                this.$store.commit('CHANGE_TASK_DRAG_INDEX', {
                    C: toColumnIndex,
                    T: toTaskIndex
                })

                // 0604 15:50
                this.$emit('changetaskcss', 'open', this.task_drag_index.C, this.task_drag_index.T)
                //

            }

            if(this.dragItemType == 'column'){
                
                // console.log('column in task drag enter', this.column_drag_index, toColumnIndex)
                //這邊要改column css樣式 舊的關掉 新的打開
                if(this.column_drag_index == toColumnIndex){
                    this.$emit('changecolcss', 'open', toColumnIndex)
                }else{
                    this.$emit('changecolcss', 'close', this.column_drag_index)
                    this.$emit('changecolcss', 'open', toColumnIndex)
                }
                //
                
                this.$store.commit('MOVE_COLUMN', { 
                    fromColumnIndex: this.column_drag_index,
                    toColumnIndex 
                })
                this.$store.commit('CHANGE_COLUMN_DRAG_INDEX', toColumnIndex)

            }
            
        },
        //
        taskStyle(title){
            if(title === 'Todo'){
                return { color: '#FF8CAE' }
            }
            if(title == 'In Progress'){
                return { color: '#7884FF' }
            }
            if(title == 'Done'){
                return { color: '#4EC793' }
            }
        },
        taskDrag(e, fromColumnIndex, fromTaskIndex){
            //
            this.$store.commit('RECORD_DRAG_TYPE', 'task')
            this.$store.commit('CHANGE_TASK_DRAG_INDEX', {
                C: fromColumnIndex,
                T: fromTaskIndex
            })
            
            //
            // console.log('task drag')
            e.dataTransfer.effectAllowed = 'move'
            e.dataTransfer.dropEffect = 'move'

        },
        removeTask(columnIndex, taskIndex){
            this.$store.commit('REMOVE_TASK', { columnIndex, taskIndex })
        },
        goToTask(columnIndex, id){
            this.$router.push({name: 'Task', params: {id: id, index: columnIndex}})
        },
        // taskDrop(e, toColumnIndex, toTaskIndex){
        //     console.log('task drop')
        //     const fromColumnIndex = e.dataTransfer.getData('fromColumnIndex')
        //     const fromTaskIndex = e.dataTransfer.getData('fromTaskIndex')

        //     this.$store.commit('MOVE_TASK', {
        //         fromColumnIndex, toColumnIndex, fromTaskIndex, toTaskIndex
        //     })
        // },
        // columnDrop(e, toColumnIndex){
        //     console.log('column drop')
        //     const fromColumnIndex = e.dataTransfer.getData('fromColumnIndex')
        //     this.$store.commit('MOVE_COLUMN', { fromColumnIndex, toColumnIndex })
        // },
        // columnOrTaskDrop(e, toColumnIndex, toTaskIndex){
        //     if(toTaskIndex == undefined){
        //         toTaskIndex = this.data[toColumnIndex].tasks.length
        //     }
        //     const type = e.dataTransfer.getData('type')
        //     if(type === 'column'){
        //         this.columnDrop(e, toColumnIndex)
        //     }else{
        //         this.taskDrop(e, toColumnIndex, toTaskIndex)
        //     }
        // },

    },
}
</script>

<style scoped>
.task {
    background-color: #fff;
    color: #1C2833;
    width: 300px;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px 15px;
    border-radius: 20px;
}
.shadow {
    background-color: lightpink;
}
</style>