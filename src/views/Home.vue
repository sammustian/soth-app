<template>
  <div class="home">
    <roadMapList></roadMapList>
  </div>
</template>

<script>
// @ is an alias to /src
import roadMapList from '@/components/roadMapList.vue'

export default {
  name: 'Home',
  components: {
    roadMapList
  }
}
</script>
