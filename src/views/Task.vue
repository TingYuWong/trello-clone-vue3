<template>
 <div class="modal" @click.self="goToBoard">
    <div class="content">
        <div>{{ task.name }}</div>
        <div>{{ task.description }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'taskpage',
    props: ['id', 'index'],
    data(){
        return {
            task: '',
        }
    },
    computed: {
        ...mapState(['data']),
    },
    mounted(){
        this.task = this.data[this.index].tasks.find(item => item.id == this.id)
    },
    methods: {
        goToBoard(){
            this.$router.push({ name: 'Board' })
        },
    },
}
</script>

<style scoped>
.content {
    border-radius: 15px;
    background-color: #fff;
    width: 300px;
    height: 150px;
    padding: 20px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(50, 50, 50, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Mukta', sans-serif;
}
</style>