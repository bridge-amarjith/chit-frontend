<template>
  <div class="welcome-text">Dashboard page</div>
</template>

<script>
export default {
  middleware: ['auth']
};
</script>

<style>
.welcome-text {
  font-family: "Lucida Console", "Courier New", monospace;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>