<template>
<div>
    <nav class='place-nav'>
      <p class='product-list'>Product List</p>
      <div>
        <button type='submit' id='add-product-btn' class='place-buttons' @click.prevent="add_button">ADD</button>
        <button type='submit' id='delete-product-btn' class='place-buttons' @click.prevent="delete_button">MASS DELETE</button>
      </div>
    </nav>
     <hr>
       <div class='flex'>
          <div class='box' v-for="elem in get_Products" :key=elem>
            <div><input type="checkbox" class="delete-checkbox" :id=get_Products.sku @click="setDelete(elem.sku)"></div>
            <div style='text-align: center;'>
              <p>{{elem.sku}}</p>
              <p>{{elem.name}}</p>
              <p>{{elem.price}} $</p>
              <p v-if='elem.size'>Size: {{elem.size}} MB</p>
              <p v-if='elem.weight'>Weight: {{elem.weight}}KG</p>
              <p v-if='elem.height'>Dimension: {{elem.height}}x{{elem.width}}x{{elem.p_length}}</p>
            </div>
          </div>
        </div>
</div>

</template>

<script>
import utils from "../utils.js";
import { toggle } from 'toggle-item-in-array';

export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      // products: [],
      to_delete: [],
    }
  },
  computed: {
    get_Products() {
      return this.$store.state.products;
    },
  },
  created() {
      let url = utils.url;
      let requestParam = { ...utils.globalRequestParameters };
      requestParam.method = "GET";
      requestParam.body = null;
      fetch(url, requestParam).then((res) =>
          res.json().then((res) => 
          {
            this.$store.dispatch("setProducts", res);
            // for(let i = 0; i < res.length ; i++ ) {
            //   let product = {};
            //   product.sku = res[i].sku;
            //   product.name = res[i].name;
            //   product.price = res[i].price;
            //   product.productType = res[i].productType;
            //   product.size = res[i].size;
            //   product.weight = res[i].weight;
            //   product.width = res[i].width;
            //   product.height = res[i].height;
            //   product.p_length = res[i].p_length;
            //   this.products.push(product);
            // }
          }
          )
        );
  
  },
  mounted() {
    
  },
  methods: {
    add_button() {
      this.$router.push('add-product');
    },
    setDelete(sku) {
      toggle(this.to_delete,sku);    
    },
    delete_button() {

      let idDelete = [];
      for (let i = 0; i < this.to_delete.length; i++) 
        idDelete.push(this.to_delete[i]);

      let url = utils.url;
      let requestParameters = utils.globalRequestParameters;
      requestParameters.method = 'DELETE';

      for(let j = 0; j < idDelete.length; j++) {
        setTimeout(() => {
          fetch(url + 'delete-product/' + idDelete[j], requestParameters)
          .then(res => res.json())
          .then(res => {
            if(res.message === 'Successfully deleted') {
              this.$store.dispatch("delete_Product", idDelete[j]);
              // this.products = this.products.filter(element => element.sku !== idDelete[j]);
              console.log(res.message);
            } else {
              console.log(res.message);
            }
            // this.$store.dispatch("delete_Product", idDelete[j]);
          })
        }, 500);
      }

    },

  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.place-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

.product-list {
  text-decoration: none;
  margin-left: 30px;
  font-size: 130%;
  font-weight: bold;
  color: black;
}

.place-buttons {
  margin-right: 30px;
  padding: 5px;
}

.box {
  height: 180px;
  width: 300px;
  border: 1px solid black;
  margin: 20px;
  
}

.delete-checkbox {
  margin: 10px;
}

.flex {
  display: flex;
  flex-wrap: wrap;
}

#add-product-btn {
  background-color: green;
  color: white;
}

#delete-product-btn {
  background-color: red;
  color: white;
}
</style>
