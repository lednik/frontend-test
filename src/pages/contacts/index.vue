<template>
	<div id="contacts" class="contacts">
		<h1 class="contacts__title">
            Контакты
        </h1>
        <div class="contacts__list" v-if="profile">
            <div class="contacts__editBtn" @click="isAddModal = true">Добавить</div>
            <div
                v-for="(item,index) in contacts"
                class="contacts__item"
                :key="index"
            >
                <span>{{index+1}}. </span>
                <span class="contacts__name">
                    {{item.name}}
                </span>
                 : 
                <span class="contacts__phone">
                    {{item.phone}}
                </span>
                <span @click="goToModal(item,index)" class="contacts__editBtn">
                    редактировать
                </span>
                <span @click="deleteItem(item.id)" class="contacts__delete">
                    удалить
                </span>
            </div>
        </div>
        <div class="contacts__message" v-else>
            Авторизуйтесь,чтобы получить список контактов
        </div>
        <div class="modal" v-if="isModal">
            <div class="modal__content">
                <div class="modal__arrow-wrapper">
                    <div class="modal__arrow" @click="isModal=false"></div>
                </div>
                <p>Измените имя</p>
                <input 
                    type="text" 
                    class="modal__name form__input"
                    v-model="editContact.name"
                >
                <p>Измените телефон</p>
                <input 
                    type="text" 
                    class="modal__name form__input"
                    v-model="editContact.phone"
                >
                <div class="modal__btn" @click="changeItem">Сохранить</div>
            </div>
        </div>
        <div class="modal" v-if="isAddModal">
            <div class="modal__content">
                <div class="modal__arrow-wrapper">
                    <div class="modal__arrow" @click="isAddModal=false"></div>
                </div>
                <p>Введите имя</p>
                <input
                    type="text" 
                    class="modal__name form__input"
                    v-model="addContact.name"
                >
                <p>Введите телефон</p>
                <input 
                    type="text" 
                    class="modal__name form__input"
                    v-model="addContact.phone"
                >
                <div class="modal__btn" @click="addItem">Сохранить</div>
            </div>
        </div>
	</div>
</template>

<script>
import Vue from 'vue'
import {mapState,mapMutations} from 'vuex';
import {store} from '@src/store'
export default {
  	name: 'index',
  	data () {
  	  	return {
            contacts: [],
            isModal: false,
            isAddModal: false,
            editContact: {
                id: -1,
                name: '',
                phone: ''
            },
            addContact: {
                name: '',
                phone: ''
            }
  	  	}
	},
	computed: {
        ...mapState('profile', ['profile']),
	},
	methods: {
       
        addItem(){
            this.isAddModal = false
            let str = Math.random().toString(36).substring(7)
            let item ={
                id: str,
                name: this.addContact.name,
                phone: this.addContact.phone
            }
            let url = 'contacts';
            Vue.http.post(url,item)
  	        	.then(response => {
		    		return response.json()
		    	})
		    	.then( data => {
                    Vue.set(this.contacts, this.contacts.length , data)
		    	})
        },
        deleteItem(id){
            let url = 'contacts/' + id;
            Vue.http.delete(url)
  	        	.then(response => {
		    		return response.json()
		    	})
		    	.then( data => {
                    Vue.delete(this.contacts, this.itemIndexById(id))
		    	})
        },
        itemIndexById(id){
            let index
            for(let i=0; i<this.contacts.length; i++){
                if(this.contacts[i].id == id){
                    index = i
                    break
                }
            }
            return index
        },
        changeItem(){
            this.isModal = false
            let item = {
                name: this.editContact.name,
                phone: this.editContact.phone
            }
            let url = 'contacts/'+this.editContact.id;
            Vue.http.patch(url,item)
  	        	.then(response => {
		    		return response.json()
		    	})
		    	.then( data => {
                    Vue.set(this.contacts,  this.itemIndexById(this.editContact.id), data)
		    	})
        },
        goToModal(item,index){
            this.editContact.id =  item.id
            this.editContact.name =  item.name
            this.editContact.phone =  item.phone
            this.isModal = true
        }
    },
    beforeRouteEnter(to, from, next) {
        if(store.state.profile.profile){
            console.log(true);
            let url = 'contacts';
            Vue.http.get(url)
  	        	.then(response => {
		    		return response.json()
		    	})
		    	.then( data => {
                    next(
                        vm => {
                            vm.contacts = data
                        }
                    );
		    	})
        } else {
            next()
        }
        
    },
  	mounted(){
  	}
}
</script>

<style lang="sass" scoped>
// .contacts
// 	display: flex
// 	flex-direction: column
// 	align-items: center
// 	&__title
// 		font-size: 88px
// 		line-height: 120px
// 		margin-bottom: 40px
// 		color: #42b983
// 	&__label
// 		font-weight: 500
// 		font-size: 16px
// 		line-height: 19px
// 		margin-bottom: 8px
// 	&__input
// 		width: 384px
// 		background: #E1E2F5
// 		border-radius: 12px
// 		border: none
// 		padding: 16px 24px
// 		outline: none
// 		-webkit-appearance: none
// 		margin-bottom: 32px
// 		transition: .3s
// 		box-sizing: border-box
// 		&_error
// 			border: 2px solid #f24949
//     &__subtitle
//         font-size: 48px
//         line-height: 140%
//         font-weight: 500
@import "./index.sass";
</style>
