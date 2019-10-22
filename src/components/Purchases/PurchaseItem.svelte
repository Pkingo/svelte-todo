<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function remove() {
    dispatch("remove", { id });
  }

  function onSubmit(event) {
    event.preventDefault();
    dispatch("editText", { id, editedText });
    isEditing = false;
  }

  function toggleStatus() {
    let newStatus = !complete;
    dispatch("toggle", {
      id,
      newStatus
    });
  }

  function focus(el) {
    el.focus();
  }

  export let id;
  export let text;
  export let complete;
  let editedText = text;
  let isEditing = false;
  const handleKeydown = event => {
    if (event.key === "Escape") {
      isEditing = false;
    }
  };
</script>

<style>
  .is-complete {
    text-decoration: line-through;
    color: green;
  }

  li {
    display: flex;
    font-size: 1.2em;
    font-weight: bold;
  }

  span {
    margin-right: auto;
    cursor: pointer;
  }
</style>

<li in:fade out:fade>
  {#if isEditing}
    <span>
      <form on:submit={onSubmit}>
        <input
          type="text"
          bind:value={editedText}
          use:focus
          on:keydown={handleKeydown} />
      </form>
    </span>
  {:else}
    <span
      on:click={() => (isEditing = true)}
      class:is-complete={() => complete}>
      {text}
    </span>
    {#if complete}
      <button class="is-button" on:click={toggleStatus}>✔️</button>
    {:else}
      <button class="is-button" on:click={toggleStatus}>❌</button>
    {/if}
  {/if}
  <button class="is-button" on:click={remove}>️️️ 🗑️️</button>
</li>
