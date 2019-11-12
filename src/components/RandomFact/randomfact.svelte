<script>
  import { onMount } from "svelte";
  import { refresh } from "svelte-awesome/icons";
  import Icon from "svelte-awesome";
  let text = "";

  onMount(getText);

  async function getText() {
    console.log("Getting fact...");
    const regex = RegExp("subscrib");
    do {
      const response = await fetch("https://meowfacts.herokuapp.com/");
      const data = await response.json();
      text = data.data[0];
    } while (text === "" || regex.test(text));
  }
</script>

<style>
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 5px;
  }
  p {
    text-align: center;
  }

  span {
    align-self: center;
  }
</style>

<div>
  <p>{text}</p>
  <span on:click={getText}>
    <Icon data={refresh} scale="2" />
  </span>
</div>
