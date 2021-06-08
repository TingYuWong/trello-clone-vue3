<template>

  <div
   v-for="(item, index) of dragList"
   :key="index"
   draggable="true"
   @dragstart="onDrag($event, index)"
   @dragenter.prevent
   @dragover.prevent
  >
    {{ item }}
  </div>
  
  <div 
   class="dropFrame"
   @drop="onDrop"
   @dragenter.prevent
   @dragover.prevent
  >
    <div
    v-for="(item, index) of dropList"
    :key="index"
    >
      {{ item }}
    </div>
  </div>


</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      dragList: ['drag-1'],
      dropList: ['drop-1'],
    }
  },
  methods: {
    onDrag(e, index){
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'

      e.dataTransfer.setData('from-index', index)
    },
    onDrop(e){
      const index = e.dataTransfer.getData('from-index')
      const data = this.dragList.splice(index, 1)[0]

      this.dropList.push(data)
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropFrame {
  border: 5px dashed rgb(255, 61, 100);
  width: 300px;
  height: 150px;
  border-radius: 10px;
}
</style>
