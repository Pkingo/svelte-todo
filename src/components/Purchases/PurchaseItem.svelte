<script>
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import Icon from "svelte-awesome";
  import { check, trash, times } from "svelte-awesome/icons";

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
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
  }

  span {
    margin-right: auto;
    cursor: pointer;
  }
  .icon-wrapper {
    display: flex;
    margin-right: 10px;
    border: 1px solid #000;
    border-radius: 8px;
    padding: 5px;
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
    <span on:click={() => (isEditing = true)} class:is-complete={complete}>
      {text}
    </span>
    <div class="icon-wrapper" on:click={toggleStatus}>
      {#if complete}
        <Icon data={times} />
      {:else}
        <Icon data={check} />
      {/if}
    </div>
  {/if}
  <div class="icon-wrapper" on:click={remove}>
    <Icon data={trash} />
  </div>
</li>
