<script>
	import { enhance } from '$app/forms';
	import { fly, slide } from 'svelte/transition';
	
	export let data;
   export let form;

	let creating = false;
	/**
	 * @type {any[]}
	 */
	let deleting = [];
</script>

<div class="centered">
	<h1>My todos</h1>

   {#if form?.error}
		<p class="error">{form.error}</p>
	{/if}

   <form 
		method="POST"
		action="?/create"
		use:enhance={() => {
			creating = true;

			return async ({ update }) => {
				await update();
				creating = false;
		};
	}}>
	<label>
		add a todo:
		<input
			type="text"
			autocomplete="off"
			on:keydown={async (e) => {
				if (e.key !== 'Enter') return;

				const input = e.currentTarget;
				const description = input.value;
				
				const response = await fetch('/todo', {
					method: 'POST',
					body: JSON.stringify({ description }),
					headers: {
						'Content-Type': 'application/json'
					}
				});

				const { id } = await response.json();

				data.todos = [...data.todos, {
					id,
					description
				}];

				input.value = '';
			}}
		/>
	</label>
</form>

	<ul class="todos">
		{#each data.todos.filter((/** @type {{ id: any; }} */ todo) => !deleting.includes(todo.id)) as todo (todo.id)}
			<li in:fly={{ y: 20 }} out:slide>
				<form 
				method="POST" 
				action="?/delete" 
				use:enhance={() => {
					deleting = [...deleting, todo.id];
					return async ({ update }) => {
						await update();
						deleting = deleting.filter((id) => id !== todo.id);
					};
				}}
				>
               <input type="hidden" name="id" value={todo.id} />
               <span>{todo.description}</span>
               <button aria-label="Mark as complete"></button>
            </form>
			</li>
		{/each}
	</ul>

	{#if creating}
		<span class="saving">saving...</span>
	{/if}

</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	label {
		width: 100%;
	}

	input {
		flex: 1;
	}

	span {
		flex: 1;
	}

	button {
		border: none;
		background: url(./remove.svg) no-repeat 50% 50%;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s;
	}

	button:hover {
		opacity: 1;
	}

	.saving {
		opacity: 0.5;
	}
</style>
