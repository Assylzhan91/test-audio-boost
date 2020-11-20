<template>
  <div id="app" @scroll="onScrollHandlerApp">
		<button ref="topButton">topButton</button>
		<div class="container" :class="{'loading': classLoaded}">
			<header>
				<div class="navbar navbar-default">
					<div class="navbar-header">
						<h1 v-text="sitename"></h1>
					</div>
					<div class=" nav navbar-nav navbar-right cart">
						<button type="button"
										class="btn btn-info btn-lg"
										v-on:click="showCheckout">
						<span
							class="glyphicon glyphicon-shopping-cart">
							{{ cartItemCount}}
						</span>
							<i class="fas fa-shopping-cart"></i>
							Checkout
						</button>
					</div>

				</div>
			</header>
			<h1>{{cart}}</h1>
			<main>
				<div v-for="(product, key)  in products" class="row mb-5" text="">
					<template v-if="showProduct">
						<div class="col-md-2 col-md-offset-1">
							<figure>
								<img v-bind:src="product.image">
							</figure>
						</div>
						<div class="col-md-6 col-md-offset-2 description">
							<h1 v-text="product.title"></h1>
							<p v-html="product.description"></p>
							<p class="price">
								{{product.price | formatPrice}}
							</p>
							<button class="btn btn-primary btn-lg"
											v-on:click="addToCart(product)"
											v-if="canAddToCartMethod(key)">Add to cart</button>
							<button disabled="true" class="btn btn-primary btn-lg"
											v-else >Add to cart</button>
							<span class="inventory-message"
										v-if="product.availableInventory - cartCount(product.id) === 0">
								{{ inventoryMessage }}
							</span>
							<span class="inventory-message"
										v-else-if="product.availableInventory - cartCount(product.id) < 5">
									{{ product.availableInventory - cartCount(product.id) }}
							</span>
							<span v-else>{{ inventoryMessage }} HEllo</span>

							<div class="rating">
								<span v-for="n in 5" :class="{'rating-active': checkRating(n, key)}">
									☆
								</span>
							</div>
						</div>
					</template>
					<div v-else>

					</div>
				</div>

			</main>

			<div>
				<div class="col-md-6">
					<strong>First Name:</strong>
					<input v-model.trim="order.firstName"
									class="form-control"/>
					{{order.firstName.length}}
				</div>

				<div class="col-md-6">
					<strong>Last Name:</strong>
					<input v-model.trim="order.lastName"
								 class="form-control"/>
				</div>

				<div class="col-md-12 verify">
  				<ul>
    				<li>First Name: {{order.firstName}}</li>
    				<li>Last Name:  {{order.lastName}}</li>
  				</ul>
				</div>

				<div class="form-group">
					<div class="col-md-12"><strong>Address:</strong></div>
					<div class="col-md-12">
						<input v-model="order.address"
									 class="form-control" />
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-12"><strong>City:</strong></div>
					<div class="col-md-12">
						<input v-model="order.city"
									 class="form-control" />
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-2">
						<strong>State:</strong>
						<select v-model="order.state" class="form-control">
							<option disabled value="">State</option>
							<option v-for="(state, key, idx) in states"
											:value="state"
							>{{ state }}</option>
						</select>
						<h1>{{order.state}}</h1>
					</div>
				</div>

				<div class="form-group">
					<div class="col-md-6 col-md-offset-4">
						<strong>Zip / Postal Code:</strong>
						<input 	type="number"
										v-model.number="order.zip"
									 	class="form-control"/>
					</div>
				</div>

				<div class="col-md-12 verify">
					<ul class="list" ref="list">
						<li><p>FullName: {{fullName}}</p></li>
						<li><p>Address: {{order.address}}</p></li>
						<li>City: {{order.city}}</li>
						<li>Zip: {{order.zip}}</li>
						<li>State: {{order.state}}</li>
						<li>Method: {{order.method}}<br></li>
						<li>Gift: {{order.gift}}<br></li>
					</ul>
				</div>
			</div>
			<div>
				<div class="form-group">
					<div class="col-md-6 boxes">
						<input type="checkbox"
									 id="gift"
									 value="true"
									 v-model="order.gift">
						<label for="gift">Ship As Gift?</label>
					</div>
				</div>
				<div class="form-group">
					<div class="col-md-6 boxes">
						<input type="radio"
									 id="home"
									 value="Home"
									 v-model="order.method">
						<label for="home">Home</label>
						<input type="radio"
									 id="business"
									 value="Business11"
									 v-model="order.method">
						<label for="business">Business</label>
					</div>
				</div>
			</div>
			<div>
				<div class="form-group">
					<div class="col-md-6 boxes">
						<input
							type="checkbox"
						 	id="gift1" value="true"
						 	v-bind:true-value="order.sendGift"
							v-bind:false-value="order.dontSendGift"
							v-model="order.gift">
						<label for="gift">Ship As Gift?</label>
					</div>
				</div>

			</div>
			<div class="form-group form-group_last" @click="onInputLast">
				<div class="col-md-6">
					<button type="submit"
									class="btn btn-primary submit"
									v-on:click="submitForm">Place Order</button>
				</div>
			</div>
		</div>
		<app-home text="Hello from child component">
		</app-home>
  </div>
</template>
<script>
 import axios from 'axios'
 import Home from './views/Home'
export default {
   components: {'app-home':Home},
  data:()=>({
		sitename: "Vue.js Pet Depot",
		product: {
			id: 1001,
			title: "Cat Food, 25lb bag",
			description: "A 25 pound bag of <em>irresistible</em> organic goodness for your cat.",
			price: 5080,
			image: "assets/product-fullsize.png",
      availableInventory: 10,
			rating: 4
		},
		classLoaded: false,
		cart: [],
    showProduct: true,
    states: {
      AL: 'Alabama',
      AR: 'Arizona',
      CA: 'California',
      NV: 'Nevada'
    },
		order: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zip: '',
			method: 'Home',
      gift: false,
      sendGift: 'Send As A Gift',
      dontSendGift: 'Do Not Send As A Gift',
			state: ''
    },
		products: [],
    checkPointHeight: 200,

  }),

  filters: {
    formatPrice(price) {
      if (!parseInt(price)) { return ""; }
      if (price > 99999) {	//#D
        var priceString = (price / 100).toFixed(2);	//#E
        var priceArray = priceString.split("").reverse();	//#F
        var index = 3;	//#F
        while (priceArray.length > index + 3) {	//#F
          priceArray.splice(index + 3, 0, ",");	//#F
          index += 4;	//#F
        }	//#F
        return "$" + priceArray.reverse().join("");	//#G
      } else {
        return "$" + (price / 100).toFixed(2);	//#H
      }
    }

  },
  computed: {
    cartItemCount: function() {
      return this.cart.length || 0;
    },
    canAddToCart: function (){
      return this.product.availableInventory > this.cartItemCount
		},
		fullName: function (){
      return `${this.order.firstName} ${this.order.lastName}`
		},
		inventoryMessage(){
      // let avInv =  this.product.availableInventory
      let crItemCnt =  this.cartItemCount
			for(let i = 0; i < this.products.length; i++){
        switch (true){
          case this.products[i].availableInventory - crItemCnt === 0:
            return 'All Out!';
          case this.products[i].availableInventory - crItemCnt < 5:
            return 	`Only ${this.products[i].availableInventory - crItemCnt} left!`;
          default: return `Buy Now`
        }
			}
			/*
      c*/
		},

  },
  methods: {
		addToCart(product){
		  this.cart.push(product.id)
		},
		showCheckout() {
      this.showProduct = !this.showProduct
    },
		submitForm(){
		  console.log('submitForm')
		},
    checkRating(n, key) {
      return this.products[key].rating - n >= 0;			//#A
    },

    onInputLast(e){
		  const list =  this.$refs.list.childNodes,
						colors = ['red', 'green', 'yellow', 'blue', 'tomato', '#ccc', '#62a9d7'],
						convertList = Array.from(list)
      list.forEach((item, idx)=>{
        item.style.backgroundColor =  colors[idx]
        item.innerHTML = colors[idx]
			})
		},
    canAddToCartMethod(key){
      return this.products[key].availableInventory > this.cartItemCount
		},
		cartCount(key){
			let count = 0

			for(let i = 0; i < this.cart.length; i++){
			  if(this.cart[i] === key){
          count++
			  }
			}

			return count
		},

    onScrollHandlerApp(e){


    }

  },

  created() {
  axios.get('/static/products.json')
			.then(response =>{
			  setTimeout((event)=>{
          if(response.status === 200){
            this.classLoaded = false
            this.products = response.data.products
          }
			  }, 1000)


			})
			.catch(response=>{
			  console.log('error')
			})



  },
	beforeMount() {


    // this.order.state = this.states.CA
  },
  mounted() {
    this.$refs.topButton.addEventListener('click', this.onScrollHandlerApp)
	/*let height =  parseInt(window.localStorage.getItem('saveHeight'))
    document.documentElement.clientHeight = height
		console.log(document.documentElement.clientHeight, 'document.documentElement.clientHeight')
		console.log(height, 'document.clientHeight')*/

  },

  watch: {

  },
	updated() {

  },
	destroyed() {
    window.removeEventListener('scroll', this.onScrollHandlerApp);
  }
};

/*
 function products2(){
   return {
     "products":[
       {
         "id": 1001,
         "title": "Cat Food, 25lb bag",
         "description": "A 25 pound bag of <em>irresistible</em>, organic goodness for your cat.",
         "price": 2000,
         "image": "assets/images/product-fullsize.png",
         "availableInventory": 10,
         "rating": 1
       },
       {
         "id": 1002,
         "title": "Yarn",
         "description": "Yarn your cat can play with for a very <strong>long</strong> time!",
         "price": 299,
         "image": "assets/images/yarn.jpg",
         "availableInventory": 7,
         "rating": 1
       },
       {
         "id": 1003,
         "title": "Kitty Litter",
         "description": "Premium kitty litter for your cat.",
         "price": 1100,
         "image": "assets/images/cat-litter.jpg",
         "availableInventory": 99,
         "rating": 4
       },
       {
         "id": 1004,
         "title": "Cat House",
         "description": "A place for your cat to play!",
         "price": 799,
         "image": "assets/images/cat-house.jpg",
         "availableInventory": 11,
         "rating": 5
       },
       {
         "id": 1005,
         "title": "Laser Pointer",
         "description": "Drive your cat crazy with this <em>amazing</em> product.",
         "price": 4999,
         "image": "assets/images/laser-pointer.jpg",
         "availableInventory": 25,
         "rating": 1
       }
     ]
   }

 }*/
</script>

<style lang="scss">
	.list *{
		padding: 0;
		margin: 0;
	}
	.main{
		height: 1400px;
	}
  html, body {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
  }

	.form-group_last{
		padding-bottom: 100px;
	}


  img {
    max-width: 100%;
    height: auto;
  }
  #app{
    width:100%;
  }
  .song{
    .wrapper{
      position:relative;
      width:100%;
      height:auto;
      .overlay-play{
        cursor:pointer;
        position:absolute;
        width:40px;
        height:40px;
        background-color: #FD6A02;
        bottom:5px;
        right:5px;
        border-radius:50%;
        i{
          font-size:1.8em;
          line-height:40px;
          color:#fff;
        }
      }
    }

    .song-title{
      font-weight:700;
      margin-bottom:0;
      line-height:auto;
    }

    .song-artiste{
      line-height:auto;

    }
  }
  .music-player {
    width: 100%;
    bottom: 0;
    position: fixed;

    .playlist {
      width: auto;
      max-width: 400px;
      background-color: rgba(255, 80, 0, 0.71);
      position: relative;
      margin-left: auto;
      z-index: 1;

      .header{

      }

      .show {
        overflow: auto;
      }

      .wrap {
        max-height: 75px;
        overflow: auto;

        .song-wrap {
          height: 25px;
          width: 100%;
          color: white;
          cursor: pointer;

          &:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }

          &:not(:last-child) {

            border-bottom: 0.05em solid #cdcdcd;

          }

          .song-details {
            font-size: 0.8em;
            line-height: 25px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding-right: 10px;
            padding-left: 10px;

            span {
              line-height: 15px;

              &.play {
                display: inline-block;
                margin-right: 10px;
                border: 1px solid #fff;
                border-radius: 10px;
                height: 17px;
                width: 17px;
                text-align: center;


                i {
                  text-align: center;

                }
              }

            }

            .music-bars-gif {
              height: 10px;
            }
          }

        }

        scrollbar-width: 5px;

        &::-webkit-scrollbar {
          width: 5px;
        }

        &::-webkit-scrollbar-track {
          background-color: #CCC;
          -webkit-box-shadow: inset 0 0 6px rgb(145, 145, 145);
          border-radius: 0;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 0;
          background-color: #d2d2d2;
          -webkit-box-shadow: inset 0 0 6px rgba(238, 238, 238, 0.5);
        }
      }
    }

    .player {

      //styles for the player
      position: relative;
      z-index: 2;
      width: 100%;
      height: 60px;
      background-color: #6f6f6f;

      .player-contents-wrap {
        position: relative;
        width: 100%;
        height: 60px;

        .album-art {
          background-color: white;
          width: 60px;
          height: 60px;

          .img {
            width: 60px;
            height: 60px;
          }
        }

        .main-controls {
          position: absolute;
          right: 0;
          width: calc(100% - 60px);
          height: 60px;
          top: 0;

          i {
            cursor: pointer;
          }

          .controls {
            width: 15%;
            height: 60px;
            display: flex;
            justify-content: space-around;
            text-align: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.05);

            i {
              font-size: 1.8em;
              color: white;
            }

            .play {
              text-align: center;
              border-radius: 25px;
              width: 40px;
              height: 40px;
              border: 1px solid #fff;

              i {
                line-height: 40px;
                text-align: center;
              }
            }

            .pause {

            }

          }

          .seek {
            padding-left: 20px;
            padding-top: 0;
            position: absolute;
            height: 60px;
            width: 85%;
            top: 0;
            left: unset;
            right: 0;

            .title-and-time {
              height: 25px;
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;

              .title {

              }

              .time {

              }

            }

            .progress-container {
              position: relative;
              height: 10px;
              width: auto;
              display: flex;
              align-items: center;

              .progress {
                background-color: rgba(0, 0, 0, 0.05);
                height: 4px;
                //width: calc(75% - 30px);
                width: 100%;
                margin: 0;
                padding: 0 2px;
                border-radius: 0;
                display: flex;
                align-items: center;

                box-shadow: 0 1px 1px rgba(0, 0, 0, .1);

                .progress-handle {
                  display: block;
                  position: absolute;
                  z-index: 6;
                  margin-top: 0;
                  margin-left: -2px;
                  width: 8px;
                  height: 8px;
                  border-radius: 100%;
                  background-color: #fff;
                  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
                  cursor: pointer;

                  &:hover {
                    background-color: #000;
                  }
                }

                .transparent-seeker-layer {
                  //please do not delete this layer unless you know what you are doing
                  // this code allows the seeker click position to function well
                  width: 100%;
                  height: 6px;
                  background-color: transparent;
                  position: absolute;
                  cursor: pointer;
                  z-index: 5;

                }

                .bar {
                  width: 0;
                  background-color: #fff;
                  height: 4px;
                  position: absolute;

                }

              }
            }

            .extra-controls {
              height: 25px;
              width: 100%;
              display: flex;
              flex-direction: row-reverse;
              align-items: center;

              .like {
                padding-left: 8px;
                height: 25px;

                i {
                  font-size: 1em;
                  line-height: 25px;
                }
              }

              .download {
                padding-left: 8px;
                height: 25px;

                i {
                  font-size: 1em;
                  line-height: 25px;
                }
              }

              .shuffle-icon {
                padding-left: 8px;
                height: 25px;

                i {
                  font-size: 1.2em;
                  line-height: 25px;
                }
              }

              .repeat {
                position: relative;
                padding-left: 8px;
                height: 25px;

                .repeat-info {
                  background-color: red;
                  width: 13px;
                  height: 13px;
                  border-radius: 8px;
                  position: absolute;
                  font-size: 7px;
                  line-height: 12px;
                  text-align: center;
                  right: -12px;
                  top: 5px;
                  color: #fff;
                  text-transform: capitalize;
                  letter-spacing: 1px;
                }

                i {
                  font-size: 1.2em;
                  line-height: 25px;
                }
              }

              .playlist-icon {
                margin-left: 30px;
                height: 25px;
                i {
                  font-size: 1.2em;
                  line-height: 25px;
                }
              }

            }

          }

        }

        .volume {

        }
      }

    }
  }

  .bufferedPercent{
    background-color: red;
		height: 1rem;
		margin-bottom: 1rem;
	}

  .height-enter-active {
    animation: bounce-in .5s;
  }

  .height-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 75px;

    }
  }

  .loading{
    background-color: red;
	}

</style>


