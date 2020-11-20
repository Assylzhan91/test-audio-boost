<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <img alt="Vue logo" src="../assets/product-fullsize.png">
		{{text}}
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'Home',
	props: ['text', 'myText'],
	data: function (){
    return {
			products: []
		}
	},
  created() {

  },
	beforeMount() {
    console.log("beforeMount")
  },
  updated() {
    window.screenTop
		console.log(this.$el.parentNode)

  }
}
</script>
