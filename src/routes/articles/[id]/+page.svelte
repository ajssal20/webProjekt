<script>
	import { enhance } from '$app/forms';
	let { data } = $props();
</script>

<div class="space-y-10 px-4 max-w-4xl mx-auto">
	{#each data.articles as article (article.id)}
		<div class="bg-white p-6 rounded-2xl shadow-md space-y-4">
			<span class="text-sm text-gray-500">{article.author}</span>

			<img
				src={article.image}
				alt="Uploaded"
				class="w-full h-64 object-cover rounded-xl"
			/>

			<div class="flex items-center justify-between">
				<form action="?/upvote" method="POST" use:enhance>
					<input type="hidden" name="id" value={article.id} />
                    <button type="submit" aria-label="like">
                        <img
                            src="https://ivxbbcf824gpd1su.public.blob.vercel-storage.com/images/like-XUwtn07qsLxjqbmTl12WFvsb2cHGnM"
                            alt="like"
                            class="w-7 h-7 hover:scale-130 transition-transform duration-200"
                        />
                    </button>
				</form>
				<span class="text-gray-600 text-sm">{article.votes} likes</span>
			</div>

			<p class="text-gray-700">
				<span class="font-semibold">{article.author}</span>: {article.description}
			</p>

			<div>
				<h3 class="font-bold text-lg">Comments</h3>
				<div class="space-y-2 mt-2">
					{#each data.comments as comment}
						<p class="text-sm text-gray-700">
							<span class="font-medium">{comment.name}</span>: {comment.text}
						</p>
					{/each}
				</div>

				<form action="?/comment" method="POST" use:enhance class="space-y-3 mt-4">
					<input type="hidden" name="article_id" value={article.id} />

					<div>
						<label for="name" class="block text-sm font-medium text-gray-600">Your Name</label>
						<input
							type="text"
							name="name"
							required
							class="mt-1 w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>

					<div>
						<label for="text" class="block text-sm font-medium text-gray-600">Your Comment</label>
						<textarea
							name="text"
							required
							rows="2"
							class="mt-1 w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
						></textarea>
					</div>

					<button
						type="submit"
						class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition"
					>
						Add Comment
					</button>
				</form>
			</div>
		</div>
	{/each}
</div>