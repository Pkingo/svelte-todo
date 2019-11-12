<script>
  import PurchaseItem from "./PurchaseItem.svelte";
  import { fade } from "svelte/transition";
  import { db } from "../../config/firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import Icon from "svelte-awesome";
  import { spinner } from "svelte-awesome/icons";
  import RandomFact from "../RandomFact/randomfact.svelte";

  let text = "";

  const query = db.collection("todos").orderBy("created");
  const purchases = collectionData(query, "id").pipe(startWith([]));

  function add() {
    db.collection("todos").add({
      text,
      complete: false,
      created: Date.now()
    });
    text = "";
  }

  function updateText(event) {
    const { id, editedText } = event.detail;
    console.log("id", id, "text", editedText);
    db.collection("todos")
      .doc(id)
      .update({ text: editedText });
  }

  function updateStatus(event) {
    const { id, newStatus } = event.detail;
    db.collection("todos")
      .doc(id)
      .update({ complete: newStatus });
  }

  function removeItem(event) {
    const { id } = event.detail;
    db.collection("todos")
      .doc(id)
      .delete();
  }

  function focus(el) {
    el.focus();
  }
  function handleSubmit(event) {
    event.preventDefault();
    add();
  }
</script>

<style>
  input {
    display: block;
  }
  form {
    display: flex;
    margin-top: 1rem;
    justify-content: space-evenly;
  }
  .icon-wrapper {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  table {
    width: 100%;
  }
  button {
    padding: 0 1rem 0 1rem;
    background-color: transparent;
    border: solid 0.1rem green;
  }
</style>

{#if !$purchases.length}
  <div in:fade out:fade class="icon-wrapper">
    <Icon data={spinner} pulse scale="5" />
    <RandomFact />
  </div>
{:else}
  <table>
    {#each $purchases as purchase}
      <PurchaseItem
        {...purchase}
        on:remove={removeItem}
        on:toggle={updateStatus}
        on:editText={updateText} />
    {/each}
  </table>
  <form on:submit={handleSubmit}>
    <input placeholder="Tilføj indkøb" bind:value={text} use:focus />
    <button type="submit">Tilføj</button>
  </form>
{/if}
