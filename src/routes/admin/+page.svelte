<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	let { data } = $props();
</script>

<div class="max-w-4xl mx-auto p-4">
	<h1 class="text-3xl font-bold mb-4">Articles</h1>
    <div class="flex justify-center">
        <a href="/" class="inline-block text-s text-red-600">
          ← Back to Home
        </a>
      </div>

	<form action="/logout?/logout" method="post" class="mb-4">
		<button type="submit" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Logout</button>
	</form>

	<a href="/admin/new" class="text-blue-600 hover:underline mb-8 inline-block">+ Create a new article</a>

	{#each data.articles as article (article.id)}
		<div transition:slide class="bg-white shadow rounded-lg p-4 mb-6 hover:shadow-md transition">
			<img src={article.image} alt="img" class="w-full h-64 object-cover rounded mb-4" />
			
			<p class="text-gray-800 mb-2"><strong>ID:</strong> {article.id}</p>
			<p class="text-gray-700 mb-1"><strong>Description:</strong> {article.description}</p>
			<p class="text-gray-600 mb-1"><strong>Author:</strong> {article.author}</p>
			<p class="text-gray-600 mb-4"><strong>Votes:</strong> {article.votes}</p>

			<form action="?/deleteArticle" method="POST" use:enhance>
				<input type="hidden" name="id" value={article.id} />
				<button type="submit" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
			</form>
		</div>
	{/each}
</div>