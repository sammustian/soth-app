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
    this.getPlayoffData('2020');
  },

  methods: {
    async getPlayoffData(year) {
      await fleaFlickerAPI.getPlayoffData(year)
      .then((res) => this.data = res);
    }
  },
};
</script>
