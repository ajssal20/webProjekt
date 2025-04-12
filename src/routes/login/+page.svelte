<script>
	import { enhance } from "$app/forms";
	import Warning from "$lib/components/Warning.svelte";
	export let form;
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
	<form
		action="?/login"
		method="POST"
		use:enhance
		class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
	>
		<h2 class="text-2xl font-bold text-center">Login</h2>

		<div>
			<label for="email" class="block text-sm font-medium text-gray-700">E-Mail</label>
			<input
				type="text"
				name="email"
				id="email"
				required
				class="mt-1 w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				required
				class="mt-1 w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<button
			type="submit"
			class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
		>
			Login
		</button>

		{#if form}
			<Warning message={form.message} />
		{/if}
	</form>
</div>