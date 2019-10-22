<script>
  import Login from '../Auth/Login.svelte';
</script>

<style>
  .nav-wrapper {
    display: flex;
    justify-content: space-between;
    background-color: brown;
  }
  ul {
    list-style-type: none;
    flex-direction: row;
    display: flex;
  }
  li {
    margin-left: 2rem;
    cursor: pointer;
    color: white;
  }
  .right-item {
    margin-right: 2rem;
  }
  .brand {
    font-weight: bold;
  }
  @media screen and (max-width: 600px) {
    li {
    margin-left: 0;
  }
  }
</style>

<div class="nav-wrapper">
  <ul>
    <li class="brand">Brætspilsministeret</li>
  </ul>
  <ul>
    <Login />
  </ul>
</div>
