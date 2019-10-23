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

  tr {
    display: flex;
    align-items: center;
    font-size: 1.2em;
    font-weight: bold;
  }

  td {
    margin-right: auto;
    cursor: pointer;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  .icon-wrapper {
    margin: 0 1rem;
    padding: 5px;
  }
</style>

<tr in:fade out:fade>
  {#if isEditing}
    <td>
      <form on:submit={onSubmit}>
        <input
          type="text"
          bind:value={editedText}
          use:focus
          on:keydown={handleKeydown} />
      </form>
    </td>
  {:else}
    <td on:click={() => (isEditing = true)} class:is-complete={complete}>
      {text}
    </td>
    <td class="icon-wrapper" align="right" on:click={toggleStatus}>
      {#if complete}
        <Icon data={times} />
      {:else}
        <Icon data={check} />
      {/if}
    </td>
  {/if}
  <td class="icon-wrapper" align="right" on:click={remove}>
    <Icon data={trash} />
  </td>
</tr>
