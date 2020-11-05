<template>
  <div id="app">
		<p>Area is equal to: {{ area() }}</p>
		<p>
			<button v-on:click="length += 1">Add length</button>     //#B
			<button v-on:click="width += 1">Add width</button>       //#B
			<button v-on:click="some">Cart</button>       //#B
		</p>
  </div>
</template>
<script>
export default {
  data:()=>({
    length: 5,     //#C
    width: 3,
		cart: []
  }),

  methods: {
    area: function() {                     //#D
      return this.width * this.length;     //#D
    },
    some(){
      let num = 0
      this.cart.push(num++)
		}
  },
  beforeUpdate: function() {                             //#H
    console.log('All those data changes happened '       //#H
      + 'before the output gets updated.');    //#H
  },
  watch: {
    length: function(newVal, oldVal) {                //#E
      console.log('The old value of length was: '+ oldVal +' The new value of length is: '+ newVal)
    },
    width: function(newVal, oldVal) {                 //#F
      console.log('The old value of width was: '      //#F
        + oldVal +                          //#F
        '\nThe new value of width is: '     //#F
        + newVal);                          //#F
    },
    area: function(newVal, oldVal) {                  //#G
      console.log('The old value of area was: '       //#G
        + oldVal +                          //#G
        '\nThe new value of area is: '      //#G
        + newVal);                          //#G
    },
    cart: function(newVal, oldVal) {                  //#G
      	console.log(newVal)
      	console.log(oldVal)
    }
  },
};

</script>

