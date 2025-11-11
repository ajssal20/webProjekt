<script>
	import { enhance } from "$app/forms";
	import '../../locales/main.loader.svelte.js'
	import { getRuntimeRx } from '../../locales/main.loader.svelte.js'
		// Importiert das Warning-Komponenten, das eine Fehlermeldung anzeigt, wenn etwas schiefgeht
	import Warning from "$lib/components/Warning.svelte";
	let {form } = $props();
    const __i18n = getRuntimeRx()
</script>


<!-- Hauptcontainer, der die Login-Formular zentriert darstellt -->
<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
<!-- Das Login-Formular -->
	<form
		action="?/login"
		method="POST"
		use:enhance
		class="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
	>
		<h2 class="text-2xl font-bold text-center">Login</h2>


	<!-- Eingabefeld für die E-Mail-Adresse -->
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


		<!-- Eingabefeld für das Passwort -->
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


		<!-- Login-Button -->
		<button
			type="submit"
			class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
		>
			Login
		</button>


		<!-- Wenn ein 'form' Prop vorhanden ist, wird eine Warnung angezeigt -->
		{#if form}
			<Warning message={form.message} />
		{/if}
	</form>
</div>
