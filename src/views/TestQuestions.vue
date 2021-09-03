<template>
  <div class="tests-questions">
    <header class="row">
      <exit-modal v-show="isShowModal" @close="toggleModal" :selectedTest="selectedTest"></exit-modal>
      <div class="button-exit" @click="toggleModal">выход</div>
      <div class="title">{{ selectedTest.title }}</div>
      <div class="header-right-block">
        <span>Сбросить все ответы</span> <span class="space">|</span>
        <span> {{numberAnsweredQuestions}} / {{totalQuestions}}</span> <span class="space">|</span>
        <span>{{timeOutput.hours}}:{{timeOutput.minutes}}:{{timeOutput.seconds}}</span>
      </div>
    </header>
<!--    <div class="block-questions">-->
      <div class="container-tests">
        <div class="questions" v-for="(question,index) in selectedTest.questions" :key="`question-${index}`">
          <div class="question">{{ question.id }}.{{ question.value }}</div>
          <div class="answer">
            <div class="row-answer" v-for="(answer,index) in question.answers" :key="`answer-${index}`">
              <input class="point-answer" type="radio" :value="answer.value" v-model="question.userAnswer">
              <label>{{ answer.value }}</label>
            </div>
          </div>
        </div>
      </div>
<!--    </div>-->
    <button-footer :textButton="textButton" @click.native="testFinished(selectedTest)"></button-footer>
  </div>
</template>

<script>
import ButtonFooter from "../components/ButtonFooter";
import exitModal from "../components/exitModal"

export default {
  name: "TestQuestions",
  components: {
    ButtonFooter,
    exitModal
  },
  props: {
    test: {},
  },
  data() {
    return {
      textButton: 'Завершить',
      isShowModal: false,
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      countDown: 0
    }
  },
  created() {
    this.storageData()
    this.countUpTimer()
  },
  computed: {
    selectedTest() {
      if(this.test) {
        return this.test
      }
      else {
        return JSON.parse(sessionStorage.getItem("selected-test"))
      }
    },
    totalQuestions() {
      return this.selectedTest.questions.length
    },
    numberAnsweredQuestions() {
      let i = 0
      let count = 0
      for (i; i < this.selectedTest.questions.length; i++) {
        if (this.selectedTest.questions[i].userAnswer !== 'Не ответили') {
          count++
        }
      }
      return count
    },
    timeOutput() {
      return {
        hours: ("0" + this.time.hours).slice(-2),
        minutes: ("0" + this.time.minutes).slice(-2),
        seconds: ("0" + this.time.seconds).slice(-2),
      }
    }
  },
  methods: {
    storageData () {
      this.selectedTest = this.test
      sessionStorage.setItem("selected-test", JSON.stringify(this.selectedTest))
    },
    testFinished(selectedTest) {
      this.$router.push({name: `testResult`, params: {test: selectedTest, time: this.timeOutput}})
    },
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
    countUpTimer() {
      // if (this.time.seconds <= 59) {
        setTimeout(() => {
          this.time.seconds += 1

          this.countUpTimer()
        }, 1000)
        if (this.time.seconds > 59) {
          this.time.minutes += 1
          this.time.seconds = 0
        }
        if (this.time.minutes > 59) {
          this.time.hours += 1
          this.time.minutes = 0
        }
      // }
    }
  }
}
</script>

<style lang="scss">
.tests-questions {
  width: 100%;

  .title {
    display: flex;
    justify-content: center;
    width: 100%;
    color: black;
    font-weight: 600;
  }

  .row {
    position: relative;
    padding: 1rem;

    .button-exit {
      cursor: pointer;
      position: absolute;
      left: 1rem;
      text-transform: capitalize;
      color: var(--test-result-color, #acabab)
    }
    .header-right-block {
      display: flex;
      flex-flow: row nowrap;
      position: absolute;
      right: 1rem;
      top: 1rem;
      color: var(--test-result-color, #acabab);

      .space {
        padding: 0 0.5rem;
        color: black;
      }
    }

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

  .container-tests {
    overflow-y: auto;
    width: 100%;
    height: 87%;
  }

  .questions {
    padding: 0 1rem;

    .question {
      padding: 1rem 0;
    }

  }
  .answer {
    background-color: var(--menu-color);
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    flex-grow: 1;

    .row-answer {
      padding: 0.9rem 2rem;
    }

    .point-answer {
      appearance: none;
      border-radius: 50%;
      width: 16px;
      height: 16px;

      border: 2px solid #999;
      transition: 0.2s all linear;
      outline: none;
      margin-right: 0.3rem;
      position: relative;


      &:checked {
        border: 2px solid var(--border-color);
        background-color: var(--button-hover-color);
      }
    }
  }
}
@media screen and (max-width: 1200px){
  .answer {
    justify-content: flex-start;
    align-content: flex-start;
  }
}
//.test2-questions {
  //position: relative;

  //.block-button {
  //  display: flex;
  //  width: 100%;
  //  position: fixed;
  //  bottom: 0;
  //  padding: 1rem;
  //
  //  &:before {
  //    content: '';
  //    position: absolute;
  //    left: 0;
  //    top: 0;
  //    width: 100%;
  //    height: 1px;
  //    background: var(--line, darkgray);
  //  }
  //}
  //.button-finished {
  //  border: 1px solid red;
  //  text-transform: capitalize;
  //  padding: 0.6rem 1.5rem;
  //  border-radius: 3px;
  //  color: var(--button-hover-color);
  //  cursor: pointer;
  //}
//}
</style>