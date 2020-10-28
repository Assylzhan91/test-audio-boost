<template>
  <div class="about" style="top: 100px">
    <h1 class="about__title">This is an about page</h1>
    <b>Count: {{this.count}}</b>
		<ul>
			<li v-for="item of list" :key="item.id" class="list__item" :class="'list__item_' + item.id" >{{item.title}}</li>
		</ul>
  </div>
</template>



<script>
export default {
  data: ()=>({
    count: 0,
		list: [
		  {id: 1, title: "Title-01"},
		  {id: 2, title: "Title-02"},
		  {id: 3, title: "Title-03"},
		  {id: 4, title: "Title-04"},
		  {id: 5, title: "Title-05"},
		  {id: 6, title: "Title-06"}
		]
  }),

   methods: {

  }

}
</script>

<style lang="scss">
	$colors: red, orange, yellow, green, blue, purple;

  @for $i from 1 through length($colors) {
    .list__item_#{$i} {
			@if $i == 3 {
				background: red;
			}@else{
        background: green;
		}
			@if $i == length($colors){
				font-size: 20px;
				font-weight: bold;
			}
				margin-left: 4px * $i;
				color: nth($colors, $i);
    }
  }
	.about{
		.container & {
      background-color: red;
		}
		&__title{

		}
	}

	.title{
		margin: 0;
		margin-top: 100px;
	}
</style>
