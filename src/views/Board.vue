<template>
  <div>
    <div class="board-title" >Board Title</div>
    <div style="display: flex;">
        <Add />
        <div class="remove-icon"></div>
        <div class="column-wrap">
            <ColumnBlock
            v-for="(column, columnIndex) of data"
            :key="columnIndex"
            :column="column"
            :ref="`c${columnIndex}`"
            @changecolcss="changeColCss"
            @changetaskcss="changeTaskCss"
            :columnIndex="columnIndex"
            />
            <!-- <div 
            class="column"
            v-for="(column, columnIndex) of data"
            :key="columnIndex"
            draggable="true"
            @dragstart="columnDrag($event, columnIndex)"
            @drop="columnOrTaskDrop($event, columnIndex)"
            @dragenter.prevent
            @dragover.prevent
            >
                <div style="display: flex;">
                    <div :style="columnStyle(column.name)">{{column.name}}</div>
                </div>
                <div 
                class="task" 
                v-for="(task, taskIndex) of column.tasks"
                :key="taskIndex"
                draggable="true"
                @dragstart.stop="taskDrag($event, columnIndex, taskIndex)"
                @drop.stop="columnOrTaskDrop($event, columnIndex, taskIndex)"
                @dragenter.prevent
                @dragover.prevent
                @click="goToTask(columnIndex, task.id)"

                >
                    <div
                     :style="taskStyle(column.name)"
                     style="display: flex; justify-content: space-between; align-items: center;">
                        <div>{{ task.name }}</div>
                        <img @click.stop="removeTask(columnIndex, taskIndex)" src="@/assets/remove.svg" style="width: 15px; cursor: pointer;"/>
                    </div>
                    <div style="font-size: 15px;">{{ task.description }}</div>
                </div>
            </div> -->
        </div>
    </div>
    <router-view v-if="$route.name === 'Task'"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Add from '../components/add'
import ColumnBlock from '../components/ColumnBlock'


export default {
    name: 'boardpage',
    components: {
        Add,
        ColumnBlock
    },
    computed: {
        ...mapState(['data', 'task_drag_index'])
    },
    methods: {
        changeTaskCss(type, CIndex, TIndex){
            //因為vue重新綁定ref需要時間 所以在nextTick裡調用ref 以避免需要的ref仍然是undefined的狀態
            /*
            每進入一個task 就移動task 並更新正在拖動的index及css
            把其餘的css全部關掉(這部分希望有更好的解法，目前因為很難找到「來源index」，所以直接把新的node以外的變數都設成false，
            但如果column和task都變多，會造成效能低落)
            */

            if(type == 'open'){
                this.$nextTick(()=>{
                    for(let i=0; i<this.data.length; i++){
                        for(let j=0; j<this.data[i].tasks.length; j++){
                            /*
                            有時候舊的位置就是該column的最後一個task 已經移走了 沒有這個node了 所以會是null
                            null的node 所有的特性會自動被刪除 不需要特別移除class 而且也取不到該變數
                            因此這邊只處理不是null的舊節點
                            */
                            if(this.$refs[`c${i}`].$refs[`t${j}`]){
                                this.$refs[`c${i}`].$refs[`t${j}`].changeTaskCss = false
                            }
                        }
                    }

                    
                    this.$refs[`c${CIndex}`].$refs[`t${TIndex}`].changeTaskCss = true
                })
            }

            //drop 時會使用到 此時的ref絕對存在 所以不需要判斷是否為null
            if(type == 'close'){
                this.$nextTick(()=>{
                    this.$refs[`c${CIndex}`].$refs[`t${TIndex}`].changeTaskCss = false
                })
            }
       
        },
        changeColCss(type, index){
            if(type == 'open'){
                this.openColumnCss(index)
            }
            if(type == 'close'){
                this.closeColumnCss(index)
            }
        },
        openColumnCss(index){
            this.$refs[`c${index}`].changeColumnCss = true
        },
        closeColumnCss(index){
            this.$refs[`c${index}`].changeColumnCss = false
        },
    },
    
}
</script>

<style scoped>
.column-wrap {
    display: flex;
    font-family: 'Mukta', sans-serif;
}

.board-title {
    background-color: #fff;
    color: #101D60;
    border-radius: 20px;
    width: 1370px;
    height: 100px;
    font-family: 'Mukta', sans-serif;
    margin-left: 35px;
    margin-top: 35px;
    font-size: 25px;
    box-sizing: border-box;
    padding-top: 30px;
    text-align: center;
}

</style>

