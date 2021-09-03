<template>
  <div class="button-footer">
    <button class="o-button">{{ textButton }}</button>
  </div>
</template>

<script>
export default {
  name: "ButtonFooter",
  props: {
    textButton: String,
  }
}
</script>

<style lang="scss">
.button-footer {
  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 1rem;

&:before {
   content: '';
   position: absolute;
   left: 0;
   top: 0;
   width: 100%;
   height: 1px;
   background: var(--line, darkgray);
 }
  .o-button{
    font-size: 1rem;
    border: 1px solid red;
    padding: 0.6rem 1.5rem;
    border-radius: 3px;
    color: var(--button-hover-color);
    cursor: pointer;
    background-color: white;
  }
}
</style>