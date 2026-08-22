<template>
    <footer class="bg-accent text-foreground-secondary py-8 px-3">
        <div class="flex justify-center items-center gap-6">

            <p>Thanks For Supporting Small & Local!</p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                class="text-white bg-primary hover:bg-primary-hover p-2 rounded-full hover:text-blue-200 transition"
                aria-label="Facebook">
                <svg fill="currentColor" height="24px" width="24px" version="1.1" id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310"
                    xml:space="preserve">
                    <g id="XMLID_834_">
                        <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064
		c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996
		V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545
		C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703
		c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z" />
                    </g>
                </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                class="text-white bg-primary hover:bg-primary-hover p-2 rounded-full hover:text-blue-200 transition"
                aria-label="Instagram">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor"
                        stroke-width="2" />
                    <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2" />
                    <circle cx="18.5" cy="5.5" r="1.5" fill="currentColor" />
                </svg>
            </a>
        </div>
    </footer>
</template>

<script setup>
// No additional logic needed for this footer component
</script>

<style scoped>
a {
    transition: all 0.3s ease;
}

a:hover {
    transform: translateY(-2px);
}

.fb-icon path {
    fill: var(--color-primary);
    border-radius: 999px;
    /* Facebook blue color */
}
</style>
