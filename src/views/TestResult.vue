<template>
  <div class="test-result">
    <header class="row">
      <exit-modal v-show="isShowModal" @close="toggleModal" :selectedTest="selectedTest"></exit-modal>
      <div class="button-exit" @click="toggleModal">выход</div>
      <div class="title">{{ selectedTest.title }}</div>
      <div class="header-right-block">
        <span  class="button-cancel-answers" @click="cancelUserAnswer">Сбросить все ответы</span> <span class="space">|</span>
        <span> {{numberCorrectAnswer}} / {{totalQuestions}}</span> <span class="space">|</span>
        <span>{{timeSpent.hours}}:{{timeSpent.minutes}}:{{timeSpent.seconds}}</span>
      </div>
    </header>
    <section class="container-results">
      <span class="text-test-finish">Тест завершён</span>
      <span class="number-correct-answer">Вы ответили на {{numberCorrectAnswer}} из {{totalQuestions}} вопросов.</span>
      <span class="text-your-answers">Ваши ответы</span>
      <div v-for="(question,index) in selectedTest.questions" :key="`q-${index}`">
        <result
            :id="question.id"
            :question="question.value"
            :correctAnswer="question.correctAnswer"
            :userAnswer="question.userAnswer">
        </result>
      </div>
    </section>
    <button-footer class="footer" :textButton="textButton" @click.native="openTestAgain(selectedTest)"></button-footer>
  </div>
</template>

<script>
import ButtonFooter from "../components/ButtonFooter"
import exitModal from "../components/exitModal"
import Result from "../components/Result"

export default {
  name: "TestResult",
  components: {
    exitModal,
    ButtonFooter,
    Result,
  },
  props: {
    test: {},
    time: {},
  },
  data() {
    return {
      numberCorrectAnswer: 0,
      textButton: 'Пройти еще раз',
      isShowModal: false,
    }
  },
  computed: {
    totalQuestions() {
     return this.selectedTest.questions.length
    },
    selectedTest() {
      if(this.test) {
        return this.test
      }
      else {
        return JSON.parse(sessionStorage.getItem("selected-test"))
      }
    },
    timeSpent() {
      if(this.time) {
        return this.time
      }
      else {
        return JSON.parse(sessionStorage.getItem("time-spent"))
      }
    }
  },
  created() {
    this.storageData()
    this.countCorrectAnswer()
  },
  methods: {
    storageData () {
      this.selectedTest = this.test
      this.timeSpent = this.time
      sessionStorage.setItem("selected-test", JSON.stringify(this.selectedTest))
      sessionStorage.setItem("time-spent", JSON.stringify(this.timeSpent))
    },
    countCorrectAnswer() {
      let i = 0;
      for (i; i < this.selectedTest.questions.length; i++) {
        if (this.selectedTest.questions[i].correctAnswer === this.selectedTest.questions[i].userAnswer) {
          this.numberCorrectAnswer++
        }
      }
    },
    cancelUserAnswer() {
      let i = 0;
      for (i; i < this.selectedTest.questions.length; i++) {
        this.selectedTest.questions[i].userAnswer = 'Не ответили'
      }
    },
    openTestAgain(selectedTest) {
      this.cancelUserAnswer()
      this.$router.push({name:'testQuestions', params:{test: selectedTest}})
    },
    toggleModal() {
      this.isShowModal = !this.isShowModal;
    }
  }
}
</script>

<style lang="scss">
$test-result-color: #acabab;
$line-color: #ced6e0;

.test-result {
  width: 100%;

  .title {
    display: flex;
    justify-content: center;
    flex-grow: 1;
    color: black;
    font-weight: 600;
  }

  .container-results {
      overflow-y: auto;
      width: 100%;
      height: 85%;
  }
  .text-test-finish {
    display: flex;
    justify-content: center;
    font-size: 1.9rem;
    margin-bottom: 0.8rem;
  }

  .number-correct-answer {
    display: flex;
    justify-content: center;
    font-size: 1rem;
    color: $test-result-color;
    color: var(--test-result-color, #acabab);
  }

  .text-your-answers {
    padding-left: 1rem;
    font-size: 1.1rem;
    color: $test-result-color;
    color: var(--test-result-color, #acabab);
  }

  .footer {
    height: 60px;
  }
}
@media screen and (max-width: 550px) {
  .test-result {
    .number-correct-answer {
      margin-bottom: 0.5rem;
    }

    .container-results {
      height: 80%;
    }
  }

}
</style>