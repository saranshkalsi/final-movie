<template>
  <header>
    <RouterLink class="header-link" to="/">
      <img class="logo" src="../assets/logo.png"/>
      <h1>Review Portal</h1>
    </RouterLink>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
header {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
  max-height: 4.50rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo{
  max-width: 3.125rem;
  margin-right: 0.625rem;
}

.header-link {
  text-decoration: none;
  color: white;
  display: flex;

  &:hover, &:focus {
    text-decoration: underline;
  }
}
</style>
