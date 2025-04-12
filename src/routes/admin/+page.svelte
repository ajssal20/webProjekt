<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	let { data } = $props();
</script>

<div>
	<h1>Articles</h1>

	<a href="/admin/new">Create a new article</a>
</div>

{#each data.articles as article (article.id)}
	<div transition:slide>
		<p>{article.id} - {article.description} - {article.author} - {article.votes}</p>

		<form action="?/deleteArticle" method="POST" use:enhance>
			<input type="hidden" name="id" value={article.id} />
			<button type="submit">Delete</button>
		</form>
	</div>
{/each}