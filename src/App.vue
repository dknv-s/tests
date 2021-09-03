<template>
  <div id="app">
    <div class="menu-active" v-if="menuVisible">
      <div class="header-menu">
        <i class="fas fa-arrow-left icon-arrow" @click="changeMenuVisible"></i>
        <div class="title">тесты</div>
      </div>
        <ul class="menu-list">
          <li v-for="(test,index) of tests" class="menu-item" :key="`test-${index}`">
            <div class="menu-link" @click="goToTest(test)"><i class="fas fa-circle"></i>{{test.title}}</div>
            <!--            <router-link class="menu-link" :to="`/${test.name}-description`"><i class="fas fa-circle"></i>{{test.title}}</router-link>-->
          </li>
        </ul>
    </div>
    <div v-if="!menuVisible" class="menu-hidden">
      <i class="fas fa-bars icon-hidden" @click="changeMenuVisible"></i>
    </div>
    <div :class="{'content-menu-active': menuVisible, 'content-menu-hidden': !menuVisible,}">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Home from './views/Home.vue'
import { tests } from './data/Tests.js'

export default {
  name: 'App',
  components: {
    Home,
  },
  data() {
    return {
      menuVisible: true,
      tests: tests,
    }
  },
  methods: {
    changeMenuVisible() {
      this.menuVisible = !this.menuVisible;
    },
    goToTest(test) {
      if (test.id) {
        this.$router.push({name:'testDescription', params:{selectedTest:test}})
      }
    },
  }
}
</script>
<style lang="scss">

#app {
  display: flex;
  flex-direction: row;
  //text-align: center;
  overflow-x: hidden;

  .menu-active {
    display: flex;
    flex-direction: column;
    background-color: var(--menu-color, lightgray);
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    color: black;
    z-index: 9;

    .header-menu {
      display: flex;
      width: 100%;
      position: relative;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: var(--line-color, darkgray);
      }

    }
    .icon-arrow {
      display: flex;
      text-align: left;
      cursor: pointer;
      position: absolute;
      color: var(--icons-color, gray);
      left: 1rem;
      top: 1rem;
      z-index: 10;
    }

    .title {
      text-transform: uppercase;
      position: relative;
      width: 100%;
      text-align: center;
      font-weight: 600;
      padding: 1rem 0;
    }
    .menu-list {
      text-align: left;
      padding: 0.5rem;
      margin-bottom: 0.5rem;
      list-style-type: none;
    }
    .menu-item {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .menu-link {
      text-decoration: none;
      width: 100%;
      color: black;
      padding: 0.5rem;
      border-radius: 5px;

      &:hover {
        background-color: var(--button-hover-color, red);
        color: white;
      }
    }
    .fa-circle {
      font-size: 0.6rem;
      margin-right: 0.5rem;
    }
  }

  .menu-hidden {
    width: 40px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    color: black;
    transition: 0.5s;
    background-color: var(--menu-color, lightgray);


    .icon-hidden {
      position: absolute;
      margin-right: 1rem;
      color: var(--icons-color, gray);
      left: 0.7rem;
      top: 1rem;
      z-index: 10;
    }
  }

  .content {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 98vh;
  }
  .content-menu-active {
    @extend .content;
    margin-left: 200px;
  }

  .content-menu-hidden {
    @extend .content;
    margin-left: 40px;
  }
}

@media screen and (max-width: 1200px) {

}
</style>
