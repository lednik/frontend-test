<template>
	<div id="login" class="login">
		<h1 class="login__title">
            Авторизация
        </h1>
		<div class="login__form form">
			<div class="form__label">Логин</div>
			<input 
				class="form__input" 
				placeholder="Введите логин" 
				type="text"
				:class="{'form__input_error' : login.error}"
				@input="login.error=false"
				v-model="login.value"
			>
			<div class="form__label">Пароль</div>
			<input 
				class="form__input" 
				placeholder="Введите пароль" 
				type="password"
				:class="{'form__input_error' : password.error}"
				@input="password.error=false"
				v-model="password.value"
			>
			<div @click="sendForm" class="form__btn">Войти</div>
		</div>
	</div>
</template>

<script>
// import Vue from 'vue'
import {mapMutations} from 'vuex';
export default {
  	name: 'index',
  	data () {
  	  	return {
			profile: false,
			login: {
				value: '',
				error: false
			},
			password: {
				value: '',
				error: false
			}
  	  	}
	},
	computed: {
		reform(){
            let formData = new FormData();
            formData.append( 'name' , this.login.value)
            formData.append( 'position' , this.password.value)
            return formData
        }
	},
	methods: {
		...mapMutations('profile', ['setProfile']),
		sendForm(){
			if(this.valid()) this.send(this.reform)
		},
		send(formData){
			// при наличии реального бэка я бы отправил  методом post запрос вместе с созданной  formData, а в ответе получил бы профиль и другие данные
			// Но в наших реалиях сделаем иммитацию методом get
			let action = 'profile';
			let methods = 'get'
			this.$http[methods](action)
  	    	    .then(response => {
					return response.json()
				})
				.then( data => {
					if(data.id){
						console.log(data.id);
						this.setProfile(data)
						this.$router.push('/contacts')
					}
				})
		},
		valid(){
			let valid= true
            if( !this.login.value || this.login.value==''){
                this.login.error = true
                valid = false
            }
            if(!this.password.value || this.password.value==''){
                this.password.error = true
                valid = false
            }
            return valid
		}
	},
  	mounted(){
  	}
}
</script>

<style lang="sass">
.login
	display: flex
	flex-direction: column
	align-items: center
	&__title
		font-size: 88px
		line-height: 120px
		margin-bottom: 40px
		color: #42b983
.form
	background: #EDEFFF
	box-shadow: 0px 4px 30px #EEEFFF
	border-radius: 16px
	padding: 40px
	display: flex
	flex-direction: column
	&__label
		font-weight: 500
		font-size: 16px
		line-height: 19px
		margin-bottom: 8px
	&__input
		width: 384px
		background: #E1E2F5
		border-radius: 12px
		border: none
		padding: 16px 24px
		outline: none
		-webkit-appearance: none
		margin-bottom: 32px
		transition: .3s
		box-sizing: border-box
		&_error
			border: 2px solid #F24949
	&__btn
		cursor: pointer
		width: fit-content
		padding: 16px 68px
		background: #42b983
		color: white
		border-radius: 12px
		transition: .3s
		&:hover
			transform: translateY(2px)
			background: #3eaf7c
</style>
