<template>
  <div class="tests-questions">
    <header class="row">
      <exit-modal v-show="isShowModal" @close="toggleModal" :selectedTest="selectedTest"></exit-modal>
      <div class="button-exit" @click="toggleModal">выход</div>
      <div class="title">{{ selectedTest.title }}</div>
      <div class="header-right-block">
        <span class="button-cancel-answers" @click="cancelUserAnswer">Сбросить все ответы</span> <span class="space">|</span>
        <span> {{numberAnswers}} / {{totalQuestions}}</span> <span class="space">|</span>
        <span>{{timeOutput.hours}}:{{timeOutput.minutes}}:{{timeOutput.seconds}}</span>
      </div>
    </header>
    <section class="container-tests">
      <div class="questions" v-for="(question,index) in selectedTest.questions" :key="`question-${index}`">
        <div class="question">{{ question.id }}.{{ question.value }}</div>
        <div class="answers">
          <div class="row-answer" v-for="(answer,index) in question.answers" :key="`answer-${index}`">
            <input class="point-answer" type="radio" :value="answer.value" v-model="question.userAnswer">
            <label>{{ answer.value }}</label>
          </div>
        </div>
      </div>
    </section>
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
      selectedTest: {},
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0
      },
    }
  },
  mounted() {
    this.getTest()
    this.countUpTimer()
  },

  computed: {
    totalQuestions() {
      return this.selectedTest?.questions?.length
    },
    numberAnswers() {
      const length = this.selectedTest?.questions?.length
      if(length !== 0) {
        let count = 0
        for (let i = 0; i < length; i++) {
          if (this.selectedTest.questions[i].userAnswer !== 'Не ответили') {
            count++
          }
        }
        return count
      }
    },
    timeOutput() {
      return {
        hours: ("0" + this.time.hours).slice(-2),
        minutes: ("0" + this.time.minutes).slice(-2),
        seconds: ("0" + this.time.seconds).slice(-2),
      }
    }
  },
  watch: {
    selectedTest(){
      sessionStorage.setItem("selected-test", JSON.stringify(this.selectedTest))
    },
  },
  methods: {
    getTest() {
      let storageTest = sessionStorage.getItem("selected-test")
      if(this.test) {
        this.selectedTest = this.test
      }
      else if(storageTest) {
        this.selectedTest = JSON.parse(storageTest)
      }
    },
    testFinished(selectedTest) {
      this.$router.push({name: `testResult`, params: {test: selectedTest, time: this.timeOutput}})
    },
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    },
    countUpTimer() {
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
    },
    cancelUserAnswer() {
      let i = 0;
      for (i; i < this.test.questions.length; i++) {
        this.test.questions[i].userAnswer = 'Не ответили'
      }
    },
  }
}
</script>

<style lang="scss">
$menu-color: #f1f2f6;
$button-hover-color: #fc0404;
$border-color: #e30303;

.tests-questions {
  width: 100%;
  .title {
    display: flex;
    justify-content: center;
    color: black;
    font-weight: 600;
    flex-grow: 1;
  }
  .container-tests {
    overflow-y: auto;
    width: 100%;
    height: calc(100vh - 116px);
  }
  .questions {
    padding: 0 1rem;
    .question {
      padding: 1rem 0;
    }
  }
  .answers {
    background-color: $menu-color;
    background-color: var(--menu-color);
    display: flex;
    flex-flow: row wrap;
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
      cursor: pointer;
      
      &:checked {
        border: $border-color;
        border: 2px solid var(--border-color);
        background-color: $button-hover-color;
        background-color: var(--button-hover-color);
      }
    }
  }
}
@media screen and (min-width: 710px) and (max-width: 1200px){
  .answer {
    justify-content: flex-start;
    align-content: flex-start;
  }
}
@media screen and (max-width: 710px) {
  .tests-questions {
    .container-tests {
      height: calc(100vh - 168px);
    }
  }
}
</style>