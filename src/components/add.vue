<template>
    <div class="add-btn" @click="handleInput">
        <div style="display: flex; align-items: center;" v-if="!openInput">
            <img src="@/assets/add-button.svg" class="icon"/>
            <span>Add New Task</span>
        </div>
        <div v-else style="display: flex; flex-direction: column; align-items: center;">
            <input type="text" v-model="name" placeholder="title" @click.stop/>
            <input type="text" v-model="description" placeholder="description" @click.stop/>
            <div class="submit-btn" @click.stop="createTask">新增todo事項</div>
        </div>
    </div>
</template>

<script>
import randomID from '../randomID'

export default {
    data(){
        return {
            openInput: false,
            name: '',
            description: '',
        }
    },
    methods: {
        handleInput(){
            this.openInput = !this.openInput
        },
        createTask(){
            if(this.name && this.description){

                this.$store.commit('CREATE_TASK', {
                    id: randomID(),
                    name: this.name,
                    description: this.description,
                });

                this.name = ''
                this.description = ''
                this.handleInput()
            }
        },
    },
}
</script>

<style scoped>
input {
    font-family: 'Mukta', sans-serif;
    box-sizing: border-box;
    height: 30px;
    margin-top: 5px;
    border: none;
    border-radius: 5px;
}
input:focus {
    outline-color: #BA3DED;
}
.submit-btn {
    color: #fff;
    background-color: #BA3DED;
    width: 100px;
    border-radius: 5px;
    padding: 5px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 5px;
}

.icon {
    width: 20px;
    margin-right: 5px;
    filter: drop-shadow(0 0 0.75rem rgba(50, 50, 50, 0.3));
}
.add-btn {
    margin-left: 35px;
    margin-top: 20px;
    background-color: #f3d4ff;
    width: 300px;
    height: 150px;
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #BA3DED;
    cursor: pointer;
    font-family: 'Mukta', sans-serif;
}
</style>