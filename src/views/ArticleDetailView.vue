<script setup>
import { ref, onMounted, shallowRef, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const slug = ref(route.params.slug)
const article = shallowRef(null)
const loading = ref(true)
const showFloatButton = ref(false)

const formatDate = (date) => {
	if (!date) return '未知日期'
	const d = new Date(date)
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const handleScroll = () => {
	showFloatButton.value = window.scrollY > 200
}

const loadArticle = async () => {
	try {
		const modules = import.meta.glob('../posts/*.md')
		const targetPath = Object.keys(modules).find(path => path.endsWith(`${slug.value}.md`))
		
		if (targetPath) {
			const module = await modules[targetPath]()
			article.value = {
				frontmatter: module.frontmatter || {},
				component: module.default,
			}
		}
	} catch (error) {
		console.error('Error loading article:', error)
	} finally {
		loading.value = false
	}
}

onMounted(() => {
	loadArticle()
	window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
	<div class="mx-auto max-w-3xl px-4 py-16 min-h-screen">
		<div v-if="loading" class="flex justify-center items-center h-64">
			<div
				class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"
			></div>
		</div>
		<template v-else-if="article">
			<button
				@click="$router.push('/articles')"
				class="group mb-6 flex items-center gap-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-800/80 rounded-full text-gray-400 hover:text-white transition-all duration-300 backdrop-blur-sm"
			>
				<Icon icon="solar:alt-arrow-left-bold" class="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
				<span class="text-sm">返回文章列表</span>
			</button>

			<h1 class="text-3xl font-bold mb-2">{{ article.frontmatter.title }}</h1>
			<div class="flex items-center justify-between mb-6 text-gray-400">
				<span>{{ formatDate(article.frontmatter.date) }}</span>
				<div class="flex gap-2">
					<span
						v-for="tag in article.frontmatter.tags"
						:key="tag"
						class="px-2 py-1 bg-gray-800 text-xs rounded-full text-gray-300"
					>
						{{ tag }}
					</span>
				</div>
			</div>
			<div
				class="w-full border-t-2 border-dashed border-gray-500/30 mb-6"
			></div>
			<article v-highlight class="prose prose-invert max-w-none">
				<component :is="article.component" />
			</article>

			<!-- 浮动返回按钮 -->
			<transition
				enter-active-class="transition-opacity duration-300"
				leave-active-class="transition-opacity duration-300"
				enter-from-class="opacity-0"
				leave-to-class="opacity-0"
			>
				<button
					v-if="showFloatButton"
					@click="$router.push('/articles')"
					class="group fixed bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-12 flex items-center gap-2 px-4 py-2.5 bg-gray-800/80 hover:bg-gray-800/90 rounded-full text-gray-400 hover:text-white transition-all duration-300 backdrop-blur-md shadow-lg"
				>
					<Icon icon="solar:alt-arrow-left-bold" class="text-lg group-hover:-translate-x-1 transition-transform duration-300" />
					<span class="text-sm">返回文章列表</span>
				</button>
			</transition>
		</template>

		<div v-else class="text-center py-16">
			<h2 class="text-2xl font-bold text-gray-400">文章未找到</h2>
			<p class="mt-4">该文章可能已被删除或移动</p>
		</div>
	</div>
</template>

<style>
.prose {
	color: #e5e7eb;
}

.prose h1, .prose h2, .prose h3 {
	color: #f3f4f6;
	font-weight: 600;
}

.prose em {
	font-style: italic;
	color: #e5e7eb;
	margin: 0 0.1em;
}

.prose h1 { font-size: 2.25em; margin: 2em 0 1em; }
.prose h2 { font-size: 1.875em; margin: 1.5em 0 0.75em; }
.prose h3 { font-size: 1.5em; margin: 1.25em 0 0.5em; }

.prose p {
	margin: 1.25em 0;
	line-height: 1.75;
}

.prose a {
	color: #60a5fa;
	text-decoration: none;
	transition: color 0.2s;
}

.prose a:hover {
	color: #93c5fd;
}

.prose code {
	color: #f3f4f6;
	background-color: rgba(75, 85, 99, 0.3);
	padding: 0.2em 0.4em;
	border-radius: 0.25em;
	font-size: 0.875em;
	margin: 0 0.1em;
}

.prose pre {
	background-color: #0d1117;
	padding: 1em;
	border-radius: 0.5em;
	overflow-x: auto;
	margin: 1.5em 0;
	position: relative;
}

.prose pre code {
	background-color: transparent;
	padding: 0;
	font-family: 'JetBrains Mono', 'MiSans';
}

.prose ul, .prose ol {
	margin: 1.25em 0;
	padding-left: 1.625em;
}

.prose ul { list-style-type: disc; }
.prose ul ul { list-style-type: circle; }
.prose ul ul ul { list-style-type: square; }

.prose ol { list-style-type: decimal; }
.prose ol ol { list-style-type: upper-alpha; }
.prose ol ol ol { list-style-type: upper-roman; }

.prose li {
	margin: 0.5em 0;
	color: #e5e7eb;
}

.prose ul li::marker,
.prose ol li::marker {
	color: #6b7280;
}

.prose blockquote {
	border-left: 4px solid #4b5563;
	padding-left: 1em;
	margin: 1.5em 0;
	color: #9ca3af;
}

.prose img {
	max-width: 100%;
	height: auto;
	border-radius: 0.5em;
	margin: 1.5em 0;
}

.prose hr {
	border: none;
	border-top: 2px dashed #4b5563;
	margin: 2em 0;
}

.prose table {
	width: 100%;
	border-collapse: collapse;
	margin: 1.5em 0;
}

.prose th, .prose td {
	border: 1px solid #4b5563;
	padding: 0.75em;
}

.prose th {
	background-color: rgba(75, 85, 99, 0.3);
}
</style>
