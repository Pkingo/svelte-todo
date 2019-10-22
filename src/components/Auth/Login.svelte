<script>
  import Profile from './Profile.svelte';
  import { auth, googleProvider } from '../../config/firebase';
  import { authState } from 'rxfire/auth';

  let user;

  const unsubscribe = authState(auth).subscribe(u => (user = u));

  function login() {
    auth.signInWithPopup(googleProvider);
  }
</script>

<style>
  li {
    margin-right: 2rem;
    cursor: pointer;
    color: white;
  }
</style>

{#if user}
<li on:click="{auth.signOut}">Logout</li>
{:else}
<li on:click="{login}">
  Login
</li>
{/if}
