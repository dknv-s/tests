<template>
  <div id="app">
    <div id="slideActiveMenu" class="menu">
      <div class="header-menu">
        <!-- часть логики по изменению мобильного/десктопного вида лучше вынести в css и использовать media query -->
        <i v-show="!isMobileView" class="fas fa-arrow-left menu-icon" @click="closeMenu"></i>
        <i v-show="!isMobileView" v-if="!menuVisible" class="fas fa-bars open-icon" @click="openMenu"></i>
        <i v-show="isMobileView" v-if="!menuVisible" class="fas fa-bars menu-icon" @click="changeMenuVisible"></i>
        <i v-show="isMobileView" v-if="menuVisible" class="fas fa-times menu-icon" @click="changeMenuVisible"></i>
        <span class="menu-title">тесты</span>
      </div>
      <div v-show="menuVisible">
        <ul :class="{'menu-list': !isMobileView, 'mobile-menu-list': isMobileView}">
          <li v-for="(test, index) of tests" class="menu-item" :key="`test-${index}`">
            <div class="menu-link" @click="goToTest(test)"><i class="fas fa-circle"></i>{{test.title}}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- id лучше не использовать, но если очень нужен прямой доступ к dom-элементу использовать ref -->
    <div id="slideHiddenMenu" class="menu-hidden">
      <i class="fas fa-bars open-icon" @click="openMenu"></i>
    </div>
    <div v-if="!isMobileView" :class="{'content-menu-active': menuVisible, 'content-menu-hidden': !menuVisible}">
      <router-view/>
    </div>
    <div v-if="isMobileView" v-show="!menuVisible" :class="{'content-menu-active': menuVisible, 'content-menu-hidden': !menuVisible}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Home from './views/Home.vue'
import MobileMenu from './views/MobileMenu.vue'
import { tests } from './data/Tests.js'

export default {
  name: 'App',
  components: {
    Home,
    MobileMenu
  },
  data() {
    return {
      menuVisible: true,
      tests: tests,
      isMobileView: false,
      width: 0,
    }
  },
  created() {
    this.handleView();
    // при добавление нативных обработчиков нужно не забывать отписываться в beforeDestroy
    // иначе чревато утечкой памяти
    window.addEventListener('resize', this.handleView);
  },
  methods: {
    changeMenuVisible() {
      this.menuVisible = !this.menuVisible;
    },
    closeMenu() {
      /* лучше вынести эту логику в шаблон, вместо ручного изменения dom элементов */
      slideActiveMenu.classList.toggle("menu-slide-out");
      slideHiddenMenu.classList.toggle("menu-hidden-slide-in");
      this.changeMenuVisible()
    },
    openMenu() {
      /* то же что и в closeMenu */
      slideActiveMenu.classList.toggle("menu-slide-out");
      slideHiddenMenu.classList.toggle("menu-hidden-slide-in");
      this.changeMenuVisible()
    },
    goToTest(test) {
      if(test.id) {
        this.$router.push({name: 'testDescription',
          params:{testId: test.id, selectedTest: test}})

        if(this.isMobileView)
        {
          this.menuVisible = false
        }
      }
    },
    handleView() {
      /* лучше пользоваться css media query */
      if(window.innerWidth <= 550) {
        this.isMobileView = true;
        this.menuVisible = false;
      } else {
        this.isMobileView = false;
        this.menuVisible = true;
      }
    },
  }
}
</script>
<style lang="scss">
$button-hover-color: #fc0404;
$line-color: #ced6e0;
$menu-color: #f1f2f6;
$icons-color: #a4b0be;

.line {
  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: $line-color;
    background: var(--line-color, darkgray);
  }
}
#app {
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  position: relative;

  .menu {
    margin: 0;
    padding: 0;
    width: 200px;
    position: fixed;
    height: 100%;
    overflow: auto;
    background-color: $menu-color;
    background-color: var(--menu-color, lightgray);
    top: 0;
    left: 0;
    color: black;
    z-index: 9;
    transition: 0.5s;
    transform: translateX(0);

    .header-menu {
      display: flex;
      width: 100%;
      height: 54px;
      position: relative;
      @extend .line;
    }

    .open-icon {
      text-align: left;
      cursor: pointer;
      position: absolute;
      color: $icons-color;
      color: var(--icons-color, gray);
      left: 10.5rem;
      top: 1.1rem;
      z-index: 20;
    }
  }

  .menu-slide-out {
    transform: translateX(-75%);
  }

  .menu-icon {
    text-align: left;
    cursor: pointer;
    position: absolute;
    color: $icons-color;
    color: var(--icons-color, gray);
    left: 1rem;
    top: 1.1rem;
    z-index: 10;
  }

  .menu-title {
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    position: relative;
    width: 100%;
    text-align: center;
    font-weight: 600;
    padding: 1rem 0;
  }

  .menu-hidden {
    width: 50px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    color: black;
    transition: 0.3s ease-out 0.3s;
    background-color: $menu-color;
    background-color: var(--menu-color, lightgray);
    transform: translateX(-100%);

    .open-icon {
      text-align: left;
      cursor: pointer;
      position: absolute;
      color: $icons-color;
      color: var(--icons-color, gray);
      left: 1rem;
      top: 1.1rem;
      z-index: 10;
    }
  }

  .menu-hidden-slide-in {
    transform: translateX(0);
  }

  .menu-list {
    text-align: left;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    list-style-type: none;
  }

  .mobile-menu-list {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 0.5rem;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 54px);;
  }

  .menu-item {
    display: flex;
    cursor: pointer;
  }

  .menu-link {
    text-decoration: none;
    width: 100%;
    color: black;
    padding: 0.5rem;
    border-radius: 5px;

    &:hover {
      background-color: $button-hover-color;
      background-color: var(--button-hover-color, red);
      color: white;
    }
  }

  .fa-circle {
    //align-items: center;
    height: 100%;
    font-size: 0.6rem;
    margin-right: 0.5rem;
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
    transition: 0.3s ease-out;
  }

  .content-menu-hidden {
    @extend .content;
    margin-left: 54px;
  }
}
@media screen and (max-width: 550px) {
  #app {
    flex-direction: column;
    .menu {
      width: 100%;
      position: relative;
    }
    .content {
      height: calc(100vh - 54px);
      margin-left: 0;
    }
  }
}
</style>
