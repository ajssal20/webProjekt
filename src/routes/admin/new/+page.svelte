<script>
	import { enhance } from '$app/forms';
</script>

<h1>Create a new article</h1>

<form method="POST" action="?/createArticle" enctype="multipart/form-data" use:enhance>
    <label for="image">Image</label>
	<input type="file" name="image" />

	<label for="description">Description</label>
	<textarea type="text" placeholder="Description" name="description"></textarea>

	<label for="author">Author</label>
	<input type="text" placeholder="Author" name="author" />

	<button type="submit">Create article</button>
</form>