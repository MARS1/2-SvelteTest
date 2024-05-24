<script>
	export let data;
	import { message } from "$lib/message.js";
</script>

<h1>blog</h1>

{#each data.summaries as { slug, title }}
	<ul>
		<li><a href="/blog/{slug}">{title}</a></li>
	</ul>
{/each}

<p>{message}</p>

