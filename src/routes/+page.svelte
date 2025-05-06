<script>
	import { flip } from 'svelte/animate';
	//$props() holt ein Objekt, und { data } speichert nur das, was unter data steht.
	let { data } = $props();
</script>

<!-- Titel des Blogs -->
<h1 class="text-3xl font-bold text-center my-6">Photo Blog</h1>


<!-- Grid-Layout für die Artikel mit unterschiedlicher Anzahl von Spalten je nach Bildschirmgröße -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
	<!-- Iteriert über alle Artikel in 'data.articles' und rendert sie -->
	{#each data.articles as article (article.id)}
		<article animate:flip class="bg-white rounded-2xl shadow-md overflow-hidden">

		<!-- Link zum Artikel, der auf die spezifische Seite des Artikels verweist -->
			<a href={`articles/${article.id}`}>
				<img src={article.image} alt="img" class="w-full h-48 object-cover" />
			</a>
			<!-- Artikel-Beschreibung mit Autor und Anzahl der Votes -->
			<div class="p-4">
				<p class="text-sm text-gray-600">{article.author} • ❤️ {article.votes}</p>
			</div>
		</article>
	{/each}
</div>