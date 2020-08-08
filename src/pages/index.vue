<template>
	<div id="index" class="info">
		<h1 class="info__title">
            Персональные контакты
        </h1>
        <div class="info__img">
            <img src="public\dist\img\contacts.png" alt="contacts">
        </div>
	</div>
</template>

<script>
// import Vue from 'vue'
export default {
  	name: 'index',
  	data () {
  	  	return {
			post: {},
			profile: false
  	  	}
  	},
  	mounted(){
  	}
}
</script>

<style lang="sass">
.info
    display: flex
    flex-direction: column
    align-items: center
    &__title
        font-size: 88px
        line-height: 120px
        color: #42b983
    &__img
        width: 400px
        height: 400px
        img
            width: 100%
            height: 100%
            object-fit: contain
</style>
