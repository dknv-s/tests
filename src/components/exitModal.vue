<template>
  <div class="exit-modal" @click="closeModal">
    <div class="background"></div>
    <div class="exit-modal-container" @click.stop>
      <div class="exit-modal-content">
        <span class="modal-header">Вы уверены, что хотите выйти?</span>
        <span class="modal-body">Все результаты будут сброшены</span>
        <div class="buttons-modal">
          <button class="button-modal" @click="exitTest">выход</button>
          <button class="button-modal" @click="closeModal">отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "exitModal",
  props: {
    selectedTest: {}
  },
  data() {
    return {
      isShowModal: false,
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    exitTest() {
      this.cancelUserAnswer()
      this.$router.push({name:`home`});
    },
    cancelUserAnswer() {
      let i = 0;
      for (i; i < this.selectedTest.questions.length; i++) {
        this.selectedTest.questions[i].userAnswer = 'Не ответили'
      }
    },
  }
}
</script>

<style lang="scss">
.exit-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;

  .background {
    background-color: gray;
    opacity: 70%;
    width: 100%;
    height: 100%;
  }

  .exit-modal-container {
    //display: flex;
    //align-items: center;
    //justify-content: center;
    //width: 100%;
    //height: 90%;
  position: fixed;
  top: 30%;
  right: 0;
  left: 0;
  width: auto;
  //margin: 16px;
  opacity: 100%;
}

  .exit-modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px 30px;
    border-radius: 5px;
    color: #000;
    background-color: #fff;
    //transform: translate(0, 0);
    //transition: all 0.3s ease;
    box-sizing: border-box;
    z-index: 20;
    opacity: 100%;
  }

  .modal-header {
    margin-bottom: 1rem;
  }

  .modal-body {
    font-size: 0.75rem;
    margin-bottom: 2.5rem;
  }

  .buttons-modal {
    width: 75%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
  }

  .button-modal {
    display: flex;
    width: 6rem;
    justify-content: center;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.5rem 0.9rem;
    border: 1px solid red;
    border-radius: 3px;
    text-decoration: none;
    color: red;
    background-color: white;

    &:hover {
      color: white;
      background-color: var(--button-hover-color, red);
      border-color: red;
    }
  }
}

@media screen and (max-width: 550px) {
  .button-modal {
    margin-bottom: 1rem;
  }
}
</style>