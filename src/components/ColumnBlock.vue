<template>
    <div 
    class="column"
    :class="{'highlight' : changeColumnCss}"
    draggable="true"
    @dragstart="columnDrag($event, columnIndex)"
    @drop="columnOrTaskDrop($event, columnIndex)"
    @dragenter.prevent="columnDragEnter($event, columnIndex)"
    @dragover.prevent
    >
        <div style="display: flex;">
            <div :style="columnStyle(column.name)">{{column.name}}</div>
        </div>
        <TaskBlock
        v-for="(task, taskIndex) of column.tasks"
        :ref="`t${taskIndex}`"
        @changecolcss="changeColCss"
        @changetaskcss="changeTaskCss"
        :key="taskIndex"
        :columnName="column.name"
        :columnIndex="columnIndex"
        :taskIndex="taskIndex"
        :task="task"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TaskBlock from '../components/TaskBlock'
import useDrop from '../use/drop'

export default {
    props: ['column', 'columnIndex'],
    components: {
        TaskBlock,
    },
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
            changeColumnCss: false,
        }
    },
    computed: {
        ...mapState(['dragItemType', 'task_drag_index', 'column_drag_index'])
    },
    methods: {
        changeTaskCss(type, CIndex, TIndex){
            this.$emit('changetaskcss', type, CIndex, TIndex)
        },
        changeColCss(type, index){
            this.$emit('changecolcss', type, index)
        },
        columnDragEnter(e, toColumnIndex){
            if(this.dragItemType == 'task'){
                
                if(this.task_drag_index.C != toColumnIndex){
                    this.$store.commit('MOVE_TASK', {
                        fromColumnIndex: this.task_drag_index.C,
                        toColumnIndex,
                        fromTaskIndex: this.task_drag_index.T,
                        toTaskIndex: this.data[toColumnIndex].tasks.length,
                    })
                    // console.log('關掉',this.task_drag_index,'打開',toColumnIndex, this.data[toColumnIndex].tasks.length)
                    this.$store.commit('CHANGE_TASK_DRAG_INDEX', {
                        C: toColumnIndex,
                        T: this.data[toColumnIndex].tasks.length-1
                    })
                }

                // 0604 16:50
                this.$emit('changetaskcss', 'open', this.task_drag_index.C, this.task_drag_index.T)
                //
            }
            if(this.dragItemType == 'column'){

                // console.log('column in column drag enter', this.column_drag_index, toColumnIndex)
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
        columnStyle(title){
            if(title === 'Todo'){
                return { color: '#FF1E5B' }
            }
            if(title == 'In Progress'){
                return { color: '#5261FF' }
            }
            if(title == 'Done'){
                return { color: '#00A55E' }
            }
        },
        columnDrag(e, fromColumnIndex){
            //
            this.$store.commit('RECORD_DRAG_TYPE', 'column')
            this.$store.commit('CHANGE_COLUMN_DRAG_INDEX', fromColumnIndex)
            //
            // console.log('column drag')
            e.dataTransfer.dropEffect = 'move'
            e.dataTransfer.effectAllowed = 'move'

        },
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

    },
}
</script>

<style scoped>
.column {
    background-color: rgb(239, 246, 255);
    color: #FF1E5B;
    margin: 20px;
    padding: 5px 15px 15px 15px;
    border-radius: 10px;
    height: 100vh;
    width: 300px;
}

.highlight {
    background-color: lightblue;
}
</style>