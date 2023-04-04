<template>
    <main class="w-screen h-screen bg-white dark:bg-black">
        <header class="w-screen h-16 p-4 bg-teal-500 flex flex-row items-center">
            <img class="w-8 h-8" src="/favicon.ico">

            <nav>
                <ul class="flex flex-row">
                    <li>
                        <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/about">About</nuxt-link>
                    </li>
                </ul>
            </nav>
        </header>

        <slot></slot>
    </main>
</template>