<script>
	import { enhance } from '$app/forms';
</script>

<div class="max-w-xl mx-auto p-6">
	<h1 class="text-3xl font-bold mb-6">Create a new article</h1>

	<form
		method="POST"
		action="?/createArticle"
		enctype="multipart/form-data"
		use:enhance
		class="space-y-4 bg-white p-6 shadow rounded"
	>
		<div>
			<label for="image" class="block font-medium mb-1">Image</label>
			<input
				type="file"
				name="image"
				id="image"
				class="w-full border px-3 py-2 rounded"
			/>
		</div>

		<div>
			<label for="description" class="block font-medium mb-1">Description</label>
			<textarea
				name="description"
				id="description"
				rows="3"
				placeholder="Description"
				class="w-full border px-3 py-2 rounded resize-none"
				required
			></textarea>
		</div>

		<div>
			<label for="author" class="block font-medium mb-1">Author</label>
			<input
				type="text"
				name="author"
				id="author"
				placeholder="Author"
				class="w-full border px-3 py-2 rounded"
				required
			/>
		</div>

		<button
			type="submit"
			class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
		>
			Create article
		</button>
	</form>
</div>