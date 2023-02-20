import { Component, OnInit } from '@angular/core';
import { CartService } from '../servic/cart.service';
@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  page : any;
  
  term : any;
  
  menu = [
    {
      menu_id: 1,
      img:"./assets/images/chicken.jpg",
      cost:300,
      dish:"Chicken Curry",
      quantity:1
    },
    {
      menu_id: 2,
      img:"./assets/images/fishcurry.jpg",
      cost:350,
      dish:"Fish Curry",
      quantity:1
    },
    {
      menu_id: 3,
      img:"./assets/images/burger.jpg",
      cost:150,
      dish:"Chesse Burger",
      quantity:1
    },
    {
      menu_id: 4,
      img:"./assets/images/pizza.jpg",
      cost:250,
      dish:"Panner Pizza",
      quantity:1
    },
    {
      menu_id: 5,
      img:"./assets/images/biriyani.jpg",
      cost:400,
      dish:"Biriyani",
      quantity:1
    },
    {
      menu_id: 6,
      img:"./assets/images/muttonsoup.jpg",
      cost:500,
      dish:"Mutton Soup",
      quantity:1
    }
  ]

  constructor(private cart : CartService) { }

  viewtype = true;

  gridView ={'display':'inline-block'}
  listView ={'display':'inline-flex', 'font-size':'10px !important'}

  gridView1 ={'margin-left': '70px','display': 'inline-flex','width':'300px', 'height':'400px'}
  listView1 ={'margin-left': '20px' }

  imgwidthInc ={'width':'165%'}
  imgwidthDec ={'width':'60%'}

  gridfont ={'font-size':'30px', 'font-family':' Arial, serif','margin-top':'10px'}
  listfont ={'font-size':'2.5rem', 'font-family':' Arial, serif'}

  gridCartbtns ={'flex-direction': 'column'}
  listCartbtns ={'flex-direction': 'row'}
  ngOnInit(): void {

  }

  OnlistView(){
    this.viewtype= true;
    console.log("working Grid")
  }
  OngridView(){
    this.viewtype= false;
    console.log("working List")
  }

  // Incrementing items in cart
  addItems(details:any){
    if(details.quantity !=5){
      details.quantity += 1
    }
  }

  // Deccrementing items in cart
  removeItems(details:any){
    if(details.quantity !=1){
      details.quantity -= 1 
    }
  }



  itemsCart : any = []

  //On Click of Addcart Button
  addCart(details:any){
    
    // Getting localcart values from localstorage & storing in cartDataNull
    let cartDataNull = localStorage.getItem('localcart',)

    // if cartDataNull did hold any data, then we need to push the details in to Storedata variable & again store that data in localcart key in localstorage 
    if (cartDataNull == null){
      let storeData : any = [];
      storeData.push(details);
      localStorage.setItem("localcart",JSON.stringify(storeData));
    }
    // if cart exist some data
    else{
      var id = details.menu_id;
      let index:number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localcart')|| '{}');

      for(let i=0; i<this.itemsCart.length; i++){
        if(parseInt(id) === parseInt(this.itemsCart[i].menu_id)){
          this.itemsCart[i].quantity = details.quantity;
          index = i;
          break;
        }
      }    
      if(index == -1){
        this.itemsCart.push(details);
        localStorage.setItem('localcart', JSON.stringify(this.itemsCart))
      }
      else{
        localStorage.setItem('localcart', JSON.stringify(this.itemsCart))
      }
    }
    this.cartNumFun();
  }

  cartNum : number = 0;
  // Sending cart length to cart service(subject) to fetch at header Section (no:of items selected)
  cartNumFun(){
    var cartValue = JSON.parse(localStorage.getItem('localcart')|| '{}');
    this.cartNum = cartValue.length;
    this.cart.cartSubject.next(this.cartNum)
    console.log("cart values" + this.cartNum)
  }
 

 

}
