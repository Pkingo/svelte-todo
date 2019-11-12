<script>
  import { onMount } from "svelte";
  let text = "";

  onMount(async function() {
    const response = await fetch("https://meowfacts.herokuapp.com/");
    const data = await response.json();
    console.log(data.data[0]);
    text = data.data[0];
  });
</script>

<p>{text}</p>
