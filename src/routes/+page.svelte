<script>
	import { flip } from 'svelte/animate';
	let { data } = $props();
</script>

<h1 class="text-3xl font-bold text-center my-6">Photo Blog</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
	{#each data.articles as article (article.id)}
		<article animate:flip class="bg-white rounded-2xl shadow-md overflow-hidden">
			<a href={`articles/${article.id}`}>
				<img src={article.image} alt="img" class="w-full h-48 object-cover" />
			</a>
			<div class="p-4">
				<p class="text-sm text-gray-600">{article.author} • ❤️ {article.votes}</p>
			</div>
		</article>
	{/each}
</div>