<script>
  import PurchaseItem from "./PurchaseItem.svelte";
  import { db } from "../../config/firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let uid;

  let text = "some task";

  const query = db.collection("todos").orderBy("created");
  const purchases = collectionData(query, "id").pipe(startWith([]));

  function add() {
    db.collection("todos").add({
      uid,
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
</script>

<style>
  input {
    display: block;
  }
</style>

<ul>
  {#each $purchases as purchase}
    <PurchaseItem
      {...purchase}
      on:remove={removeItem}
      on:toggle={updateStatus}
      on:editText={updateText} />
  {/each}
</ul>

<input bind:value={text} />

<hr />

<p>
  Tilføj indkøb:
  <strong>{text}</strong>
</p>

<button class="button is-info" on:click={add}>Indkøb</button>
