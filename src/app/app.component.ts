import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { CartService } from './servic/cart.service';
// @ts-ignore
import Typewriter from 't-writer.js';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'musicapp';
  theme: Theme ="light-theme";

  cartItems: number = 0;
 
  isMode = true;

  constructor(private cart : CartService, @Inject(DOCUMENT) private document : Document, private renderer : Renderer2) {
    // getting (no:of items selected) from cart service
    this.cart.cartSubject.subscribe((data)=>{
      this.cartItems = data
    });
   }




  ngOnInit(): void {
    this.initializeTheme()
    this.cartValue()

    const target = document.querySelector('.tw')
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 80,
      deleteSpeed: 80,
      typeColor: 'white'
    })
    
    writer
      .type(' is ')
      .rest(500)
      .changeOps({ deleteSpeed: 80 })
      .remove(0)
      .type('Marvellous')
      .rest(500)
      .remove(10)
      .type('Hygenic')
      .rest(500)
      .changeOps({ deleteSpeed: 20 })
      .remove(7)
      .type('Delicious')
      .rest(500)
      .clear()
      .start()
  }

  initializeTheme=(): void =>
    this.renderer.addClass(this.document.body, this.theme)

  dayicon(){
    this.isMode = true;

  } 
  darkicon(){
    this.isMode = false;
  }

  switchTheme(){
    this.document.body.classList.replace(this.theme, this.theme ==='light-theme'?(this.theme ='dark-theme'):(this.theme = 'light-theme'))
  }  

  cartValue(){
    if(localStorage.getItem("localcart") != null){
      var cartCount = JSON.parse(localStorage.getItem("localcart")|| '{}');
      this.cartItems = cartCount.length;
    }
  }
}

export type Theme ='light-theme' | 'dark-theme';


