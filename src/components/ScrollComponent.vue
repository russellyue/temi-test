<template>
  <div>
    <h1>
      Click to "mark" to mark
    </h1>
    <div
      class="list-container"
      ref="list-container"
      @scroll="onScroll"
    >
      <ul ref="list" id="list">
        <li
          v-for="(item,index) in list"
          :key="index"
          :class="{'marked':item.isMarked}"
        >
          {{item.id}}-{{item.name}}
          ->
          <span class="mark-label" @click.stop="mark(index)">
            mark
          </span>
        </li>
      </ul>
      <div v-show="loading">
        loading...
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    // when distance less than 20 then call the onScroll func
    distance: {
      type: Number,
      default: 20,
    },
    delay: {
      type: Number,
      default: 100,
    },
    scrollReq: {
      type: Function,
      default: async () => {},
      requred: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
    };
  },
  methods: {
    mark(index) {
      const [item] = this.list.splice(index, 1);
      item.isMarked = true;
      this.list.unshift(item);
    },
    saveListToLocalStorage() {
      localStorage.setItem('list', JSON.stringify(this.list));
    },
    async setList() {
      this.loading = true;
      const datalist = await this.scrollReq();
      this.list.push(...datalist);
      this.loading = false;
    },
    fnScroll() {
      const { scrollHeight, clientHeight, scrollTop } = this.$refs['list-container'];
      const currentDistance = scrollHeight - clientHeight - scrollTop;
      if (currentDistance < this.distance) {
        this.setList();
      }
    },

    // throttle function
    throttle(fn, delay) {
      let timer = null;
      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn();
        }, delay);
      };
    },
  },
  created() {
    // set onScroll function
    this.onScroll = this.throttle(this.fnScroll, this.delay);
    // get list from localStorage
    this.list = JSON.parse(localStorage.getItem('list')) ?? [];
    if (this.list.length === 0) {
      this.setList();
    }
  },
  mounted() {
    // const { clientHeight } = this.$refs['list-container'];
    // this.$refs['list-container'].scrollTop = clientHeight;
    window.onbeforeunload = () => {
      // save list to localStorage
      this.saveListToLocalStorage();
    };
    this.$once('hook:beforeDestroy', () => {
      this.saveListToLocalStorage();
      window.onbeforeunload = null;
    });
  },
};
</script>

<style scoped>
.list-container {
  height: 500px;
  background: #AAAA;
  overflow: auto;
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
li {
  list-style: none;
}
.marked {
  /* background: red; */
  color: red;
}
.mark-label:hover {
  cursor: pointer;
  background: #ffffff;
}
</style>
