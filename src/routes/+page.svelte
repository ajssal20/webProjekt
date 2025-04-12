<script>
	import {flip} from 'svelte/animate';
	let { data } = $props();
</script>


<h1>Photo Blog</h1>


<div>
{#each data.articles as article (article.id)}
		<article animate:flip>
            <a href={`articles/${article.id}`}>
                <img src={article.image} alt="img"/>
            </a>
	<p>{article.author} - {article.votes}</p>
	
</article>
{/each}
</div>