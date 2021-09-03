<template>
  <div class="tests-questions">
    <header class="title">{{ testTitle }}</header>
    <div class="container-tests">
      <div class="questions" v-for="(question,index) of questions" :key="`question-${index}`">
        <div class="question">{{ question.id }}.{{ question.value }}</div>
        <div class="answer">
          <div class="row-answer" v-for="(answer,index) in question.answers" :key="`answer-${index}`">
            <input class="point-answer" type="radio" :value="answer.value" v-model="question.userAnswer">

<!--            <input class="point-answer" type="radio" :value="answer.value" v-model="userAnswers[question.id]">-->
            <label>{{ answer.value }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestQuestions",
  props: {
    test: [],
    // questions: [],
    testTitle: String
  }
}
</script>

<style lang="scss">
.tests-questions {
  width: 100%;
  overflow-y: auto;

  .title {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
    padding: 1rem;
    color: black;
    text-transform: capitalize;

    &:before {
       content: '';
       position: absolute;
       left: 0;
       bottom: 0;
       width: 100%;
       height: 1px;
       background: var(--line, darkgray);
     }
  }
  .container-tests {
    overflow-y: auto;
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
</style>