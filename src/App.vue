<template>
	<div id="app">
		<header class="header">
			<a v-link href="/" class="logo">
				<img class="logo__img" src="public\dist\img\logo.png" alt="logo">
			</a>
			<nav class="nav">
				<a class="nav__item" v-link href="/">Главная</a>
				<a class="nav__item" v-link href="/login" v-if="!profile">Войти</a>
				<div class="nav__item" @click="deleteProfile" v-else>Выйти</div>
				<a class="nav__item" v-link href="/contacts">Контакты</a>
			</nav>
		</header>
		<router-view></router-view>
	</div>
</template>

<script>
// import Vue from 'vue'
import {mapState,mapMutations} from 'vuex';
export default {
  	name: 'app',
  	data () {
  	  	return {
			post: {}
  	  	}
	},
	computed:{
		...mapState('profile', ['profile']),
	},
	methods:{
		...mapMutations('profile', ['deleteProfile']),
	},
  	mounted(){
  	}
}
</script>

<style lang="sass">
body
	margin: 0
.header
	padding: 40px
	display: flex
	align-items: center
	justify-content: space-between
.logo
	width: 150px
	height: 70px
	img
		width: 100%
		height: 100%
		object-fit: contain
.nav
	display: flex
	&__item
		display: inline-block
		padding: 8px 44px
		background: #42b983
		color: white
		cursor: pointer
		border-radius: 12px
		text-decoration: none
		margin-right: 24px
		transition: .3s
		&:hover
			transform: translateY(2px)
			background: #3eaf7c
</style>
