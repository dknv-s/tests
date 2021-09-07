<template>
  <div>
    Ghbdtn!
<!--    <ul class="mobile-menu-list">-->
<!--      <li v-for="(test, index) of tests" :key="`test-${index}`">-->
<!--        <div class="menu-link" @click="goToTest(test)"><i class="fas fa-circle"></i>{{test.title}}</div>-->
<!--      </li>-->
<!--    </ul>-->
  </div>
</template>

<script>
export default {
  name: "MobileMenu"
}
</script>

<style lang="scss">
.mobile-menu-list {
display: flex;
  align-items: center;
  justify-content: center;
}
</style>