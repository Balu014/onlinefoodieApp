import { Component, OnInit } from '@angular/core';
import { CartService } from '../servic/cart.service';
import { FormControl, FormGroup,Validator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  formdata = new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    message:new FormControl('',[Validators.required, Validators.minLength(5)])
  });

  costomerName:any = []

  constructor(private cart : CartService, private _router: Router) { }

  ngOnInit(): void {
    
    this.cartDetails();
    this.loadAmount();
  }

   // Getters for Form Validation
   get userName(){
    return this.formdata.get('name')
  }
  get userEmail(){
    return this.formdata.get('email')
  }
  get userMessage(){
    return this.formdata.get('message')
  }
  
  getCartDetails: any[] =[];
  totalAmt : number = 0;

  Onpost(){
    console.log("data:" , this.formdata.value.name)
    // alert(`Thanks for you order ${this.formdata.value.name}`)
    Swal.fire({
      title: `Thanks for you order ${this.formdata.value.name}`,
      text: "Your Food is preparing!",
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Home',
      cancelButtonText:'Close'
    }).then((result) => {
      if (result.value) {
        this._router.navigate(["/home"])
      }
      else if(result.dismiss === Swal.DismissReason.cancel){}
    })

    this.formdata.reset();
    this.removeCart();
  }



  // Getting localcart values from localstorage & storing in getCartDetails 
  cartDetails(){
    if(localStorage.getItem("localcart")){
      this.getCartDetails = JSON.parse(localStorage.getItem("localcart")|| '{}')
      console.log(this.getCartDetails)
    }
  }
  // Incrementing of quantity
  incQ(menu_id:any, quantity:any){
    for(let i=0; i < this.getCartDetails.length; i++){
      if(this.getCartDetails[i].menu_id === menu_id ){
        if(quantity != 5)
        this.getCartDetails[i].quantity= parseInt(quantity) + 1 
      }
    }
    localStorage.setItem("localcart", JSON.stringify(this.getCartDetails))
    this.loadAmount();
  }

  // Decrementing of quantity
  decQ(menu_id:any, quantity:any){
    for(let i =0; i< this.getCartDetails.length; i++){
      if(this,this.getCartDetails[i].menu_id === menu_id){
        if( quantity !=1)
        this.getCartDetails[i].quantity = parseInt(quantity) - 1
      }
    }
    localStorage.setItem("localcart", JSON.stringify(this.getCartDetails))
    this.loadAmount();
  }

  // Calculating Total  amount
  loadAmount(){
    if(localStorage.getItem('localcart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localcart')|| '{}')
      this.totalAmt = this.getCartDetails.reduce((acc, val)=>{
        return acc + (val.quantity * val.cost)
      },0)
    }
  }

  // Removing all items from cart
  removeCart(){
    localStorage.removeItem("localcart");
    this.getCartDetails =[];
    this.totalAmt = 0;
    this.cartNum = 0;
    this.cart.cartSubject.next(this.cartNum)
    // alert('You Have Removed Items in Cart :(')
    
  }

  // Removing single item from cart
  removeOne(getCartDetail:any){
    console.log(getCartDetail)
    if(localStorage.getItem("localcart")){
      this.getCartDetails = JSON.parse(localStorage.getItem("localcart")||'{}')
      for(let i=0; i < this.getCartDetails.length; i++){
        if(this.getCartDetails[i].menu_id === getCartDetail){
          this.getCartDetails.splice(i,1);
          localStorage.setItem("localcart", JSON.stringify(this.getCartDetails));
          this.loadAmount();
          this.cartNumFun();
          alert('Remaining cart items : ' + this.getCartDetails.length)
        }
      }
    }
    
  }

  cartNum : number = 0;
  // Sending cart length to cart service(subject) to fetch at header Section (no:of items selected)
  cartNumFun(){
    var cartValue = JSON.parse(localStorage.getItem('localcart')|| '{}');
    this.cartNum = cartValue.length;
    this.cart.cartSubject.next(this.cartNum)
    console.log(this.cartNum)
  }
}