<template>
  <div class="add">
    <nav class='place-nav'>
      <p class='product-list'>Product Add</p>
      <div>
        <button type='submit' class='place-buttons' @click.prevent="save_button">Save</button>
        <button type='submit' id='cancel-product-btn' class='place-buttons' @click.prevent="cancel_button">Cancel</button>
      </div>
    </nav>
    <hr>
    <form id='product_form'>
      <table>
        <tr >
          <td>SKU</td>
          <td><input type='text' id='sku'></td>
        </tr>
        <tr>
          <td>Name</td>
          <td><input type='text' id='name'></td>
        </tr>
        <tr>
          <td>Price ($)</td>
          <td><input type='text' id='price'></td>
        </tr>
        <tr>
          <td>Type Switcher</td>
          <td><select name="Type Switcher" id="productType" @change="type_dvd()">
              <option value=''>Type Switcher</option>
              <option value="dvd" id='DVD'>DVD</option>
              <option value="book" id='Book'>Book</option>
              <option value="furniture" id='Furniture'>Furniture</option>
            </select> 
          </td>
        </tr>
        <tr v-if='dvd'>
          <td>Size (MB)</td>
          <td><input type='text' id='size'></td>
        </tr>
        <tr v-if='dvd'>
          <td colspan="2" class='please'>Please, provide size</td>
        </tr>
        <tr v-if='furniture'>
          <td>Height (CM)</td>
          <td><input type='text' id='height'></td>
        </tr>
        <tr v-if='furniture'>
          <td>Width (CM)</td>
          <td><input type='text' id='width'></td>
        </tr>
        <tr v-if='furniture'>
          <td>Length (CM)</td>
          <td><input type='text' id='length'></td>
        </tr>
        <tr v-if='furniture'>
          <td colspan="2" class='please'>Please, provide dimensions</td>
        </tr>
        <tr v-if='book'>
          <td>Weight (KG)</td>
          <td><input type='text' id='weight'></td>
        </tr>
        <tr v-if='book'>
          <td colspan="2" class='please'>Please, provide weight</td>
        </tr>
      </table>
      <p id='error_message'></p>
    </form>

  </div>
</template>

<script>
import utils from "../utils.js";

export default {
  name: 'ProductAdd',
  components: {

  },
  data() {
    return {
      dvd: 0,
      book: 0,
      furniture: 0,
    }
  },
  methods: {
    type_dvd() {
      let type = document.getElementById('productType').value;
      if(type === 'dvd') {
        this.dvd = 1;
        this.book = 0;
        this.furniture = 0;
      } else if (type === 'book') {
        this.dvd = 0;
        this.book = 1;
        this.furniture = 0;
      } else if (type === 'furniture'){
        this.dvd = 0;
        this.book = 0;
        this.furniture = 1;
      } else {
        this.dvd = 0;
        this.book = 0;
        this.furniture = 0;
      }
    },
    save_button() {
      let new_product = {};
      if(document.getElementById('sku').value === "") 
        this.empty_fields();
      else {
        this.clear_error_msg_box();
        new_product.sku = document.getElementById('sku').value;
      }
      if(document.getElementById('name').value === "") 
        this.empty_fields();
      else {
        this.clear_error_msg_box();
        new_product.name = document.getElementById('name').value;
      }
      if(document.getElementById('price').value === "") 
        this.empty_fields();
      else {
        if(isNaN(document.getElementById('price').value)===true)
          this.wrong_data();
          else {
            this.clear_error_msg_box();
            new_product.price = document.getElementById('price').value;
          }
      }
      
      if(this.dvd === 0 && this.book === 0 && this.furniture === 0)
        this.empty_fields();
      else if(this.dvd === 1) 
      {
        new_product.productType = 'DVD';
        if (document.getElementById('size').value === '') {
          this.empty_fields();
        } else {
          this.clear_error_msg_box();
          new_product.size = document.getElementById('size').value;
        }

      } else if(this.book === 1) {
        new_product.productType = 'Book';
        if (document.getElementById('weight').value === '') {
          this.empty_fields();
        } else {
          this.clear_error_msg_box();
          new_product.weight = document.getElementById('weight').value;
        }

      } else if(this.furniture === 1) {
        new_product.productType = 'Furniture';

        if (document.getElementById('height').value === '' || document.getElementById('width').value === '' || document.getElementById('length').value === '') {
          this.empty_fields();
        } else {
          if(isNaN(document.getElementById('height').value)===true || isNaN(document.getElementById('width').value)===true || isNaN(document.getElementById('length').value)===true)
            { 
              this.wrong_data();
            } else {
              this.clear_error_msg_box();
              new_product.height = document.getElementById('height').value;
              new_product.width = document.getElementById('width').value;
              new_product.p_length = document.getElementById('length').value;
            }
        }

      }

      if(document.getElementById('error_message').innerHTML === '') {
        let url = utils.url;
        let requestParameters = { ...utils.globalRequestParameters };
        requestParameters.method = "POST";
        requestParameters.body = JSON.stringify(new_product);

        fetch(url + "add-product", requestParameters)
          .then((res) => {
              console.log(res);
              this.$store.dispatch("addProduct", new_product);
              this.$router.push('/');
          });
      }


    },
    cancel_button() {
      this.$router.push('/');
    },
    empty_fields() {
      document.getElementById('error_message').innerHTML = 'Please, submit required data';
    },
    wrong_data() {
      document.getElementById('error_message').innerHTML = 'Please, provide the data of indicated type';
    },
    clear_error_msg_box() {
      document.getElementById('error_message').innerHTML = '';
    }
  },
}

</script>

<style scoped>
#product_form {
  margin: 20px;
}

table {
  padding-bottom: 50px;
  border-spacing:0 15px;
}

.please {
  font-weight: bold;
}

#error_message {
  font-weight: bold;
  color: tomato;
  font-size: 120%;
}

#save-product-btn {
  background-color: green;
  color: white;
}

#cancel-product-btn {
  background-color: red;
  color: white;
}
</style>