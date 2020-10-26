<template>
  <div class="home">
    {{ console }}
  </div>
</template>

<script>
import fleaFlickerAPI from "../../util/fleaflicker.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      data: {},
      console: "",
    };
  },
  mounted() {
    this.getPlayoffData('2019');
  },

  methods: {
    getPlayoffData(year) {
      this.data = fleaFlickerAPI.getPlayoffData(year);
    }
  },
};
</script>
