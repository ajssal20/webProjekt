<script>
	import { enhance } from '$app/forms';
    import '../../../locales/main.loader.svelte.js'
    import { getRuntimeRx } from '../../../locales/main.loader.svelte.js'
	let { data } = $props();
    const __i18n = getRuntimeRx()
</script>


<!-- Hauptcontainer mit Padding und Maximalbreite -->
<div class="space-y-10 px-4 max-w-4xl mx-auto">

	<!-- Zurück-Link oben auf der Seite -->
    <div class="flex justify-center">
        <a href="/" class="inline-block text-s text-red-600">
          ← Back
        </a>
      </div>

	  <!-- Iteriert über alle Artikel in den geladenen Daten -->
	  <!-- Iteriert: Zeigt jeden Artikel aus der Liste data.articles einzeln an.-->
	{#each data.articles as article (article.id)}
		<div class="bg-white p-6 rounded-2xl shadow-md space-y-4">

		<!-- Zeigt den Autor des Artikels -->
		<!-- <span>um den Text des Autors stilistisch zu gestalten, ohne die Struktur des Dokuments zu beeinflussen.-->
			<span class="text-sm text-gray-500">{article.author}</span>


	<!-- Bild des Artikels -->
		<!-- Zeigt die bilder an  -->
			<img
				src={article.image}
				alt="Uploaded"
				class="w-full h-64 object-cover rounded-xl"
			/>
			
				<!-- Upvote-Funktion und Like-Zähler -->
			<div class="flex items-center justify-between">

			<!-- Formular zum Hochvoten eines Artikels -->
				<form action="?/upvote" method="POST" use:enhance>

		<!-- Verstecktes Feld mit Artikel-ID – wird zum Identifizieren benötigt -->
			<input type="hidden" name="id" value={article.id} />


			<!-- Upvote-Button mit Like-Icon -->
			<!-- Der Button hat ein "aria-label" für Screenreader, um den Zweck des Buttons zu beschreiben (Like) -->
                    <button type="submit" aria-label="like">
                        <img
                            src="https://ivxbbcf824gpd1su.public.blob.vercel-storage.com/images/like-XUwtn07qsLxjqbmTl12WFvsb2cHGnM"
                            alt="like"
                            class="w-7 h-7 hover:scale-130 transition-transform duration-200"
                        />
                    </button>
				</form>
					<!-- Zeigt die Anzahl der Likes an -->
				<span class="text-gray-600 text-sm">{article.votes} likes</span>
			</div>

		<!-- Beschreibung des Artikels mit Autor -->
			<p class="text-gray-700">
				<span class="font-semibold">{article.author}</span>: {article.description}
			</p>

	<!-- Kommentarbereich -->
			<div>
				<h3 class="font-bold text-lg">Comments</h3>

					<!-- Listet alle Kommentare auf -->
				<div class="space-y-2 mt-2">
					{#each data.comments as comment}
						<p class="text-sm text-gray-700">
							<span class="font-medium">{comment.name}</span>: {comment.text}
						</p>
					{/each}
				</div>

				<!-- Formular zum Hinzufügen eines Kommentars -->
				<form action="?/comment" method="POST" use:enhance class="space-y-3 mt-4">
					<input type="hidden" name="article_id" value={article.id} />

			<!-- Namensfeld für Kommentar -->
					<div>
						<label for="name" class="block text-sm font-medium text-gray-600">Your Name</label>
						<input
							type="text"
							name="name"
							required
							class="mt-1 w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>


<!-- Kommentarfeld -->
					<div>
						<label for="text" class="block text-sm font-medium text-gray-600">Your Comment</label>
						<textarea
							name="text"
							required
							rows="2"
							class="mt-1 w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
						></textarea>
					</div>
					
	<!-- Button zum Absenden des Kommentars -->
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
