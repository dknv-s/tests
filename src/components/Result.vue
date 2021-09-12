<template>
  <div class="result">
    <div class="question">{{id}}. {{question}}</div>
    <div class="answer">
      <div>Правильный ответ: {{ correctAnswer }}.</div>
      <div>Вы ответили: {{userAnswer}}.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: {
    id: Number,
    question: String,
    correctAnswer: String,
    userAnswer: String,
  },
}
</script>



<style lang="scss">
$line-color: #ced6e0;

.result {
  position: relative;
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1rem;
  border-bottom: 2px dashed $line-color;
  line-height: 2;


  .question {
    font-size: 1.1rem;
  }
  .answer {
    padding-left: 1.2rem;
    font-size: 0.9rem;
  }
}
</style>