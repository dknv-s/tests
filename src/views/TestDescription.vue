<template>
  <div class="test-descriptions">
    <header class="title">
      Описание
    </header>
    <div class="about-test">
      <div class="description">
        {{ selectedTest.description }}
      </div>
      <div class="buttons">
        <router-link class="button-description" :to="{name:'testQuestions', params:{test:selectedTest}}">начать</router-link>
        <router-link class="button-description" to="/">отмена</router-link>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: "TestDescription",
  props: {
    selectedTest: {},
  },
}
</script>

<style scoped lang="scss">
$button-hover-color: #fc0404;
$line-color: #ced6e0;

.test-descriptions {
  width: 100%;

  .title {
    display: flex;
    width: 100%;
    position: relative;
    padding: 1rem;
    color: gray;

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

  .about-test {
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }

  .description {
    margin-bottom: 1rem;
  }
  .buttons {
    display: flex;
    flex-flow: row wrap;
    width: 11rem;
    justify-content: space-between;
  }
  .button-description {
    width: 5rem;
    text-transform: capitalize;
    padding: 0.4rem 0.7rem;
    border: 1px solid black;
    border-radius: 3px;
    text-decoration: none;
    color: black;

    display: flex;
    //justify-content: space-between;
    background-color: white;

    &:hover {
      color: white;
      background-color: $button-hover-color;
      background-color: var(--button-hover-color, red);
      border-color: red;
    }
  }
}
</style>