<script>
	import { enhance } from '$app/forms';
	let { data } = $props();
</script>

	{#each data.articles as article (article.id)}
		<div>
						<span >{article.author}</span>
					</div>

				<img
					src={article.image}
					alt="Uploaded"
				/>

				<div>
					<form action="?/upvote" method="POST" use:enhance>
						<input type="hidden" name="id" value={article.id} />
						<button type="submit" aria-label="like">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="red"
								viewBox="0 0 23 23"
								width="26"
								height="26"
							>
								<path
									d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
								/>
							</svg>
						</button>
					</form>
					<span
						>{article.votes} likes</span
					>
				</div>

				<p >
					<span>{article.author}</span>
					{article.description}
				</p>

			<div>
				<h3>Comments</h3>

				<div>
					{#each data.comments as comment}
						<p>
							<span>{comment.name}</span>
							{comment.text}
						</p>
					{/each}
				</div>

				<form action="?/comment" method="POST" use:enhance>
					<input type="hidden" name="article_id" value={article.id} />

					<div>
						<label for="name" >Your Name</label>
						<input
							type="text"
							name="name"
							required
						/>
					</div>

					<div>
						<label for="text">Your Comment</label>
						<textarea
							name="text"
							required
							rows="2"
						></textarea>
					</div>

					<button
						type="submit"
						>Add Comment</button
					>
				</form>
			</div>
	{/each}